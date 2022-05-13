// // -------------------theme----------------------
// let theme = document.querySelectorAll('link')[1];

// if(!localStorage.getItem('theme')) {
//   localStorage.setItem('theme', 'light')
// }

// defaultTheme()

// function defaultTheme(){
//   if(localStorage.getItem('theme') === 'light'){
//     theme.setAttribute('href', 'css/light-theme.css')
//   }else{
//     theme.setAttribute('href', 'css/dark-theme.css')
//   }
// }

// let myButton2 = document.querySelectorAll('button')[1];
// myButton2.onclick = function() {
//   changeTheme();
// }

// function changeTheme(){
//   if(localStorage.getItem('theme') === 'light'){
//     theme.setAttribute('href', 'css/dark-theme.css')
//     localStorage.setItem('theme', 'dark')
//   }else{
//     theme.setAttribute('href', 'css/light-theme.css')
//     localStorage.setItem('theme', 'light')
//   }
// }





let userScreen = window.innerWidth;
let flag_0;
if (userScreen > 600) {
  flag_0 = 0;
} else {
  flag_0 = 1;
}

if (userScreen < 600) {
  let leftSide = document.querySelector("#left-side");
  leftSide.parentNode.removeChild(leftSide);
  let rightSide = document.querySelector("#right-side");
  rightSide.parentNode.removeChild(rightSide);
  let root = document.querySelector('.root');
  root.classList.remove('three-columns');
  let main = document.querySelector('main');
  main.classList.add('body__main_rounded');
}

window.addEventListener(`resize`, event => {
  userScreen = window.innerWidth;
  let flag_1;
  if (userScreen > 600) {
    flag_1 = 0;
  } else {
    flag_1 = 1;
  }

  if (flag_0 !== flag_1) {
    location.reload();
  }

}, false);