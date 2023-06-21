import router = require('express');
import userController = require('../controllers/user.controller');
import authController = require('../controllers/auth.controller');
import { checkJwtToken, checkAdmin } from "../middlewares/auth.middleware";

export const userRoutes = router.Router();

userRoutes.post("/login", authController.login);
userRoutes.post("/register", authController.register);
userRoutes.get("/", checkJwtToken, checkAdmin, userController.getUsers);
userRoutes.get("/:id", checkJwtToken, userController.getUser);
// userRoutes.get("/profile/:id", checkJwtToken, userController.getUserProfile);
userRoutes.get("/profile/:id", userController.getUserProfile);
userRoutes.patch("/:id", checkJwtToken, userController.updateUser);
userRoutes.delete("/:id", checkJwtToken, userController.deleteUser);
