const GraduateExitSurvey = require("../schema/graduateExitSurvey");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const { jsonFormater } = require("../helper/util");

const GraduateExitSurveyHeader = [
  { id: "_id", title: "Key" },
  { id: "name", title: "name" },
  { id: "regNo", title: "regNo" },
  { id: "yearJoined", title: "yearJoined" },
  { id: "email", title: "email" },
  { id: "mobileNo", title: "mobileNo" },
  { id: "presentAddress", title: "presentAddress" },
  { id: "educationalExperience", title: "educationalExperience" },
  { id: "effectiveness", title: "effectiveness" },
  { id: "adminOffices", title: "adminOffices" },
  { id: "careerGuidanceAndPlacement", title: "careerGuidanceAndPlacement" },
  { id: "transportation", title: "transportation" },
  { id: "canteen", title: "canteen" },
  { id: "hostel", title: "hostel" },
  { id: "availability", title: "availability" },
  { id: "contactHoursOutsideLecturing", title: "contactHoursOutsideLecturing" },
  { id: "professionalism", title: "professionalism" },
  { id: "presentation", title: "presentation" },
  { id: "mentoring", title: "mentoring" },
  { id: "centralLibrary", title: "centralLibrary" },
  { id: "departnmentLibrary", title: "departnmentLibrary" },
  { id: "centralComputingCentre", title: "centralComputingCentre" },
  { id: "infrastructuresAndLabs", title: "infrastructuresAndLabs" },
  { id: "internet", title: "internet" },
  { id: "parking", title: "parking" },
  { id: "modernClassroom", title: "modernClassroom" },
  { id: "curriculum", title: "curriculum" },
  { id: "syllabiContent", title: "syllabiContent" },
  { id: "studentLearningAssessment", title: "studentLearningAssessment" },
  { id: "qualityOfInstruction", title: "qualityOfInstruction" },
  { id: "opportunityForCreativity", title: "opportunityForCreativity" },
  { id: "knowledgeAndEthics", title: "knowledgeAndEthics" },
  { id: "teamWork", title: "teamWork" },
  { id: "demonstrateLeadership", title: "demonstrateLeadership" },
  {
    id: "interpersonalSkillsDevelopment",
    title: "interpersonalSkillsDevelopment",
  },
  { id: "lifeSkills", title: "lifeSkills" },
  { id: "verbalCommunication", title: "verbalCommunication" },
  { id: "writtenCommunication", title: "writtenCommunication" },
  { id: "problemSolving", title: "problemSolving" },
  { id: "criticalThinking", title: "criticalThinking" },
  { id: "researchSkills", title: "researchSkills" },
  { id: "programmingSkills", title: "programmingSkills" },
  { id: "productDevelopment", title: "productDevelopment" },
  {
    id: "applyingSkillsInFinalYearProject",
    title: "applyingSkillsInFinalYearProject",
  },
  {
    id: "comfortableAtHighlevelLanguage",
    title: "comfortableAtHighlevelLanguage",
  },
  {
    id: "comfortableInConfiguringSystems",
    title: "comfortableInConfiguringSystems",
  },
  {
    id: "exposureToSocietyRelevantProjects",
    title: "exposureToSocietyRelevantProjects",
  },
  {
    id: "knowledgeOfpersonalHealtheErgonomics",
    title: "knowledgeOfpersonalHealtheErgonomics",
  },
  { id: "knowledgeOfSoftwareCopyright", title: "knowledgeOfSoftwareCopyright" },
  { id: "NSSorNCCCamps", title: "NSSorNCCCamps" },
  {
    id: "exposureToImpactOfICTsolution",
    title: "exposureToImpactOfICTsolution",
  },
  { id: "emphasisOnSDofICTsolutions", title: "emphasisOnSDofICTsolutions" },
  {
    id: "abilityInExecutingFinalYearProject",
    title: "abilityInExecutingFinalYearProject",
  },
  { id: "organizingAndManagingEvents", title: "organizingAndManagingEvents" },
  { id: "numberOfPapersPublished", title: "numberOfPapersPublished" },
  { id: "publicationDetails", title: "publicationDetails" },
  {
    id: "numberOfSoftwaresorProductsDeveloped",
    title: "numberOfSoftwaresorProductsDeveloped",
  },
  { id: "projectDetails", title: "projectDetails" },
  {
    id: "membershipInProfessionalSocieties",
    title: "membershipInProfessionalSocieties",
  },
  {
    id: "numberOfInternationalCertifications",
    title: "numberOfInternationalCertifications",
  },
  { id: "certificationDetails", title: "certificationDetails" },
  { id: "overallRating", title: "overallRating" },
  { id: "comment", title: "comment" },
  { id: "roleYouWishToContribute", title: "roleYouWishToContribute" },
  { id: "collegeName", title: "collegeName" },
  { id: "degree", title: "degree" },
  { id: "discipline", title: "discipline" },
  { id: "admissionYear", title: "admissionYear" },
  { id: "workforceName", title: "workforceName" },
  { id: "workforceSector", title: "workforceSector" },
  { id: "workforceDesignation", title: "workforceDesignation" },
  { id: "workforceCity", title: "workforceCity" },
  { id: "workforceSalaryPerAnnum", title: "workforceSalaryPerAnnum" },
  { id: "parttimeCollegeName", title: "parttimeCollegeName" },
  { id: "parttimeDegree", title: "parttimeDegree" },
  { id: "parttimeDiscipline", title: "parttimeDiscipline" },
  { id: "parttimeAdmissionYear", title: "parttimeAdmissionYear" },
  { id: "parttimeWorkforceName", title: "parttimeWorkforceName" },
  { id: "sector", title: "sector" },
  { id: "designation", title: "designation" },
  { id: "city", title: "city" },
  { id: "salaryPerAnnum", title: "salaryPerAnnum" },
  { id: "onlineExam", title: "onlineExam" },
  { id: "GREScore", title: "GREScore" },
  { id: "GMATScore", title: "GMATScore" },
  { id: "CATScore", title: "CATScore" },
  { id: "GATEScore", title: "GATEScore" },
];

const fileURL = "./download/graduateExitSurvey.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: GraduateExitSurveyHeader,
});

module.exports.getData = (req, res) => {
  GraduateExitSurvey.find({})
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

module.exports.postData = async (req, res) => {
  try {
    const data = req.body;
    await GraduateExitSurvey.insertMany(data)
      .then((result) => {
        return res.status(201).json({ msg: "success" });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports.deleteData = async (req, res) => {
  try {
    const data = req.body;

    await GraduateExitSurvey.deleteOne(data)
      .then((result) => {
        GraduateExitSurvey.find({})
          .then((output) => {
            return res.status(201).json(output);
          })
          .catch((err) => {
            return res.status(400).json({ error: err });
          });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports.updateOne = async (req, res) => {
  try {
    const data = req.body;

    await GraduateExitSurvey.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        GraduateExitSurvey.find({})
          .then((output) => {
            return res.status(201).json(output);
          })
          .catch((err) => {
            return res.status(400).json({ error: err });
          });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports.downloadData = async (req, res) => {
  var dataList = [];

  try {
    fs.unlinkSync(fileURL);
  } catch (err) {
    console.log("File not found!");
  }

  await GraduateExitSurvey.find({})
    .then((data) => {
      dataList.push(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err });
    });

  dataList.forEach((data) => {
    csvWriter
      .writeRecords(data)
      .then(() => {
        return res.download(fileURL);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: err });
      });
  });
};

module.exports.uploadData = async (req, res) => {
  try {
    fs.createReadStream(fileURL)
      .pipe(csv())
      .on("data", async (row) => {
        newData = jsonFormater(row, "graduateExitSurvey");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await GraduateExitSurvey.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await GraduateExitSurvey.updateOne({ _id: newData["_id"] }, newData)
            .then((data) => {
              console.log("Update Successful!");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        }
      })
      .on("end", () => {
        return res.status(201).json({ msg: "success" });
      });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
