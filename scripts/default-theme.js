let theme = document.querySelectorAll('link')[1];

if(!localStorage.getItem('topicCounter')) {
  localStorage.setItem('topicCounter', 0)
}

defaultTheme()

function defaultTheme(){
  if(parseInt(localStorage.getItem('topicCounter')) === 0){
    theme.setAttribute('href', 'css/light-theme.css')
  }else{
    theme.setAttribute('href', 'css/dark-theme.css')
  }
}