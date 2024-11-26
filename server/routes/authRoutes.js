const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/register").post(authController.register);
authRouter.route("/getAllUsers").get(authController.getAllUsers);
module.exports = authRouter;
