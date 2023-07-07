import router = require('express');
import userController = require('../controllers/user.controller');
import authController = require('../controllers/auth.controller');
import { checkJwtToken, checkAdmin } from "../middlewares/auth.middleware";

export const userRoutes = router.Router();

userRoutes.post("/login", authController.login);
userRoutes.post("/register", authController.register);
userRoutes.get("/", checkJwtToken, checkAdmin, userController.getUsers);
userRoutes.get("/:id", userController.getUser);
userRoutes.get("/profile/:id", checkJwtToken, userController.getUserProfile);
userRoutes.patch("/:id", checkJwtToken, userController.updateUser);
userRoutes.delete("/:id", checkJwtToken, userController.deleteUser);


export const userRequest = {
  "/user/login": {
    post: {
      tags: ["User"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email"
                },
                password: {
                  type: "string",
                  default: ""
                }
              },
              required: ["email", "password"]
            }
          }
        }
      },
      responses: { 200: { description: "Operation succeed" } }
    }
  },
  "/user/register": {
    post: {
      tags: ["User"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstname: {
                  type: "string",
                  default: "John"
                },
                lastname: {
                  type: "string",
                  default: "Doe"
                },
                email: {
                  type: "string",
                  format: "email"
                },
                password: {
                  type: "string",
                  default: "+33123456789"
                },
                phone: {
                  type: "string",
                  format: "phone"
                },
                isAdmin: {
                  type: "boolean",
                  default: false
                }
              },
              required: ["firstname", "lastname", "email", "password"]
            }
          }
        }
      },
      responses: { 201: { description: "Created" } }
    }
  },
  "/user": {
    get: {
      tags: ["User"],
      responses: { 200: { description: "Operation succeed" } }
    },
  },
  "/user/{id}": {
    get: {
      tags: ["User"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    },
    patch: {
      tags: ["User"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstname: {
                  type: "string",
                  default: "John"
                },
                lastname: {
                  type: "string",
                  default: "Doe"
                },
                email: {
                  type: "string",
                  format: "email"
                },
                password: {
                  type: "string",
                  default: ""
                },
                phone: {
                  type: "string",
                  format: "phone"
                },
                description: {
                  type: "string",
                  default: ""
                },
                user_picture: {
                  type: "string",
                  default: ""
                }
              },
              required: ["firstname", "lastname", "email", "password", "description", "user_picture"]
            }
          }
        }
      },
      responses: { 200: { description: "Operation succeed" } }
    },
    delete: {
      tags: ["User"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    }
  },
  "/profile/{id}": {
    get: {
      tags: ["User"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    }
  },
};
