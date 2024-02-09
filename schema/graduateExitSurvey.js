const mongoose = require("mongoose");

const graduateExitSurvey = new mongoose.Schema({
  name: {
    type: String,
  },
  regNo: {
    type: String,
  },
  yearJoined: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  presentAddress: {
    type: String,
  },
  educationalExperience: {
    type: String,
  },
  effectiveness: {
    type: String,
  },
  adminOffices: {
    type: String,
  },
  careerGuidanceAndPlacement: {
    type: String,
  },
  transportation: {
    type: String,
  },
  canteen: {
    type: String,
  },
  hostel: {
    type: String,
  },
  availability: {
    type: String,
  },
  contactHoursOutsideLecturing: {
    type: String,
  },
  professionalism: {
    type: String,
  },
  presentation: {
    type: String,
  },
  mentoring: {
    type: String,
  },
  centralLibrary: {
    type: String,
  },
  departnmentLibrary: {
    type: String,
  },
  centralComputingCentre: {
    type: String,
  },
  infrastructuresAndLabs: {
    type: String,
  },
  internet: {
    type: String,
  },
  parking: {
    type: String,
  },
  modernClassroom: {
    type: String,
  },
  curriculum: {
    type: String,
  },
  syllabiContent: {
    type: String,
  },
  studentLearningAssessment: {
    type: String,
  },
  qualityOfInstruction: {
    type: String,
  },
  opportunityForCreativity: {
    type: String,
  },
  knowledgeAndEthics: {
    type: String,
  },
  teamWork: {
    type: String,
  },
  demonstrateLeadership: {
    type: String,
  },
  interpersonalSkillsDevelopment: {
    type: String,
  },
  lifeSkills: {
    type: String,
  },
  verbalCommunication: {
    type: String,
  },
  writtenCommunication: {
    type: String,
  },
  problemSolving: {
    type: String,
  },
  criticalThinking: {
    type: String,
  },
  researchSkills: {
    type: String,
  },
  programmingSkills: {
    type: String,
  },
  productDevelopment: {
    type: String,
  },
  applyingSkillsInFinalYearProject: {
    type: String,
  },
  comfortableAtHighlevelLanguage: {
    type: String,
  },
  comfortableInConfiguringSystems: {
    type: String,
  },
  exposureToSocietyRelevantProjects: {
    type: String,
  },
  knowledgeOfpersonalHealtheErgonomics: {
    type: String,
  },
  knowledgeOfSoftwareCopyright: {
    type: String,
  },
  NSSorNCCCamps: {
    type: String,
  },
  exposureToImpactOfICTsolution: {
    type: String,
  },
  emphasisOnSDofICTsolutions: {
    type: String,
  },
  abilityInExecutingFinalYearProject: {
    type: String,
  },
  organizingAndManagingEvents: {
    type: String,
  },
  numberOfPapersPublished: {
    type: String,
  },
  publicationDetails: {
    type: String,
  },
  numberOfSoftwaresorProductsDeveloped: {
    type: String,
  },
  projectDetails: {
    type: String,
  },
  membershipInProfessionalSocieties: {
    type: String,
  },
  numberOfInternationalCertifications: {
    type: String,
  },
  certificationDetails: {
    type: String,
  },
  overallRating: {
    type: String,
  },
  comment: {
    type: String,
  },
  roleYouWishToContribute: {
    type: String,
  },
  collegeName: {
    type: String,
    default: "None",
  },
  degree: {
    type: String,
    default: "None",
  },
  discipline: {
    type: String,
    default: "None",
  },
  admissionYear: {
    type: String,
    default: "None",
  },
  workforceName: {
    type: String,
    default: "None",
  },
  workforceSector: {
    type: String,
    default: "None",
  },
  workforceDesignation: {
    type: String,
    default: "None",
  },
  workforceCity: {
    type: String,
    default: "None",
  },
  workforceSalaryPerAnnum: {
    type: String,
    default: "None",
  },
  parttimeCollegeName: {
    type: String,
    default: "None",
  },
  parttimeDegree: {
    type: String,
    default: "None",
  },
  parttimeDiscipline: {
    type: String,
    default: "None",
  },
  parttimeAdmissionYear: {
    type: String,
    default: "None",
  },
  parttimeWorkforceName: {
    type: String,
    default: "None",
  },
  sector: {
    type: String,
    default: "None",
  },
  designation: {
    type: String,
    default: "None",
  },
  city: {
    type: String,
    default: "None",
  },
  salaryPerAnnum: {
    type: String,
    default: "None",
  },
  onlineExam: {
    type: Array,
    default: "None",
  },
  GREScore: {
    type: String,
    default: "None",
  },
  GMATScore: {
    type: String,
    default: "None",
  },
  CATScore: {
    type: String,
    default: "None",
  },
  GATEScore: {
    type: String,
    default: "None",
  },
});

const GraduateExitSurvey = mongoose.model("GraduateExitSurvey", graduateExitSurvey);

module.exports = GraduateExitSurvey;