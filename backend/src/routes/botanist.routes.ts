import router = require('express');
import botanistController = require('../controllers/botanist.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const botanistRoutes = router.Router();

botanistRoutes.get('/', botanistController.getBotanists);
botanistRoutes.get('/:id', checkJwtToken, botanistController.getBotanist);
botanistRoutes.get(
  '/user/:id',
  checkJwtToken,
  botanistController.getBotanistByUser,
);
botanistRoutes.post('/', checkJwtToken, botanistController.createBotanist);
botanistRoutes.patch('/:id', checkJwtToken, botanistController.updateBotanist);
botanistRoutes.delete('/:id', checkJwtToken, botanistController.deleteBotanist);
