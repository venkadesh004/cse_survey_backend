const mongoose = require("mongoose");

const employerFeedback = new mongoose.Schema({
  organizationName: { type: String },
  organizationLocation: { type: String },
  feedbackProvider: { type: String },
  feedbackProviderDesignation: { type: String },
  alumnusName: { type: String },
  natureOfalumnusRole: { type: String },
  alumnusRole: { type: String },
  qualityOfWork: { type: String },
  individualAndTeamWork: { type: String },
  technicalKnowledge: { type: String },
  domainKnowledge: { type: String },
  overallRating: { type: String },
  suggestions: { type: String },
  digitalSignature: { type: String },
});

const EmployerFeedback = mongoose.model("EmployerFeedback", employerFeedback);

module.exports = EmployerFeedback;
