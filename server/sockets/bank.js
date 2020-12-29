import { bankTier, bankTotal, getBankTier } from 'server/store';

const value = [0, 25, 50, 125, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000];

export default async function(data, socket, io) {
    console.log(`Banking ${value[getBankTier()]}`);
    
    bankTotal.update(v => v + value[getBankTier()]);
    bankTier.set(0);
}