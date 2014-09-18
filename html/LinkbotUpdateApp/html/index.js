$(function () {
"use strict";

// Code courtesy Github: http://goo.gl/vtSdBK
var qs = (function(a) {
  if (a === "") { return {}; }
  var b = {};
  for (var i = 0; i < a.length; ++i) {
    var p=a[i].split('=');
    if (p.length !== 2) { continue; }
    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split('&'));

var badRobot = qs["badRobot"];
if (typeof badRobot !== "undefined") {
  var message =
    "It looks like you connected a robot that needs updating. It has"
    + " <b>" + badRobot.toUpperCase() + "</b> printed on its face, above"
    + " the 'A' and 'B' buttons:"
    + " <div class='popup-robo-image'><span class='popup-robo-id'>"
    + badRobot.toUpperCase() + "</span></div>"
    + " <p>Follow the instructions on this page to get the little guy ready"
    + " for action."
    + " <p>When you are finished updating the robot, press the Back button in"
    + " the toolbar to continue where you left off.";

  bootbox.dialog({
    title: "<h3 class='text-warning'>Linkbot Update Required!</h3>",
    message: message,
    buttons: {
      "OK": {
        className: "btn-primary",
      },
    },
    onEscape: function () {}, /* Allow escape key */
  });
}

$(".show-win-7").click(function() {
  $(".win-7-instructions").toggleClass("hidden");
  $(".win-8-instructions").addClass("hidden");
});
$(".show-win-8").click(function() {
  $(".win-8-instructions").toggleClass("hidden");
  $(".win-7-instructions").addClass("hidden");
});
});
