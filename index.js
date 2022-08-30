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
const aws = require('aws-sdk');
const mongoose = require('mongoose');

const T = new Twit({
    consumer_key : process.env.REACT_APP_CONSUMER_KEY,
    consumer_secret : process.env.REACT_APP_CONSUMER_SECRET,
    access_token : process.env.REACT_APP_ACCESS_TOKEN,
    access_token_secret : process.env.REACT_APP_ACCESS_TOKEN_SECRET,
});

const s3 = new aws.S3({
  accessKeyId : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: 'eu-west-3'
});

// const db = dbService.getDbServiceInstance();
// const connection = require('./model');

var objUrlId = {};
var getAllData;
var finalObj = [], finalUser0 = [], finalUser1 = [];
const AllDataTweet = mongoose.model('DownloadInformation');

searchTweetByWord('@cocodlbot');

function download(url,thumbnail,res,tweet) {
  finalObj = [], finalUser0 = [], finalUser1 = [];
  var fileName = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('?'));
  var thumbnailName = thumbnail.substring(thumbnail.lastIndexOf('/')+1);
  // const wstream = fs.createWriteStream('public/downloaded/'+fileName);
  const wstreamThumbNail = fs.createWriteStream(thumbnailName);
  // const stream = got.stream(url);
  const streamThumbNail = got.stream(thumbnail);

  var tempObjUrlId = {};
  tempObjUrlId[fileName]= url;
  objUrlId[fileName]= url;
  tempObjUrlId[fileName]= url;
  
  // stream.on('data', (chunk) => {
  //   wstream.write(chunk);
  // });
  // stream.on('downloadProgress', ({ transferred, total, percent }) => {
  //     const percentage = Math.round(percent * 100);
  // });

  ///////////////////////////////////Add to AWS////////////////////////

  
  streamThumbNail.on('data', (chunk) => {
    const file = fs.createWriteStream(thumbnailName);

    // Write data into local file
    // res.pipe(file);
    const paramsBucket = {
      Bucket : process.env.S3_BUCKET_NAME,
      Key : thumbnailName,
      Body : file,//fs.createReadStream(thumbnailName),//fileContent
      content_type : 'image/JPG',
    };
    s3.upload(paramsBucket, (err, data) => {
      if(err){
        console.log('error '+err); 
      }else{
        console.log('success' + data.Location)
      }
    })
    // wstreamThumbNail.write(chunk);
  });
  streamThumbNail.on('downloadProgress', ({ transferred, total, percent }) => {
    const percentage = Math.round(percent * 100);
  });

  // const fileContent = fs.readFileSync('public/downloaded/'+thumbnailName);
  // const paramsBucket = {
  //   Bucket : process.env.S3_BUCKET_NAME,
  //   Key : thumbnailName,
  //   Body : fs.createReadStream(filepath),//fileContent
  //   content_type : 'image/JPG',
  // };

  // s3.upload(paramsBucket, (err, data) => {
  //   if(err){
  //     console.log('errrrrrrrrrrrrroooooooooooorrrrBucket '+err); 
  //   }else{
  //     console.log('success' + data.Location)
  //   }
  // })
  finalUser0.push(res.data.user.screen_name);
  finalUser1.push(tweet.user.screen_name);
  finalObj.push([tempObjUrlId, thumbnail, res.data.user.created_at + ' %%% ' + res.data.user.screen_name, tweet.user.created_at + ' %%% ' + tweet.user.screen_name, res.data.entities.media[0].expanded_url]);
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
              T.post('statuses/update',{status: '@' + tweet.user.screen_name + ' ' +'https://www.cocodlbot.fr/home/tweet/'+fileNameWithoutExt, in_reply_to_status_id: tweet.id_str}, responseCallback);
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

async function resultFile_2(e) {
  const url = await s3.getSignedUrl('getObject', {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: e.thumbnail,
    Expires: 60*5
  });
  return url;
};

async function resultFile_1(result, resolve) {
  // const response = await s3.listObjectsV2({Bucket:process.env.S3_BUCKET_NAME}).promise();
  // let x = r.Contents.map(item=>item.Key);
  // console.log(x);
  // const url = await s3.getSignedUrl('getObject', {
  //   Bucket: process.env.S3_BUCKET_NAME,
  //   Key: 'n1wKWfw2H4JQFX5e.jpg',
  //   Expires: 60*5
  // });
  result.forEach(function(e){
      resultFile_2(e).then(function(result) {
        e.urlThumbnail = result;
      }
    );
  });
  resolve(result);
}

async function resultFile(id, res) {
  try {
  const response = await new Promise((resolve, reject) => {
    if(id){
      if(finalObj.length !== 0){
        AllDataTweet.findOne({url_tweet: id.searchTweet }, { _id: 0}).then(function(result) {
          if(!result){
            var dataTweet = new AllDataTweet();
            dataTweet.url_tweet = Object.keys(finalObj[0][0])[0];
            dataTweet.id_tweet = Object.values(finalObj[0][0])[0];
            dataTweet.thumbnail = finalObj[0][1];
            dataTweet.user_info = finalObj[0][2];
            dataTweet.tweet_info = finalObj[0][3];
            dataTweet.expanded_url = finalObj[0][4];
            dataTweet.tweet_sc = finalUser1[0].toUpperCase();
            dataTweet.user_sc = finalUser0[0].toUpperCase();
            // dataTweet.urlThumbnail = '';
            dataTweet.save((err, doc) =>{
              if(!err){
                console.log('Post in db');
              }else{
                console.log('Error during record insertion : ' + err);
              }
            });
            resolve(dataTweet);
          }else{
            resolve(result);
          }
          
          // resolve(result);
       });
      }else{
        if(id.searchBar !== "1"){
          AllDataTweet.findOne({url_tweet: id.searchTweet }, { _id: 0}).then(function(result) {
            resolve(result);
          });
        }else{
          AllDataTweet.find({$or:[{url_tweet: id.searchTweet }, { user_sc: id.searchTweet.toUpperCase() }, { tweet_sc: id.searchTweet.toUpperCase()}]}, { _id: 0}).then(function(result) {
            resolve(result);
          });
        }
      }
    }else{
      AllDataTweet.find().then(function(result) {
          resultFile_1(result, resolve);
      });
    }
  },10000);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function responseCallback(err) {
    if(err) console.log('error:', err)
}

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}
app.use(express.static('public'));

app.get('/home*', function (req, res) {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tweet/', (req,res) => {
  setTimeout(() => {
    var result = resultFile();
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
    }, 3000);
});
app.get('/tweet/:searchTweet/:searchBar', (req,res) => {
  setTimeout(() => {
    var result = resultFile({searchTweet: req.params.searchTweet.replace(/%20/g, ' '), searchBar: req.params.searchBar.replace(/%20/g, ' ')}, res);
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
    }, 3000);
});

const port = process.env.PORT

app.listen(port, ()=>console.log(`Listening on port ${port}...`));