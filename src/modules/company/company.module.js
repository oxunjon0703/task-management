import { Router } from "express";
import { CompanyService } from "./company.service.js";
import { CompanyController } from "./company.controller.js";
import { AuthorizationMiddleware } from "../../middleware/middlewares.js";

const router = Router();
const middleware = new AuthorizationMiddleware();

const companyService = new CompanyService();
const companyController = new CompanyController(companyService);

router.get(
  "/",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminRole,
  (req, res) => {
    companyController.getAll(req, res);
  }
);

router.get("/:id", middleware.checkToken, middleware.checkUser, (req, res) => {
  companyController.getMyId(req, res);
});

router.post(
  "/",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminRole,
  (req, res) => {
    companyController.create(req, res);
  }
);

router.put(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminRole,
  (req, res) => {
    companyController.update(req, res);
  }
);

router.delete(
  "/:id",
  middleware.checkToken,
  middleware.checkUser,
  middleware.checkSuperAdminRole,
  (req, res) => {
    companyController.delete(req, res);
  }
);

export default { router };
