let canvas = document.querySelector("#ping-pongCanvas");
let ctx = canvas.getContext("2d");

const main = document.querySelector("main")

const canvasWidth = canvas.width = main.offsetWidth * 0.9;
const canvasHeight = canvas.height = window.innerHeight / 2;

let x = canvasWidth / 2;
let y = canvasHeight - 30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleBottomDistance = 10;
let paddleX = (canvasWidth - paddleWidth) / 2;
let paddleY = canvasHeight - paddleHeight - paddleBottomDistance;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 4;
let brickColumnCount = 5;
let brickPadding = 30;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let brickWidth = 50;
let brickHeight = 20;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let score = 0;

let lives = 3;

function defaultLiveAndScore() {
  score = 0;

  lives = 3;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = (c * (brickWidth + brickPadding)) +
          (canvasWidth - (brickColumnCount * (brickWidth + brickPadding))) / 2;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score + "/" + (brickRowCount * brickColumnCount), 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvasWidth - 65, 20);
}

function drawGameOver() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "32px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER.", canvasWidth / 3, canvasHeight / 2);
}

function drawWin() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "32px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("YOU WIN, CONGRATULATIONS!", canvasWidth / 6, canvasHeight / 2);
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  x += dx;
  y += dy;

  if (x + dx > canvasWidth - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvasHeight - ballRadius - paddleBottomDistance * 1.4) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;

      x = canvasWidth / 2;
      y = canvasHeight - 30;
      dx = 2;
      dy = -2;
      paddleX = (canvasWidth - paddleWidth) / 2;

    }
  }

  if (rightPressed && paddleX < canvasWidth - paddleWidth) {
    paddleX += 4;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 4;
  }
  if (lives > 0 && score < brickRowCount * brickColumnCount) {
    requestAnimationFrame(draw);
  } else if (score == brickRowCount * brickColumnCount) {
    drawWin();
  } else {
    drawGameOver();
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > paddleWidth / 2 &&
    relativeX < canvasWidth - paddleWidth / 2) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}


function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x - ballRadius && x < b.x + brickWidth + ballRadius &&
          y > b.y - ballRadius && y < b.y + brickHeight + ballRadius) {
          if (x - 3 < b.x - ballRadius || x + 3 > b.x + brickWidth + ballRadius) {
            dx = -dx;
          } else {
            dy = -dy;
          }
          b.status = 0;
          score++;
        }
      }
    }
  }
}

