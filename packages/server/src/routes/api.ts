import express from 'express';

// Controllers (route handlers)
import * as apiController from '../controllers/api';


// API keys and Passport configuration
import * as passportConfig from '../config/passport';

const router = express.Router();

router.get('/', apiController.getApi);
router.get('/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

export default router;