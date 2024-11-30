const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.route("/signin").post(authController.signin);
authRouter.route("/signup").post(authController.signup);
authRouter.route("/allowuser").post(authController.allowUser);
authRouter.route("/updateuser").post(authController.updateUser);
authRouter.route("/getAllUsers").post(authController.getAllUsers);
authRouter.route("/createGroup").post(authController.createGroup);
authRouter.route("/getAllGroup").get(authController.getAllGroup);
authRouter.route("/updateGroup").post(authController.updateGroup);
authRouter.route("/reportSave").post(authController.reportSave);
authRouter.route("/getReport").get(authController.getReport);
authRouter.route("/delReport/:id").delete(authController.delReport);

module.exports = authRouter;
