const express = require("express");
const router = express.Router();

const JobCtrl = require("../controllers/job");

//Job Posting Router
router.post("/", JobCtrl.createJob);

//Get all Jobs Router
router.get("/", JobCtrl.getAllJobs);

//Get Job By Title Router
router.get("/title/:title", JobCtrl.getJobsByTitle);

//Get Job by Description Router
router.get("/description/:description", JobCtrl.getJobsByDescription);

//Get Job by Name Router
router.get("/name/:name", JobCtrl.getJobsByRecName);

module.exports = router;
