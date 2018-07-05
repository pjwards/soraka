import UserService from '../../../serivces/user';

/*
    GET /api/user/list
*/
export function list(req, res) {
  // refuse if not an admin
  if (!req.decoded.admin) {
    return res.status(403).json({
      message: 'you are not an admin',
    });
  }

  UserService
    .findAll()
    .then((users) => {
      res.json({
        users,
      });
    });
}

/*
    POST /api/user/assign-admin/:username
*/
export function assignAdmin(req, res) {
  // refuse if not an admin
  if (!req.decoded.admin) {
    return res.status(403).json({
      message: 'you are not an admin',
    });
  }

  UserService
    .findOneByUsername(req.params.username)
    .then(
      user => user.assignAdmin(),
    ).then(res.json({
      success: true,
    }));
}
