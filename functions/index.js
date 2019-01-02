const functions = require('firebase-functions');
const express = require('express');
// var bodyParser = require('body-parser');

var path= require("path");
const admin = require('firebase-admin');

const app = express();
var serviceAccount = require('./gb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
db.settings({
    timestampsInSnapshots: true
  });

app.set('view engine','ejs');
app.use(express.static('public'));
// app.use(bodyParser.json());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

app.get('/timestamp',(request, response)=>{
    response.send(`${Date.now()}`);
})


app.get('/contactus',(req,res)=>{
    res.render('contactus.ejs');  
});

app.get('/article/:id',(request, response)=>{

    var articleid=request.params.id;
    var Ref = db.collection('home-page').doc(articleid.toString());
    var getDoc = Ref.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          response.render('article.ejs',{data:"ERROR 404 NOT FOUND",pictureurl:""});
          return 0;
        } else {
          // console.log('Document data:', doc.data());
          response.render('article.ejs',{metadesc:doc.data().subtitlehome.substring(0,150),data:doc.data().subtitle,pictureurl:doc.data().pictureurl,aid:articleid,tt:doc.data().title,author:doc.data().author,subtitlehome:doc.data().subtitlehome});
          return 0;
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
});
exports.app = functions.https.onRequest(app);
