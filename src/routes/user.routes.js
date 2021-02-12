import { authJwt } from "../middlewares";
import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";

router.post("/", [authJwt.verifyToken], usersCtrl.createUser);

router.get("/", [authJwt.verifyToken], usersCtrl.getUsers);

router.get("/:userId", [authJwt.verifyToken], usersCtrl.getUserById);

router.delete("/:userId", [authJwt.verifyToken], usersCtrl.deleteUserById);

export default router;
