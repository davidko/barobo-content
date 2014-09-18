$( function() {

var thisExercise = $('.ch4ex3');

var bot = staticRobot(function () {$('.unknown-robot-id-comment', thisExercise).text('');});

$('.robotID', thisExercise).text(bot._id);

var j1text = '0';
var j3text = '0';

$('.tryNow', thisExercise).click( function(obj) {
	var j1 = parseFloat(j1text);
	var j2 = 0;
	var j3 = parseFloat(j3text);
	bot.move(j1, j2, j3);
});

$('.stop', thisExercise).click( function(obj) {
	bot.stop();
});

$('input.j1text', thisExercise).keyup( function() {
  j1text = $(this).val();
});

$('input.j3text', thisExercise).keyup( function() {
  j3text = $(this).val();
});

$('.expand-program', thisExercise).click(function (event) {
    // Suppress addition of this navigation event to the browser's history, so
    // the Back button isn't screwed up.
    event.preventDefault();

    $('pre.hidden', thisExercise).slideToggle();

    // Flip the hider tab image
    $('img', this).replaceWith(imageToggle());
});

});
