"use strict";

$(document).ready(function() {

  //backspace event handling for new tweet text
  $('.tweet-text').on("keyup", function() {
    if(event.keyCode === 8) {
      let allowedChars = 140;
      let currentChars = ($(this).val()).length;
      console.log(currentChars);

      //updating counter
      $(".counter").text(allowedChars-currentChars);

      //change counter to red if beyond character limit
      if (allowedChars - currentChars < 0) {
        $(".counter").css("color", "red");
      } else {
        $(".counter").css("color", "dimgray");
      }
    }
  });

  //typing new tweet event handling
  $(".tweet-text").on("keypress", function() {
    let allowedChars = 140;
    let currentChars = ($(this).val()).length +1;

    //updating counter
    $(".counter").text(allowedChars-currentChars);

    //change counter to red if beyond character limit
    if (allowedChars - currentChars < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "dimgray");
    }
  });
});

//on backspace, increase count