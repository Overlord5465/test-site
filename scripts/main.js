
// theme
let myButton2 = document.querySelectorAll('button')[1];
myButton2.onclick = function() {
  changeTheme();
}

function changeTheme(){
  if(parseInt(localStorage.getItem('topicCounter')) === 0){
    theme.setAttribute('href', 'css/dark-theme.css')
    localStorage.setItem('topicCounter', 1)
  }else{
    theme.setAttribute('href', 'css/light-theme.css')
    localStorage.setItem('topicCounter', 0)
  }
}

// salutation
let myHeading = document.querySelector('#salutation');
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
  myHeading.textContent = 'Hello, ' + myName + '!';
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = "Hello, " + storedName + '!';
}

// // img1 and img2
// const myImage = document.querySelector('img');

// myImage.onclick = function() {
//     const mySrc = myImage.getAttribute('src');
//     if(mySrc === 'images/1.jpg') {
//       myImage.setAttribute ('src','images/2.jpg');
//     } else {
//       myImage.setAttribute ('src','images/1.jpg');
//     }
// }