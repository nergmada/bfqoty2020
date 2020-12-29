import { currentQuestion } from 'server/store';
export default async function(data, socket, io) {
    currentQuestion.set("waiting");
}