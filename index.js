const axios = require('axios');
const https = require('https');
const path = require('path');
const fs = require('fs');
const got = require('got');
const express = require('express');
const open = require('open');
const Twit  = require('twit');
const app = express();
const dotenv = require('dotenv').config();
const dbService = require('./dbService');
var async = require('async');
const mongoose = require('mongoose');
const T = new Twit({
    consumer_key : process.env.REACT_APP_CONSUMER_KEY,
    consumer_secret : process.env.REACT_APP_CONSUMER_SECRET,
    access_token : process.env.REACT_APP_ACCESS_TOKEN,
    access_token_secret : process.env.REACT_APP_ACCESS_TOKEN_SECRET,
});
// const db = dbService.getDbServiceInstance();
// const connection = require('./model');

var objUrlId = {};
var getAllData;
var finalObj = [];
const AllDataTweet = mongoose.model('DownloadInformation');

searchTweetByWord('@cocodlbot');

function download(url,thumbnail,res,tweet) {
  var fileName = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('?'));
  var thumbnailName = thumbnail.substring(thumbnail.lastIndexOf('/')+1);
  const wstream = fs.createWriteStream('public/downloaded/'+fileName);
  const wstreamThumbNail = fs.createWriteStream('public/downloaded/'+thumbnailName);
  const stream = got.stream(url);
  const streamThumbNail = got.stream(thumbnail);
  var tempObjUrlId = {};
  tempObjUrlId[fileName]= url;
  objUrlId[fileName]= url;
  tempObjUrlId[fileName]= url;
  stream.on('data', (chunk) => {
    wstream.write(chunk);
  });
  stream.on('downloadProgress', ({ transferred, total, percent }) => {
      const percentage = Math.round(percent * 100);
  });
  streamThumbNail.on('data', (chunk) => {
    wstreamThumbNail.write(chunk);
  });
  streamThumbNail.on('downloadProgress', ({ transferred, total, percent }) => {
      const percentage = Math.round(percent * 100);
  });

  finalObj.push([tempObjUrlId, thumbnail.substring(thumbnail.lastIndexOf('/')+1), res.data.user.created_at + " %%% " + res.data.user.screen_name, tweet.user.created_at + " %%% " + tweet.user.screen_name, res.data.entities.media[0].expanded_url]);
  }
function resolveAfter5Seconds(word) {
  return new Promise(resolve => {
    setTimeout(() => {
      var stream = T.stream('statuses/filter', { track: word })
      stream.on('tweet', function (tweet) {
          var url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    
          T.get('statuses/show', { id: tweet.in_reply_to_status_id_str, include_rts: true}).then(res => {
            var thumbnail = res.data.extended_entities.media[0].media_url;
            var urlFromTweet = res.data.extended_entities.media[0].video_info.variants.filter(function(it){ return (it.bitrate === Math.max(...res.data.extended_entities.media[0].video_info.variants.filter(function(it){ return (it.content_type === 'video/mp4')}).map(function(it){return (it.bitrate)})))})[0].url;
            var fileName = urlFromTweet.substring(urlFromTweet.lastIndexOf('/')+1, urlFromTweet.lastIndexOf('?'));
            var fileNameWithoutExt = fileName.slice(0,fileName.lastIndexOf('.'));
            if(fileNameWithoutExt) {
              T.post('statuses/update',{status: "@" + tweet.user.screen_name + ' ' +'https://www.cocodlbot.fr/home/tweet/'+fileNameWithoutExt, in_reply_to_status_id: tweet.id_str}, responseCallback);
            }
            download(urlFromTweet, thumbnail, res, tweet);
          }).catch((error) => {
              console.log(error);
          });
      });
    }, 5000);
  });
}
async function searchTweetByWord(word) {
  try {
  const response = await new Promise((resolve, reject) => {
    T.get('search/tweets', { q: word, count: 100}).then(res => {
        const tweets = res.data.statuses;
        resolve(tweets);
	  }).catch((error) => {
        console.log(error);
    });
  },10000);
    resolveAfter5Seconds(word);
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function resultFile(id, res) {
  try {
  const response = await new Promise((resolve, reject) => {
    if(id){
      if(finalObj.length !== 0){
        db.postTweetToDb(finalObj[0],res);
        var dataTweet = new AllDataTweet();
        dataTweet.url_tweet = Object.keys(finalObj[0][0]);
        dataTweet.id_tweet = Object.values(finalObj[0][0]);
        dataTweet.thumbnail = finalObj[0][1];
        dataTweet.user_info = finalObj[0][2];
        dataTweet.tweet_info = finalObj[0][3];
        dataTweet.expanded_url = finalObj[0][4];
        dataTweet.save((err, doc) =>{
          if(!err){
            console.log(doc);
          }else{
            console.log('Error during record insertion : ' + err);
          }
        });
      }else{
        AllDataTweet.findOne({url_tweet: id }, { _id: 0, 'name.first': 0}).then(function(result) {
          resolve(result);
      });
      }
    }else{
      AllDataTweet.find().then(function(result) {
          resolve(result);
      });
    }
  },10000);
    return response;
  } catch (error) {
    console.log(error);
  }
}
function responseCallback(err) {
    if(err) console.log("error:", err)
}
app.use(express.static('public'));
app.get('/home*', function (req, res) {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/tweet/", (req,res) => {
  setTimeout(() => {
    var result = resultFile();
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
    }, 3000);
});
app.get("/tweet/:searchTweet", (req,res) => {
  setTimeout(() => {
    console.log(req.params.searchTweet.replace(/%20/g, " "));
    var result = resultFile(req.params.searchTweet.replace(/%20/g, " "), res);
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
    }, 3000);
});

const port = process.env.PORT

app.listen(port, ()=>console.log(`Listening on port ${port}...`));