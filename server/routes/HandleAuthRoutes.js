import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { AuthTokenMiddleware } from "../middlewares/AuthMiddleware.js";

const HandleAuthRoutes = Router();

HandleAuthRoutes.post("/login", AuthController.login);
HandleAuthRoutes.post("/signup", AuthController.register);
HandleAuthRoutes.get(
  "/verify",
  AuthTokenMiddleware,
  AuthController.verifyToken
);
HandleAuthRoutes.get("/forgot-password", AuthController.forgotPassword);
HandleAuthRoutes.post("/reset-password", AuthController.resetPassword);
HandleAuthRoutes.get(
  "/search/:query",
  AuthTokenMiddleware,
  AuthController.SearchUser
);
HandleAuthRoutes.post("/change-password", AuthController.changePassword);
HandleAuthRoutes.put("/update", AuthTokenMiddleware, AuthController.updateUser);
HandleAuthRoutes.get("/logout", AuthController.logout);

export default HandleAuthRoutes;
