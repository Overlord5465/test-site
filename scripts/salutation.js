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