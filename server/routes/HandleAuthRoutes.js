import { Router } from "express";
import AuthController  from "../controllers/AuthController.js";
import middleware from "../middlewares/AuthMiddleware.js";

const HandleAuthRoutes = Router();
HandleAuthRoutes.get("/test",(req, res) => {
    res.send({
        message: "Server is up and running",
        status: "success",
    })
});
HandleAuthRoutes.post("/login", AuthController.login);
HandleAuthRoutes.post("/register", AuthController.register);
HandleAuthRoutes.post("/forgot-password", AuthController.forgotPassword);
HandleAuthRoutes.post("/reset-password", AuthController.resetPassword);
HandleAuthRoutes.post("/change-password", AuthController.changePassword);

// HandleAuthRoutes.post("/change-password", AuthMiddleware, AuthController.changePassword);

export default HandleAuthRoutes;
