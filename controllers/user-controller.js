const express = require('express');
const userService = require('../services/user-service');

const route = express.Router();


route.post('', (req,res) => {
    userService.createUser(req.body).then((result) =>{
        if(result){
            res.send({message:'User Added Successfully', data: result});
        } else {
            res.send('Something went wrong');
        }
    })
});

route.post('/login', (req,res) => {
    userService.getUser(req.body).then((result) =>{
        if(result) {
            res.send({message:'User Details', data: result});
        } else{
            res.send('Something Went wrong');
        }
    })
});

module.exports = route;