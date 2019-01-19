import express from 'express';

// API keys and Passport configuration
import passport from 'passport';
import env from '../env';

const router = express.Router();

router.get(
  '/facebook',
  passport.authenticate(
    'facebook',
    { scope: ['email', 'public_profile'] },
  ),
);
router.get(
  '/facebook/callback',
  passport.authenticate(
    'facebook',
    { failureRedirect: env.CLIENT + '/login' },
  ),
  (req, res) => {
    res.redirect(env.CLIENT);
  },
);

router.get(
  '/google',
  passport.authenticate(
    'google',
    { scope: ['email', 'profile'] },
  ),
);
router.get(
  '/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: env.CLIENT + '/login' },
  ),
  (req, res) => {
    res.redirect(env.CLIENT);
  },
);

export default router;
