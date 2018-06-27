import express from 'express';
import authMiddleware from '../../middlewares/auth';

import auth from './auth';
import user from './user';

const router = express.Router();

router.use('/auth', auth);

router.use('/user', authMiddleware);
router.use('/user', user);

export default router;
