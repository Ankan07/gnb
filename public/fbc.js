var config = {
    apiKey: "AIzaSyAIECX7nUeA6W6Z52kvWx25GeZ4OfIknAo",
    authDomain: "gavel-and-beyond.firebaseapp.com",
    projectId: "gavel-and-beyond",
    databaseURL: "https://gavel-and-beyond.firebaseio.com",
    storageBucket: "gavel-and-beyond.appspot.com",
  };
  firebase.initializeApp(config);
  var db = firebase.firestore();
  

db.settings({
    timestampsInSnapshots: true
  });
