const bullets = [];

function spaceRanger() {
  // canvas
  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.width = 1000;
  const canvasHeight = canvas.height = 600;

  // bullet
  const bulletRadius = 3;

  // player
  const playerHeight = 10;
  const playerWidth = 75;
  const playerBottomDistance = 10;
  let playerX = (canvasWidth - playerWidth) / 2;
  let playerY = canvasHeight - playerHeight - playerBottomDistance;
  let rightPressed = false;
  let leftPressed = false;

  // enemy
  const enemyRowCount = 6;
  const enemyColumnCount = 7;
  const enemyPadding = 50;
  const enemyOffsetTop = 30;
  const enemyWidth = 25;
  const enemyHeight = 25;

  const enemies = [];
  for (let c = 0; c < enemyColumnCount; c++) {
    enemies[c] = [];
    for (let r = 0; r < enemyRowCount; r++) {
      let enemyX = (c * (enemyWidth + enemyPadding)) +
        (canvasWidth - (enemyColumnCount * (enemyWidth + enemyPadding))) / 2 - 100;
      let enemyY = (r * (enemyHeight + enemyPadding)) + enemyOffsetTop;
      enemies[c][r] = { x: enemyX, y: enemyY, dx: 1, dy: 0, accumulator: 0, status: 1 };
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
    drawEnemies();
    drawBullet();
    drawPlayer();
    drawScore();
    drawLives();


    enemiesCollisionDetection();
    playerCollisionDetection();

    if (lives > 0 && score < enemyRowCount * enemyColumnCount) {
      // x += dx;
      // y += dy;
      requestAnimationFrame(draw);
    } else if (score == enemyRowCount * enemyColumnCount) {
      drawEnd("YOU WIN, CONGRATULATIONS!", "green");
    } else {
      drawEnd("GAME OVER", "red");
    }
  }

  function drawEnemies() {
    for (let c = 0; c < enemyColumnCount; c++) {
      for (let r = 0; r < enemyRowCount; r++) {
        let enemy = enemies[c][r];
        if (enemy.status == 1) {
          enemy.x += enemy.dx;
          enemy.accumulator++;

          if (enemy.accumulator === 270) {
            enemy.dx = - enemy.dx;
            enemy.accumulator = 0;
          }

          ctx.beginPath();
          ctx.rect(enemy.x, enemy.y, enemyWidth, enemyHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function drawBullet() {
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].status == 1) {
        bullets[i].x += bullets[i].dx;
        bullets[i].y += bullets[i].dy;
        ctx.beginPath();
        ctx.arc(bullets[i].x, bullets[i].y, bulletRadius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
      } else {
        bullets.splice(i, 1);
      }
    }



    // ctx.beginPath();
    // ctx.arc(x, y, bulletRadius, 0, Math.PI * 2);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
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
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score + "/" + (enemyRowCount * enemyColumnCount), 8, 20);
  }

  function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
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

  function enemiesCollisionDetection() {
    for (let c = 0; c < enemyColumnCount; c++) {
      for (let r = 0; r < enemyRowCount; r++) {
        let enemy = enemies[c][r];
        if (enemy.status == 1) {
          for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];
            if (bullet.x > enemy.x - bulletRadius &&
              bullet.x < enemy.x + enemyWidth + bulletRadius &&
              bullet.y > enemy.y - bulletRadius &&
              bullet.y < enemy.y + enemyHeight + bulletRadius) {

              enemy.status = 0;
              score++;

              bullets.splice(i, 1);
              i--;
              break;
            }
          }
        }
      }
    }
  }

  // function wallsCollisionDetection() {
  //   if (x + dx > canvasWidth - bulletRadius || x + dx < bulletRadius) {
  //     dx = -dx;
  //     bulletCollided = true;
  //   }
  //   if (y + dy < bulletRadius) {
  //     dy = -dy;
  //     bulletCollided = true;
  //   }
  // }

  function playerCollisionDetection() {
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];

      if (bullet.y + bullet.dy > canvasHeight - bulletRadius - playerBottomDistance * 1.4) {
        if (bullet.x > playerX || bullet.x < playerX + playerWidth) {
          lives--;
          // start position
          playerX = (canvasWidth - playerWidth) / 2;
        }

        bullets.splice(i, 1);
        i--;
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

    if (e.key === " ") {
      bullets.push({ x: playerX + playerWidth / 2, y: playerY - 10, dx: 0, dy: -8, status: 1 })
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

  draw();
}