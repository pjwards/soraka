import mongoose from 'mongoose';
import crypto from 'crypto';

const secret = process.env.JWT_SECRET;

const User = new mongoose.Schema({
  oauth: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  picture: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    is_silhouette: Boolean
  }
});

// create new User document
User.statics.create = function create(
  oauth,
  email,
  name,
  picture
) {
  const user = new this({
    oauth,
    email,
    name,
    picture
  });

  // return the Promise
  return user.save();
};

// find one user by using username
User.statics.findOneByEmail = function findOneByEmail(email) {
  return this.findOne({
    email,
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
