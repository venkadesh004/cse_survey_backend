const EmployerFeedback = require("../schema/employerFeedback");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const { jsonFormater } = require("../helper/util");

const employerFeedbackHeader = [
  { id: "_id", title: "Key" },
  { id: "organizationName", title: "Organization Name" },
  { id: "organizationLocation", title: "Organization Location" },
  { id: "feedbackProvider", title: "Feedback Provider" },
  { id: "feedbackProviderDesignation", title: "Feedback Provider Designation" },
  { id: "alumnusName", title: "Alumnus Name" },
  { id: "natureOfalumnusRole", title: "Nature of Alumnus Role" },
  { id: "alumnusRole", title: "Alumnus Role" },
  { id: "qualityOfWork", title: "Quality of Work" },
  { id: "individualAndTeamWork", title: "Individual and Teamwork" },
  { id: "technicalKnowledge", title: "Technical Knowlodge" },
  { id: "domainKnowledge", title: "Domain Knowledge" },
  { id: "overallRating", title: "Overall Rating" },
  { id: "suggestions", title: "Suggestions" },
  { id: "digitalSignature", title: "Digital Signatures" },
];

const fileURL = "./download/employerFeedback.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: employerFeedbackHeader,
});

module.exports.getData = (req, res) => {
  EmployerFeedback.find({})
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
    await EmployerFeedback.insertMany(data)
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

    await EmployerFeedback.deleteOne(data)
      .then((result) => {
        EmployerFeedback.find({})
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

    await EmployerFeedback.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        EmployerFeedback.find({})
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

  await EmployerFeedback.find({})
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
        newData = jsonFormater(row, "employerFeedback");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await EmployerFeedback.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await EmployerFeedback.updateOne({ _id: newData["_id"] }, newData)
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
