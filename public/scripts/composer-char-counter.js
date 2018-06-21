"use strict";

$(document).ready(function() {
  $(".tweet-text").on("keypress", function() {
    let allowedChars = 140;
    let currentChars = ($(this).val()).length +1;
    let target = $(this).next().next();
    target.text(allowedChars-currentChars);
    console.log("target: " + target);
    console.log("this: " + this);
    console.log("currentChars: " + currentChars);
    if (allowedChars - currentChars.length < 0) {
      target.css("color", "red");
    } else {
      target.css("color", "black");
    }
  });
});