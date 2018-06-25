import express from 'express';
import {
  register,
  login,
  check,
} from './auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check', check);

export default router;