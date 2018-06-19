"use strict";

$(document).ready(function() {
  $(".tweet-text").on("keypress", function() {
    let allowedChars = 140;
    let currentChars = ($(this).val()).length;
    let target = $(this).next().next();
    target.text(allowedChars-currentChars);
    if (allowedChars - currentChars.length < 0) {
      target.css("color", "red");
    } else {
      target.css("color", "black");
    }
  });
});