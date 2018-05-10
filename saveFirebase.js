
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCzABecdstnYpHXmL9RmPbLsIezpqQOF8g",
    authDomain: "easygrocery-b41d7.firebaseapp.com",
    databaseURL: "https://easygrocery-b41d7.firebaseio.com",
    projectId: "easygrocery-b41d7",
    storageBucket: "easygrocery-b41d7.appspot.com",
    messagingSenderId: "320819117084"
  };
  firebase.initializeApp(config);

  var firebaseRef = firebase.database().ref();

$(document).ready(function(){
      userName = localStorage.getItem("userName");
});

$("#saveData").on("click", function(){
  if(userName != "undefined"){
    firebaseRef.child(userName).remove();
    for (let d in selectedFood){
      for (let i = 0; i < selectedFood[d]['data'].length; i++) {
        for (let x in selectedFood[d]['data'][i]) {
          let pathName = userName + "/" + d + "/" + i + "/"  + x;
          firebaseRef.child(pathName).set(selectedFood[d]['data'][i][x]); 
        }
      }
    }
    window.alert("Saved successfully");
  } else {
    window.alert("Please log in Facebook");
  }
  
});

// copied loaded food iteam(from user databse) to selectedFood and selectedFood.

$("#loadData").on("click", function(){
  if (userName == "undefined"){
    return;
  }
  foodSelection = new Array();
  firebase.database().ref(userName).on('value', function(snapshot) {
    let loadedData = snapshot.val();
    for (let d in loadedData){
      for(let i in loadedData[d]) {
        loadedData[d][i]['catagory'] = d;
        foodSelection.push(loadedData[d][i]);
      }
    }
    loadFromSelection = true;
    localStorage.setItem("loadFromSelection",loadFromSelection);
    localStorage.setItem("foodSelection", JSON.stringify(foodSelection));
    document.location = "secondpage.html";
  })
});