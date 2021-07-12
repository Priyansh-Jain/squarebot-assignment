const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.DBURI);

mongoose
  .connect(process.env.DBURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
