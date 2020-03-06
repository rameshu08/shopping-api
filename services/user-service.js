const userDAO = require('../dao/user-dao');
const constant = require('../utils/constant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const res = require('../utils/response');


const UserService = {
    saltRounds:10,
    async createUser(userDetail) {
        try{
            if(userDetail == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED,'UserDetail shouldnot be null'));
            } 
            const userExists = await userDAO.findByCondition({'email':userDetail.email});
                if(userExists){
                    return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, 'User Already Exists'));
                }
            const mobileNoExists = await userDAO.findByCondition({'mobile': userDetail.mobile});
                if(mobileNoExists){
                    return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, 'Mobile Number already exists'));
                }
            else if(userDetail.password){
                const hashedPassword = await bcrypt.hash(userDetail.password,this.saltRounds);
                userDetail.password = hashedPassword; 
            }
                const result = await userDAO.create(userDetail);
                return result;

        } catch(error){
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message));
        }
    },


    async getUser(userDetail) {
        try{
            if(userDetail == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Invalid User Data.'));
            }
            const userData = await userDAO.getUser(userDetail.email);
            if(!userData){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid User'));
            }
            if(!userData.password){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Enter Password'));
            } 
            const isCorrectPassword = await bcrypt.compare(userDetail.password,userData.password);
            if(!isCorrectPassword){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Invalid Password'));
            }
            const token = jwt.sign(_.pick(userData, ['_id', 'userName', 'mobile', 'email']), constant.APP_SECRETE, {
                expiresIn: constant.TOKEN_TIMEOUT
            });
            return { token, Username: userData.userName, mobile: userData.mobile, email: userData.email, _id: userData._id };

        } catch(error){
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message));
        }
    },



    //CART//

    async addToCart(user,cartDetail){
        try{
            let updateFields = {};
            if(cartDetail == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Enter the credentials'));
            }
            const condition = {};
            condition._id = user.id;
            condition['cart.productId'] = cartDetail[0].productId;
            let productExists = await userDAO.getCartItems(condition);
            if(productExists) {
            //    const condition={};
            //    condition._id = user.id;
            //    condition['cart.productId'] = cartDetail[0].productId;
               const inCount = cartDetail[0].qty + productExists.cart[0].qty;
               if(inCount < 1){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Enter the credentials'));
               } else{
                   updateFields = {
                       $inc:{ 'cart.$.qty': cartDetail[0].qty} //if want reduce : -1 or value
                   }
               }
            } else{
                const condition = {};
                condition._id = user.id;
                updateFields = {
                    $push: {cart : cartDetail}
                }
            }
            // condition['cart.product'] = cartDetail[0].productId;
            const result = await userDAO.addToCart(condition,updateFields);
            return result;
        } catch(error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message));            
        }
    },

    async getAllCartItems(userId) {
        try{
            if(userId == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Enter the credentials'));
            }
            const result = await userDAO.getAllCartItems({_id:userId.id});
            if(!result){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'No products added'));
            }
            let cart = result[0].cart;
            let cartResult = _.groupBy(cart);
            let totalPrice = 0;
            let expectedResult = [];

            for(let i in cartResult){
                let normalObj = {};
                cartResult[i].forEach(product => {
                    product.amount = Math.round(((product.productId.price - (product.productId.price * product.productId.discount / 100)) * product.qty) * 100) / 100;
                    totalPrice += product.amount;
                })
                normalObj.products = cartResult[i];
                expectedResult.push(normalObj);
            }
            totalPrice = Math.round(totalPrice * 100)/100;
            return ({cartItems: expectedResult, TotalPrice: totalPrice})

        }catch(error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message));            
        }
    }

};


module.exports = UserService;