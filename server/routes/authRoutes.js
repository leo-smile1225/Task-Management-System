const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();
const passport = require("passport");

authRouter.route("/signin").post(authController.signin);
authRouter.route("/signup").post(authController.signup);
authRouter.route("/allowuser").post(authController.allowUser);
authRouter.route("/updateuser").post(authController.updateUser);
authRouter
  .route("/getAllUsers")
  .post(
    passport.authenticate("jwt", { session: false }),
    authController.getAllUsers
  );
authRouter.route("/createGroup").post(authController.createGroup);
authRouter
  .route("/getAllGroup")
  .post(
    passport.authenticate("jwt", { session: false }),
    authController.getAllGroup
  );
authRouter.route("/updateGroup").post(authController.updateGroup);
authRouter.route("/reportSave").post(authController.reportSave);
authRouter.route("/getReport").get(authController.getReport);
authRouter.route("/delReport/:id").delete(authController.delReport);
authRouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      username: req.user.username,
      email: req.user.email,
    });
  }
);
module.exports = authRouter;
