const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.route("/signin").post(authController.signin);
authRouter.route("/signup").post(authController.signup);
authRouter.route("/allowuser").post(authController.allowUser);
authRouter.route("/updateuser").post(authController.updateUser);
authRouter.route("/getAllUsers").get(authController.getAllUsers);
module.exports = authRouter;
