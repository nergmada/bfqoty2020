import { Schema, Types } from 'mongoose';

const schema = new Schema({
    question: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        required: true,
        validate: {
            validator: (v) => ['buzz', 'written', 'multichoice'].includes(v),
            message: "Invalid question type"
        }
    },
    round: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    options: {
        type: [{
            type: String,
            required: true,
        }],
        default: []
    },
    answer: {
        type: String,
        required: true,
    },
    finished: {
        type: Boolean,
        default: false,
    }
});

schema.statics.getRounds = function() {
    return this.find().distinct('round');
};

export default schema;