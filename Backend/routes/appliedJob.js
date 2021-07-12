const express = require("express");
const router = express.Router();

const AppliedJobCtrl = require("../controllers/appliedJob");

//Apply particular Job Router
router.post("/", AppliedJobCtrl.applyJob);

//Get all Applied Jobs by candidate for particular Recruiter
router.get("/:recId", AppliedJobCtrl.getAppliedJobs);

module.exports = router;
