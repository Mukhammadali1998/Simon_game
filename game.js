// 1 color conatiner
var buttonColours = ["red", "blue", "green", "yellow"];
// gamePattern container by computer
var gamePattern = [];
// game pattern of user clicked
var  userClickedPattern = [];
// fisrt starting point if the game(out of it is needed function we are giving false value so that it wil not applied) 
var started = false;
//Level of variable
var Level = 0;
// whatever key presses it will run the code
$(document).keypress(function(){
    if(!started){

        $("#level-title").text("Level " + Level);
        //3
        nextSequence();
        started =true;
    }
});
//4 defining which button is clicked by using attr property
$(".btn").click(function(){
    //here is dinined the color of button
    var userChosenColour = $(this).attr("id");
    // applied pattern, we sending to empty variable
    userClickedPattern.push(userChosenColour);
    // call back playsound function to apply differently by choosenColor
    playSound(userChosenColour);
    // animation call back function
    animatePress(userChosenColour);
    //call back check answer ()
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){

    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },100);
        };

    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        $("h1").text("Game over press any key to restart")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },100)
        startOver();
        console.log("Wrong")
    }

}

// 2
function nextSequence(){

    userClickedPattern =[];


    Level++;
    $("#level-title").text("Level "+Level);

    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}

function startOver(){
    // level 0 means there is no any level
    Level = 0
    // here we don't have to call started cause game is over so that started is false
    started = false;
    // empty array = 0
    gamePattern = [];
}



function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
        audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

};


