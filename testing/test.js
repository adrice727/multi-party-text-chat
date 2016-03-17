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

function onCompletion(status, page, index) {

    page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', function() {
        page.evaluate(function(index) {
            
            // receiving the correct index and jQuery reference

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

            $(function() {

                window.startChatting(firstNames[index]);
                
                function readyToChat () {
                    if (!!$('#readyToChat')) {
                        startChatting();
                    } else {
                        setTimeout(readyToChat, 1000);
                    } 
                }
                
                readyToChat();

                function startChatting() {
                    var interval = getRandomInterval();
                    setInterval(postMessage, interval);
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
                    console.log('posting message in page ' + index);
                    console.log('func?',window.readyToChat);
                    $('textarea.ot-composer').val(getRandomPhrase());
                    $('button.ot-send-button').click();
                }

                setTimeout(startChatting, 3000);
            });


        }, index);
    },index);

    if (index >= instances - 1) {
        var minutes = 1;
        console.log('Phantom will exit in ' + minutes + ' minute(s)');
        setTimeout(function() {
            phantom.exit();
        }, 1000 * 60 * minutes); // exit after last page opened
    }
}

function openPage(page, index) {
    page.open(url + '?i=' + index, function(status) {
        ++count;

        setTimeout(function() {
            onCompletion(status, page, index);
        }, 2000);
    }); //Append i to allow tracking
}

var startTime = Date.now();
for (var i = 0; i < instances; i++) {
    var page = require('webpage').create();
    pages.push(page);
    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };
    // page.onResourceReceived = onResourceReceived;
    // page.onResourceRequested = onResourceRequested;
    openPage(page, i);
}