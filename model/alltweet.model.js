// const db = dbService.getDbServiceInstance();
const mongoose = require('mongoose');

var AllDataTweet = new mongoose.Schema ({
        url_tweet : {
            type : String
        },
        id_tweet : {
            type : String
        },
        thumbnail : {
            type : String
        },
        user_info : {
            type : String
        },
        tweet_info : {
            type : String
        },
        expanded_url : {
            type : String
        },
        urlThumbnail : {
            type : String
        },
        tweet_sc : {
            type : String
        },
        user_sc : {
            type : String
        }
    });

    mongoose.model('DownloadInformation', AllDataTweet)