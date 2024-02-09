const express = require('express');
const Router = express.Router();

const {getData, postData, deleteData, updateOne, downloadData, uploadData, getCourseReport, getCourses, getCourseFeedback } = require('../controllers/courseExitSurveyController');

Router.route('/getData').get(getData);
Router.route('/postData').post(postData);
Router.route('/updateOne').put(updateOne);
Router.route('/deleteData').delete(deleteData);
Router.route('/uploadData').put(uploadData);
Router.route('/downloadData').get(downloadData);
Router.route('/getCourseReport/:courseCode').get(getCourseReport);
Router.route('/getCourses').get(getCourses);
Router.route('/getCourseFeedback/:courseCode').get(getCourseFeedback);

module.exports = Router;