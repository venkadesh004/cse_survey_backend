const CourseExitSurvey = require("../schema/courseExitSurvey");
const fs = require("fs");

const { fileURL } = require("../helper/constants");
const { jsonFormater, csvWriterCourseExitSurvey } = require("../helper/util");

module.exports.getData = (req, res) => {
  CourseExitSurvey.find({})
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
    await CourseExitSurvey.insertMany(data)
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

    await CourseExitSurvey.deleteOne(data)
      .then((result) => {
        CourseExitSurvey.find({})
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

    await CourseExitSurvey.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        CourseExitSurvey.find({})
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
    fs.unlinkSync(fileURL + "courseExitSurvey.csv");
  } catch (err) {
    return res.status(400).json({ error: err });
  }

  await CourseExitSurvey.find({})
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
    csvWriterCourseExitSurvey
      .writeRecords(data)
      .then(() => {
        return res.status(201).download(fileURL + "courseExitSurvey.csv");
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: err });
      });
  });
};

module.exports.uploadData = async (req, res) => {
  try {
    fs.createReadStream(fileURL + "courseExitSurvey.csv")
      .pipe(csv())
      .on("data", async (row) => {
        newData = jsonFormater(row, "courseExitSurvey");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await CourseExitSurvey.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        } else {
          await CourseExitSurvey.updateOne({ _id: newData["_id"] }, newData)
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

module.exports.getCourseReport = (req, res) => {
  try {
    const data = req.params.courseCode;

    CourseExitSurvey.find({ courseCode: data }).then((result) => {
      var appropriatenessOfAssessmentToolsUsed = [];
      var hostingTools = [];
      var lectureRating = [];
      var textBookAvailability = [];

      result.forEach((element) => {
        appropriatenessOfAssessmentToolsUsed.push(
          element["appropriatenessOfAssessmentToolsUsed"]
        );
        hostingTools.push(element["hostingTools"]);
        lectureRating.push(element["lectureRating"]);
        textBookAvailability.push(element["textBookAvailability"]);
      });

      return res
        .status(201)
        .json([
          appropriatenessOfAssessmentToolsUsed,
          hostingTools,
          lectureRating,
          textBookAvailability,
        ]);
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports.getCourses = (req, res) => {
  CourseExitSurvey.find({})
    .then((result) => {
      var courses = [];

      result.forEach((element) => {
        if (!courses.includes(element["courseCode"])) {
          courses.push(element["courseCode"]);
        }
      });

      return res.status(201).json(courses);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

module.exports.getCourseFeedback = (req, res) => {
  CourseExitSurvey.find({ courseCode: req.params.courseCode })
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};
