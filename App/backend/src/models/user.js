import mongoose from 'mongoose';
import crypto from 'crypto';

const secret = process.env.JWT_SECRET;

const User = new mongoose.Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

// create new User document
User.statics.create = function create(username, password) {
  const encrypted = crypto
    .createHmac('sha1', secret)
    .update(password)
    .digest('base64');
  const user = new this({
    username,
    password: encrypted,
  });

  // return the Promise
  return user.save();
};

// find one user by using username
User.statics.findOneByUsername = function findOneByUsername(username) {
  return this.findOne({
    username,
  }).exec();
};

// verify the password of the User documment
User.methods.verify = function verify(password) {
  const decrypted = crypto
    .createHmac('sha1', secret)
    .update(password)
    .digest('base64');

  return this.password === decrypted;
};

User.methods.assignAdmin = function assignAdmin() {
  this.admin = true;
  return this.save();
};

export default mongoose.model('User', User);
