import { markComplete, getAllQuestions } from 'db/question';

export default async function(data, socket, io) {
    await markComplete(data);
    socket.emit("all-questions", await getAllQuestions());
}