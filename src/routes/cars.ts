import { Router } from "express";
import carController from "../controllers/carsController";

const router: Router = Router();

router.get("/", carController.index);
router.get("/:id", carController.show);
router.post("/", carController.insert);
router.put("/:id", carController.update);
router.delete("/:id", carController.remove);

export { router };
