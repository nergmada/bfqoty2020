import { addAnswerForPlayer, getLeaderboard } from 'db/player';
import { getAllQuestions } from 'db/question';

export default async function(data, socket, io) {
    await addAnswerForPlayer(data.name, data.qId, data.answer, data.correct);
    io.emit('leaderboard', await getLeaderboard());
    io.emit("all-questions", await getAllQuestions());
}