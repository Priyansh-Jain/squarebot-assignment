const job = require("../models/job");
const user = require("../models/user");
const appliedJob = require("../models/appliedJob");

//Apply a new job function
exports.applyJob = async (req, res) => {
  try {
    var AppliedJob = new appliedJob(req.body);
    await AppliedJob.save();
    res.status(201).json({ msg: "Successfully Applied" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

//Get applied jobs function
exports.getAppliedJobs = async (req, res) => {
  var JobsIdArray = [];
  var CandidateIdArray = [];
  var ansArray = [];
  const JobMap = new Map();
  const CandidateMap = new Map();

  var jobs = await job.find({ recruiterId: req.params.recId });

  jobs.map((response) => {
    JobsIdArray.push(response._id);
    JobMap.set(response._id, response);
  });

  var appliedJobs = await appliedJob.find({ jobId: { $in: JobsIdArray } });

  if (!appliedJobs) {
    res.status(404).send({ msg: "Not Found" });
  } else {
    appliedJobs.map((response) => {
      CandidateIdArray.push(response.candidateId);
    });

    var candidates = await user.find({ _id: { $in: CandidateIdArray } });

    candidates.map((response) => {
      CandidateMap.set(response._id, response.name);
    });

    appliedJobs.map((response) => {
      var appjobs = {
        jobName: JobMap.get(response.jobId).title,
        jobDescription: JobMap.get(response.jobId).description,
        candidateName: CandidateMap.get(response.candidateId),
      };
      ansArray.push(appjobs);
    });

    res.status(200).json(ansArray);
  }
};
