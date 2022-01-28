const mongoose = require('mongoose');
const AllDataTweet = require('./model/alltweet.model');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser : true}, (error)=>{
    if(!error){
        console.log("Success");
    }else{
        console.log("Error connecting to database." + "    " + error);
    }
});

mongoose.set('bufferCommands', false);