const FacultyFeedback = require("../schema/facultyFeedback");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const { jsonFormater } = require("../helper/util");

const FacultyFeedbackHeader = [
    { id: "_id", title: "Key" },
    { id: "academicYear", title: "Academic Year" },
    { id: "addContents", title: "Add Contents" },
    { id: "assessmentMethods", title: "Assessment Methods" },
    { id: "challengingTopics", title: "Challenging Topics" },
    { id: "courseCode", title: "Course Code" },
    { id: "courseName", title: "Course Name" },
    { id: "courseOutcomesAppropriateness", title: "Course Outcomes Appropriateness" },
    { id: "designThinkingContribution", title: "Design Thinking Contribution" },
    { id: "industryAndSocietalNeeds", title: "Industry And Societal Needs" },
    { id: "innovativeTeachingMethods", title: "Innovative Teaching Methods" },
    { id: "removeContents", title: "Remove Contents" },
    { id: "semester", title: "Semester" },
    { id: "studentProficiencyInPrerequisites", title: "Student Proficiency In Prerequisites" },
    { id: "suggestions", title: "Suggestions" },
    { id: "timeForEffectiveCoverage", title: "Time For Effective Coverage" },
    { id: "courseFacilitator", title: "Course Facilitator" },
];

const fileURL = "./download/facultyFeedback.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: FacultyFeedbackHeader,
});

module.exports.getData = (req, res) => {
  FacultyFeedback.find({})
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
    await FacultyFeedback.insertMany(data)
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

    await FacultyFeedback.deleteOne(data)
      .then((result) => {
        FacultyFeedback.find({})
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

    await FacultyFeedback.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        FacultyFeedback.find({})
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

  await FacultyFeedback.find({})
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
        newData = jsonFormater(row, "facultyFeedback");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await FacultyFeedback.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await FacultyFeedback.updateOne({ _id: newData["_id"] }, newData)
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
