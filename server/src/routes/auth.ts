import express from 'express';

// Controllers (route handlers)
import * as userController from '../controllers/user';

// API keys and Passport configuration
import * as passportConfig from '../config/passport';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Models
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         description: Email
 *       password:
 *         type: string
 *         description: Password
 */
/**
 * @swagger
 * /login:
 *   get:
 *     summary: Sign in using email and password.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *            $ref: '#/definitions/User'
 */
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/forgot', userController.getForgot);
router.post('/forgot', userController.postForgot);
router.get('/reset/:token', userController.getReset);
router.post('/reset/:token', userController.postReset);
router.post('/signup', userController.signup);
router.get('/account', passportConfig.isAuthenticated, userController.getAccount);

router.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
router.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
router.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
router.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

export default router;
