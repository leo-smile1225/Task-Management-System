const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
const taskRouter = require("./taskRoutes");
router.use("/auth", authRouter);
router.use("/task", taskRouter);

module.exports = router;
