const mongoose = require('mongoose');
const AllDataTweet = require('./model/alltweet.model');

mongoose.connect('mongodb://localhost:27017/cocodlbot', {useNewUrlParser : true}, (error)=>{
    if(!error){
        console.log("Success");
    }else{
        console.log("Error connecting to database.");
    }
});





//phpmyadmin
// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.DB_USERNAME ,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
//     // host: 5000,
//     // user: "root",//Omar95
//     // password: "",//Dorcas19952112.@
//     // database: "cocodlbot",
//     // port: 3306
// });
// connection.connect((err) => {
//     if (err) {
//         console.log(err.message);
//     }
//     // console.log('db ' + connection.state);
// });

// class DbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService();
//     }

//     async getAllData() {
//         try {
//             const response = await new Promise((resolve, reject) => {
//                 const query = "SELECT * FROM download_information;";
//                 connection.query(query, (err, results) => {
//                     if (err) reject(new Error(err.message));
//                     resolve(results);
//                 })
//             });
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async getTweetFromDb(req,res) {
//         try {
//             const id_tweet = req;
//             const response = await new Promise((resolve, reject) => {
//                 // const query = 'SELECT * FROM download_information WHERE url_tweet = ?', req, //.substring(0,req.indexOf('.mp4'))
//               connection.query("SELECT * FROM download_information WHERE url_tweet = ? ;",
//               [id_tweet],
//                (err, results) => {
//                     if (err) reject(new Error(err.message));
//                     console.log(results);
//                     resolve(results);
//                 })
//             });
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     // async getTweetFromDb(req,res) {
//     //     try {
//     //         const id_tweet = req;
//     //         if(id_tweet){
//     //           connection.query(
//     //           "SELECT * FROM download_information WHERE url_tweet = ? ;",
//     //           [id_tweet],
//     //           (err, result) => {
//     //               if(err){
//     //                   console.log(err);
//     //                   res.send({err : err + "One information missing !"});
//     //                   res.end();
//     //                 }else{
//     //                   console.log(result);
//     //                   res.send(result);
//     //                 }
//     //           }
//     //         ); 
//     //       }      
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }

//     async postTweetToDb(req,res) {
//         try {
//             const url_tweet = Object.keys(req[0]);
//             const id_tweet = Object.values(req[0]);
//             const thumbnail = req[1];
//             const user_info = req[2];
//             const tweet_info = req[3];
//             const expanded_url = req[4];
//             console.log(req);
//             if (url_tweet && id_tweet && thumbnail && user_info && tweet_info && expanded_url) {
//                 connection.query(
//                 "INSERT INTO download_information (url_tweet, id_tweet, thumbnail, user_info, tweet_info, expanded_url) VALUES (?,?,?,?,?,?)",
//                 [url_tweet, id_tweet, thumbnail, user_info, tweet_info, expanded_url],
//                 (err, result) => {
//                     if(err){
//                       res.send({err : err + "One information missing !"});
//                       res.end();
//                     }else{
//                       res.send(result);
//                     }

//                 }
//               );
//             }         
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// module.exports = DbService;