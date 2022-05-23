const body = document.querySelector("body");

function menuGame() {
  class Button {
    constructor(x, y, width, height, text) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.text = text
      this.draw
      this.launch
    }

    draw(colBg1, colBg2) {
      let myGradient = ctx.createLinearGradient(0, this.y, 0, this.y + this.height);

      myGradient.addColorStop(0, colBg1);
      myGradient.addColorStop(1, colBg2);
      ctx.fillStyle = myGradient;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.fillStyle = "white";
      ctx.textBaseline = "top";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText(this.text, this.x + 10, this.y + 10);
    }

    launch() {
      if (this.text === "ping pong") {
        pingPong();
      } else if (this.text === "space ranger") {
        spaceRanger();
      }
    }
  }

  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.width = 1000;
  const canvasHeight = canvas.height = 600;

  const name1 = "ping pong";
  const name2 = "space ranger";

  const startPP = new Button(canvasWidth / 2 - name1.length * 9, canvasHeight / 3, name1.length * 19, 50, name1);

  const startSR = new Button(canvasWidth / 2 - name2.length * 9, canvasHeight / 3 + 100, name2.length * 18, 50, name2);

  checkingMouse(startPP);
  checkingMouse(startSR);
  // main
  function drawMenu() {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    startPP.draw("white", "green");
    startSR.draw("white", "green");
  }

  function checkingMouse(start) {

    let buttonPressed = true;
    let isDrawing = false;

    canvas.addEventListener("mousedown", e => {
      x = e.offsetX;
      y = e.offsetY;
      if (start.x + start.width > x && start.x < x && start.y + start.height > y && start.y < y) {
        start.draw("black", "white");
        isDrawing = true;
      }
    });

    canvas.addEventListener("mousemove", e => {
      x = e.offsetX;
      y = e.offsetY;
      if (start.x + start.width > x && start.x < x && start.y + start.height > y && start.y < y) {
        if (!isDrawing) {
          start.draw("blue", "white");
        }
      } else {
        start.draw("white", "green");
        isDrawing = false;
      }
    });

    canvas.addEventListener("mouseup", e => {
      if (isDrawing) {
        if (buttonPressed) {
          const clone = canvas.cloneNode(true);
          const parent = document.querySelector("#canvas-2d");
          parent.removeChild(canvas);
          parent.appendChild(clone);
          start.launch();
        }
        isDrawing = false;
      }
    });

  }

  drawMenu();
}

menuGame();

// function mouseButtonClick(e) {
//   switch (e.button) {
//     case 0:
//       MyButton.lbm = true;
//       break;
//     case 1:
//       MyButton.cbm = true;
//       break;
//     case 2:
//       MyButton.rbm = true;
//       break;
//   }
// }