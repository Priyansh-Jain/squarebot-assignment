var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
const dotenv = require("dotenv");

dotenv.config();

var connection = mongoose.createConnection(process.env.DBURI);

autoIncrement.initialize(connection);

var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.plugin(autoIncrement.plugin, "user");
var user = mongoose.model("user", UserSchema);
module.exports = user;
