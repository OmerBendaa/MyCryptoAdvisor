import { Router} from "express";
import userController from "../controllers/usersController.ts";

const router = Router();
router
  .post("/", userController.createUser) 
  .post("/login", userController.login)
  .get("/email", userController.getUserByEmail) 

export default router;
