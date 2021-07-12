const job = require("../models/job");
const user = require("../models/user");

//Post Job Function
exports.createJob = async (req, res) => {
  try {
    const Job = new job(req.body);
    await Job.save();
    res.status(201).json({ msg: "Created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

//Get All Jobs Function
exports.getAllJobs = async (req, res) => {
  try {
    var jobs = await job.find({});
    res.status(200).json(jobs);
  } catch (e) {
    console.log(e.name);
    res.status(500).json({ msg: "Server Error" });
  }
};

//Get Jobs By Title Function
exports.getJobsByTitle = async (req, res) => {
  var Job = await job.find({ title: req.params.title });
  if (Job.length === 0) {
    res.status(404).send({ msg: "Not Found" });
  } else {
    res.status(200).send(Job);
  }
};

//Get Jobs By Description Function
exports.getJobsByDescription = async (req, res) => {
  var Job = await job.find({ description: req.params.description });
  if (Job.length === 0) {
    res.status(404).send({ msg: "Not Found" });
  } else {
    res.status(200).send(Job);
  }
};

//Get Jobs By Recruiter Name Function
exports.getJobsByRecName = async (req, res) => {
  var Recruiter = await user.find({ name: req.params.name });

  if (Recruiter.length === 0) {
    res.status(404).send({ msg: "Not Found" });
  } else {
    var Job = await job.find({ recruiterId: Recruiter[0]._id });
    if (Job.length === 0) {
      res.status(404).send({ msg: "Not Found" });
    } else {
      res.status(200).send(Job);
    }
  }
};
