var config = {
    apiKey: "AIzaSyDq4f-2Jxdu6XmQ0DqCbG0Z9AXXvWYEcq8",
    authDomain: "train-schedule-34975.firebaseapp.com",
    databaseURL: "https://train-schedule-34975.firebaseio.com",
    projectId: "train-schedule-34975",
    storageBucket: "train-schedule-34975.appspot.com",
    messagingSenderId: "731990978505"
  };

  firebase.initializeApp(config);
 


var database = firebase.database();
var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var trainTime = childSnap.val().trainTime;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var nextTime = childSnap.val().nextTime;
   


 $("#trainlist > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTime + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
   

});


$("#submit").on("click", function() {
	event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

   

   
    var timeConverted = moment(firstTime, "hh:mm").subtract("1, years");
    var difference = currentTime.diff(moment(timeConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        min: minUntilTrain,
        nextTime: nextTrain
    }

   
    database.ref().push(newTrain);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    return false;
});