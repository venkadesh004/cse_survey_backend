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
  } else if (type === "employerFeedback") {
    format = {
      _id: ["Key"],
      organizationName: ["Organization Name"],
      organizationLocation: ["Organization Location"],
      feedbackProvider: ["Feedback Provider"],
      feedbackProviderDesignation: ["Feedback Provider Designation"],
      alumnusName: ["Alumnus Name"],
      natureOfalumnusRole: ["Nature of Alumnus Role"],
      alumnusRole: ["Alumnus Role"],
      qualityOfWork: ["Quality of Work"],
      individualAndTeamWork: ["Individual and Teamwork"],
      technicalKnowledge: ["Technical Knowlodge"],
      domainKnowledge: ["Domain Knowledge"],
      overallRating: ["Overall Rating"],
      suggestions: ["Suggestions"],
      digitalSignature: ["Digital Signatures"],
    };
  } else if (type === "facultyFeedback") {
    format = {
      _id: ["Key"],
      academicYear: ["Academic Year"],
      addContents: ["Add Contents"],
      assessmentMethods: ["Assessment Methods"],
      challengingTopics: ["Challenging Topics"],
      courseCode: ["Course Code"],
      courseName: ["Course Name"],
      courseOutcomesAppropriateness: ["Course Outcomes Appropriateness"],
      designThinkingContribution: ["Design Thinking Contribution"],
      industryAndSocietalNeeds: ["Industry And Societal Needs"],
      innovativeTeachingMethods: ["Innovative Teaching Methods"],
      removeContents: ["Remove Contents"],
      semester: ["Semester"],
      studentProficiencyInPrerequisites: [
        "Student Proficiency In Prerequisites",
      ],
      suggestions: ["Suggestions"],
      timeForEffectiveCoverage: ["Time For Effective Coverage"],
      courseFacilitator: ["Course Facilitator"],
    };
  } else if (type === "peerFeedback") {
    format = {
      _id: ["Key"],
      designation: ["Designation"],
      expert: ["Expert"],
      generalFeedback: ["General Feedback"],
      name: ["Name"],
      organizationName: ["Organization Name"],
      suggestions: ["Suggestions"],
    };
  }

  return format;
};
