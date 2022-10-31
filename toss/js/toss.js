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

//{ jquery

$.fn.addClassTemporarily = function (className, time) {
    var $this = this.addClass(className);
    setTimeout(function () {
        $this.removeClass(className);
    }, time)
    return this;
};

//}

//{ GameConsole

var numbers = [ "Heads", "Tails" ];
var rng = new Random();

function GameConsole() {
}

GameConsole.prototype.Roll = function () {
    var number = numbers[rng.Next(numbers.length)];
    // coin lands on side with 1:1000 probability
    var coinOnSideChance = 1000;
    if (rng.Next(coinOnSideChance) == coinOnSideChance -1) {
        number = "🙄";
    }
    var $face = $('#grid span');
    $face.text(number)
        .addClassTemporarily("wobble", 1000)
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