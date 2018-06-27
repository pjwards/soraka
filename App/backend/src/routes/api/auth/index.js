import express from 'express';
import {
  register,
  login,
  check,
} from './auth.controller';
import authMiddleware from '../../../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.use('/check', authMiddleware);
router.get('/check', check);

export default router;
