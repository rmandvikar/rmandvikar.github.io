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

var changeText = function() {
    const now = new Date();
    var nextFriday13th = findNextFriday13th(now);
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'short', // 'short' gives the 'mmm' format
        year: 'numeric',
        timeZone: 'UTC'
    };
    let nextFriday13thFormatted = new Intl.DateTimeFormat('en-GB', options).format(nextFriday13th)
        // ugh!
        .replace(/,/g, "")
        .replace("13", "13,");
    let remainingDays = calculateDays(now, nextFriday13th);
    let remainingDaysFormatted = `${remainingDays} days`;
    if (remainingDays > 0) {
        let last = `${remainingDays} days`;
        $('body > div > p > span').first()
            .text(nextFriday13thFormatted);
        $('body > div > p > span').last()
            .text(remainingDaysFormatted);
    }
    else {
        $('body > div > p > span').first()
            .text("💀");
        $('body > div > p').last()
            .text("");
    }
}

function findNextFriday13th(now) {
    let year = now.getUTCFullYear();
    let month = now.getUTCMonth();
    let day = 13;
    const utcnowDate = new Date(Date.UTC(year, month, now.getUTCDate()));
    while (true) {
        const date = new Date(Date.UTC(year, month, day));
        if (date >= utcnowDate) {
            // Friday = 5
            if (date.getUTCDay() === 5 && date.getUTCDate() === 13) {
                return date;
            }
        }
        if (month < 11) {
            month++;
        } else {
            month = 0;
            year++;
        }
    }
}

function calculateDays(now, date) {
    const utcnowDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    let dateUtc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    let timeDifference = dateUtc - utcnowDate;
    let daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.ceil(daysDifference);
}

$(document).ready(function () {
    console.log('ready!');
    changeText();
});

//}