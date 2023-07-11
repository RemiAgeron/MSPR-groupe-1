import router = require('express');
import searchController = require('../controllers/search.controller');
import { checkJwtToken } from "../middlewares/auth.middleware";

export const searchRoutes = router.Router();

searchRoutes.post("/", checkJwtToken, searchController.getAllByFullname);


export const searchRequest = {
  "/search": {
    post: {
      tags: ["Search"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                input: {
                  type: "string",
                  default: "John Doe"
                }
              },
              required: ["input"]
            }
          }
        }
      },
      responses: { 200: { description: "Operation Succeed" } }
    }
  },
};
