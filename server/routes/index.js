const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
const taskRouter = require("./taskRoutes");
const userRouter = require("./userRoutes");
router.use("/auth", authRouter);
router.use("/task", taskRouter);
router.use("/user", userRouter);



module.exports = router;
