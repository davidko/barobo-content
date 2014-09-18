$( function() {

var thisExercise = $('.ch4ex2');

var bot = staticRobot(function () {$('.unknown-robot-id-comment', thisExercise).text('');});

$('.robotID', thisExercise).text(bot._id);

$('.tryNow', thisExercise).click( function(obj) {
    bot.move(0, 0, -360);
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
