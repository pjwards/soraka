import jwt from 'jsonwebtoken';
import UserService from '../../../serivces/user';

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
    password,
  } = req.body;

  // respond to the client
  const respond = (user) => {
    res.json({
      message: 'registered successfully',
      admin: !!user.admin,
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(409).json({
      message: error.message,
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
    password,
  } = req.body;
  const secret = req.app.get('jwt-secret');

  // check the user info & generate the jwt
  const verify = (user) => {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          const payload = {
            _id: user._id,
            username: user.username,
            admin: user.admin,
          };
          const options = {
            expiresIn: '7d',
            issuer: 'samplae.com',
            subject: 'userInfo',
          };
          const callback = (err, token) => {
            if (err) reject(err);
            resolve(token);
          };
          jwt.sign(payload, secret, options, callback);
        });
        return p;
      }
      throw new Error('login failed');
    }
  };

  // respond the token
  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token,
    });
  };

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };

  // find the user
  UserService.findOneByUsername(username)
    .then(verify)
    .then(respond)
    .catch(onError);
}

/*
    GET /api/auth/check
*/

export function check(req, res) {
  res.json({
    success: true,
    info: req.decoded,
  });
}
