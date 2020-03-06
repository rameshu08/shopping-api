const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelName = 'Products'

const productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    discount:{
        type: Number
    },
    image:{
        type: String,
        // required: true
    }
})

module.exports = mongoose.model(modelName, productSchema);