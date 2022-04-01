// -------------------theme----------------------
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