import { service } from "@core/users/dependency_injection";
import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const controller = new UserController(service);

router.get("/", controller.getAll);
router.get("/:id", controller.get);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
