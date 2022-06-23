const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const PollSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    totalVote: {
        type: Number,
        default: 0
    },
    options: {
        type: [{
            name: String,
            vote: Number
        }]
    }
});

const Poll = model('Poll', PollSchema);
module.exports = Poll;