const User = require("../models/user");
const moment = require("moment");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = password == user.password;
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }

};

const register = async (req, res) => {
  try {
    const user = await new User({
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.status(200).json({ message: "added!", status: true });
  } catch (err) {
    console.log(err);
    if (err.code == "11000") {
      res.send("User Already Exists!");
    } else {
      res.send({ status: "err", message: err });
    }
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "username",
      "avatarImage",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  register,
  getAllUsers,
};
