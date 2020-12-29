import {writable, get} from 'svelte/store';

export const currentQuestion = writable(null);
export const getCurrent = () => get(currentQuestion);

export const blockBuzzer = writable(false);

export const banker = writable('');
export const getBanker = () => get(banker);


export const bankTier = writable(0);
export const getBankTier = () => get(bankTier);

export const bankTotal = writable(0);
export const getBankTotal = () => get(bankTotal);
