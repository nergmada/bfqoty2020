import mongoose from 'mongoose';

// Mongoose doesn't use default promises ughhh...
mongoose.Promise = Promise;
console.log(process.env);
console.log(`mongodb://${process.env.DBHOST ? process.env.DBHOST : 'localhost'}:27017/bfqoty2020`);
mongoose.connect(
    `mongodb://${process.env.DBHOST}:27017/bfqoty2020`, { useNewUrlParser: true, useUnifiedTopology: true });

import { questionSchema, playerSchema } from './schema';

export const Question = mongoose.model('Question', questionSchema);
export const Player = mongoose.model('Player', playerSchema);
