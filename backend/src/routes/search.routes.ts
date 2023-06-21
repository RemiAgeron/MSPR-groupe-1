import router = require('express');
import searchController = require('../controllers/search.controller');
// import { checkJwtToken } from "../middlewares/auth.middleware";

export const searchRoutes = router.Router();

// searchRoutes.post("/", checkJwtToken, searchController.getAllByFullname);
searchRoutes.post("/", searchController.getAllByFullname);
