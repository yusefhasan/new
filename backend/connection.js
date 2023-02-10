const mongoose =require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', true)

const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.5c0dmp7.mongodb.net/chatt?retryWrites=true&w=majority`; 


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000
  });
  
  const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

module.exports = connection;