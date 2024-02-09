const mongoose = require("mongoose");

const alumniFeedback = new mongoose.Schema({
  name: {
    type: String,
  },
  degree: {
    type: String,
  },
  yearOfGraduation: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  workingOrganisationName: {
    type: String,
  },
  designation: {
    type: String,
  },
  annualSalary: {
    type: String,
  },
  yearsWorkingInTheCompany: {
    type: String,
  },
  date: {
    type: String,
  },
  natureOfWork: {
    type: Array,
  },
  roles: {
    type: Array,
  },
  problemSolvingSkills: {
    type: String,
  },
  universityName: {
    type: String,
    default: "None",
  },
  higherDegree: {
    type: String,
    default: "None",
  },
  admissionYear: {
    type: String,
    default: "None",
  },
  graduationYear: {
    type: String,
    default: "None",
  },
  ownOrganizationName: {
    type: String,
    default: "None",
  },
  buisnessAndTechnicalDomain: {
    type: String,
    default: "None",
  },
  ownCompanyStartedYear: {
    type: String,
    default: "None",
  },
  websiteUrl: {
    type: String,
    default: "None",
  },
  numberOfAwards: {
    type: String,
  },
  awardDetails: {
    type: String,
  },
  noOfPapersPublishedAfterUG: {
    type: String,
  },
  publicationDetails: {
    type: String,
  },
  noOfInternationalCertifications: {
    type: String,
  },
  certificationDetails: {
    type: String,
  },
  noOfPatentsFiled: {
    type: String,
  },
  patentDetails: {
    type: String,
  },
  membership: {
    type: Array,
  },
  higherOfficialName: {
    type: String,
    default: "None",
  },
  higherOfficialDesignation: {
    type: String,
    default: "None",
  },
  higherOfficialMailID: {
    type: String,
    default: "None",
  },
  overallRatingCollege: {
    type: String,
  },
  strngthOrWeaknessInTheProgram: {
    type: String,
  },
  roleWishToContribute: {
    type: String,
  },
});

const AlumniFeedback = mongoose.model("AlumniFeedback", alumniFeedback);

module.exports = AlumniFeedback;
