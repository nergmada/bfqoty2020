import { Schema, Types } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    answers: {
        type: [{
            qId: Types.ObjectId,
            answer: String,
            correct: Boolean,
        }],
        default: []
    }
});

schema.statics.findByName = function(name) {
    return this.findOne({ name });
};

export default schema;