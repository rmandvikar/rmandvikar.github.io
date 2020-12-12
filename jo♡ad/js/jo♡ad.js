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

// ref: https://mashable.com/article/john-oliver-adam-driver-jokes/
var quotes = [
    'Collapse on my chest, you impenetrable barrier. Crush my ribcage, you load-bearing behemoth.',
    'Choke slam me to hell, you nasty shed. Jam your mandible claw down my throat, you irredeemable steer.',
    'Slap a restraining order on me you forlorn block. Beg me to stop, you menacing obstacle.',
    'Scratch my sofa, you purring mountain. Eat my toilet paper, you fuzzy landslide.',
    'Pull my heart out through my ear, you meaty oak tree. Impale my brain, you unacceptable monstrosity.',
    'Sneeze in my McFlurry, you pensive bison. Ravage my lungs, you relentless hillock.',
    'Step on my throat, Adam Driver, you rudely large man. Break my fingers, you brooding mountain.',
    'Shatter my knees, you f*ckable redwood. Snap off my toes, you big, unwashed buffalo.',
    'Explore the f*cking space, you hollow-boned Mr Bean cosplayer. Look around you, you underbaked gingerbread boy.',
]

var changeQuoteTimeout;
var iquotes = 0;
var changeQuote = function() {
    if (iquotes % quotes.length == 0) {
        rng.Shuffle(quotes);
        iquotes = 0;
    }
    var quote = quotes[iquotes];
    var quoteHtml = quote
        .replaceAll(". ", "._split_")
        .split("_split_", 2)
        .join("<br />");
    $('body > div > span')
        .html(quoteHtml);
    iquotes++;
    changeQuoteTimeout = setTimeout(function() { changeQuote(); }, 8000);
}

function stopChangeQuote() {
    clearTimeout(changeQuoteTimeout);
}

function ehandler(event) {
    if (event.keyCode == 8 || event.type == 'tap') {
        console.log('Backspace was pressed');
        stopChangeQuote();
        event.preventDefault();
    }
    else if (event.keyCode == 37 || event.type == 'swipeleft') {
        console.log('Left was pressed');
        event.preventDefault();
    }
}

$(document).ready(function () {
    changeQuote();
    //$(document).on('keydown', ehandler);
    //$(document).on('tap swipeleft', ehandler);
});

//}