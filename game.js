var buttonColors = ["red", "blue", "green", "yellow"]
var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 0;

$(document).ready(function () {

    $(document).keydown(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

        if (regex.test(str) && !gameStarted) {
            nextSequence();
            gameStarted = true;
        }
    });

    $(".btn").click(function (e) {

        if (gameStarted) {
            var chosenColor = e.target.id;
            userClickedPattern.push(chosenColor);
            playSound(chosenColor);
            animatePress(chosenColor);
            checkAnswer(userClickedPattern.length - 1);
        }
    });

});

function checkAnswer(currLevel) {
    if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        addInOutClass("body", "game-over", 200);
        $("h1").text("Game Over! Press any key to restart game");
        addInOutClass("#"+gamePattern[currLevel], "pressed-correct", 2000); //Show correct
        reset();
    }
}


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
    playSound(randomColor);
    level++;
    setLevelTitle();
    userClickedPattern = [];
}

function reset() {
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

function playSound(name) {
    new Audio('sounds/' + name + '.mp3').play();
}

function animatePress(currentColor) {

    var currentColor = '#' + currentColor;
    var pressedClass = "pressed";

    addInOutClass(currentColor, pressedClass, 200);
}

function addInOutClass(selector, classToAdd, time) {
    $(selector).addClass(classToAdd);

    setTimeout(function () {
        $(selector).removeClass(classToAdd);
    }, time);
}

function setLevelTitle() {
    $("h1").text("Level " + level);
}
