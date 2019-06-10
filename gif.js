// Initial array of gif
var gifs = ["Wow", "Okay", "Whatever", "Meme"];
// Setting a var to see what the Response is, calling for future functions
var theResponse;
var theText;
var theCount = 11;

// var favorites = [];
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
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+response.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+response.data[i].rating+"</p><div class=form-check form-check-inline><input class=form-check-input type=checkbox id="+i+" data-response="+theText+" value="+response.data[i].images.fixed_width_still.url+"><label class=form-check-label for=inlineCheckbox"+i+">Add to favorites</label></div></div>");
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
    var a = $("<button type='button'>");
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


  function displayGifInfoAdd10 (event){
    //URL query
    event.preventDefault();
    theCount += 11;
    if (theCount > 0) {
        $("#newDiv.row").show();
    }
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theText + "&limit="+theCount+"&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
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
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+response.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+response.data[i].rating+"</p><div class=form-check form-check-inline><input class=form-check-input type=checkbox id="+i+" data-response="+theText+" value="+response.data[i].images.fixed_width_still.url+"><label class=form-check-label for=inlineCheckbox"+i+">Add to favorites</label></div></div>");
        }
    });
  }

  function displayGifInfoRemove10 (event){
    //URL query
    event.preventDefault();
    theCount += -11;
    if (theCount <=0) {
        $("#newDiv.row").hide();
        
    }

    console.log(theCount);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theText + "&limit="+theCount+"&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
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
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+response.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+response.data[i].rating+"</p><div class=form-check form-check-inline><input class=form-check-input type=checkbox id="+i+" data-response="+theText+"  value="+response.data[i].images.fixed_width_still.url+"><label class=form-check-label for=inlineCheckbox"+i+">Add to favorites</label></div></div>");
        }
    });
  }


// Generic function for displaying the gif
$(document).on("click", ".gif", displayGifInfo);
$(document).on("click", "#10", displayGifInfoAdd10);
$(document).on("click", "#-10", displayGifInfoRemove10);
$(document).on("click", "img", function(event) {
    event.preventDefault();
    var theGif = event.target.id;
 
    var theSrc = event.target.src;
    var moving = theResponse.data[theGif].images.fixed_width.url;
    var notMoving = theResponse.data[theGif].images.fixed_width_still.url;
    if(theSrc === notMoving){
        $("#"+theGif+"").attr('src', moving);
    }
    else {
        $("#"+theGif+"").attr('src', notMoving);

    }
    
  });
$(document).on("click", ".form-check-input", function() {
    console.log(isChecked);
    var pictureFavoriteResponse = $(this).attr("data-response");
    var id = $(this).attr("id");
    var isChecked = $(this).attr("checked");
    console.log(isChecked);
    if(isChecked ==="checked"){
        console.log($("#newColFavs"+pictureFavoriteResponse+id));
        $("#newColFavs"+pictureFavoriteResponse+id).remove();
        $(this).removeAttr("checked");
    }
    else {
    $(this).attr("checked", "checked");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pictureFavoriteResponse + "&limit="+theCount+"&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
       
    
        $("#favoriteImages").append("<div id=newColFavs"+pictureFavoriteResponse+id+" class=col-md-auto><img src="+response.data[id].images.fixed_width_still.url+" id="+id+"></div>");
       
    });
}

});



// Calling the renderButtons function to display the intial buttons
renderButtons();

