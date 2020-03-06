const express = require('express');
const userService = require('../services/user-service');
const constant = require('../utils/constant');

const route = express.Router();


route.post('', (req,res) => {
    userService.createUser(req.body).then((result) =>{
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'User Created Successfully', data: result});
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message:error.message});
    })
});

route.post('/login', (req,res) => {
    userService.getUser(req.body).then((result) =>{
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'Login Successfully', data: result});
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message:error.message});
    })
});



//CART //
route.put('/add', (req,res)=>{
    userService.addToCart(req.query,req.body).then((result) =>{
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'Item added to cart', data: result});
    }).catch((error) =>{
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message: error.message});
    })
});

route.get('/cart', (req,res)=>{
    userService.getAllCartItems(req.query).then((result) =>{
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json({message:'Cart result', data: result});
    }).catch((error) =>{
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message: error.message});
    })
});





module.exports = route;