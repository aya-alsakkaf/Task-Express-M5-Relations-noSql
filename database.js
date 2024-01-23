const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_LINK);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectdb;
