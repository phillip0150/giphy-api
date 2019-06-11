// Initial array of gif
var gifs = ["Wow", "Okay", "Whatever", "Meme"];

// Setting a var to see what the Response is, calling for future functions
var theResponse;
var theText;
var theCount = 10;

//Hiding an Id
$("#clickOnImage").hide();

//appending a new div to the gif form
$("#gif-form").append("<div id=newDiv class=row></div>");

// Function for dumping the JSON content for each button into the div
function displayGifInfo() {  
    //setting the button text to theText
    //creating a query with the search of what was in the text box
    theText = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theText + "&limit="+theCount+"&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";

    //ajax call to get info
    $.ajax({
    //url is quryURL
    //using method GET
    url: queryURL,
    method: "GET"
    //when we get a response, do function
    }).then(function(response) {
        $("#newDiv").empty();
        //setting theResponse to current response
        theResponse = response;
        //showing Id
        $("#clickOnImage").show();
        //for each item found, print it;
        for(var i =0; i < theResponse.data.length; i++){
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+theResponse.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+theResponse.data[i].rating+"</p><div class=form-check form-check-inline><input class=form-check-input type=checkbox id="+i+" data-response="+theText+" value="+theResponse.data[i].images.fixed_width_still.url+"><label class=form-check-label for=inlineCheckbox"+i+">Add to favorites</label></div></div>");
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

function displayGifInfoAddRemove10 (event){
    //URL query
    event.preventDefault();
    
    //checking the count of images to display
    //if it <=0, then we hide the div
    theCount += event.data.theCountData;
    if (theCount > 0) {
        $("#newDiv.row").show();
    }
    if (theCount <=0) {
        $("#newDiv.row").hide();
        
    }

    //var for queryURL and new count
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theText + "&limit="+theCount+"&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
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
        for(var i =0; i < response.data.length; i++){
            $("#newDiv").prepend("<div id=newCol class=col-md-auto><img src="+response.data[i].images.fixed_width_still.url+" id="+i+"><p>Rating: "+response.data[i].rating+"</p><div class=form-check form-check-inline><input class=form-check-input type=checkbox id="+i+" data-response="+theText+" value="+response.data[i].images.fixed_width_still.url+"><label class=form-check-label for=inlineCheckbox"+i+">Add to favorites</label></div></div>");
        }
    });
}

// Generic function for displaying the gif, when button is clicked
$(document).on("click", ".gif", displayGifInfo);
//function for displaying +10 or -10 images
$(document).on("click", "#10", {theCountData: +10}, displayGifInfoAddRemove10);
$(document).on("click", "#-10",{theCountData: -10}, displayGifInfoAddRemove10);
//function to change src of img to moving
$(document).on("click", "img", function(event) {
    event.preventDefault();
    //theGif is the target id
    var theGif = event.target.id;
    //theSrc is the target src
    var theSrc = event.target.src;
    //setting moving to url with moving image
    var moving = theResponse.data[theGif].images.fixed_width.url;
    //setting notmoving to still image
    var notMoving = theResponse.data[theGif].images.fixed_width_still.url;
    //if theSrc is notMoving, then we move it
    if(theSrc === notMoving){
        $("#"+theGif+"").attr('src', moving);
    }
    //else notMoving
    else {
        $("#"+theGif+"").attr('src', notMoving);

    }
    
  });
//function to add favorites
$(document).on("click", ".form-check-input", function() {
    console.log(isChecked);
    //the pictureFavoriteRespone is this attr of data-response (helps me figure out what object it is)
    var pictureFavoriteResponse = $(this).attr("data-response");
    //seting id to this id
    var id = $(this).attr("id");
    //setting isCheck to this checked
    var isChecked = $(this).attr("checked");
    //if isChecked, is checked (meaning we unchecked it to remove it), remove image
    if(isChecked ==="checked"){
        console.log($("#newColFavs"+pictureFavoriteResponse+id));
        $("#newColFavs"+pictureFavoriteResponse+id).remove();
        $(this).removeAttr("checked");
    }
    //else, we add the image to our favorites
    else {
    $(this).attr("checked", "checked");
    //make ajax call to get the image and then place it in the favorites
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pictureFavoriteResponse + "&limit="+theCount+"&api_key=9u4JvD0W9vUUNG6PL9RgeTwEsPd5USlV";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
       
    
        $("#favoriteImages").append("<div id=newColFavs"+pictureFavoriteResponse+id+" class=col-md-auto><img src="+response.data[id].images.fixed_width_still.url+" id="+id+"></div>");
       
        });
    }

});

//when the clear favorites button is clicked, we clear favorites
$(document).on("click", ".clear", function() {
    $("#favoriteImages").empty();
});



// Calling the renderButtons function to display the intial buttons
renderButtons();

