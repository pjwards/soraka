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
    oauth,
    email,
    name,
    picture
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
