// FIXME code duplication--make our own little library of useful functions
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

var redRobot = GetURLParameter('redRobot');
var blueRobot = GetURLParameter('blueRobot');

$(function () {

document.body.appendChild(Linkbots.managerElement());

// If we got robot IDs through GET parameters, pass them on to other Next/Back
// buttons.

if (typeof redRobot !== 'undefined' && typeof blueRobot !== 'undefined') {
    $('.page-navigation').each(function () {
        $(this).click(function () {
            var href = $(this).attr('href');
            href = href + "?redRobot=" + redRobot
                 + "&blueRobot=" + blueRobot;
            $(this).attr('href', href);
        });
    });
    Linkbots.managerAdd(blueRobot, redRobot);
    Linkbots.managerConnect();
    Linkbots.managerRedraw();

    // Also pass it to any hidden form inputs. This is a bit hacky, being
    // only used on prediction.html and setup.html.
    $('input[name=redRobot]').attr('value', redRobot);
    $('input[name=blueRobot]').attr('value', blueRobot);
}



});
