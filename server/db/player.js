import { Player } from './models';
import { markQuestion, getPoints } from './question';

export async function getOrAddPlayer(name) {
    const player = await Player.findByName(name);
    if (player) return player;
    const newPlayer = new Player({
        name,
        answers: []
    });
    await newPlayer.save();
    return newPlayer;
}

export async function addAnswerForPlayer(name, qId, answer, correct = null) {
    const player = await getOrAddPlayer(name);
    //drop old answer for this question and append new one
    const marking =  await markQuestion(qId, answer);
    player.answers = [
        ...player.answers.filter(answer => answer.qId && `${answer.qId}` !== `${qId}`),
        {
            qId,
            answer,
            correct: correct !== null ? correct : marking,
        }
    ];
    await player.save();
}

export async function getBanker() {
    const players = await Player.find();
    if (players.length == 0) return '';
    const index = Math.round(Math.random() * (players.length - 0.51))
    return players[index].name;
}

export async function getPlayerScore(name) {
    const player = await getOrAddPlayer(name);
    const answers = player.answers.filter(answer => answer.correct);
    return (
        await Promise.all(answers.map(answer => getPoints(answer.qId)))
    ).reduce((prev, curr) => prev + curr, 0);
}

export async function getLeaderboard() {
    const players = await Player.find();
    const scores = await Promise.all(players.map(async player => ({
        name: player.name,
        score: await getPlayerScore(player.name)
    })));
    return scores.sort((a, b) => b.score - a.score);
}

export async function initialise() {
    await Player.deleteMany();
}

