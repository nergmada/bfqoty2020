import {Question} from './models';
import getAnswers from './answers';
import questionData from 'questions';

export async function markQuestion(qId, answer) {
    const question = await Question.findById(qId);
    return question.questionType === 'multichoice' && answer == question.answer;
}

export async function getPoints(qId) {
    const question = await Question.findById(qId);
    return question.points;
}

export async function getAllQuestions() {
    console.log("Sending question data to admin");
    const questions = await Question.find();
    const result = await Promise.all(questions.map(async question => ({
        ...question.toObject(),
        answers: await getAnswers(question._id)
    })));
    return result;
}

export async function getById(qId) {
    return await Question.findById({ _id: qId });
}

export async function markComplete(qId) {
    const question = await getById(qId);
    question.finished = true;
    await question.save();
}

export async function purge() {
    await Question.deleteMany();
}

export async function initialise() {
    await purge();
    await Promise.all(questionData.map(async data => {
        const q = new Question(data);
        return await q.save();
    }));
}
