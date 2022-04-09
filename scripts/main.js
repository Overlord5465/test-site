// -------------------theme----------------------
let theme = document.querySelectorAll('link')[1];

if(!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'light')
}

defaultTheme()

function defaultTheme(){
  if(localStorage.getItem('theme') === 'light'){
    theme.setAttribute('href', 'css/light-theme.css')
  }else{
    theme.setAttribute('href', 'css/dark-theme.css')
  }
}

let myButton2 = document.querySelectorAll('button')[1];
myButton2.onclick = function() {
  changeTheme();
}

function changeTheme(){
  if(localStorage.getItem('theme') === 'light'){
    theme.setAttribute('href', 'css/dark-theme.css')
    localStorage.setItem('theme', 'dark')
  }else{
    theme.setAttribute('href', 'css/light-theme.css')
    localStorage.setItem('theme', 'light')
  }
}