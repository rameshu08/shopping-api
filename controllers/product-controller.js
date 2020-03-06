const express = require('express');
const constant = require('../utils/constant');
const productService = require('../services/product-service');
const multiPartMiddleware = require('connect-multiparty')();

const route = express.Router();


route.post('', multiPartMiddleware, (req,res) => {
    productService.addProduct(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'Product added successfully', data: result});
    }).catch((error) => {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message: error.message});
    });
});

route.get('/one', (req,res) => {
    productService.getProductById(req.query).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'Product Details', data: result});
    }).catch((error) =>{
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message: error.message});
    })
});

route.put('', (req,res) => {
    productService.updateProduct(req.query,req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'Product updated successfully', data: result});
    }).catch((error) => {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message: error.message});
    });
});

route.delete('', (req,res) => {
    productService.deleteProduct(req.query).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'Product deleted successfully', data: result});
    }).catch((error) => {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message: error.message});
    });
});

module.exports = route;