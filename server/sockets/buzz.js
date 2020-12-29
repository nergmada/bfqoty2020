import { blockBuzzer } from 'server/store';
import { get } from 'svelte/store';

const sounds = {
    'aleks': 'coo-coo-clock.mp3',
    'shayagi': 'hyena-laugh.mp3',
    'enrique': 'toilet.mp3',
    'sandy': 'quack.mp3',
    'aubrey': 'witch-cackle.mp3',
    'marie': 'tada.mp3',
    'alana': 'moo.mp3',
    'dasha': 'howling.mp3'
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