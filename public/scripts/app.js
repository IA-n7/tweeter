/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function createTweetElement (tweetObj) {
    let userName = tweetObj["user"]["name"];
    let avatar = tweetObj["user"]["avatars"]["small"];
    let handle = tweetObj["user"]["handle"];
    let content = tweetObj["content"]["text"];
    let created_at = tweetObj["created_at"];

    let timeAgo = Math.round(((((Date.now() - created_at) / 1000) / 60) / 60) /24);


    let $tweet = $("<article>").addClass("tweet")
      .append(`<header><img class=avatar src=${avatar} alt=" "><span class=name>${userName}</span><span class=handle>${handle}</span></header>`)
      .append(`<div class=content>${escape(content)}</div>`)
      .append(`<footer class=created_at>${timeAgo} Days ago<img class=icon src="/images/flag.png"><img class=icon src="/images/arrows.png"><img class=icon src="/images/happy.png"></footer>`);
    return $tweet;
  }

  function renderTweets (data) {
    $(".tweets").empty();
    for (let i = 0; i < data.length; i++) {
      let tweet = createTweetElement(data[i]);
      $(".tweets").prepend(tweet);
    }
  }

  function loadTweets () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    });
  }

   loadTweets();

  $(function() {
    var $button = $('.tweet-button');
    $button.on('click', function () {
    let $temp = $("[name='text']").serialize();
    if ($temp.length-5 > 140) {
      alert("Too many characters!")
      //set time-out
      return;
    }    
    if ($temp === "text=") {
      alert("Please enter a tweet!")
      return;
    } else {
        $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $temp,
        success: function (data) {
          loadTweets();
          $(".tweet-text").val("");
          $(".counter").text("140");
        }
        });
    }
    });
  });

});
