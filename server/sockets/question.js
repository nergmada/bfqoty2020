import { currentQuestion, banker } from 'server/store';
import { getById } from 'db/question';
import { getBanker } from 'db/player';
import { moveTier } from 'server/utils/bank';

export default async function(data, socket, io) {
    await moveTier();
    currentQuestion.set(await getById(data));
    const newBanker = await getBanker();
    banker.set(newBanker);
    io.emit('banker', newBanker);
}