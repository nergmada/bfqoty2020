import {initialise as qInit} from 'db/question';
import {initialise as pInit} from 'db/player';

export default async function() {
    await qInit();
    await pInit();
}