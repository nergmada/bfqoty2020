import { getCurrent, getBankTier, bankTier } from 'server/store';
import getAnswers from 'db/answers';

export async function moveTier() {
    console.log("calculating new bank tier");
    const question = getCurrent();
    if (!question) return;

    const currentTier = getBankTier();

    const answers = (await getAnswers(question._id));
    const correctAnswers = answers.filter(a => a.answer && a.answer.correct).length;
    
    if ((question.questionType == 'buzz' || currentTier < 4) && correctAnswers > 0) {
        bankTier.set(currentTier + 1);
        return;
    }
    if (currentTier < 8 && correctAnswers > 1) {
        bankTier.set(currentTier + 1);
        return;
    }
    if (currentTier < 12 && correctAnswers > 2) {
        bankTier.set(currentTier + 1);
        return;
    }
    if (currentTier >= 11 && correctAnswers > 2) {
        return;
    }
    bankTier.set(0);
}