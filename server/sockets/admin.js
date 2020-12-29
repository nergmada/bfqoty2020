import {getAllQuestions} from 'db/question';
import {getLeaderboard} from 'db/player';
import {bankTier, getBankTier, bankTotal, getBankTotal } from 'server/store';

export default async function(data, socket, io) {
    socket.emit("all-questions", await getAllQuestions());
    bankTier.subscribe(v => {
        socket.emit('bank-tier', v);
    })
    bankTotal.subscribe(v => {
        socket.emit('bank-total', v);
    })
    socket.emit('bank-total', getBankTotal());
    socket.emit('bank-tier', getBankTier());
    socket.emit("leaderboard", await getLeaderboard());
}