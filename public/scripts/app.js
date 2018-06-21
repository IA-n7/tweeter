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

  //New tweet "Compose" button handling
  $(function() {
    var $compose = $('.compose');
    $compose.on('click', function () {
      $(".new-tweet").slideToggle(300);
      $(".tweet-text").focus();
    });
  });

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function createTweetElement (tweetObj) {
    //defining data points
    let userName = tweetObj["user"]["name"];
    let avatar = tweetObj["user"]["avatars"]["small"];
    let handle = tweetObj["user"]["handle"];
    let content = tweetObj["content"]["text"];
    let created_at = tweetObj["created_at"];

    let timeAgo = Math.round(((((Date.now() - created_at) / 1000) / 60) / 60) /24);

    //creating new-tweet element and plugging in data points
    let $tweet = $("<article>").addClass("tweet")
      .append(`<header><img class=avatar src=${avatar} alt=" "><span class=name>${userName}</span><span class=handle>${handle}</span></header>`)
      .append(`<div class=content>${escape(content)}</div>`)
      .append(`<footer class=created_at>${timeAgo} Days ago<div class=icons><img src="/images/flag.png"><img src="/images/arrows.png"><img src="/images/happy.png"></div</footer>`);
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

  //Initial tweet container loading
  loadTweets();


  //POSTing submitted tweets
  $(function() {
    //tweet button handler
    var $button = $('.tweet-button');
    $button.on('click', function () {
    let $temp = $("[name='text']").serialize();
    //empty-field and over-charater-limit handlers
    if ($temp.length-5 > 140) {
      $check = $(".over-limit").val();
      //checking for existence of warning message, stopping duplicates
      if ($check === undefined) {
        let $tooManyChars = $(`<p class=over-limit>Too many character!</p>`)
        $(".new-tweet").append($tooManyChars);
        $tooManyChars.fadeOut(4000);
        setTimeout(function(){ $(".over-limit").remove(); }, 4000);
      }      
      return;
    }    
    if ($temp === "text=") {
      $check = $(".empty-field").val();
      //checking for existence of warning message, stopping duplicates
      if ($check === undefined) {
        let $noChars = $(`<p class=empty-field>Please enter a tweet!</p>`)
        $(".new-tweet").append($noChars);
        $noChars.fadeOut(4000);
        setTimeout(function(){ $(".empty-field").remove(); }, 4000);
      }
      return;
    } else {
      //POSTig data tweets url/database
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
