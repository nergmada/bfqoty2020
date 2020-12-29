import { Player } from './models';

export default async function(qId) {
    const players = await Player.find();
    const result = players.map(player => ({ 
        name: player.name, 
        //String coercion is quickest way to evaluate I could come up with
        answer: player.answers.find(answer => `${qId}` == `${answer.qId}`),
    }));
    return result;
}