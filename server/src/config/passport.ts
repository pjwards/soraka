import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import _ from 'lodash';
import { default as User } from '../models/User';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import passportGoogle from 'passport-google-oauth20';
import env from '../env';

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser<any, any>((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (e: Error, isMatch: boolean) => {
      if (e) {
        return done(e);
      }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: 'Invalid email or password.' });
    });
  });
}));


/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */


/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID as string,
  clientSecret: process.env.FACEBOOK_SECRET as string,
  callbackURL: '/oauth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req: any, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) {
        return done(err);
      }
      if (existingUser) {
        req.flash(
          'errors',
          {
            msg: 'There is already a Facebook account that belongs to you.' +
              ' Sign in with that account or delete it, then link it with your current account.',
          },
        );
        done(err);
      } else {
        User.findById(req.user.id, (e1: any, user: any) => {
          if (e1) {
            return done(e1);
          }
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = user.profile.name ||
            `${profile.name && profile.name.givenName} ${profile.name && profile.name.familyName}`;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.save((e2: any) => {
            req.flash('info', { msg: 'Facebook account has been linked.' });
            done(e2, user);
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, (err: any, existingUser) => {
      if (err) {
        return done(err);
      }
      if (existingUser) {
        return done(undefined, existingUser);
      }
      User.findOne({ email: profile._json.email }, (e1: any, existingEmailUser) => {
        if (e1) {
          return done(e1);
        }
        if (existingEmailUser) {
          req.flash(
            'errors',
            {
              msg: 'There is already an account using this email address. ' +
                'Sign in to that account and link it with Facebook manually from Account Settings.',
            },
          );
          done(e1);
        } else {
          const user: any = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = `${profile.name && profile.name.givenName} ${profile.name && profile.name.familyName}`;
          user.profile.gender = profile._json.gender;
          user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save((e2: Error) => {
            done(e2, user);
          });
        }
      });
    });
  }
}));

/**
 * Sign in with Facebook.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
  callbackURL: '/oauth/google/callback',
}, (accessToken: string, refreshToken: any, profile: any, done: any) => {
  console.log(profile);
  User.findOne({ google: profile.id }, (err: any, existingUser: any) => {
    if (err) {
      return done(err);
    }
    if (existingUser) {
      return done(undefined, existingUser);
    }
    User.findOne({ email: profile.emails[0].value }, (e1: any, existingEmailUser: any) => {
      if (e1) {
        return done(e1);
      }
      if (existingEmailUser) {
        done(e1);
        throw new Error(
          'There is already an account using this email address. ' +
          'Sign in to that account and link it with Google manually from Account Settings.',
        );
      } else {
        const user: any = new User();
        user.email = profile.emails[0].value;
        user.google = profile.id;
        user.tokens.push({ kind: 'google', accessToken });
        user.profile.name = `${profile.name && profile.name.givenName} ${profile.name && profile.name.familyName}`;
        user.profile.gender = profile.gender;
        user.profile.picture = Array.isArray(profile.photos) ? profile.photos[0].value : undefined;
        user.profile.location = (profile._json.language) ? profile._json.language : '';
        user.save((e2: any) => {
          done(e2, user);
        });
      }
    });
  });
}));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(env.CLIENT + '/login');
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (req.user && _.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/oauth/${provider}`);
  }
};
