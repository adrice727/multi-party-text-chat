/*eslint-env es6*/

/**
 * This calls N instances of URL in parallel
 */
var url = 'http://localhost:3000';
var instances = 10;
var pages = [];


var count = 0;

function onResourceReceived(response) {
    console.log((Date.now() - startTime) + ':' + response.stage + ':' + response.url);
}

function onResourceRequested(requestData, networkRequest) {
    console.log((Date.now() - startTime) + ':Request:' + requestData.url);
}

function onCompletion(status, page) {
    console.log(status);
    ++count;
    page.evaluate(function() {

        // 152 names
        var firstNames = [
            'Allison',
            'Arthur',
            'Ana',
            'Alex',
            'Arlene',
            'Alberto',
            'Barry',
            'Bertha',
            'Bill',
            'Bonnie',
            'Bret',
            'Beryl',
            'Chantal',
            'Cristobal',
            'Claudette',
            'Charley',
            'Cindy',
            'Chris',
            'Dean',
            'Dolly',
            'Danny',
            'Danielle',
            'Dennis',
            'Debby',
            'Erin',
            'Edouard',
            'Erika',
            'Earl',
            'Emily',
            'Ernesto',
            'Felix',
            'Fay',
            'Fabian',
            'Frances',
            'Franklin',
            'Florence',
            'Gabielle',
            'Gustav',
            'Grace',
            'Gaston',
            'Gert',
            'Gordon',
            'Humberto',
            'Hanna',
            'Henri',
            'Hermine',
            'Harvey',
            'Helene',
            'Iris',
            'Isidore',
            'Isabel',
            'Ivan',
            'Irene',
            'Isaac',
            'Jerry',
            'Josephine',
            'Juan',
            'Jeanne',
            'Jose',
            'Joyce',
            'Karen',
            'Kyle',
            'Kate',
            'Karl',
            'Katrina',
            'Kirk',
            'Lorenzo',
            'Lili',
            'Larry',
            'Lisa',
            'Lee',
            'Leslie',
            'Michelle',
            'Marco',
            'Mindy',
            'Maria',
            'Michael',
            'Noel',
            'Nana',
            'Nicholas',
            'Nicole',
            'Nate',
            'Nadine',
            'Olga',
            'Omar',
            'Odette',
            'Otto',
            'Ophelia',
            'Oscar',
            'Pablo',
            'Paloma',
            'Peter',
            'Paula',
            'Philippe',
            'Patty',
            'Rebekah',
            'Rene',
            'Rose',
            'Richard',
            'Rita',
            'Rafael',
            'Sebastien',
            'Sally',
            'Sam',
            'Shary',
            'Stan',
            'Sandy',
            'Tanya',
            'Teddy',
            'Teresa',
            'Tomas',
            'Tammy',
            'Tony',
            'Van',
            'Vicky',
            'Victor',
            'Virginie',
            'Vince',
            'Valerie',
            'Wendy',
            'Wilfred',
            'Wanda',
            'Walter',
            'Wilma',
            'William',
            'Kumiko',
            'Aki',
            'Miharu',
            'Chiaki',
            'Michiyo',
            'Itoe',
            'Nanaho',
            'Reina',
            'Emi',
            'Yumi',
            'Ayumi',
            'Kaori',
            'Sayuri',
            'Rie',
            'Miyuki',
            'Hitomi',
            'Naoko',
            'Miwa',
            'Etsuko',
            'Akane',
            'Kazuko',
            'Miyako',
            'Youko',
            'Sachiko',
            'Mieko',
            'Toshie',
            'Junko'
        ];

        // 30 words
        var words = [
            'bad',
            'easy',
            'lol',
            'Hurt',
            'giraffe',
            'code',
            'homes',
            'killer',
            'ice',
            'fire',
            'ice cream',
            'hangman',
            'destroy',
            'computer',
            'book',
            'dictionary',
            'technology',
            'power',
            'thunder',
            'controller',
            'dexterity',
            'keyboard',
            'thunderous',
            'blizzard',
            'hazardous',
            'algorithm',
            'destruction',
            'operation',
            'assignment',
            'despicable'
        ];

        var count = window.location.search.split('=')[1];
        document.getElementById('userName').value = firstNames[count];
        document.getElementById('setUser').click();

        function readyToChat() {
            if (!!window.readyToChat) {
                startChatting();
            } else {
                setTimeout(readyToChat, 500);
            }
        }

        function startChatting() {
            var interval = getRandomInterval();
            setInterval(postMessage(), interval);
        }

        function randomIndex() {
            return Math.min(Math.random() * words.length | 0, 29);
        };

        function getRandomPhrase() {
            return [words[randomIndex()], words[randomIndex()], words[randomIndex()], Date.now()].join(' ');
        }

        function getRandomInterval() {
            return Math.random() * 20 * 1000;
        }

        function postMessage() {
            document.getElementsByClassName('ot-composer')[0].value = getRandomPhrase();
            document.getElementsByClassName('ot-send-button')[0].click();
        }

        setTimeout(readyToChat, 500);

    });



    if (count >= instances) {
        setTimeout(function() {
            phantom.exit();
        }, 1000 * 60 * 2); // exit 2 minutes after last page opened
    }
}

var startTime = Date.now();
for (var i = 0; i < instances; i++) {
    var page = require('webpage').create();
    pages.push(page);
    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };
    page.onResourceReceived = onResourceReceived;
    page.onResourceRequested = onResourceRequested;
    page.open(url + '?i=' + i, function(status){ setTimeout(function(){onCompletion(status, page);}, 2000);}); //Append i to allow tracking
}