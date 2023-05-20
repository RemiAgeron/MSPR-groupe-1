import router = require('express');
import userController = require('../controllers/user.controller');
// import { authentificateToken, checkAdmin } from "../middleware/auth.middleware";

export const userRoutes = router.Router();

userRoutes.post("/login", authController.login);
userRoutes.post("/register", checkAdmin, userController.createUser);
userRoutes.get("/", checkAdmin, userController.getUsers);
userRoutes.get("/:id", authentificateToken, userController.getUser);
userRoutes.patch("/:id", authentificateToken, userController.updateUser);
userRoutes.delete("/:id", checkAdmin, userController.deleteUser);
