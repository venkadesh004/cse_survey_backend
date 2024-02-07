const ParentsFeedback = require("../schema/parentsFeedback");
const fs = require("fs");

const { fileURL } = require("../helper/constants");
const { jsonFormater, csvWriterParentsFeedback } = require("../helper/util");
const ParentsFeedback = require("../schema/parentsFeedback");

module.exports.getData = (req, res) => {
  ParentsFeedback.find({})
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
    await ParentsFeedback.insertMany(data)
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

    await ParentsFeedback.deleteOne(data)
      .then((result) => {
        ParentsFeedback.find({})
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

    await ParentsFeedback.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        ParentsFeedback.find({})
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
    fs.unlinkSync(fileURL + "ParentsFeedback.csv");
  } catch (err) {
    return res.status(400).json({ error: err });
  }

  await ParentsFeedback.find({})
    .then((data) => {
      dataList.push(data);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });

  let sortedData = () =>
    dataList[0].sort((data1, data2) => {
      if (data1.courseCode < data2.courseCode) {
        return -1;
      }
      if (data1.courseCode > data2.courseCode) {
        return 1;
      }
      return 0;
    });

  sortedData();
  dataList.forEach((data) => {
    csvWriterParentsFeedback
      .writeRecords(data)
      .then(() => {
        return res.status(201).download(fileURL + "ParentsFeedback.csv");
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: err });
      });
  });
};

module.exports.uploadData = async (req, res) => {
  try {
    fs.createReadStream(fileURL + "ParentsFeedback.csv")
      .pipe(csv())
      .on("data", async (row) => {
        newData = jsonFormater(row, "parentsFeedback");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await ParentsFeedback.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await ParentsFeedback.updateOne({ _id: newData["_id"] }, newData)
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
