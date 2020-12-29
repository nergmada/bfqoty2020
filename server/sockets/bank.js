import { bankTier, bankTotal, getBankTier, language } from 'server/store';

const value = [0, 25, 50, 125, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000];
const languages = ['arabic', 'australian', 'azerbaijani', 'english', 'mandarin', 'spanish'];
export default async function(data, socket, io) {
    console.log(`Banking ${value[getBankTier()]}`);
    
    bankTotal.update(v => v + value[getBankTier()]);
    bankTier.set(0);
    language.set(languages[Math.round(Math.random() * (languages.length - 0.51))]);
}