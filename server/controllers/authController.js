const User = require("../models/user");
const Group = require("../models/group");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/secretkey");
const Report = require("../models/report");

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

    const data = await User.findOne({ email: req.body.email });
    console.log(data);

    if (data) {
      return res
        .status(400)
        .json({ status: false, message: "User Already Exists!" });
    }
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
    await User.findByIdAndUpdate(data._id, {
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
    if (req.body.type == "mng") {
      const users = await User.find({ _id: { $ne: req.params.id } });
      return res.json(users);
    } else {
      const users = await User.aggregate([
        {
          $project: {
            email: 1,
            username: 1,
            allowed: 1,
          },
        },
      ]);
      return res.json(users);
    }
  } catch (error) {
    next(error);
  }
};
const createGroup = async (req, res, next) => {
  try {
    const id = req.body.id;
    console.log(id, req.body.groupName);

    const re = await Group.aggregate([
      {
        $match: {
          name: req.body.groupName,
        },
      },
    ]);
    console.log(re);

    if (re.length >= 1)
      return res.send({ status: false, message: "Already exist" });
    const newGroup = new Group({
      name: req.body.groupName,
      leaderId: id,
      members: id,
    });
    await newGroup.save();
    return res.send({ status: true, message: "create group" });
  } catch (err) {}
};
const updateGroup = async (req, res, next) => {
  try {
    const d = await User.aggregate([
      {
        $match: {
          _id: req.body.id,
        },
      },
      {
        $lookup: {
          from: "group",
          localField: "_id",
          foreignField: "groupId",
        },
      },
    ]);
    console.log(d);
  } catch (e) {}
};
const getAllGroup = async (req, res, next) => {
  try {
    // const users = await User.find({ _id: { $ne: req.params.id } });
    const group = await Group.aggregate([
      {
        $project: {
          name: 1,
        },
      },
    ]);
    console.log(group);

    return res.json(group);
  } catch (error) {
    next(error);
  }
};

const reportSave = async (req, res, next) => {
  try {
    const newReport = new Report({
      text: req.body.text,
      members: req.body.id,
    });
    console.log(req.body.id);

    await newReport.save();
    return res.send({ status: true, message: "Successul save!" });
  } catch (err) {}
};

const getReport = async (req, res, next) => {
  try {
    const relist = await Report.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $project: {
          text: 1,
          name: "$userDetails.username", // This will create an array of names
        },
      },
    ]);
    console.log(relist);

    return res.json(relist);
  } catch (error) {
    next(error);
  }
};
const delReport = async (req, res) => {
  const reportId = req.params.id;

  try {
    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res
      .status(200)
      .json({ message: "Report deleted successfully", deletedReport });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  signin,
  allowUser,
  signup,
  updateUser,
  getAllUsers,
  createGroup,
  getAllGroup,
  updateGroup,
  reportSave,
  getReport,
  delReport,
};
