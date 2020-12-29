import { blockBuzzer } from 'server/store';
import { get } from 'svelte/store';

const sounds = {
    'aleks': 'coocooclock',
    'shayagi': 'hyena',
    'enrique': 'toilet',
    'sandy': 'quack',
    'aubrey': 'witch',
    'marie': 'tada',
    'alana': 'moo',
    'dasha': 'howling'
}

export default async function(data, socket, io) {
    if (get(blockBuzzer)) return;
    blockBuzzer.set(true);
    
    const sound = Object.keys(sounds).includes(data.name) ? sounds[data.name] : 'buzz.mp3';

    io.emit('buzzed', {
        ...data,
        sound
    });

    setTimeout(() => {
        blockBuzzer.set(false);
    }, 2000);

}