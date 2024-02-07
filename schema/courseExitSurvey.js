const mongoose = require('mongoose');

const courseExitSurvey = mongoose.Schema({
    CO1: {
        type: String
    },
    CO2: {
        type: String
    },
    CO3: {
        type: String
    },
    CO4: {
        type: String
    },
    CO5: {
        type: String
    },
    CO6: {
        type: String
    },
    CO7: {
        type: String
    },
    CO8: {
        type: String
    },
    appropriatenessOfAssessmentToolsUsed: {
        type: String
    },
    courseCode: {
        type: String
    },
    courseName: {
        type: String
    },
    courseSuggestions: {
        type: String
    },
    dislike: {
        type: String
    },
    hostingTools: {
        type: String
    },
    lectureRating: {
        type: String
    },
    like: {
        type: String
    },
    textBookAvailability: {
        type: String
    },
    year: {
        type: String
    }
});

const CourseExitSurvey = mongoose.model("CourseExitSurvey", courseExitSurvey);

module.exports = CourseExitSurvey;