import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { AuthorizationMiddleware } from "../../middleware/middlewares.js";
import { CompanyService } from "./../company/company.service.js";
import { UserTaskService } from "./../userTask/userTask.service.js";

const router = Router();
const middleware = new AuthorizationMiddleware();

const userService = new UserService();
const companyService = new CompanyService();
const userTaskService = new UserTaskService()
const userController = new UserController(userService, companyService, userTaskService);

router.get(
  "/getAll",
  middleware.checkToken,
  middleware.checkUser,
  (req, res) => {
    userController.getAll(req, res);
  }
);

router.get("/:id", middleware.checkToken, middleware.checkUser, (req, res) => {
  userController.getById(req, res);
});

router.post(
  "/register",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminRole,
  (req, res) => {
    userController.register(req, res);
  }
);

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.put(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminRole,
  (req, res) => {
    userController.update(req, res);
  }
);

router.delete(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminAndAdminRole,
  (req, res) => {
    userController.delete(req, res);
  }
);

export default { router };
