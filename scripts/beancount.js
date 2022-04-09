var beans = document.querySelector('#beans');
var count = document.querySelector('.bean-count');

count.textContent = beans.value;

beans.oninput = function() {
  count.textContent = beans.value;
}

var salary = document.querySelector('#salary');
var count0 = document.querySelector('.salary-count');

count0.textContent = salary.value;

salary.oninput = function() {
  count0.textContent = salary.value;
}

var beans1 = document.querySelector('#beans1');
var count1 = document.querySelector('.bean-count1');

count1.textContent = beans1.value;

beans1.oninput = function() {
  count1.textContent = beans1.value;
}

var salary1 = document.querySelector('#salary1');
var count01 = document.querySelector('.salary-count1');

count01.textContent = salary1.value;

salary1.oninput = function() {
  count01.textContent = salary1.value;
}