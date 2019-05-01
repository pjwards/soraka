import express from 'express';

// Controllers (route handlers)
import * as setController from '../controllers/set';

// API keys and Passport configuration
import * as passportConfig from '../config/passport';

const router = express.Router();

router.post('/', passportConfig.isAuthenticated, setController.createSet);
router.get('/', setController.readSet);

export default router;
