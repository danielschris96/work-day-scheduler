
$(function () {
// this function uses day.js to call the curent date in the chosen format below
var today = dayjs();
$('#currentDay').text(today.format('dddd, MMMM D YYYY'));

// this day.js method calls the current hour value on a 24hr format
var currentHour = dayjs().hour()

// this for loop iterates through the hour blocks and assigns classes based on if the compared hour is in the past, present, or future.
// var i is run from 9 to 17 because that corresponds to our 9am to 5pm schedule.
for (var i = 9; i < 18; i++) {
  // setting the id to hour + the value of i makes the iteration consistent with the element id's
  var id = "hour-" + i;
  // this 'if' compares the value of the current hour to a parsed string containing numeric. if the current hour equals the digit(s) in the id, the class is present
  if (currentHour === parseInt(id.match(/\d+/)[0], 10)) {
    $("#" + id).addClass("present");
  } 
  // match(/\d+/)[0], 10 checks the id for one or more numeric matches to the currentHour value.
  else if (currentHour < parseInt(id.match(/\d+/)[0], 10)) {
    $("#" + id).addClass("future");
  }
  else {
    $("#" + id).addClass("past");
  }
}

// this event listener handles the save button and grabs the id of the row as well as the input in the textbox and stores them in local storage
$(".saveBtn").on("click", function (){
  // finds the id of the parent div to identify which hour row it is coming from
  var rowID = $(this).parent().attr("id");
  // takes in the user input and stores it in a variable
  var textInput = $(this).siblings(".description").val();
  // sets the row id and user input into key/value pairs in local storage
  localStorage.setItem(rowID, textInput);
})

// this for loop retrieves local storage
for (var i = 0; i < localStorage.length; i++) {
  // setting variables for the key/value pair
var key = localStorage.key(i);
var value = localStorage.getItem(key);
// sets the divID equal to the id of the hour row div that it belongs to
var divID = $("#" + key);
// inputs the value from local storage back into the text area of the respective hour row
divID.children(".description").html(value);
}});

