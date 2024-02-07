const {
  fileUrl,
  courseExitSurveyHeader,
  parentsFeedbackHeader,
} = require("./constants");

const createCSVWriter = require("csv-writer").createObjectCsvWriter;

module.exports.jsonFormater = (rowData, type) => {
  var format = {};

  if (type === "courseExitSurvey") {
    format = {
      _id: rowData["Key"],
      courseCode: rowData["Course Code"],
      courseName: rowData["Course Name"],
      year: rowData["Year"],
      CO1: rowData["CO1"],
      CO2: rowData["CO2"],
      CO3: rowData["CO3"],
      CO4: rowData["CO4"],
      CO5: rowData["CO5"],
      CO6: rowData["CO6"],
      CO7: rowData["CO7"],
      CO8: rowData["CO8"],
      appropriatenessOfAssessmentToolsUsed:
        rowData["Appropriateness Of Assessment Tools"],
      courseSuggestions: rowData["Course Suggestions"],
      like: rowData["Like"],
      dislike: rowData["Dislike"],
      hostingTools: rowData["Hosting Tools"],
      lectureRating: rowData["Lecture Rating"],
      textBookAvailability: rowData["Text Book Availability"],
    };
  } else if (type === "parentsFeedback") {
    format = {
      _id: rowData["Key"],
      studentName: rowData["Student Name"],
      parentName: rowData["Parent Name"],
      mobile: rowData["Mobile"],
      parentOccupation: rowData["Parent Occupation"],
      ParentsSuggestions: rowData["Parents Suggestions"],
      date: rowData["Date"],
      expectations: rowData["Expectations"],
      fulfill: rowData["Fulfill"],
      reasons: rowData["Reasons"],
    };
  }

  return format;
};

module.exports.csvWriterCourseExitSurvey = createCSVWriter({
  path: fileUrl + "courseExitSurvey.csv",
  header: courseExitSurveyHeader,
});

module.exports.csvWriterParentsFeedback = createCSVWriter({
  path: fileUrl + "ParentsFeedback.csv",
  header: parentsFeedbackHeader,
});
