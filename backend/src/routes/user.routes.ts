import router = require('express');
import userController = require('../controllers/user.controller');
import authController = require('../controllers/auth.controller');
import { checkJwtToken } from "../middlewares/auth.middleware";

export const userRoutes = router.Router();

userRoutes.post("/login", authController.login);
userRoutes.post("/register", authController.register);
userRoutes.get("/", checkJwtToken, userController.getUsers);
userRoutes.get("/:id", checkJwtToken, userController.getUser);
userRoutes.patch("/:id", checkJwtToken, userController.updateUser);
userRoutes.delete("/:id", checkJwtToken, userController.deleteUser);
