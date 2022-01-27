const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser : true}, (error)=>{
    if(!error){
        console.log("Success");
    }else{
        console.log("Error connecting to database.");
    }
});

const AllDataTweet = require('./model/alltweet.model');