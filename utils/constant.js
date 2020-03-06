exports.PORT = 3000;
exports.MONGO_URI = 'mongodb://localhost:27017/shopping';
exports.baseURI = '/api/';
exports.HTML_STATUS_CODE = {
    SUCCESS:200, CREATED: 201, NO_CONTENT: 203, UNAUTHORIZED: 401, INVALID_DATA: 406, CONFLICT: 409, INTERNAL_ERROR: 500, BAD_REQUEST: 400, NOT_FOUND: 404}
exports.DOMAIN = 'http://localhost:3000';
exports.TOKEN_TIMEOUT = '7d';
exports.APP_SECRETE = 'ramesh2020@shopping';
exports.WEEK_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
exports.ORDER_STATUS = {
    PLACED:'PLACED',
    SUCCESS:'SUCCESS',
    DELIVERED:'DELIVERED',
    FAILURE:'FAILURE',
    CANCELLED:'CANCELLED',
    PENDING:'PENDING',
    RECIEVED:'RECIEVED',
    base_url:'test'
}
exports.lookup = {
    USER_ROLE: ['USER', 'ADMIN'],
    ACCOUNT_VERIFIED: [0, 1] // 0 - signup, 1- login 2-KYC
};