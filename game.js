
// Given colors of button available.
var buttonColor = ["red", "blue", "green", "yellow"];

// Randomly generated sequence of game.
var gamePattern = [];

// Define game level.
var level = 0;

// Generating random sequence using function.

function nextSequence() {
    // once a new color added level is incresed.
    userClickedPattern = []; // Remove previous pattern
    level++;
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColor[randomNumber];
    gamePattern.push(randomColor);

    // Playing sound using randomly selcted sequence of the game.
    playSound(randomColor);

    // Animation.
    animate(randomColor);
}



// Function to playSound.
function playSound(currentColor) {
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}

// Pressed animation function.
function animate(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// User clicked pattern.
var userClickedPattern = [];

// user Clicked button sequence.
$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animate(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // After every click check is performed
});

$(document).keydown((event) => {

    var key = event.key;
    var userChosenColor = push(key, userClickedPattern);

    if (userChosenColor && start) {
        playSound(userChosenColor);
        animate(userChosenColor);
        checkAnswer(userClickedPattern.length - 1); // After every click check is performed
    }
    // Now it only triggers wrong ans sound when key pressed belongs to alphabets only
    else if (start && /^[a-zA-Z]$/.test(key)) {
        // wrong key pressed
        // play error sound.
        playSound("wrong");
        // animate complete body with red.
        $("body").addClass("game-over");
        // pop game over .
        $("#level-title").html('<span>Game Over,</span> Press <span>Start button</span> or <span>Enter</span> to start the Game Again');
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);
        $(".start-btn").slideDown();
        startOver();
        // define any key to restart the game. 
    }
})

function push(key, userClickedPattern) {
    var userChosenColor = null;

    switch (key) {
        case "r":
            userChosenColor = "red";
            break;
        case "g":
            userChosenColor = "green";
            break;
        case "b":
            userChosenColor = "blue";
            break;
        case "y":
            userChosenColor = "yellow";
            break;
        default:
            return null; // return null for invalid keys
    }

    userClickedPattern.push(userChosenColor);
    return userChosenColor;
}


//Check answer function.
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // if length of both becomes equal then nextSequence is called means it clears all previous userClickedPatterns
        if (userClickedPattern.length === gamePattern.length) {
            //level incresed.
            //one more color added to game sequence.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    }
    else {


        // play error sound.
        playSound("wrong");
        // animate complete body with red.
        $("body").addClass("game-over");
        // pop game over .
        $("#level-title").html('<span>Game Over,</span> Press <span>Start button</span> or <span>Enter</span> to start the Game Again');
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);
        $(".start-btn").slideDown();
        startOver();
        // define any key to restart the game. 
    }

}


// taking track if game started or not.and starting the game.
var start = false;
$(".start-btn").click(function () {
    startGame();
});

$(document).keydown((event) => {
    var key = event.key;
    if (start) return;
    if (key === "Enter") {
        startGame();
    }
})

function startGame() {
    if (!start) {

        $("h1").text("level " + level);

        start = true;
        $(".start-btn").slideUp();
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}

// restart function.
function startOver() {

    level = 0;
    gamePattern = [];
    start = false;
}

