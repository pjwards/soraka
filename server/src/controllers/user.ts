import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import {
  default as User,
  UserModel,
} from '../models/User';
import { PASSWORD_SIZE } from '../types/const/auth';
import {
  AuthToken,
  UserInterface,
} from '../types/domain/inteface/user';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Sign in using email and password.
 *     tags: [User]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email to login.
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: password
 *         description: Password to login.
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: errors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/GeneralError'
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(500).json({
      errors,
    });
  }

  passport.authenticate('local', (err: Error, user: UserModel, info: IVerifyOptions) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(500).json({
        errors: [
          { msg: info.message },
        ],
      });
    }
    req.logIn(user, (e1: any) => {
      if (e1) {
        return next(e1);
      }

      const userJson: UserInterface = {
        email: user.email,
      };

      res.status(200).json(userJson);
    });
  })(req, res, next);
};

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: message
 *         schema:
 *           $ref: '#/definitions/GeneralError'
 */
export const logout = (req: Request, res: Response) => {
  req.logout();
  res.status(200).json({
    msg: 'Success! You are logged out.',
  });
};

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new local account.
 *     tags: [User]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email to create.
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: password
 *         description: Password to create.
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: errors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/GeneralError'
 */
export const signup = (req: Request, res: Response, next: NextFunction) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', `Password must be at least ${PASSWORD_SIZE} characters long`).len({ min: PASSWORD_SIZE });
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(500).json({
      errors,
    });
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(500).json({
        errors: [
          {
            location: 'create',
            param: 'duplication',
            msg: 'Account with that email address already exists.',
          },
        ],
      });
    }
    user.save((e1: any) => {
      if (e1) {
        return res.status(500).json({
          errors: [
            {
              location: 'create',
              param: 'error',
              msg: 'Account creating is failed.',
            },
          ],
        });
      }
      req.logIn(user, (e2: any) => {
        if (e2) {
          return res.status(500).json({
            errors: [
              {
                location: 'create',
                param: 'error',
                msg: 'Account creating is failed.',
              },
            ],
          });
        }
        return res.status(200).json({
          msg: 'Success! You are signed up.',
        });
      });
    });
  });
};

/**
 * @swagger
 * /account:
 *   get:
 *     summary: Profile page.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: errors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/GeneralError'
 */
export const getAccount = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(500).json({
      errors: [
        {
          location: 'account',
          param: 'error',
          msg: 'Account is not logged in.',
        },
      ],
    });
  }

  const userJson: UserInterface = {
    email: req.user.email,
    profile: req.user.profile,
  };

  res.status(200).json(userJson);
};

/**
 * POST /account/profile
 * Update profile information.
 */
export let postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  if (!req.user) {
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user: UserModel) => {
    if (err) {
      return next(err);
    }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((e: WriteError) => {
      if (e) {
        if (e.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(e);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
export let postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
  req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  if (!req.user) {
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err: any, user: UserModel) => {
    if (err) {
      return next(err);
    }
    user.password = req.body.password;
    user.save((e: WriteError) => {
      if (e) {
        return next(e);
      }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export let postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect('/');
  }

  User.remove({ _id: req.user.id }, (err: any) => {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
export let getOauthUnlink = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.params.provider;

  if (!req.user) {
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user: any) => {
    if (err) {
      return next(err);
    }
    user[provider] = undefined;
    user.tokens = user.tokens.filter((token: AuthToken) => token.kind !== provider);
    user.save((e: WriteError) => {
      if (e) {
        return next(e);
      }
      req.flash('info', { msg: `${provider} account has been unlinked.` });
      res.redirect('/account');
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
export let getReset = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        return res.redirect('/forgot');
      }
      res.render('account/reset', {
        title: 'Password Reset',
      });
    });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export let postReset = (req: Request, res: Response, next: NextFunction) => {
  req.assert('password', 'Password must be at least 4 characters long.').len({ min: 4 });
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  async.waterfall([
    function resetPassword(done: CallbackFunctionVariadic) {
      User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err: any, user: any) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
            return res.redirect('back');
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save((e1: WriteError) => {
            if (e1) {
              return next(e1);
            }
            req.logIn(user, (e2) => {
              done(e2, user);
            });
          });
        });
    },
    function sendResetPasswordEmail(user: UserModel, done: CallbackFunctionVariadic) {
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
      const mailOptions = {
        to: user.email,
        from: 'express-ts@starter.com',
        subject: 'Your password has been changed',
        text: `Hello,\n\nThis is a confirmation that the password
         for your account ${user.email} has just been changed.\n`,
      };
      transporter.sendMail(mailOptions, (err) => {
        req.flash('success', { msg: 'Success! Your password has been changed.' });
        done(err);
      });
    },
  ], (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

/**
 * GET /forgot
 * Forgot Password page.
 */
export let getForgot = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Forgot Password',
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export let postForgot = (req: Request, res: Response, next: NextFunction) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([
    function createRandomToken(done: CallbackFunctionVariadic) {
      crypto.randomBytes(16, (err, buf) => {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    function setRandomToken(token: AuthToken, done: CallbackFunctionVariadic) {
      User.findOne({ email: req.body.email }, (err, user: any) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          req.flash('errors', { msg: 'Account with that email address does not exist.' });
          return res.redirect('/forgot');
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user.save((e: WriteError) => {
          done(e, token, user);
        });
      });
    },
    function sendForgotPasswordEmail(token: AuthToken, user: UserModel, done: CallbackFunctionVariadic) {
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
      const mailOptions = {
        to: user.email,
        from: 'hackathon@starter.com',
        subject: 'Reset your password on Hackathon Starter',
        text: `You are receiving this email because you (or someone else) have requested
         the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
      transporter.sendMail(mailOptions, (err) => {
        req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
        done(err);
      });
    },
  ], (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/forgot');
  });
};
