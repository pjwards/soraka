import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import {HookSyncCallback, model, Schema, Error, Aggregate, Query, Model, Document} from 'mongoose';
import {
    comparePasswordFunction,
    UserModelInterface,
} from '../types/domain/inteface/user';

export type UserModel = Aggregate<UserModelInterface> &
    Document &
    Query<UserModelInterface> &
    Model<Document> &
    UserModelInterface;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Models
 * definitions:
 *   User:
 *     type: object
 *     required:
 *        - email
 *     properties:
 *       email:
 *         type: string
 *         description: Email
 *       password:
 *         type: string
 *         description : Password
 */
const userSchema: Schema = new Schema({
    email: {type: String, unique: true},
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String,
    },
}, {timestamps: true});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(this: UserModel, next) {
    const user: UserModel = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, () => undefined, (e: Error, hash) => {
            if (e) {
                return next(e);
            }
            user.password = hash;
            next();
        });
    });
} as HookSyncCallback<UserModel>);

const comparePassword: comparePasswordFunction = function(this: UserModel, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function(size: number) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User: Model<UserModel> = model('User', userSchema);
export default User;
