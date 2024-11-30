const User = require("../models/user");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/secretkey");

const signin = async (req, res, next) => {
  try {
    // console.log("password", req.body);
    const data = await User.findOne({
      email: req.body.email,
    });
    console.log("data", data);
    if (data && data.allowed) {
      // console.log("user", data.allowed);
      const passwordIsValid = await bcrypt.compareSync(
        req.body.password,
        data.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "invalid Password!" });
      } else {
        const toke = await jwt.sign(
          {
            _id: data.id,
            email: data.email,
            username: data.username,
            role: data.role,
            status: {
              currentStatus: data.status.currentStatus,
              currentEarning: data.status.currentEarning,
              expectedEarning: data.status.expectedEarning,
            },
          },
          config.secret,
          {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          }
        );
        const token = "Bearer " + toke;
        res.status(200).json({ token });
      }
    } else
      res.send({ message: "Sign up again! or You have not been allowed yet!" });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res) => {
  try {
    console.log(req.body);

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
      return res.send({ status: false, message: err });
    }
  }
};

const allowUser = async (req, res) => {
  try {
    const data = req.body;
    const group = await user.find({ groupId: data.groupId });
    const suser = await User.findByIdAndUpdate(data._id, {
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

const updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log("requset", data);
    // console;
    const suser = await User.findByIdAndUpdate(data._id, {
      status: {
        currentStatus: req.body.status.currentStatus,
        currentEarning: req.body.status.currentEarning,
        expectedEarning: req.body.status.expectedEarning,
      },
    });
    res.status(200).json({ message: "updated successfully!" });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } });
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
