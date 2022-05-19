function pingPong() {
  // canvas
  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.width = 1000;
  const canvasHeight = canvas.height = 600;

  // ball
  const ballRadius = 10;
  let x = canvasWidth / 2;
  let y = canvasHeight - 30;
  let dx = 4;
  let dy = -4;
  let ballCollided = false;

  // player
  const playerHeight = 10;
  const playerWidth = 75;
  const playerBottomDistance = 10;
  let playerX = (canvasWidth - playerWidth) / 2;
  let playerY = canvasHeight - playerHeight - playerBottomDistance;
  let rightPressed = false;
  let leftPressed = false;

  // brick
  const brickRowCount = 6;
  const brickColumnCount = 7;
  const brickPadding = 50;
  const brickOffsetTop = 30;
  const brickWidth = 25;
  const brickHeight = 25;

  const bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      let brickX = (c * (brickWidth + brickPadding)) +
        (canvasWidth - (brickColumnCount * (brickWidth + brickPadding))) / 2;
      let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r] = { x: brickX, y: brickY, status: 1 };
    }
  }

  // ???
  let score = 0;
  let lives = 2;

  // main
  function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    drawBricks();
    drawBall();
    drawPlayer();
    drawScore();
    drawLives();

    ballCollided = false;
    bricksCollisionDetection();
    if (!ballCollided) wallsCollisionDetection();
    if (!ballCollided) playerCollisionDetection();

    if (lives > 0 && score < brickRowCount * brickColumnCount) {
      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    } else if (score == brickRowCount * brickColumnCount) {
      drawEnd("YOU WIN, CONGRATULATIONS!", "green");
    } else {
      drawEnd("GAME OVER", "red");
    }
  }

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let brick = bricks[c][r];
        if (brick.status == 1) {
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
          ctx.fillStyle = "purple";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    if (rightPressed && playerX < canvasWidth - playerWidth) {
      playerX += 4;
    } else if (leftPressed && playerX > 0) {
      playerX -= 4;
    }
  }

  function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + score + "/" + (brickRowCount * brickColumnCount), 8, 20);
  }

  function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(0, 255, 100)";
    ctx.fillText("Lives: " + lives, canvasWidth - 90, 20);
  }

  function drawEnd(text, colText) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = "32px Arial";
    ctx.fillStyle = colText;
    ctx.fillText(text, canvasWidth / 2 - text.length * 9, canvasHeight / 2);
  }

  function bricksCollisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let b = bricks[c][r];
        if (b.status == 1) {
          if (x > b.x - ballRadius && x < b.x + brickWidth + ballRadius &&
            y > b.y - ballRadius && y < b.y + brickHeight + ballRadius) {
            if (x - dx <= b.x - ballRadius || x + dx >= b.x + brickWidth + ballRadius) {
              dx = -dx;
            } else {
              dy = -dy;
            }
            b.status = 0;
            score++;
            ballCollided = true;
          }
        }
      }
    }
  }

  function wallsCollisionDetection() {
    if (x + dx > canvasWidth - ballRadius || x + dx < ballRadius) {
      dx = -dx;
      ballCollided = true;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
      ballCollided = true;
    }
  }

  function playerCollisionDetection() {
    if (y + dy > canvasHeight - ballRadius - playerBottomDistance * 1.4) {
      if (x > playerX && x < playerX + playerWidth) {
        dy = -dy;
      } else {
        lives--;

        // start position
        x = canvasWidth / 2;
        y = canvasHeight - 30;
        dx = 4;
        dy = -4;
        playerX = (canvasWidth - playerWidth) / 2;
      }
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
    if (e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > playerWidth / 2 &&
      relativeX < canvasWidth - playerWidth / 2) {
      playerX = relativeX - playerWidth / 2;
    }
  }

  draw()
}