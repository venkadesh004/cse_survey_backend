const PeerFeedback = require("../schema/peerFeedback");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const { jsonFormater } = require("../helper/util");

const PeerFeedbackHeader = [
  { id: "_id", title: "Key" },
  { id: "designation", title: "Designation" },
  { id: "expert", title: "Expert" },
  { id: "generalFeedback", title: "General Feedback" },
  { id: "name", title: "Name" },
  { id: "organizationName", title: "Organization Name" },
  { id: "suggestions", title: "Suggestions" },
];

const fileURL = "./download/peerFeedback.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: PeerFeedbackHeader,
});

module.exports.getData = (req, res) => {
  PeerFeedback.find({})
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
    await PeerFeedback.insertMany(data)
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

    await PeerFeedback.deleteOne(data)
      .then((result) => {
        PeerFeedback.find({})
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

    await PeerFeedback.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        PeerFeedback.find({})
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

  await PeerFeedback.find({})
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
        newData = jsonFormater(row, "peerFeedback");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await PeerFeedback.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await PeerFeedback.updateOne({ _id: newData["_id"] }, newData)
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
