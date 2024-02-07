const mongoose = require('mongoose');

const parentsFeedback = new mongoose.Schema({
    ParentsSuggestions: {
        type: String
    },
    date: {
        type: String
    },
    expectations: {
        type: String
    },
    fulfill: {
        type: String
    },
    mobile: {
        type: String
    },
    parentName: {
        type: String
    },
    parentOccupation: {
        type: String
    },
    reasons: {
        type: 'array'
    },
    studentName: {
        type: String
    }
});

const ParentsFeedback = mongoose.model("ParentsFeedback", parentsFeedback);

module.exports = ParentsFeedback;