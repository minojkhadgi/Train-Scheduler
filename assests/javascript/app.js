// firebase initialize
var config = {
    apiKey: "AIzaSyDesUyIiEktiLDG0lrsiVbHF937SqdSB0s",
    authDomain: "bootcampclass-fb502.firebaseapp.com",
    databaseURL: "https://bootcampclass-fb502.firebaseio.com",
    projectId: "bootcampclass-fb502",
    storageBucket: "bootcampclass-fb502.appspot.com",
    messagingSenderId: "287780974550"
};
firebase.initializeApp(config);
var dataRef = firebase.database();

var Train = "";
var Destination = "";
var Time = "0";
var Frequency = "0";
// when submit button click
$("#add-train-btn").on("click", function () {
    // creating variables for input values
    Train = $("#t-input").val().trim();
    Destination = $("#d-input").val().trim();
    Time = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    Frequency = $("#f-input").val().trim();

    dataRef.ref().push({
        Train: Train,
        Destination: Destination,
        Time: Time,
        Frequency: Frequency,
    });
    return false;
});
//  adding firebase events
dataRef.ref().on("child_added", function (childSnapshot, prevChildKey) {
    var aTrain = childSnapshot.val().Train;
    var aDestination = childSnapshot.val().Destination;
    var aTime = childSnapshot.val().Time;
    var aFrequency = childSnapshot.val().Frequency;

    var differenceInTime = moment().diff(moment.unix(aTime), "minutes");
    var aRemainder = moment().diff(moment.unix(aTime), "minutes") % aFrequency;
    var aMinutes = aFrequency - aRemainder;

    // calculating arrival 
    var aArrival = moment().add(aMinutes, "m").format("hh:mm A");
    $("#train-table > tbody").append("<tr><td>" + aTrain + "</td><td>" + aDestination + "</td><td>" + aFrequency + " min</td><td>" + aArrival + "</td><td>" + aMinutes + "</td></tr>");

    
    });
    


