var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

let winningScore = 5;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var showWinScreen = false;

// function calculate mouse position
function calculateMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return { X: mouseX, y: mouseY };
}
// handleMouseClixk function
function handleMouseClick(evt) {
  if (showWinScreen) {
    showWinScreen = false;
  }
}
window.onload = function () {
  canvas = document.getElementById("game-canvas");
  canvasContext = canvas.getContext("2d");
  var framesPerSecond = 30;
  setInterval(callBoth, 1000 / framesPerSecond);

  // add event listeners
  canvas.addEventListener("mousedown", handleMouseClick);
  canvas.addEventListener("mousemove", function (evt) {
    var mousePosition = calculateMousePosition(evt);
    paddle1Y = mousePosition.y - PADDLE_HEIGHT / 2;
    // paddle2Y = mousePosition.y - PADDLE_HEIGHT / 2;
  });
};
// function reset ball
function ballReset() {
  if (player1Score >= winningScore || player2Score >= winningScore) {
    player1Score = 0;
    player2Score = 0;
    showWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}
// function callBoth
function callBoth() {
  drawEverything();
  moveEverything();
}
// function computerMovement
function computerMovement() {
  var paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}
// function moveEverything
function moveEverything() {
  if (showWinScreen) {
    return;
  }
  // calling computerMovement function
  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++;
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}
// function drawNet
function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
}
// function drawEverything
function drawEverything() {
  // nextline blanks out the screen with black
  colorRect(0, 0, canvas.width, canvas.height, "green");
  if (showWinScreen) {
    canvasContext.fillStyle = "white";
    if (player1Score >= winningScore) {
      canvasContext.fillText("You won", 350, 100);
    } else {
      canvasContext.fillText("The Computer Won", 350, 100);
    }
    
    canvasContext.fillText(
      "Click to continue",
      0.5 * canvas.width,
      0.5 * canvas.height
    );
    return;
  }
  drawNet();
  // Left player paddle
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
  // Righ computer paddle
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "white"
  );
  // nextline draws the ball
  colorCircle(ballX, ballY, 10, "white");
  // score stuff
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
}
function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
// function color Rect
function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
