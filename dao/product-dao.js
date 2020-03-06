const productModel = require('../models/productSchema');

exports.create = (productDetail) => {
    return new productModel(productDetail).save();
}

exports.findById = (condition) => {
    return productModel.findOne(condition);
}

exports.update = (id, productDetail) => {
    return productModel.updateOne({_id: id}, {$set:productDetail});
}

exports.deleteProduct = (id) =>{
    return productModel.remove({_id:id});
}