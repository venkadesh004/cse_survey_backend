const express = require('express');
const Router = express.Router();

const {getData, postData, deleteData, updateOne, uploadData, downloadData, getParentsFeedback } = require('../controllers/parentsFeedbackController');

Router.route('/getData').get(getData);
Router.route('/postData').post(postData);
Router.route('/updateOne').put(updateOne);
Router.route('/deleteData').delete(deleteData);
Router.route('/uploadData').put(uploadData);
Router.route('/downloadData').get(downloadData);
Router.route('/parentsFeedback').get(getParentsFeedback);

module.exports = Router;