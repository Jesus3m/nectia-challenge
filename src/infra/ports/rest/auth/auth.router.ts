import { authService } from "@core/auth/dependency_injection";
import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const controller = new AuthController(authService);

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/me", controller.me);

export default router;
