$(function () {

showConnected = function(blueBot, redBot) {
  $('.form-group.connectStatus').addClass('well');

  if (typeof redBot !== 'undefined' && typeof blueBot !== 'undefined') {
      $('.form-group.connectStatus')
          .text('Connected!')
          .addClass('text-success')
          .removeClass('text-danger');
      $('.page-navigation').each(function () {
          $(this).removeAttr('disabled');
          $(this).click(function () {
              var href = $(this).attr('href').split('?')[0];
              href = href + "?redRobot=" + redBot._id
                   + "&blueRobot=" + blueBot._id;
              $(this).attr('href', href);
          });
      });
  }
};

// Reshow as connected if returning here via the back control (not the
// browser's back button)
if (typeof redRobot !== 'undefined' && typeof blueRobot !== 'undefined') {
  showConnected(blueRobot, redRobot);
}

$('#connectRobotsBtn').click( function(obj) {
    var blueBot, redBot;

    // Try to acquire two robots
    bots = Linkbots.acquire(2);
    if (bots.robots.length == 2) {
        // Robots are cool
        blueBot = bots.robots[0];
        blueBot.color(0,0,255);
        $('.form-group.blueRobot')
            .addClass('blue-connected');
        $('input[name="blueRobot"]').val(blueBot._id);

        redBot = bots.robots[1];
        redBot.color(255, 0, 0);
        $('.form-group.redRobot')
            .addClass('red-connected');
        $('input[name="redRobot"]').val(redBot._id);
    } else {
        // Need moar robots
        failMsg = 'Connection failed. Have you added robots to the Robot'
                + ' Manager? Needed: 2. Available: ' + bots.ready + '.';
        $('.form-group.blueRobot')
            .removeClass('blue-connected');
        $('.form-group.connectStatus')
            .text(failMsg)
            .addClass('text-danger')
            .removeClass('text-success');

        $('.form-group.redRobot')
            .removeClass('red-connected');
        $('.form-group.connectStatus')
            .text(failMsg)
            .addClass('text-danger')
            .removeClass('text-success');
    }

    showConnected(blueBot, redBot);

}); // click handler
}); // function wrapper
