import {getAllQuestions} from 'db/question';
import {getLeaderboard} from 'db/player';
import {
    bankTier, 
    getBankTier, 
    bankTotal, 
    getBankTotal, 
    getLanguage,
    currentQuestion,
    getCurrent } from 'server/store';

export default async function(data, socket, io) {
    socket.emit("all-questions", await getAllQuestions());
    bankTier.subscribe(v => {
        socket.emit('bank-tier', v);
    })
    bankTotal.subscribe(v => {
        socket.emit('bank-total', {
            total: v,
            language: getLanguage() 
        });
    })
    socket.emit('bank-total', {
        total: getBankTotal(),
        language: getLanguage() 
    });
    currentQuestion.subscribe(v => {
        if (v) socket.emit('question', v);
    });
    socket.emit('question', getCurrent());
    socket.emit('bank-tier', getBankTier());
    socket.emit("leaderboard", await getLeaderboard());
}