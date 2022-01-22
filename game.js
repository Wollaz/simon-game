userClickedPattern = [];
gamePattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

//  Generate a sequence of colors
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * buttonColours.length);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);

    // Buttons effects
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // Increment level and change h1 title
    level++;
    $("#level-title").text(`LEVEL ${level}`);
}

// Detect button click, capture id, play audio and check last item in array
$(".btn").on("click", function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer([userClickedPattern.length-1]);
})

// Play an audio
function playSound(sound){
    sound = new Audio(`sounds/${sound}.mp3`);
    sound.play();
}

// User click effect 
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");   
    }, 100);
}

// Does what the function says
function restartGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

// Start Game
$(document).on("keydown", function(){
    if(started === false) {
        nextSequence();
        started = true;
    }
})

//  This function checks if the last item clicked by user is equal to the last item generated
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
            nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        restartGame();
    }
}
