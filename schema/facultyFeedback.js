const mongoose = require("mongoose");

const facultyFeedback = new mongoose.Schema({
  academicYear: { type: String },
  addContents: { type: String },
  assessmentMethods: { type: String },
  challengingTopics: { type: String },
  courseCode: { type: String },
  courseName: { type: String },
  courseOutcomesAppropriateness: { type: String },
  designThinkingContribution: { type: String },
  industryAndSocietalNeeds: { type: String },
  innovativeTeachingMethods: { type: String },
  removeContents: { type: String },
  semester: { type: String },
  studentProficiencyInPrerequisites: { type: String },
  suggestions: { type: String },
  timeForEffectiveCoverage: { type: String },
  courseFacilitator: { type: String },
});

const FacultyFeedback = mongoose.model("FacultyFeedback", facultyFeedback);

module.exports = FacultyFeedback;