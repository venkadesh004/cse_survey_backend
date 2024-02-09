const mongoose = require("mongoose");

const recruiterFeedback = new mongoose.Schema({
  communication: { type: String },
  contemporaryKnowledge: { type: String },
  criticalThinking: { type: String },
  design: { type: String },
  designation: { type: String },
  email: { type: String },
  exposureToIt: { type: String },
  interpersonal: { type: String },
  knowledge: { type: String },
  knowledgeAboutSPD: { type: String },
  leadership: { type: String },
  lifeSkills: { type: String },
  name: { type: String },
  organisationName: { type: String },
  overallRating: { type: String },
  problemSolving: { type: String },
  professionalEthics: { type: String },
  programmingSkill: { type: String },
  projectManagementSkills: { type: String },
  suggestions: { type: String },
  systemEngineeringSkills: { type: String },
  team: { type: String },
});

const RecruiterFeedback = mongoose.model(
  "RecruiterFeedback",
  recruiterFeedback
);

module.exports = RecruiterFeedback;
