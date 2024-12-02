const Task = require("../models/task");
const User = require("../models/user");
const Subtask = require("../models/subtask");
const message = require("../models/message");

const createTask = async (req, res, next) => {
  const data = req.body;
  // console.log(data);

  // console.log("task", data);
  try {
    // const role = await User.findOne({ id: data._id }).select("role");
    // console.log("role", role);
    // if (role.role == "leader") {
    const task = await new Task({
      title: data.title,
      description: data.description,
      // status: req.body.status,
      // subtask: [
      //   {
      //     title: req.body.subtask.title,
      //     description: req.body.subtask.description,
      //     state: req.body.subtask.state,
      //     assignedTo: req.body.subtask._id,
      //   },
      // ],
    });
    await task.save();
    const id = await Task.find({ title: req.body.title }).select("_id");
    // console.log(id);
    res.status(200).json({ message: "Task was created successfully", id });
    // } else res.send({ message: "Your action is unallowed!" });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const tasks = await Task.find(
      { _id: { $ne: req.params.id } },
      { title: 1, description: 1 }
    );
    console.log(tasks);
    return res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getSubTask = async (req, res, next) => {
  const id = req.body.task_id;
  try {
    const tasks = await Subtask.find(
      { task_id: id },
      { title: 1, description: 1 }
    );
    if (tasks) {
      res.status(200).json(tasks);
    } else res.send({ message: "data is not exist!" });
  } catch (error) {
    next(error);
  }
};
const getSubTaskItem = async (req, res, next) => {
  console.log(req.params.id);

  try {
    const tasks = await Subtask.find(
      {
        assignedTo: req.params.id,
      },
      { title: 1, status: 1 }
    );
    // const tasks = await Subtask.aggregate([
    //   { $match: { assignedTo: "674ad98536a68573e2fd2a76" } },
    //   {
    //     $project: {
    //       _id: 1,
    //       title: 1,
    //       status: 1,
    //     },
    //   },
    // ]);

    console.log(tasks);

    if (tasks) {
      res.status(200).json(tasks);
    } else res.send({ message: "data is not exist!" });
  } catch (error) {
    next(error);
  }
};

const getPercent = async (req, res, next) => {
  const id = req.body.task_id;
  // console.log(id);

  try {
    const exist = await Subtask.find({ task_id: id });
    if (exist) {
      const count = await Subtask.find({ task_id: id }).count();
      const pedingCount = await Subtask.find({
        task_id: id,
        status: "pending",
      }).count();
      const in_progressCount = await Subtask.find({
        task_id: id,
        status: "in_progress",
      }).count();
      const completedCount = await Subtask.find({
        task_id: id,
        status: "completed",
      }).count();
      console.log(pedingCount);
      const pending = (pedingCount / count) * 100;
      const in_progress = (in_progressCount / count) * 100;
      const completed = (completedCount / count) * 100;
      return res
        .status(200)
        .json({ p: pending, ps: in_progress, c: completed });
    } else res.send({ message: "task is not exist!" });
  } catch (error) {
    next(error);
  }
};
const createSubtask = async (req, res, next) => {
  const data = req.body;
  // console.log("data", data);
  try {
    // const role = await User.findOne({ id: data._id }).select("role");
    // if (role.role === "leader") {
    const subtask = await new Subtask({
      task_id: data.task_id,
      title: data.value.title,
      description: data.value.description,
      assignedTo: data.value.member,
    });
    await subtask.save();
    // const id = await Task.find({ title: req.body.title }).select("_id");
    res.status(200).json({ message: "Subtask was created successfully!" });
    // } else res.send({ message: "Your action is unallowed!" });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const data = req.body;
    const stask = await Subtask.findByIdAndUpdate(data._id, {
      status: data.status,
    });
    if (stask) {
      res.status(200).json({
        message: "Your action was performed successfully",
        status: true,
      });
    } else return res.status(400).json({ message: "Your action failed!" });
  } catch (err) {
    res.send({ status: "err", message: err });
  }
};
const deleteTask = async (req, res, next) => {
  const id = req.body._id;
  try {
    await Task.findByIdAndRemove(id);
    await Subtask.findByIdAndRemove({ task_id: req.body.id });
    res.status(200).json({ message: "Removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTask,
  createSubtask,
  deleteTask,
  getSubTask,
  getPercent,
  updateTask,
  getSubTaskItem,
};
