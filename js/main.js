var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// $(document).keypress(function() {
//   if (!started) {
//     $("#title").text("Level " + level); 
//     nextSequence();
//     started = true;
//   }
// });
$("#start").click(function () {
  if (!started) {
    $("#start").hide(); 
    $("#title").text("Level " + level); 
    nextSequence();
    started = true;
  }
});



$(".test").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);  

  playSound(userChosenColour); 
  animatePress(userChosenColour); 

  checkAnswer(userClickedPattern.length - 1);  
});

function stratOver(){
  level = 0;
  gamePattern = []; 
  started = false;
  $("#title").text("Press Start to Play"); 
  $("#start").fadeIn(500);
}




function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

  
    playSound("wrong");

   
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

 
    $("#title").text("Game Over, Press Any Key to Restart");
   stratOver()
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;  
  $("#title").text("Level " + level); 

  var randomNumber = Math.floor(Math.random() * 4); 
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); 

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
  playSound(randomChosenColour);  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
stratOver
