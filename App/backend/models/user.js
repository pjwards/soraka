import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: false }
});

// create new User document
User.statics.create = (username, password) => {
    const user = new this({
        username,
        password
    });

    // return the Promise
    return user.save();
};

// find one user by using username
User.statics.findOneByUsername = (username) => {
    return this.findOne({
        username
    }).exec();
}

// verify the password of the User documment
User.methods.verify = (password) => {
    return this.password === password;
}

User.methods.assignAdmin = () => {
    this.admin = true;
    return this.save();
}

export default mongoose.model('User', User);