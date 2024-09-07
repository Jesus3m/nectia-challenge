import { isOwner, service } from "@core/task/dependency_injection";
import { Router } from "express";
import { TaskController } from "./task.controller";

const router = Router();
const controller = new TaskController(service);

router.get("/", controller.getAll);
router.get("/:id", [isOwner.execute], controller.get);
router.post("/", controller.create);
router.put("/:id", [isOwner.execute], controller.update);
router.delete("/:id", [isOwner.execute], controller.delete);

export default router;
