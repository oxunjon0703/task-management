import { Router } from "express";
import company from "./company/company.module.js";
import user from "./users/user.module.js";
import task from "./tasks/tasks.module.js"
import userTask from "./userTask/userTask.module.js"

const router = Router();

router.use("/company", company.router);
router.use("/user", user.router);
router.use("/task", task.router);
router.use("/userTask", userTask.router);

export default { router };
