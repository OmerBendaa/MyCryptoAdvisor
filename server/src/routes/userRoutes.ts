import { Router} from "express";
import userController from "../controllers/usersController.ts";

const router = Router();
router
  .post("/", userController.createUser) 
  .post("/login", userController.login)
  .put("/userPreferences", userController.updateUserPreferences)
  .get("/email", userController.getOmittedUserByEmail) 

export default router;
