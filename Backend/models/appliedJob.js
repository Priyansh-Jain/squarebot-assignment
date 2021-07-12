var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
const dotenv = require("dotenv");

dotenv.config();

var connection = mongoose.createConnection(process.env.DBURI);

autoIncrement.initialize(connection);

var AppliedJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: Number,
      required: true,
    },
    candidateId: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

AppliedJobSchema.plugin(autoIncrement.plugin, "appliedJob");
var appliedJob = mongoose.model("appliedJob", AppliedJobSchema);
module.exports = appliedJob;
