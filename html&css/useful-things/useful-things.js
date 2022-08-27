const defaultAnimation = document.querySelector("#default-animation");
const transparentCube = document.querySelector("#transparent-cube");
const circularMotion = document.querySelector("#circular-motion-animation");

transparentCube.onclick = function() {
  defaultAnimation.setAttribute("id", "transparent-cube")
}

circularMotion.onclick = function() {
  defaultAnimation.setAttribute("id", "circular-motion-animation")
}