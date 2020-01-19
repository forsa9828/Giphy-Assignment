$(document).ready(function(){
    // Array of strings
    var topics = ["Chihuahua", "Husky", "Gold Retriever", "Corgi", "Beagle"];

    // function to display on page
    function displayDogs() {
        
      var dogs = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dogs + "&api_key=YbFQR9cTALT3B1rk9PHhJ28rrZc9sanY&limit=10";

      // Creates AJAX call 
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
        $("#dogsview").empty();

        var results = response.data;

        // Retrieves the Rating Data
        console.log(response);

        // Loops the limit 10
        for(var i = 0; i < results.length; i++) {

          // Creates a div 
          var dogsDiv = $("<div>");

          // Creates an element to have the rating displayed
         
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          
          // User can click images to animate by call class
          var dogsImage = $("<img>");
          dogsImage.attr("src", results[i].images.fixed_height_still.url);
          dogsImage.attr("data-still", results[i].images.fixed_height_still.url);
          dogsImage.attr("data-animate", results[i].images.fixed_height.url);
          dogsImage.attr("data-state", "still");
          dogsImage.addClass('dogsImage');

          // Displays the rating
          dogsDiv.prepend(p);

          // Displays the dogsImage
          dogsDiv.prepend(dogsImage);
          $("#dogsview").prepend(dogsDiv);
        }

      // clicked image's state is still, updated src attribute to what data-animate value is.
      // Set the image's data-state to animate
      // Else set src to the data-still value
        $(".dogsImage").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          console.log(state);

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });        
    }

    // Function for displaying data
    function renderButtons() {

      // Deletes topics before adding new 
      $("#buttons").empty();

      for(var i = 0; i < topics.length; i++) {

        // generates buttons of topics
        var dogsAdd = $("<button>");

        // Adds a class of dogs to our button
        dogsAdd.addClass("dogs");

        // Added a data-attribute
        dogsAdd.attr("data-name", topics[i]);

        // Provided the og button text
        dogsAdd.text(topics[i]);

        // Adding buttons to the div
        $("#buttons").append(dogsAdd);
      }
    }

    // Event function for when the add dogs is clicked
    $("#add-dogs").on("click", function(event){
      event.preventDefault();

      // Grabbing Input 
      var dogs = $("#dogs-input").val().trim();

      // added to the array
      topics.push(dogs);

      // Calling renderButtons which handles the processing of the array
      renderButtons();
    });

    // Adding click event listeners to all elements with a class of dogs
    $(document).on("click", ".dogs", displayDogs);

    // Calling the renderButtons function to display the og buttons
    renderButtons();
});
