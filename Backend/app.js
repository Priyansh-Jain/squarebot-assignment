const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const appliedJobRoutes = require("./routes/appliedJob");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8081;

//Database
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));

// include routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/appliedjobs", appliedJobRoutes);

app.listen(port, () => {
  console.log(`Backend Server running on port ${port} ...`);
});
