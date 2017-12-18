require('dotenv').config(); 

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useMongoClient: true });

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
