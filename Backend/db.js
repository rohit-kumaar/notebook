const mongoose = require("mongoose");

// Mongoose App data base link 
const mongooseURL =
  "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
  mongoose.connect(mongooseURL, () => {
    console.log("Connect to mongoose successfully");
  });
};

module.exports = connectToMongo;


