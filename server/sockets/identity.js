import {getOrAddPlayer, getLeaderboard} from 'db/player';
import { getAllQuestions } from 'db/question';
import { 
    currentQuestion, 
    bankTier, 
    getCurrent, 
    getBanker, 
    getBankTier,
    bankTotal,
    getBankTotal, } from 'server/store';

export default async function(data, socket, io) {
    await getOrAddPlayer(data.name);
    console.log(`Player ${data.name} has joined`);
    io.emit('leaderboard', await getLeaderboard());
    io.emit("all-questions", await getAllQuestions());
    currentQuestion.subscribe(v => {
        if (v) socket.emit('question', v);
    });
    bankTier.subscribe(v => {
        socket.emit('bank-tier', v);
    })
    bankTotal.subscribe(v => {
        socket.emit('bank-total', v);
    })
    socket.emit('bank-tier', getBankTier());
    socket.emit('question', getCurrent());
    socket.emit('banker', getBanker());
    socket.emit('bank-total', getBankTotal());
}