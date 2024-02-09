const RecruiterFeedback = require("../schema/recruiterFeedback");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const { jsonFormater } = require("../helper/util");

const RecruiterFeedbackHeader = [
  { id: "_id", title: "Key" },
  { id: "communication", title: "Communication" },
  { id: "contemporaryKnowledge", title: "Contemporary Knowledge" },
  { id: "criticalThinking", title: "Critical Thinking" },
  { id: "design", title: "Design" },
  { id: "designation", title: "Designation" },
  { id: "email", title: "Email" },
  { id: "exposureToIt", title: "Exposure To It" },
  { id: "interpersonal", title: "Interpersonal" },
  { id: "knowledge", title: "Knowledge" },
  { id: "knowledgeAboutSPD", title: "Knowledge About SPD" },
  { id: "leadership", title: "Leadership" },
  { id: "lifeSkills", title: "Life Skills" },
  { id: "name", title: "Name" },
  { id: "organisationName", title: "Organisation Name" },
  { id: "overallRating", title: "Overall Rating" },
  { id: "problemSolving", title: "Problem Solving" },
  { id: "professionalEthics", title: "Professional Ethics" },
  { id: "programmingSkill", title: "Programming Skill" },
  { id: "projectManagementSkills", title: "ProjectManagement Skills" },
  { id: "suggestions", title: "Suggestions" },
  { id: "systemEngineeringSkills", title: "System Engineering Skills" },
  { id: "team", title: "Team" },
];

const fileURL = "./download/recruiterFeedback.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: RecruiterFeedbackHeader,
});

module.exports.getData = (req, res) => {
  RecruiterFeedback.find({})
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
    await RecruiterFeedback.insertMany(data)
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

    await RecruiterFeedback.deleteOne(data)
      .then((result) => {
        RecruiterFeedback.find({})
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

    await RecruiterFeedback.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        RecruiterFeedback.find({})
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

  await RecruiterFeedback.find({})
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
        newData = jsonFormater(row, "recruiterFeedback");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await RecruiterFeedback.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await RecruiterFeedback.updateOne({ _id: newData["_id"] }, newData)
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
