const mongoose = require('mongoose');
const app = require("./server");
const http = require('http');
const server = http.createServer(app);
// var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopping',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("MongoDB connected Successfully");
});

server.listen(3000);
console.log('Server running on port 3000');

