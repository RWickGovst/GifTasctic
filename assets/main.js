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
        console.log(topicName);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=uLApXoKhCJXtCH2lOlPkxCj2HQxXeeTf&q=" + topicName + "&limit=10&rating=g";

        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
        

        });
    });

    $("#add-topic").on("click", function (event) {
        var userTopic = $("#topic-input").val();
        topics.push(userTopic);
        event.preventDefault();
        renderButtons();
        });

    renderButtons();
