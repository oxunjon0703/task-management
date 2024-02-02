import { Router } from "express";
import { UserTaskService } from "./userTask.service.js";
import { UserTaskController } from "./userTask.controller.js";
import { UserService } from "./../users/user.service.js";
import { TaskService } from "./../tasks/tasks.service.js";
import { AuthorizationMiddleware } from "../../middleware/middlewares.js";

const router = Router();
const middleware = new AuthorizationMiddleware();

const userTaskService = new UserTaskService();
const userService = new UserService();
const taskService = new TaskService();
const userTaskController = new UserTaskController(
  userTaskService,
  userService,
  taskService
);

router.get("/taskId/:id", (req, res) => {
  userTaskController.getByTaskId(req, res);
});

router.get("/userId/:id", (req, res) => {
  userTaskController.getByUserId(req, res);
});

router.get("/:id", (req, res) => {
  userTaskController.getOneById(req, res);
});

router.post(
  "/",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminAndManagerRole,
  (req, res) => {
    userTaskController.create(req, res);
  }
);

router.put(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminAndManagerRole,
  (req, res) => {
    userTaskController.update(req, res);
  }
);

router.delete(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminRole,
  (req, res) => {
    userTaskController.delete(req, res);
  }
);

export default { router };
