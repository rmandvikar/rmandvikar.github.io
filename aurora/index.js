//{ stubs

if (typeof console === "undefined") {
    console = {
        log: function () { },
        info: function () { },
        warn: function () { },
        error: function () { }
    };
}

//}

//{ init

function Random() {
}
Random.prototype.Next = function (limit) {
    return Math.floor((Math.random() * limit));
}

$.fn.removeClassPrefix = function (prefix) {
    this.each(function (i, el) {
        var classes = el.className.split(" ").filter(function (c) {
            return c.lastIndexOf(prefix, 0) !== 0;
        });
        el.className = $.trim(classes.join(" "));
    });
    return this;
};

var animate = function() {
    $('body > div')
        .removeClassPrefix('tilecolor')
        .addClass('tilecolor' + tiles[random.Next(tiles.length)]);
    setTimeout(function() { animate(); }, 4000);
}

var tiles = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
var random = new Random();

$(document).ready(function () {
    //animate();
});

//}