var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
const dotenv = require("dotenv");

dotenv.config();

var connection = mongoose.createConnection(process.env.DBURI);

autoIncrement.initialize(connection);

var JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recruiterId: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

JobSchema.plugin(autoIncrement.plugin, "job");
var job = mongoose.model("job", JobSchema);
module.exports = job;

// User
// Id
// nname
// email
// pass

// Job
// Id
// title
// description
// Recruiter Id

// Applied Job
// Id
// JobId
// CandidateId

// search on Job table(recruiter id) -> list<Job> , Map(job id, JOB)
// -> search on Applied job( list<job id>) -> List<applied job>
// -> search on User (list<candidate id>), Map(user id, User)
