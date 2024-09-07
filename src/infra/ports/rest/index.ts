import auth from "@common/middlewares/auth";
import { Router } from "express";
import authRouter from "./auth/auth.router";
import taskRouter from "./task/task.router";
import userRouter from "./user/user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", [auth.execute], userRouter);
router.use("/task", [auth.execute], taskRouter);

export default router;
