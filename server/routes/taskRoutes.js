const express = require("express");
const taskManagement = require("../controllers/taskManagement");
const taskRouter = express.Router();
const passport = require("passport");

taskRouter
  .route("/create")
  .post(
    passport.authenticate("jwt", { session: false }),
    taskManagement.createTask
  );
taskRouter
  .route("/createSubtask")
  .post(
    passport.authenticate("jwt", { session: false }),
    taskManagement.createSubtask
  );
taskRouter
  .route("/getTask")
  .get(
    passport.authenticate("jwt", { session: false }),
    taskManagement.getTask
  );
taskRouter
  .route("/deleteTask")
  .post(
    passport.authenticate("jwt", { session: false }),
    taskManagement.deleteTask
  );
taskRouter
  .route("/getSubtask")
  .post(
    passport.authenticate("jwt", { session: false }),
    taskManagement.getSubTask
  );
taskRouter
  .route("/updateTask")
  .post(
    passport.authenticate("jwt", { session: false }),
    taskManagement.updateTask
  );
taskRouter
  .route("/getPercent")
  .post(
    passport.authenticate("jwt", { session: false }),
    taskManagement.getPercent
  );
taskRouter.route("/getAllSubtask/:id").get(
  // passport.authenticate("jwt", { session: false }),
  taskManagement.getSubTaskItem
);

// taskRouter
//   .route("/divide")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     taskManagement.createSubtask
//   );
taskRouter.route("/get").post(
  // passport.authenticate("jwt", { session: false }),
  taskManagement.getTask
);
// taskRouter
//   .route("/update")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     taskManagement.updateTasks
//   );
// taskRouter
//   .route("/delete/:id")
//   .delete(
//     passport.authenticate("jwt", { session: false }),
//     taskManagement.deleteTask
// );

module.exports = taskRouter;
