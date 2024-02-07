const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const courseExitSurveyRouter = require('./routes/courseExitSurveyRoutes');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/courseExitSurvey', courseExitSurveyRouter);

try {
    mongoose.connect(process.env.DB_URL).then((result) => {
        console.log("DB CONNECTION SUCCESSFUL");
        app.listen(process.env.PORT, () => {
            console.log("SERVER STARTED ON PORT: "+process.env.PORT);
        });
    }).catch((err) => {
        console.log(err);
    });
} catch (err) {
    console.log(err);
}