// ----------------img1 and img2-------------

// const myImage = document.querySelector('img');

// myImage.onclick = function() {
//     const mySrc = myImage.getAttribute('src');
//     if(mySrc === 'images/1.jpg') {
//       myImage.setAttribute ('src','images/2.jpg');
//     } else {
//       myImage.setAttribute ('src','images/1.jpg');
//     }
// }

// ----------------Buttons--------------------
const clickMy = document.querySelector("#click-me");
const parent = document.querySelector("#parent");
clickMy.addEventListener('click', createParagraph);

function createParagraph() {
  let para = document.createElement('p');
  para.classList.add("text-center");

  parent.appendChild(para);
  para.textContent = 'You clicked the button "CLICK ME!"';
}

const cleanOut = document.querySelector("#clean-out");
cleanOut.addEventListener('click', cleanParagraph);

function cleanParagraph() {
  let children = parent.childNodes;
  for (5; 5 < children.length; 5) {
    parent.removeChild(children[5]);
  }
}

// ----------------Number guessing game-------
let randomNumber = Math.floor(Math.random() * 100) + 1;

let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

let guessCount = 1;
const numberGuessingGame = document.querySelector('#number-guessing-game');
let resetButton;

function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  numberGuessingGame.appendChild(resetButton);
  resetButton.textContent = 'Start new game';
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  var resetParas = document.querySelectorAll('.resultParas p');
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}

// ----------------Type weather---------------
const select = document.querySelector('#weather');
const para = document.querySelector('#advice');

select.addEventListener('change', setWeather);

function setWeather() {
  const choice = select.value;

  if (choice === 'sunny') {
    para.textContent = 'It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.';
  } else if (choice === 'rainy') {
    para.textContent = 'Rain is falling outside; take a rain coat and an umbrella, and don\'t stay out for too long.';
  } else if (choice === 'snowing') {
    para.textContent = 'The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
  } else if (choice === 'overcast') {
    para.textContent = 'It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
  } else {
    para.textContent = '';
  }
}

// ----------------Verse----------------------
let verseChoose = document.querySelector('#verse-choose');
let poemDisplay = document.querySelector('pre');

verseChoose.onchange = function () {
  let verse = verseChoose.value;
  updateDisplay(verse);
};

function updateDisplay(verse) {
  verse = verse.replace(" ", "");
  verse = verse.toLowerCase();
  let url = 'txt/' + verse + '.txt';
  // let request = new XMLHttpRequest();
  // request.open('GET', url);
  // request.responseType = 'text';
  // request.onload = function() {
  //   poemDisplay.textContent = request.response;
  // };
  // request.send();
  // ВЕРХНИЙ КОММЕНТАРИЙ И НИЖНЯЯ ЧАСТЬ КОДА ДЕЛАЮТ ОДНУ И ТУ ЖЕ ВЕЩЬ
  fetch(url).then(function (response) {
    response.text().then(function (text) {
      poemDisplay.textContent = text;
    });
  });
};

updateDisplay('Verse 1');
verseChoose.value = 'Verse 1';

// ----------------Animation balls-------------

const canvas0 = document.querySelector('#balls');
const ctx0 = canvas0.getContext('2d');

const main = document.querySelector("main")

const width = canvas0.width = main.offsetWidth * 0.9;
const height = canvas0.height = window.innerHeight / 2;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {

  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx0.beginPath();
    ctx0.fillStyle = this.color;
    ctx0.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx0.fill();
  }

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }

}

const balls = [];

while (balls.length < 4) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

function loop() {
  ctx0.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx0.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();

// ----------------Elementary examples---------
const canvas1 = document.querySelector('#myCanvas');
const ctx1 = canvas1.getContext('2d');

canvas1.width = width;
canvas1.height = height;

// Холст
ctx1.fillStyle = 'rgb(0, 0, 0)';
ctx1.fillRect(0, 0, width, height);

// Перевод градусов в радианы
function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

// Треугольник
ctx1.fillStyle = 'rgb(255, 0, 0)';
ctx1.beginPath();
ctx1.moveTo(50, 50);
ctx1.lineTo(150, 50);

const triHeight = 50 * Math.tan(degToRad(60));
ctx1.lineTo(100, 50 + triHeight);

ctx1.lineTo(50, 50);
ctx1.fill();

// Круг
ctx1.fillStyle = 'rgb(0, 0, 255)';
ctx1.beginPath();
ctx1.arc(150, 106, 50, degToRad(0), degToRad(360), false);
ctx1.fill();

// Пакмен круг
ctx1.fillStyle = 'yellow';
ctx1.beginPath();
ctx1.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
ctx1.lineTo(200, 106);
ctx1.fill();

// Белый текст
ctx1.strokeStyle = 'white';
ctx1.lineWidth = 1;
ctx1.font = '36px arial';
ctx1.strokeText('Canvas text', 800, 50);

// Красный текст
ctx1.fillStyle = 'red';
ctx1.font = '48px georgia';
ctx1.fillText('Canvas text', 800, 150);

// Lego people---Из-за треугольников что-то пошло не так!!!!!!!! ('-') плак плак
const image0 = new Image();
image0.src = 'images/legoPeople.png';

image0.addEventListener('load', () => ctx1.drawImage(image0, 600, 10, 300, 300));

// Фиолетовые треугольники
ctx1.translate(width / 2, height / 2);

let length = 250;
let moveOffset = 20;

for (let i = 0; i < length; i++) {
  ctx1.fillStyle = `rgba(${255 - length},0,${255 - length},0.9)`;
  ctx1.beginPath();
  ctx1.moveTo(moveOffset, moveOffset);
  ctx1.lineTo(moveOffset + length, moveOffset);
  const triHeight = length / 2 * Math.tan(degToRad(60));
  ctx1.lineTo(moveOffset + (length / 2), moveOffset + triHeight);
  ctx1.lineTo(moveOffset, moveOffset);
  ctx1.fill();

  length--;
  moveOffset += 0.7;
  ctx1.rotate(degToRad(5));
}

//-----------------Animation character---------
const canvas2 = document.querySelector('#character');
const ctx2 = canvas2.getContext('2d');
let height0;
canvas2.width = width;
canvas2.height = height0 = 300;

ctx2.fillStyle = 'rgb(0, 0, 0)';
ctx2.fillRect(0, 0, width, height0);

ctx2.translate(width / 2, height0 / 2);

const image = new Image();
image.src = 'images/walk-right.png';
image.onload = draw0;

let sprite = 0;
let posX = 0;

function draw0() {
  ctx2.fillRect(-(width / 2), -(height0 / 2), width, height0);

  ctx2.drawImage(image, (sprite * 102), 0, 102, 148, 0 + posX, -74, 102, 148);

  if (posX % 13 === 0) {
    if (sprite === 5) {
      sprite = 0;
    } else {
      sprite++;
    }
  }

  if (posX > width / 2) {
    let newStartPos = -((width / 2) + 102);
    posX = Math.ceil(newStartPos);
    // console.log(posX);
  } else {
    posX += 2;
  }

  window.requestAnimationFrame(draw0);
};

//-----------------Tab-------------------------
var tabs = document.querySelectorAll('.info-box li a');
var panels = document.querySelectorAll('.info-box article');

for (i = 0; i < tabs.length; i++) {
  var tab = tabs[i];
  setTabHandler(tab, i);
}

function setTabHandler(tab, tabPos) {
  tab.onclick = function () {
    for (i = 0; i < tabs.length; i++) {
      tabs[i].className = '';
    }

    tab.className = 'active';

    for (i = 0; i < panels.length; i++) {
      panels[i].className = '';
    }

    panels[tabPos].className = 'active-panel';
  }
}

// ----------------Zoom img--------------------
const sectionZoom = document.querySelector('#zoom');

const thumb0 = document.querySelector('#thumb0');
thumb0.onmouseover = showImg0;
thumb0.onmouseout = hideImg;
const thumb1 = document.querySelector('#thumb1');
thumb1.onmouseover = showImg1;
thumb1.onmouseout = hideImg;
const thumb2 = document.querySelector('#thumb2');
thumb2.onmouseover = showImg2;
thumb2.onmouseout = hideImg;
const thumb3 = document.querySelector('#thumb3');
thumb3.onmouseover = showImg3;
thumb3.onmouseout = hideImg;
const thumb4 = document.querySelector('#thumb4');
thumb4.onmouseover = showImg4;
thumb4.onmouseout = hideImg;
const thumb5 = document.querySelector('#thumb5');
thumb5.onmouseover = showImg5;
thumb5.onmouseout = hideImg;

function showImg0() {
  const imgZoom = document.createElement('img');
  imgZoom.setAttribute('class', 'zoom');
  imgZoom.setAttribute('src', thumb0.getAttribute('src'));
  sectionZoom.appendChild(imgZoom);
}

function showImg1() {
  const imgZoom = document.createElement('img');
  imgZoom.setAttribute('class', 'zoom');
  imgZoom.setAttribute('src', thumb1.getAttribute('src'));
  sectionZoom.appendChild(imgZoom);
}

function showImg2() {
  const imgZoom = document.createElement('img');
  imgZoom.setAttribute('class', 'zoom');
  imgZoom.setAttribute('src', thumb2.getAttribute('src'));
  sectionZoom.appendChild(imgZoom);
}

function showImg3() {
  const imgZoom = document.createElement('img');
  imgZoom.setAttribute('class', 'zoom');
  imgZoom.setAttribute('src', thumb3.getAttribute('src'));
  sectionZoom.appendChild(imgZoom);
}

function showImg4() {
  const imgZoom = document.createElement('img');
  imgZoom.setAttribute('class', 'zoom');
  imgZoom.setAttribute('src', thumb4.getAttribute('src'));
  sectionZoom.appendChild(imgZoom);
}

function showImg5() {
  const imgZoom = document.createElement('img');
  imgZoom.setAttribute('class', 'zoom');
  imgZoom.setAttribute('src', thumb5.getAttribute('src'));
  sectionZoom.appendChild(imgZoom);
}

function hideImg() {
  const imgZoom = document.querySelector('.zoom');
  sectionZoom.removeChild(imgZoom);
}

// ----------------Cube------------------------
const scene = new THREE.Scene();
const canvas5465 = document.querySelector('#WebGL-start')

const camera = new THREE.PerspectiveCamera(75, (main.offsetWidth * 0.9) / (window.innerHeight / 2), 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize((main.offsetWidth * 0.9), (window.innerHeight / 2));
const canvasCube = canvas5465.appendChild(renderer.domElement);
canvasCube.setAttribute("class", "canvas_center");

let cube;

const loader = new THREE.TextureLoader();

loader.load('images/metal003.png', texture => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  const geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
  const material = new THREE.MeshLambertMaterial({ map: texture, shading: THREE.FlatShading });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  draw1();
});

const light = new THREE.AmbientLight('rgb(255,255,255)'); // soft white light
scene.add(light);

const spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);

function draw1() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(draw1);
}

// ----------------Звуки из аудио--------------
function audioVisualization1() {
  let audio, context, analyzer, src, array, logo, sectionLogo;

  sectionLogo = document.querySelector("#section__logo1")

  logo = document.querySelector("#logo1").style;

  audio = document.querySelector("audio");

  sectionLogo.onclick = function () {
    if (!context) {
      preparation();
    }
    if (audio.paused) {
      audio.play();
      loop1();
    } else {
      audio.pause();
    }
  }

  function preparation() {
    context = new AudioContext();
    analyzer = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyzer);
    analyzer.connect(context.destination);
    loop1();
  }

  function loop1() {
    if (!audio.paused) {
      window.requestAnimationFrame(loop1);
    }
    array = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(array);

    logo.minHeight = (array[40]) * 1.5 + "px";
    logo.minWidth = (array[40]) * 1.5 + "px";
  }
}

audioVisualization1();

// ----------------Звуки из микрофона----------
function audioVisualization2() {
  let sectionLogo, num, array, width, context, logo, myElements, analyzer, src, height;

  sectionLogo = document.querySelector("#section__logo2")

  num = 32;

  array = new Uint8Array(num * 2);

  width = 10;

  sectionLogo.onclick = function () {
    if (context) return;

    for (let i = 0; i < num; i++) {
      logo = document.createElement("div");
      logo.className = "logo2";
      logo.style.background = "red";
      logo.style.minWidth = width + "px";
      sectionLogo.appendChild(logo);
    }

    myElements = document.getElementsByClassName("logo2")
    context = new AudioContext();
    analyzer = context.createAnalyser();
    analyzer.connect(context.destination)
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(stream => {
      src = context.createMediaStreamSource(stream);
      src.connect(analyzer);
      loop2();
    }).catch(error => {
      alert(error + "\r\n Отклонено.Страница будет обновлена!");
      location.reload();
    })
  }

  function loop2() {
    window.requestAnimationFrame(loop2);
    analyzer.getByteFrequencyData(array);
    for (let i = 0; i < num; i++) {
      height = array[i + num];
      myElements[i].style.minHeight = height + "px";
      myElements[i].style.opacity = 0.008 * height;
    }
  }
}

audioVisualization2();

// ----------------Battleship------------------

let model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  
  ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },
          { locations: [0, 0, 0], hits: ["", "", ""] },
          { locations: [0, 0, 0], hits: ["", "", ""] }],
  
  fire: function(guess) {
    for (let i = 0; i < this.numShips; i++){
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);

      if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0){
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          this.shipsSunk++;
          view.displayMessage("You sunk my battleship!");
        }

        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");

    return false;
  },

  isSunk: function(ship){
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit"){
        return false;
      }
    }

    return true;
  },

  generateShipLocations: function() {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));

      this.ships[i].locations = locations;
    }
    console.log("Ships array: ");
		console.log(this.ships);
  },

  generateShip: function() {
    let direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    let newShipLocations = [];
    let alphabet = ["A","B", "C", "D","E","F", "G"];

    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        firstChar = alphabet[row];
        newShipLocations.push(firstChar + "" + (col + i));
      } else {
        firstChar = alphabet[row + i];
        newShipLocations.push(firstChar + "" + col);
      }

    }

    return newShipLocations;
  },

  collision: function(locations) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }

    return false;
  }

}

let view = {
  displayMessage: function (msg) {
    let messageArea = document.querySelector("#messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function (location) {
    let cell = document.querySelector("#" + location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function (location) {
    let cell = document.querySelector("#" + location);
    cell.setAttribute("class", "miss");
  }
}


let controller = {
  guesses: 0,

  processGuess: function(guess) {
    let location = this.parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location)

      if(hit && model.numSunk === model.numShips) {
        view.displayMessage("You sunk all my battleships, in " + 
                                          this.guesses + " guesses")
      }
    }
  },

  parseGuess: function(guess) {
    let alphabet = ["A","B", "C", "D","E","F", "G"];

    if (guess === null || guess.length !== 2) {
      alert("Oops, please enter a letter and a number on the board.");
    } else {
      let firstChar = guess.charAt(0);
      let row = alphabet.indexOf(firstChar);
      let column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn't on the board.");
      } else if (row < 0 || row >= model.boardSize || 
                column < 0 || column > model.boardSize) {
        alert("Oops, that's off the board!");
      } else {
        return guess;
      }
    }

    return null;
  }

  
}

function handleFireButton() {
  let guessInput = document.querySelector("#guessInput")
  let guess = guessInput.value;

  controller.processGuess(guess);

  guessInput.value = "";
}

function handleKeyPress(e) {
  let fireButton = document.querySelector("#fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false ;
  }
}

function init() {
  let fireButton = document.querySelector("#fireButton");
  fireButton.onclick = handleFireButton;

  let guessInput = document.querySelector("#guessInput");
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

window.onload = init;

// ----------------Menu game-------------------

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

  const namesGames = ["ping pong", "space ranger"];
  const startButtons = [];


  for( let i = 0; i < namesGames.length; i++)
  {
    startButtons[i] = new Button(canvasWidth / 2 - namesGames[i].length * 9, canvasHeight / 3 + 100 * i, namesGames[i].length * 19, 50, namesGames[i]);
    
    checkingMouse(startButtons[i]);
  }


  
  // main
  function drawMenu() {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for( let i = 0; i < startButtons.length; i++)
    {
      startButtons[i].draw("white", "green");
    }
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
          const parent = document.querySelector("#applications");
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

// ----------------Ping pong-------------------

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
  const playerWidth = canvasWidth / 12;
  const playerHeight = canvasHeight / 60;
  const playerBottomDistance = 10;
  let playerX = (canvasWidth - playerWidth) / 2;
  let playerY = canvasHeight - playerHeight - playerBottomDistance;
  let rightPressed = false;
  let leftPressed = false;

  // brick
  const brickRowCount = 4;
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

// ----------------Space ranger----------------

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
  const playerHeight = 50;
  const playerWidth = 50;
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
  let numberOfBullets = 100;
  let red = 55;
  let green = 200;

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
    drawNumberOfBullets(`rgb(${red}, ${green} ,0)`);

    player()

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

          // Перевод из градусов в радианы
          function degToRad(degrees) {
            return degrees * Math.PI / 180;
          };

          // корпус
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.moveTo(enemy.x, enemy.y);
          ctx.lineTo(enemy.x + enemyWidth, enemy.y);

          let triHeight = enemyHeight / 2 * Math.tan(degToRad(60));
          ctx.lineTo(enemy.x + enemyWidth / 2, enemy.y + triHeight);
          ctx.lineTo(enemy.x, enemy.y);
          ctx.fill();

          // окно
          ctx.fillStyle = 'blue';
          ctx.beginPath();
          const triSide = enemy.y + enemyHeight / 3;
          ctx.moveTo(enemy.x + enemyWidth / 3, triSide);
          ctx.lineTo(enemy.x + enemyWidth * 2 / 3, triSide);

          triHeight = enemyHeight / 2 * Math.tan(degToRad(60));
          ctx.lineTo(enemy.x + enemyWidth / 2, triSide + triHeight * 0.5);
          ctx.lineTo(enemy.x + enemyWidth / 3, triSide);
          ctx.fill();

          // ctx.beginPath();
          // ctx.rect(enemy.x, enemy.y, enemyWidth, enemyHeight);
          // ctx.fillStyle = "#0095DD";
          // ctx.fill();
          // ctx.closePath();
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
  }

  function drawPlayer() {
    // ctx.beginPath();
    // ctx.rect(playerX, playerY, playerWidth, playerHeight);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();

    if (rightPressed && playerX < canvasWidth - playerWidth) {
      playerX += 4;
    } else if (leftPressed && playerX > 0) {
      playerX -= 4;
    }
  }

  function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + score + "/" + (enemyRowCount * enemyColumnCount), 8, 20);
  }

  function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(0, 255, 100)";
    ctx.fillText("Lives: " + lives, canvasWidth - 110, 20);
  }

  function drawNumberOfBullets(colText) {
    ctx.font = "20px Arial";
    ctx.fillStyle = colText;
    ctx.fillText("Bullets: " + numberOfBullets, canvasWidth - 125, 60);
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

    if (e.key === "Control") {
      if (numberOfBullets > 0) {
        bullets.push({ x: playerX + playerWidth / 2, y: playerY - 10, dx: 0, dy: -8, status: 1 })
        numberOfBullets--;
        red += 2;
        green -= 2;
      }
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

  function player() {

    // Перевод из градусов в радианы
    function degToRad(degrees) {
      return degrees * Math.PI / 180;
    };

    // крылья
    ctx.fillStyle = 'silver';
    ctx.beginPath();
    const triSide = playerY + playerHeight * 0.8;
    ctx.moveTo(playerX, triSide);
    ctx.lineTo(playerX + playerWidth, triSide);

    const triHeight = playerHeight / 2 * Math.tan(degToRad(60));
    ctx.lineTo(playerX + playerWidth / 2, triSide - triHeight);
    ctx.lineTo(playerX, triSide);
    ctx.fill();

    // турбины на крыльях
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(playerX + playerWidth / 8 + playerWidth / 8 * i, triSide, playerWidth / 16, 0, Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }

    // турбины на корпусе
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(playerX + playerWidth / 2.5 + playerWidth / 10 * i, playerY + playerHeight, playerWidth / 18, 0, Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }

    // корпус
    ctx.beginPath();
    ctx.rect(playerX + playerWidth / 3, playerY, playerWidth * 1 / 3, playerHeight);
    ctx.fillStyle = "silver";
    ctx.fill();
    ctx.closePath();

    // верхужка
    ctx.beginPath();
    ctx.arc(playerX + playerWidth / 2, playerY, playerWidth / 6, Math.PI, Math.PI * 2);
    ctx.fillStyle = "silver";
    ctx.fill();
    ctx.closePath();

    // стекло
    ctx.beginPath();
    ctx.arc(playerX + playerWidth / 2, playerY + playerWidth / 32, playerWidth / 9, Math.PI, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}

