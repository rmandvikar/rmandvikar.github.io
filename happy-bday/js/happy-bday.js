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
var rng = new Random();
Random.prototype.Shuffle = function (a) {
    var shuffled = [];
    for (var i = a.length - 1; i >= 0; i--) {
        var next = rng.Next(i + 1);
        shuffled.push(a[next]);
        var t = a[next];
        a[next] = a[i];
        a[i] = t;
    }
    return shuffled;
}

// ref: https://www.amazon.com/Funny-Abusive-Birthday-Party-Balloons/dp/B07XWQ7XH2
var words = [
    "Older, not wiser.",
    "The wrinkles make you look young.",
    "Worst. Party. Ever.",
    "Birthday b*tch.",
    "F*ck, you're old.",
    "Old AF.",
    "Old bastard.",
    "You're old as sh*t!",
    "Happy f*cking birthday.",
    "At least you're ~sexy~ ~smart~ ~fun~ ... nevermind."
]

var changeWordTimeout;
var iwords = 0;
var changeWord = function() {
    if (iwords % words.length == 0) {
        rng.Shuffle(words);
        iwords = 0;
    }
    $('body > div > span')
        .text(words[iwords]);
    iwords++;
    changeWordTimeout = setTimeout(function() { changeWord(); }, 4000);
}

function stopChangeWord() {
    clearTimeout(changeWordTimeout);
}

function ehandler(event) {
    if (event.keyCode == 8 || event.type == 'tap') {
        console.log('Backspace was pressed');
        stopChangeWord();
        event.preventDefault();
    }
    else if (event.keyCode == 37 || event.type == 'swipeleft') {
        console.log('Left was pressed');
        event.preventDefault();
    }
}

$(document).ready(function () {
    changeWord();
    $(document).on('keydown', ehandler);
    $(document).on('tap swipeleft', ehandler);
});

//}