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
  localStorage.setItem('user-name', myName);
  myHeading.textContent = 'Hello, ' + myName + '!';
}

if(!localStorage.getItem('user-name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('user-name');
  myHeading.textContent = 'Hello, ' + storedName + '!';
}