const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let UserClickedPattern = [];
let hasStarted = false;
let level = 0;
let highScore = 0;

function updateScore() {
    $("#score").text("SCORE: " + level);
    if (level > highScore) {
        highScore = level;
        $("#highscore").text("HIGHSCORE: " + highScore);
    }
}

function nextSequence() {
    level++;
    $(".msg").html("&#128535;<br>WAIT");
    const randomColor = getRandom();
    updateSequence(randomColor);
    flashButton(randomColor);
    playSound(randomColor);
    // console.log(gamePattern);
    updateScore();
    setTimeout(function () {
        $(".msg").html("&#128526;<br>READY");
    }, 1000);
}

function getRandom() {
    const randomIndex = Math.floor(Math.random() * buttonColors.length);
    return buttonColors[randomIndex];
}

function updateSequence(newColor) {
    gamePattern.push(newColor);
}

function flashButton(color) {
    $("#" + color).fadeIn(50).fadeOut(50).fadeIn(50);
}

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".circle-container").click(function () {
    if (!hasStarted) {
        nextSequence();
        hasStarted = true;
    }
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".button").click(function () {
    const userChosenColor = $(this).attr("id");
    // console.log("User clicked:", userChosenColor);
    UserClickedPattern.push(userChosenColor);
    // console.log(UserClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(UserClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (UserClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("success");
        if (UserClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                UserClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("wrong");
        playSound("wrong");
        bgRedFlash();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        $(".msg").html("&#128544;<br>GAME OVER");
        setTimeout(function () {
            $(".msg").html("&#128515;<br>PLAY");
        }, 1000);
        resetGame();
    }
}

function resetGame() {
    level = 0;
    gamePattern = [];
    hasStarted = false;
    UserClickedPattern = [];
    updateScore();
}

function bgRedFlash() {
    $("body").addClass("darkredBG");
    setTimeout(function () {
        $("body").removeClass("darkredBG");
    }, 300);
}
