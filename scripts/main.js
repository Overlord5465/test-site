// Кнопка смены имени и появление окна для ввода имени
let myHeading = document.querySelector('h1');
let myButton = document.querySelector('button');

myButton.onclick = function() {
  setUserName();
}


function setUserName() {
  let myName = prompt('Please enter your name.');
  if (myName === null || myName.length === 0){
    myName = 'incognito';
  }
  localStorage.setItem('name', myName);
  myHeading.textContent = 'Здравствуйте, ' + myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = "Здравствуйте, " + storedName;
}


// Кнопка для смены стиля сайта
let myButton2 = document.querySelectorAll('button')[1];
let style = document.getElementsByTagName('link')[0];
let x = 0;

myButton2.onclick = function() {
  changedStyle();
}

function changedStyle(){
  if(x === 0){
    style.setAttribute('href', 'styles/darkColoured.css')
    ++x;
  }else{
    style.setAttribute('href', 'styles/lightColoured.css')
    --x;
  }
}

// Меняет одну картинку на другую
const myImage = document.querySelector('img');

myImage.onclick = function() {
    const mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/1.jpg') {
      myImage.setAttribute ('src','images/2.jpg');
    } else {
      myImage.setAttribute ('src','images/1.jpg');
    }
}