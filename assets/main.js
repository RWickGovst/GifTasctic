var topics = ["Sportbike", "Cruiser", "Touring"];

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < topics.length; i++) {
    var topicBtn = $("<button>");
    topicBtn.text(topics[i])
    topicBtn.addClass("topic-btn");
    topicBtn.attr("data-topicname", topics[i]);
    $("#buttons-view").append(topicBtn)

  }
}
$(document).on("click", ".topic-btn", function (event) {
  var topicName = $(this).attr("data-topicname");

  var apiKey = "uLApXoKhCJXtCH2lOlPkxCj2HQxXeeTf";

  // console.log(topicName);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + topicName + "&limit=10&rating=pg";

  //  ajax call to get gifs, 10 total
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
console.log(results);
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var topicImage = $("<img>");
      var rating = results[i].rating;
      // to display rating
      var p = $("<p>").text("Rating: " + rating);

      topicImage.attr("src" , results[i].images.fixed_height.url);
      topicImage.attr('data-still', results[i].images.fixed_height_still.url);
      topicImage.attr('data-animate', results[i].images.fixed_height.url);
      topicImage.attr('data-state', 'animate');
      topicImage.addClass("gif");
      gifDiv.addClass("col-md-3");
      // gifDiv.addClass("holder");
  
      // to display rating and gifs
      gifDiv.prepend(p);
      gifDiv.prepend(topicImage);
      // newest gifs on top
      $("#gifs-appear-here").prepend(gifDiv);
    }

  });
});

$("#add-topic").on("click", function (event) {
  var userTopic = $("#topic-input").val();
  topics.push(userTopic);
  event.preventDefault();
  renderButtons();
});
// need to pause gifs here
$(document).on("click", ".gif", function(){
  console.log("onclick gif");
//   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
// var stillState = "topics[i].images.480w_still";
// var animateState = "topics[i];"
  //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//   // Then, set the image's data-state to animate
//   // Else set src to the data-still value
if (state === "still") {
  console.log("changing to animate");
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  console.log("changing to still");
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});

renderButtons();
