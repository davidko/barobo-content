/**
 * Created by Adam on 12/12/2014.
 */


$(document).ready(function() {
    var setCookie, urlMap, cookies, cookie, name, value, equalIndex, i;

    setCookie = function(name, value, days) {
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        var cookie_value = encodeURIComponent(value) + ((days == null) ? "" : "; expires=" + expirationDate.toUTCString());
        document.cookie = encodeURIComponent(name) + "=" + cookie_value;
    };

    urlMap = {};
    cookies = document.cookie.split(';');
    for (i = 0; i < cookies.length; i++) {
        cookie = cookies[i];
        equalIndex = cookie.indexOf('=');
        if (equalIndex > 0) { // Ignoring where '=' is at the first index or not found.
            name = decodeURIComponent(cookie.substr(0, equalIndex));
            value = decodeURIComponent(cookie.substr(equalIndex + 1));
            urlMap[name] = value;
        }
    }
    $('a').each(function() {
        var value = urlMap[this.href];
        if (value !== undefined && value !== null) {
            $(this).addClass('visited');
        }
    }).click(function() {
        setCookie(this.href, true, 100);
    });
});