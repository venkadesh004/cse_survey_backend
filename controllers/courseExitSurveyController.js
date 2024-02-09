const CourseExitSurvey = require("../schema/courseExitSurvey");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const { jsonFormater } = require("../helper/util");

const courseExitSurveyHeader = [
  { id: "_id", title: "Key" },
  { id: "courseCode", title: "Course Code" },
  { id: "courseName", title: "Course Name" },
  { id: "year", title: "Year" },
  { id: "CO1", title: "CO1" },
  { id: "CO2", title: "CO2" },
  { id: "CO3", title: "CO3" },
  { id: "CO4", title: "CO4" },
  { id: "CO5", title: "CO5" },
  { id: "CO6", title: "CO6" },
  { id: "CO7", title: "CO7" },
  { id: "CO8", title: "CO8" },
  {
    id: "appropriatenessOfAssessmentToolsUsed",
    title: "Appropriateness Of Assessment Tools",
  },
  { id: "courseSuggestions", title: "Course Suggestions" },
  { id: "like", title: "Like" },
  { id: "dislike", title: "Dislike" },
  { id: "hostingTools", title: "Hosting Tools" },
  { id: "lectureRating", title: "Lecture Rating" },
  { id: "textBookAvailability", title: "Text Book Availability" },
];

const fileURL = "./download/courseExitSurvey.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: courseExitSurveyHeader,
});

module.exports.getData = (req, res) => {
  CourseExitSurvey.find({}).then((data) => {
    return res.status(201).json(data);
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

    console.log(data);
    await CourseExitSurvey.deleteOne(data)
      .then((result) => {
        CourseExitSurvey.find({}).then((data) => {
          return res.send(data);
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
        CourseExitSurvey.find({}).then((data) => {
          return res.send(data);
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

  await CourseExitSurvey.find({})
    .then((data) => {
      dataList.push(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err });
    });

  let sortedData = () => dataList[0].sort((data1, data2) => {
    if (data1.courseCode < data2.courseCode) {
      return -1;
    } 
    if (data1.courseCode > data2.courseCode) {
      return 1;
    }
    return 0;
  });

  sortedData();

  dataList.forEach(data => {
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
        newData = jsonFormater(row, "courseExitSurvey");
        if (newData["_id"] === "") {
          delete newData["_id"];
          await CourseExitSurvey.insertMany(newData)
            .then((result) => {
              return res.status(201).json({ msg: "success" });
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
        console.log("CSV file successfully processed");
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
      var co1 = [];
      var co2 = [];
      var co3 = [];
      var co4 = [];
      var co5 = [];
      var co6 = [];
      var co7 = [];
      var co8 = [];

      result.forEach((element) => {
        appropriatenessOfAssessmentToolsUsed.push(
          element["appropriatenessOfAssessmentToolsUsed"]
        );
        hostingTools.push(element["hostingTools"]);
        lectureRating.push(element["lectureRating"]);
        textBookAvailability.push(element["textBookAvailability"]);
        co1.push(element["CO1"]);
        co2.push(element["CO2"]);
        co3.push(element["CO3"]);
        co4.push(element["CO4"]);
        co5.push(element["CO5"]);
        co6.push(element["CO6"]);
        co7.push(element["CO7"]);
        co8.push(element["CO8"]);
      });

      return res
        .status(201)
        .json([
          appropriatenessOfAssessmentToolsUsed,
          hostingTools,
          lectureRating,
          textBookAvailability,
          co1,
          co2,
          co3,
          co4,
          co5,
          co6,
          co7,
          co8,
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
      return res.status(400).json({ errror: err });
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
