// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


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
  var rowID = $(this).parent().attr("id");
  var textInput = $(this).siblings(".description").val();
  localStorage.setItem(rowID, textInput);
})

for (var i = 0; i < localStorage.length; i++) {
var key = localStorage.key(i);
var value = localStorage.getItem(key);
var textbox = $("#" + key);
textbox.children(".description").html(value);
}});

