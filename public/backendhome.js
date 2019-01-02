// const fso=require('fs');
// const sA=fso.readFileSync('gb.json');
// const serviceAccount=JSON.parse(sA);

// const admin = require('firebase-admin');

// //var serviceAccount = require('gb.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// var db = admin.firestore();
// var config = {
//   apiKey: "AIzaSyAIECX7nUeA6W6Z52kvWx25GeZ4OfIknAo",
//   authDomain: "gavel-and-beyond.firebaseapp.com",
//   projectId: "gavel-and-beyond",
//   databaseURL: "https://gavel-and-beyond.firebaseio.com",
//   storageBucket: "gavel-and-beyond.appspot.com",
// };
// firebase.initializeApp(config);


 

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});


var homepages = db.collection('home-page');
var allarticles = homepages.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
    //  console.log(doc.id, '=>', doc.data());

    renderarticle(doc);
    // renderimage(doc);
   
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  
  var row = document.getElementById('row');
  var oc=document.getElementById('oc');
  //
  function renderarticle(doc){
    var link=document.createElement('a');
    link.setAttribute("href","/article/"+doc.id);


    var column = document.createElement("div");
    column.setAttribute('class', 'col s12 m12 l6');
    var card=document.createElement("div");
    card.setAttribute('class','card hoverable');
    card.setAttribute('style','background-color: ivory');
  
    // var cardimage=document.createElement("div");
    // cardimage.setAttribute('class','card-image waves-effect waves-block waves-light');
 
    // var image=document.createElement('img');
    // image.setAttribute('src',doc.data().pictureurl);
    // //image.setAttribute('class', 'responsive-img');
    
    // image.setAttribute('class',"thumbnail activator");
    
   
     
    // cardimage.appendChild(image);
    var cardcontent=document.createElement("div");
    cardcontent.setAttribute('class','card-content');
    var cardaction=document.createElement('div');
     cardaction.setAttribute('class','card-action');
     var span = document.createElement("SPAN");
     span.setAttribute('class','card-title cardtitle');
     var i=document.createTextNode(doc.data().title);
     span.appendChild(i);
    // span.setAttribute('class',"truncate")
     var para= document.createElement("P");
     var t = document.createTextNode(doc.data().subtitlehome.substring(0,200)+"...");
     para.setAttribute("class","cardpara"); 
     para.setAttribute("style","font-family: 'Quicksand', sans-serif;");
         // Create a text node
para.appendChild(t); 
cardcontent.appendChild(span);
cardcontent.appendChild(para);
var createA = document.createElement('a');
var createAText = document.createTextNode('Read Article');
createA.setAttribute('href', "/article/"+doc.id);
createA.appendChild(createAText);
cardaction.appendChild(createA);
// var cardreveal=document.createElement("div");
// cardreveal.setAttribute("class","card-reveal");
// var crspan=document.createElement("span");
// crspan.setAttribute("class","card-title grey-text text-darken-4");
// var crtext=document.createTextNode(doc.data().title);
// crspan.appendChild(crtext);
// // var icon=document.createElement("i");
// // icon.setAttribute("class", "material-icons right");

// // icon.appendChild(clos);
// crspan.appendChild('<i class="material-icons right">more_vert</i>');
// var crpara=document.createElement("p");
// crpara.appendChild(doc.data().subtitle);
// cardreveal.appendChild(crspan);
// cardreveal.appendChild(crpara);
// card.appendChild(cardreveal);




   //  card.appendChild(cardimage);

     card.appendChild(cardcontent);
     card.appendChild(cardaction);
 column.appendChild(card);
 link.appendChild(column);
row.appendChild(link);

// var cm=document.createElement("p");
// var t=document.createTextNode(doc.data().subtitle);
// cm.appendChild(t);
// var v=document.getElementById("oc");
// v.appendChild(cm);
  } 
 
function savesubscribecomment(){


  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;


  if(name == "" || email=="" ){
    alert("Fields with * are mandatory");
  }
  else{
    db.collection("subscribe").add({

     name:name,
     email:email,
     timestamp: (new Date()).getTime()

    }).then(function (docRef) {
                            
      alert("Thanks for subscribing")
  })
      .catch(function (error) {
          console.error("Error adding document: ", error);
      })

  }
  
  
}
