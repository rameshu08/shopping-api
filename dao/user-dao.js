const userModel = require('../models/userSchema');


exports.create = (userDetail) =>{
    return new userModel(userDetail).save();
}

exports.getUser = (email) => {
    return userModel.findUser('email', email).select('-__v');
}