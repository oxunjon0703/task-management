import { Router } from "express";
import { TaskService } from "./tasks.service.js";
import { TaskController } from "./tasks.controller.js";
import { AuthorizationMiddleware } from "../../middleware/middlewares.js";
import { CompanyService } from "../company/company.service.js";
import { UserTaskService } from "../userTask/userTask.service.js";

const router = Router();
const middleware = new AuthorizationMiddleware();

const taskService = new TaskService();
const companyService = new CompanyService();
const userTaskService = new UserTaskService()
const taskController = new TaskController(taskService, companyService, userTaskService);

router.get(
  "/getByCompanyId",
  middleware.checkToken,
  middleware.checkUser,
  (req, res) => {
    taskController.getByCompanyId(req, res);
  }
);

router.get(
  "/getOneById/:id",
  middleware.checkToken,
  middleware.checkUser,
  (req, res) => {
    taskController.getOneById(req, res);
  }
);

router.post(
  "/",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminAndManagerRole,
  (req, res) => {
    taskController.create(req, res);
  }
);
router.put(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminAndManagerRole,
  (req, res) => {
    taskController.update(req, res);
  }
);

router.delete(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminRole,
  (req, res) => {
    taskController.delete(req, res);
  }
);

export default { router };
