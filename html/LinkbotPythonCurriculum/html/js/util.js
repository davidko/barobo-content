function GetRobotId()
{
  var robotID;

  if( typeof window.ch4_RobotID !== 'undefined' && window.ch4_RobotID !== null) {
    robotID = window.ch4_RobotID;
  } else {
    robotID = GetURLParameter('robotID');
  }
  return robotID;
}

function AddRobotToGetParams(robotId)
{
    $('.navheader').find('a').each(function(index, element) {
        var href = $(this).attr('href').split('?')[0];
        href = href + "?robotID="+robotId;
        $(this).attr('href', href);
      });
    $('.navfooter').find('a').each(function(index, element) {
        var href = $(this).attr('href').split('?')[0];
        href = href + "?robotID="+robotId;
        $(this).attr('href', href);
      });
}

function RepopulateManager() {
    var existingId = GetURLParameter("robotID");
    if (typeof existingId !== "undefined") {
        Linkbots.managerAdd(existingId);
        Linkbots.managerConnect();
        Linkbots.managerRedraw();
    }
}

var staticRobot = (function () {
  var bot;
  return function (goodRobotCallback) {
    if (typeof bot === "undefined") {
      RepopulateManager();
      bot = Linkbots.acquire(1).robots[0];
      if (typeof bot === "undefined") {
        bot = { _id: "ABCD" };
      }
      else {
        goodRobotCallback();
        AddRobotToGetParams(bot._id);
      }
    }
    return bot;
  };
}());

$( function() {
    document.body.appendChild(Linkbots.managerElement());
    $('.book').attr('title', '');

    // Add a LinkbotLabs icon on the left side that sticks no matter where you scroll
    var baseStyle = "width:auto;height:auto;position:fixed;left:20px;background-color:#fff;padding:5px;border:solid;border-width:1px;top:20px;";
    $('body').append('<div id="navIcon" style="'+baseStyle+'top:20px;"> <a href="/index.html"><img src="images/linkbot-labs-ER-logo-200x46px.png"/></a> </div>');

    // Rename "Home" links to "ToC"
    $('a[href^="index.html"]').text("Table of Contents");
});

var imageToggle = (function() {
  var images = [$("<img src='images/double-chevron-down.svg'></img>")
               ,$("<img src='images/double-chevron-up.svg'></img>")
               ];
  var currentIdx = 0;
  return function () {
    return images[(++currentIdx) % 2];
  };
}());

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-22263798-3', 'auto');
  ga('send', 'pageview');

