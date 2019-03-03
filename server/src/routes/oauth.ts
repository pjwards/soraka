import express from 'express';

// API keys and Passport configuration
import passport from 'passport';
import env from '../env';

const router = express.Router();

/**
 * @swagger
 * /oauth/facebook:
 *   get:
 *     summary: Authenticate facebook.
 *     tags: [Oauth]
 */
router.get(
  '/facebook',
  passport.authenticate(
    'facebook',
    { scope: ['email', 'public_profile'] },
  ),
);

/**
 * @swagger
 * /oauth/facebook/callback:
 *   get:
 *     summary: Callback after authenticate facebook.
 *     tags: [Oauth]
 */
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

/**
 * @swagger
 * /oauth/google:
 *   get:
 *     summary: Authenticate google.
 *     tags: [Oauth]
 */
router.get(
  '/google',
  passport.authenticate(
    'google',
    { scope: ['email', 'profile'] },
  ),
);

/**
 * @swagger
 * /oauth/google/callback:
 *   get:
 *     summary: Callback after authenticate google.
 *     tags: [Oauth]
 */
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
