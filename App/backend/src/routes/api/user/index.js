import express from 'express';
import {
  list,
  assignAdmin,
} from './user.controller';

const router = express.Router();

router.get('/list', list);
router.post('/assign-admin/:username', assignAdmin);

export default router;
