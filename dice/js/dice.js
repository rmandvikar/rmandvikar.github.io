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

//{ Random

function Random() {
}
Random.prototype.Next = function (limit) {
    return Math.floor((Math.random() * limit));
}

//}

//{ GameConsole

var diceNumbers = [ '⚀', '⚁', '⚂', '⚃', '⚄', '⚅' ]
var rng = new Random();

function GameConsole() {
}

GameConsole.prototype.Roll = function () {
    var number = diceNumbers[rng.Next(diceNumbers.length)];
    var $face = $('#grid span');
    $face.text(number)
        .stop(true).hide().stop(true).fadeIn();
}

//{ init

function ehandler(event) {
    if (event.keyCode == 13 || event.keyCode == 32 || event.type == 'tap') {
        console.log('Enter/Space/Tap was pressed');
        gameconsole.Roll();
        event.preventDefault();
    }
}

var gameconsole = new GameConsole();
$(document).ready(function () {
    console.log('ready!');
    $(document).on('keydown', ehandler);
    $('#grid').on('tap', ehandler);
});

//}