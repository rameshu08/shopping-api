const userDAO = require('../dao/user-dao');


const AuthService = {
    async createUser(userDetail) {
        try{
            if(userDetail == null){
                return Promise.reject(res.send('UserDetail shouldnot be null'));
            } else {
                const result = await userDAO.create(userDetail);
                return result;
            }
        } catch(error){
            return Promise.reject(error.message);
        }
    },

    async getUser(userDetail) {
        try{
            if(userDetail == null){
                return Promise.reject('UserDetail shouldnot be null');
            }
            const result = await userDAO.getUser(userDetail.email);
            if(userDetail.password != result.password){
                console.log('Wrong Password');
            } else {
                return result;
            }

        } catch(error){
            return Promise.reject(error.message);
        }
    } 
};


module.exports = AuthService;