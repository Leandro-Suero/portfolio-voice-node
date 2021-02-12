import { authJwt } from "../middlewares";
import { Router } from "express";
const router = Router();

import * as triggersCtrl from "../controllers/triggers.controller";

router.get("/", authJwt.verifyToken, triggersCtrl.getTriggers);

router.get("/user/:userId", authJwt.verifyToken, triggersCtrl.getUserTriggers);

router.get("/:triggerId", authJwt.verifyToken, triggersCtrl.getTriggerById);

router.post("/", [authJwt.verifyToken], triggersCtrl.createTrigger);

router.put(
  "/:triggerId",
  [authJwt.verifyToken],
  triggersCtrl.updateTriggerById
);

router.delete(
  "/:triggerId",
  [authJwt.verifyToken],
  triggersCtrl.deleteTriggerById
);

export default router;
