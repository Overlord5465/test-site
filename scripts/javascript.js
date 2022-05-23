// ----------------img1 and img2-----------------

// const myImage = document.querySelector('img');

// myImage.onclick = function() {
//     const mySrc = myImage.getAttribute('src');
//     if(mySrc === 'images/1.jpg') {
//       myImage.setAttribute ('src','images/2.jpg');
//     } else {
//       myImage.setAttribute ('src','images/1.jpg');
//     }
// }

// -------------------Buttons-----------------------
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

// ----------------Number guessing game----------------
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

// --------------------Type weather---------------------
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

// --------------------------Verse---------------------------
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

// -------------------------Animation balls------------------------------
// set up canvas

const canvas0 = document.querySelector('#balls');
const ctx0 = canvas0.getContext('2d');

const main = document.querySelector("main")

const width = canvas0.width = main.offsetWidth * 0.9;
const height = canvas0.height = window.innerHeight / 2;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

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
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
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

// --------------------Elementary examples----------------------------
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
ctx1.strokeText('Canvas text', 300, 50);

// Красный текст
ctx1.fillStyle = 'red';
ctx1.font = '48px georgia';
ctx1.fillText('Canvas text', 300, 150);

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

//--------------------------Animation character-----------------------------
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
    console.log(posX);
  } else {
    posX += 2;
  }

  window.requestAnimationFrame(draw0);
};

//------------------------Tab--------------------------
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

// ----------------------zoom img--------------------------
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

// -----------------cube---------------
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