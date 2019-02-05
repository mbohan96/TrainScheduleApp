$(document).ready(function () {

  
    <script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
    
      var config = {
        apiKey: "AIzaSyAhMsIIPeaVcR7DsuT8i1oPxdQLgaCyxvU",
        authDomain: "matt-bohan-train-project.firebaseapp.com",
        databaseURL: "https://matt-bohan-train-project.firebaseio.com",
        projectId: "matt-bohan-train-project",
        storageBucket: "matt-bohan-train-project.appspot.com",
        messagingSenderId: "245928089083"
      };
     
      firebase.initializeApp(config);
    ;

    firebase.initializeApp(config);
  
    var database = firebase.database();
  
    
    $("#addTrain").on("click", function (event) {
      event.preventDefault();
  

      var Name = $("#Name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var freq = $("#interval").val().trim();
  
      database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });
    });
  
  
    database.ref().on("child_added", function (childSnapshot) {
  
      var newTrain = childSnapshot.val().name;
      var newDestination = childSnapshot.val().destination;
      var newFirstTrain = childSnapshot.val().firstTrain;
      var newFreq = childSnapshot.val().frequency;
  
    
      var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

      var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
      var tRemainder = diffTime % newFreq;
  
 
      var tMinutesTillTrain = newFreq - tRemainder;
  
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var catchTrain = moment(nextTrain).format("HH:mm");
  
      $("#all-display").append(
        ' <tr><td>' + newTrain +
        ' </td><td>' + newDestination +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
    
      $("#trainName, #destination, #firstTrain, #interval").val("");
      return false;
    },
      
      function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
  }); 
  