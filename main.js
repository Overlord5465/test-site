const myHeading = document.querySelector('h1');

// if (myHeading.textContent === 'Hello world!'){

// }

// myHeading.onclick = function() {
//   myHeading = 'Больно вообще-то, не кликай по мне больше пожалуйста'
// }

// document.querySelector('html').onclick = function() {
//   alert('Ouch! Stop poking me!');
// }

const myImage = document.querySelector('img');

myImage.onclick = function() {
    const mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/1.jpg') {
      myImage.setAttribute ('src','images/2.jpg');
    } else {
      myImage.setAttribute ('src','images/1.jpg');
    }
}

const myButton = document.querySelector('button');

function setUserName() {
  let myName = prompt('Please enter your name.');
  if (myName === null || myName.length === 0){
    myName = 'incognito';
  }
  localStorage.setItem('name', myName);
  myHeading.textContent = 'Привет ' + myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = 'Привет ' + storedName;
}

myButton.onclick = function() {
  setUserName();
}