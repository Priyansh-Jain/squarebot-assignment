const user = require("../models/user");

// Register/Signup Function
exports.registerUser = async (req, res) => {
  console.log(req.body);

  try {
    var { email, password } = req.body;
    var User = await user.findOne({ email: email });

    if (!User) {
      User = new user(req.body);

      await User.save((err, userResponse) => {
        console.log(userResponse);
        res.status(200).json({
          id: userResponse._id,
          name: userResponse.name,
          email: userResponse.email,
        });
      });
    } else {
      res.status(409).json({ msg: "Conflict" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

// Login Function
exports.loginUser = async (req, res) => {
  try {
    var { email, password } = req.body;
    var User = await user.findOne({ email: email });
    if (!User) {
      res.status(404).json({ msg: "Not Found" });
    } else {
      if (User.password === password) {
        res
          .status(200)
          .json({ id: User.id, name: User.name, email: User.email });
      } else {
        res.status(401).json({ msg: "Unauthorized" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e });
  }
};

exports.logoutUser = async (req, res) => {
  res.json({ msg: "Success" });
};
