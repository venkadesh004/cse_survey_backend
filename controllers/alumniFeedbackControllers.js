const AlumniFeedback = require("../schema/alumniFeedback");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const { jsonFormater } = require("../helper/util");

const AlumniFeedbackHeader = [
  { id: "_id", title: "Key" },
  { id: "name", title: "name" },
  { id: "degree", title: "degree" },
  { id: "yearOfGraduation", title: "yearOfGraduation" },
  { id: "email", title: "email" },
  { id: "address", title: "address" },
  { id: "workingOrganisationName", title: "workingOrganisationName" },
  { id: "designation", title: "designation" },
  { id: "annualSalary", title: "annualSalary" },
  { id: "yearsWorkingInTheCompany", title: "yearsWorkingInTheCompany" },
  { id: "date", title: "date" },
  { id: "natureOfWork", title: "natureOfWork" },
  { id: "roles", title: "roles" },
  { id: "problemSolvingSkills", title: "problemSolvingSkills" },
  { id: "universityName", title: "universityName" },
  { id: "higherDegree", title: "higherDegree" },
  { id: "admissionYear", title: "admissionYear" },
  { id: "graduationYear", title: "graduationYear" },
  { id: "ownOrganizationName", title: "ownOrganizationName" },
  { id: "buisnessAndTechnicalDomain", title: "buisnessAndTechnicalDomain" },
  { id: "ownCompanyStartedYear", title: "ownCompanyStartedYear" },
  { id: "websiteUrl", title: "websiteUrl" },
  { id: "numberOfAwards", title: "numberOfAwards" },
  { id: "awardDetails", title: "awardDetails" },
  { id: "noOfPapersPublishedAfterUG", title: "noOfPapersPublishedAfterUG" },
  { id: "publicationDetails", title: "publicationDetails" },
  {
    id: "noOfInternationalCertifications",
    title: "noOfInternationalCertifications",
  },
  { id: "certificationDetails", title: "certificationDetails" },
  { id: "noOfPatentsFiled", title: "noOfPatentsFiled" },
  { id: "patentDetails", title: "patentDetails" },
  { id: "membership", title: "membership" },
  { id: "higherOfficialName", title: "higherOfficialName" },
  { id: "higherOfficialDesignation", title: "higherOfficialDesignation" },
  { id: "higherOfficialMailID", title: "higherOfficialMailID" },
  { id: "overallRatingCollege", title: "overallRatingCollege" },
  {
    id: "strngthOrWeaknessInTheProgram",
    title: "strngthOrWeaknessInTheProgram",
  },
  { id: "roleWishToContribute", title: "roleWishToContribute" },
];

const fileURL = "./download/alumniFeedback.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: AlumniFeedbackHeader,
});

module.exports.getData = (req, res) => {
  AlumniFeedback.find({})
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
    await AlumniFeedback.insertMany(data)
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

    await AlumniFeedback.deleteOne(data)
      .then((result) => {
        AlumniFeedback.find({})
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

    await AlumniFeedback.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        AlumniFeedback.find({})
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

  await AlumniFeedback.find({})
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
        newData = jsonFormater(row, "alumniFeedback");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await AlumniFeedback.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await AlumniFeedback.updateOne({ _id: newData["_id"] }, newData)
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
