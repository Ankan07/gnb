
// console.log("klnk",aid);
db.collection("home-page").doc(aid.toString().trim()).collection("comments").orderBy("timestamp", "desc").get().then(function(querySnapshot) { 
    querySnapshot.forEach(function(doc) { 
       var x=doc.data();
   // console.log(doc.data());
   // console.log("inside here");
   var array=['January','February','March',"April","May","June","July","August","September","October","November","December"]
   var date= new Date(x.timestamp);
   var g=date.getDate();
   if(g==1 || g==21 || g==31)
       g=g+"st";
   else if(g==2 || g==22)
       g=g+"nd";
   else if(g==3 || g==23)
       g=g+"rd";
   else 
       g=g+"th";
   var divider=document.createElement('div');
   divider.setAttribute('class','divider');
   var element = document.getElementById("foo");

   var name = document.createElement("p");
   var namebold=document.createElement("b");
   var namenode = document.createTextNode(x.name);
   namebold.appendChild(namenode);
   name.appendChild(namebold);
   name.setAttribute('class','name');
    element.appendChild(name);
    

   var time = document.createElement("p");
   var timenode = document.createTextNode(array[date.getMonth()]+" "+g+" "+date.getFullYear());
   time.appendChild(timenode);
   time.setAttribute('class','time');
    element.appendChild(time);

   
   var comment = document.createElement("p");
   var commentnode = document.createTextNode(x.comment);
   comment.appendChild(commentnode);
   comment.setAttribute('class','comment');
    element.appendChild(comment);

    element.appendChild(divider);
     

   }); 
}).catch(function(error) { 
console.log("Error getting documents: ", error); 
}); 

