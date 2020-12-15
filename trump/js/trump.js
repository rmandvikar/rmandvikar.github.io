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

// ref: random
// ref: https://www.nj.com/politics/2017/05/pollsters_asked_for_first_word_that_comes_to_mind.html
// ref: https://dianeravitch.net/2020/05/31/robert-shepherds-glossary-of-adjectives-to-describe-trump/
// ref: Loser.com
var words = [
    //
    'Crook',
    'Traitor',
    'Crybaby',
    //
    'Bigot',
    'Clown',
    'Divisive',
    'Disgusting',
    'Failure',
    'Narcissist',
    'Dumbass',
    'Bully',
    'Asshole',
    'Egotistical',
    'Egotist',
    'Unqualified',
    'Liar',
    'Incompetent',
    'Idiot',
    //
    'Abhorrent',
    'Amoral',
    'Anti-democratic',
    'Arrogant',
    'Authoritarian',
    'Autocratic',
    'Avaricious',
    'Backward',
    'Base',
    'Benighted',
    'Bloated',
    'Blubbering',
    'Blundering',
    'Bogus',
    'Bombastic',
    'Boorish',
    'Bullying',
    'Bungling',
    'Cheap',
    'Childish',
    'Clownish',
    'Clueless',
    'Common',
    'Confused',
    'Conniving',
    'Corrupt',
    'Cowardly',
    'Crass',
    'Creepy',
    'Cretinous',
    'Criminal',
    'Crowing',
    'Crude',
    'Cruel',
    'Dangerous',
    'Delusional',
    'Demagogic',
    'Depraved',
    'Devious',
    'Dim',
    'Disgraceful',
    'Dishonest',
    'Disloyal',
    'Disreputable',
    'Dissembling',
    'Dog-whistling',
    'Doltish',
    'Dull',
    'Elitist',
    'Embarrassing',
    'Erratic',
    'Fascist',
    'Foolish',
    'Gauche',
    'Gluttonous',
    'Greedy',
    'Grudging',
    'Hate-filled',
    'Hateful',
    'Haughty',
    'Heedless',
    'Homophobic',
    'Humorless',
    'Hypocritical',
    'Idiotic',
    'Ignoble',
    'Ignominious',
    'Ignorant',
    'Immature',
    'Inarticulate',
    'Indolent',
    'Inept',
    'Inferior',
    'Insane',
    'Intemperate',
    'Irresponsible',
    'Kakistocratic',
    'Kleptocratic',
    'Laughable',
    'Loathsome',
    'Loud-mouthed',
    'Low-life',
    'Lying',
    'Mendacious',
    'Meretricious',
    'Monstrous',
    'Moronic',
    'Narcissistic',
    'Needy',
    'Oafish',
    'Odious',
    'Orange',
    'Outrageous',
    'Pampered',
    'Pandering',
    'Perverse',
    'Petty',
    'Predatory',
    'Puffed-up',
    'Racist',
    'Repulsive',
    'Rude',
    'Sanctimonious',
    'Semi-literate',
    'Senile',
    'Senseless',
    'Sexist',
    'Shady',
    'Shameless',
    'Sheltered',
    'Slimy',
    'Sluglike',
    'Sniveling',
    'Squeamish',
    'Stupid',
    'Swaggering',
    'Tacky',
    'Thick',
    'Thin-skinned',
    'Thuggish',
    'Toadying',
    'Transphobic',
    'Trashy',
    'Treasonous',
    'Twisted',
    'Ugly',
    'Unappealing',
    'Uncultured',
    'Uninformed',
    'Unprincipled',
    'Unread',
    'Unrefined',
    'Vain',
    'Venal',
    'Vicious',
    'Vile',
    'Vulgar',
    //
    'LOSER.com',
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