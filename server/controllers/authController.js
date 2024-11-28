const User = require("../models/user");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/secretkey");

const signin = async (req, res, next) => {
  try {
    const { data } = await User.findOne({
      username: req.body.username,
    });
    if (!data) {
      const passwordIsValid = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "invalid Password!" });
      } else {
        const token = await jwt.sign({ _id: data.id }, config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
        res.status(200).json({ token });
      }
    } else return res.status(404).json({ message: "User Not Found." });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res) => {
  try {
    const user = await new User({
      username: req.body.username,
      email: req.body.email,
      avartar: req.body.avartar,
      password: bcrypt.hashSync(req.body.password, 8),
      status: {
        currentStatus: req.body.currentStatus,
        currentEarning: req.body.currentEarning,
        expectedEarning: req.body.expectedEarning,
      },
      role: req.body.role,
      groupId: req.body.groupId,
      allowed: req.body.allow,
    });
    await user.save();
    res.status(200).json({
      message: "Added successfully! Wait for allowing!",
      status: true,
    });
  } catch (err) {
    console.log(err);
    if (err.code == "11000") {
      res.send("User Already Exists!");
    } else {
      res.send({ status: "err", message: err });
    }
  }
};

const allowUser = async (req, res) => {
  try {
    const data = req.body;
    const group = await user.find({ groupId: data.groupId });
    const suser = await group.findByIdAndUpdate(data._id, {
      allowed: data.allowed,
    });
    if (suser) {
      res.status(200).json({
        message: "Your action was performed successfully",
        status: true,
      });
    } else return res.status(400).json({ message: "Your action failed!" });
  } catch (err) {
    res.send({ status: "err", message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { data } = req.body;
    const suser = User.findByIdAndUpdate(data._id, {
      status: {
        currentStatus: req.body.currentStatus,
        currentEarning: req.body.currentEarning,
        expectedEarning: req.body.expectedEarning,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "username",
      "avatar",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signin,
  allowUser,
  signup,
  updateUser,
  getAllUsers,
};
