import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const HandleAuthRoutes = Router();

HandleAuthRoutes.post("/login", AuthController.login);
HandleAuthRoutes.post("/register", AuthController.register);
HandleAuthRoutes.get("/forgot-password", AuthController.forgotPassword);
HandleAuthRoutes.post("/reset-password", AuthController.resetPassword);
HandleAuthRoutes.post("/change-password", AuthController.changePassword);

export default HandleAuthRoutes;
