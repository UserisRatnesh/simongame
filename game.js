
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
    checkAnswer(userClickedPattern.length - 1);
});


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
        $("#level-title").text("Game Over, Press Start button to start the Game Again");
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

    if (!start) {

        $("h1").text("level " + level);
        nextSequence();

        start = true;
        $(".start-btn").slideUp();
    }
});

// restart function.
function startOver() {

    level = 0;
    gamePattern = [];
    start = false;
}

