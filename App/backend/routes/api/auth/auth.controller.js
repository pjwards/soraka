import jwt from 'jsonwebtoken';
import User from '../../../models/user';
import {
  UserService,
} from '../../../serivces/user';

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
export function register(req, res) {
  const {
    username,
    password
  } = req.body;

  // respond to the client
  const respond = (user) => {
    res.json({
      message: 'registered successfully',
      admin: user.admin ? true : false
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(409).json({
      message: error.message
    });
  };

  // check username duplication
  UserService.create(username, password)
    .then(respond)
    .catch(onError);
}

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/
export function login(req, res) {
  const {
    username,
    password
  } = req.body;
  const secret = req.app.get('jwt-secret');

  // check the user info & generate the jwt
  const check = (user) => {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign({
              _id: user._id,
              username: user.username,
              admin: user.admin
            },
            secret, {
              expiresIn: '7d',
              issuer: 'samplae.com',
              subject: 'userInfo'
            }, (err, token) => {
              if (err) reject(err);
              resolve(token);
            })
        })
        return p;
      } else {
        throw new Error('login failed');
      }
    }
  };

  // respond the token 
  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token
    });
  };

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: error.message
    });
  };

  // find the user
  User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError);
}

/*
    GET /api/auth/check
*/

export function check(req, res) {
  res.json({
    success: true,
    info: req.decoded
  });
}