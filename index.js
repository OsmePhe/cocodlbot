const axios = require('axios');
const https = require('https');
const path = require('path');
const fs = require('fs');
const got = require('got');
const express = require("express");
// const notifier = require('node-notifier');
const open = require('open');
const Twit  = require("twit");
const app = express();
const dotenv = require('dotenv').config();
var async = require('async');
const T = new Twit({
    consumer_key : process.env.REACT_APP_CONSUMER_KEY,
    consumer_secret : process.env.REACT_APP_CONSUMER_SECRET,
    access_token : process.env.REACT_APP_ACCESS_TOKEN,
    access_token_secret : process.env.REACT_APP_ACCESS_TOKEN_SECRET,
});

var objUrlId = {};
var finalObj = [];
searchTweetByWord('@cocodlbot');
function download(url,thumbnail,res,tweet) {
  // console.log(tweet);
  var fileName = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('?'));
  var thumbnailName = thumbnail.substring(thumbnail.lastIndexOf('/')+1);
  const wstream = fs.createWriteStream('../downloaded/'+fileName);///////////////////////////////.
  const wstreamThumbNail = fs.createWriteStream('../downloaded/'+thumbnailName);/////////////////////////////////////.
  const stream = got.stream(url);
  const streamThumbNail = got.stream(thumbnail);
  var tempObjUrlId = {};
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
  console.log(res.data.entities.media[0].expanded_url);
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
              T.post('statuses/update',{status: "@" + tweet.user.screen_name + ' ' +'https://cocodlbot.herokuapp.com/home/tweet/'+fileNameWithoutExt, in_reply_to_status_id: tweet.id_str}, responseCallback);
            }
            download(urlFromTweet, thumbnail, res, tweet);
          }).catch((error) => {
              console.log(error);
          });
          // notifier.notify({
          //   title: tweet.user.name,
          //   message: tweet.text
          // });
    
          // notifier.on('click', async function(notifierObject, options, event) {
          //   console.log('clicked');
          //   await open(url);
          // });
      });
    }, 5000);
  });
}
async function searchTweetByWord(word) {
  try {
  const response = await new Promise((resolve, reject) => {
    T.get('search/tweets', { q: word, count: 100}).then(res => {
        const tweets = res.data.statuses;
        console.log(tweets);
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
async function resultFile(id) {
  try {
  const response = await new Promise((resolve, reject) => {
    if(id){
      resolve(objUrlId[id]);
    }else{
      resolve(finalObj);
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
// app.use(express.static(path.join(__dirname, 'public')));
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
    var result = resultFile(req.params.searchTweet.replace(/%20/g, " "));
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
    }, 3000);
});

const port = process.env.PORT

app.listen(port, ()=>console.log(`Listening on port ${port}...`));