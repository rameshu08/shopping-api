const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const modelName = 'Users';

const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.statics.findUser = function (findBy, value) {
    return this.model(modelName).findOne({ [findBy]: value });
};

module.exports = mongoose.model(modelName, userSchema);
