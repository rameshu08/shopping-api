const productDAO = require('../dao/product-dao');
const constant = require('../utils/constant');
const res = require('../utils/response');

const productService = {
    async addProduct(productDetail, user){
        try{
            if(productDetail == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Please enter The credentials'));
            }

            const result = await productDAO.create(productDetail);
            return result;
        } catch(error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR), error.message);
        }
    },

    async getProductById(productDetail){
        try{
            if(productDetail == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Please pass the credentials'));
            }

            const result = await productDAO.findById({'_id': productDetail.id});
            return result;
        } catch(error){
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR), error.message);
        }
    },

    async updateProduct(productId, productDetail){
        try{
            const objId = await productDAO.findById({'_id': productId.id});
            if(!objId){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA,'Invalid Details'));
            }
            const result = await productDAO.update(productId.id, productDetail);
            return result;
        } catch(error){
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR), error.message);
        }
    },

    async deleteProduct(productId){
        try{
            const objId = await productDAO.findById({'_id': productId.id});
            if(!objId){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA,'Invalid Details'));
            }

            const result = await productDAO.deleteProduct({'_id': productId.id});
            return result;
        } catch(error){
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR), error.message);
        }
    }
}

module.exports = productService;