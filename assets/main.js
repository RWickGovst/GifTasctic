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

        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          var results = response.data;  
          
          for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var topicImage = $("<img>");
                var rating = results[i].rating;
                
                var p = $("<p>").text("Rating: " + rating);
                
                
                topicImage.attr("src", results[i].images.fixed_height.url);
    
                gifDiv.prepend(p);
                gifDiv.prepend(topicImage);
    
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

    renderButtons();
