// Initial array of gif
var gifs = ["Wow", "Okay", "Whatever", "Meme"];
// Setting a var to see what the Response is, calling for future functions
var theResponse;
var theText;
//Hiding an Id
$("#clickOnImage").hide();

//appending a new div to the gif form
$("#gif-form").append("<div id=newDiv class=row></div>");

// Function for dumping the JSON content for each button into the div
function displayGifInfo() {  
    //URL query
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&limit=11&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
    theText = $(this).text();
    //ajax call to get info
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        $("#newDiv").empty();
        //setting theResponse to current response
        theResponse = response;
        //showing Id
        $("#clickOnImage").show();
        //for each item found, print it;
        for(var i =0; i < theResponse.data.length-1; i++){
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+theResponse.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+theResponse.data[i].rating+"</p></div>");
        }
    });
}

// Function for displaying gif data
function renderButtons() {

  // Deleting the buttons prior to adding new gif
  $("#buttons-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button type='button'> ");
    // Adding a class of gif to our button
    a.addClass("gif btn btn-outline-primary btn-rounded waves-effect");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  // The gif from the textbox is then added to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

// This function handles events where one button is clicked
$("#newDiv").on("click", function(event) {
    event.preventDefault();
    var theGif = event.target.id;
    console.log(theGif);
    console.log(theResponse.data[0]);
    var theSrc = event.target.src;
    console.log(theResponse.data[theGif].images.fixed_width.url);
    var moving = theResponse.data[theGif].images.fixed_width.url;
    var notMoving = theResponse.data[theGif].images.fixed_width_still.url;
    if(theSrc === notMoving){
        $("#"+theGif+"").attr('src', moving);
    }
    else {
        $("#"+theGif+"").attr('src', notMoving);

    }
    
  });

// Generic function for displaying the gif
$(document).on("click", ".gif", displayGifInfo);
$(document).on("click", "#20", function(event){
    //URL query
    event.preventDefault();
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theText + "&limit=21&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
    console.log(theResponse);
    //ajax call to get info
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        $("#newDiv").empty();
        //setting theResponse to current response
        //showing Id
        theResponse = response;
        $("#clickOnImage").show();
        //for each item found, print it;
        for(var i =0; i < response.data.length-1; i++){
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+response.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+response.data[i].rating+"</p></div>");
        }
    });
});
$(document).on("click", "#10", function(event){
    //URL query
    event.preventDefault();
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theText + "&limit=11&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
    console.log(theResponse);
    //ajax call to get info
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        $("#newDiv").empty();
        theResponse = response;
        //setting theResponse to current response
        //showing Id
        $("#clickOnImage").show();
        //for each item found, print it;
        for(var i =0; i < theResponse.data.length-1; i++){
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+theResponse.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+theResponse.data[i].rating+"</p></div>");
        }
    });
});


// Calling the renderButtons function to display the intial buttons
renderButtons();

