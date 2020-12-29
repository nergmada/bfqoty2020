import mongoose from 'mongoose';

// Mongoose doesn't use default promises ughhh...
mongoose.Promise = Promise;
mongoose.connect(
    `mongodb://localhost:27017/bfqoty2020`, { useNewUrlParser: true, useUnifiedTopology: true });

import { questionSchema, playerSchema } from './schema';

export const Question = mongoose.model('Question', questionSchema);
export const Player = mongoose.model('Player', playerSchema);
