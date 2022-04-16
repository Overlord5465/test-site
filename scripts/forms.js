let beans = document.querySelector('#beans');
let count = document.querySelector('.bean-count');

count.textContent = beans.value;

beans.oninput = function() {
  count.textContent = beans.value;
}

let salary = document.querySelector('#salary');
let count0 = document.querySelector('.salary-count');

count0.textContent = salary.value;

salary.oninput = function() {
  count0.textContent = salary.value;
}

let beans1 = document.querySelector('#beans1');
let count1 = document.querySelector('.bean-count1');

count1.textContent = beans1.value;

beans1.oninput = function() {
  count1.textContent = beans1.value;
}

let salary1 = document.querySelector('#salary1');
let count01 = document.querySelector('.salary-count1');

count01.textContent = salary1.value;

salary1.oninput = function() {
  count01.textContent = salary1.value;
}

// ----------------------------------------------------------------

// Wait for the page to finish loading
document.addEventListener('DOMContentLoaded', function () {

  // Attach `change` event listener to checkbox
  document.getElementById('billing-checkbox').addEventListener('change', toggleBilling);
}, false);

let billingItems = document.querySelectorAll('#billing input[type="text"]');
// Select the billing text labels
let billingLabels = document.querySelectorAll('.billing-label');

const span = document.createElement('span');
const p = document.querySelector('#billing')

function toggleBilling() {
  // Select the billing text fields


  // Toggle the billing text fields and labels
  for (let i = 0; i < billingItems.length; i++) {
    billingItems[i].disabled = !billingItems[i].disabled;

    if(billingLabels[i].getAttribute('class') === 'billing-label disabled-label') {
      billingLabels[i].setAttribute('class', 'billing-label');
      
      billingItems[i].setAttribute('placeholder', 'Enter your address...')
      p.appendChild(span);
    } else {
      billingLabels[i].setAttribute('class', 'billing-label disabled-label');
      billingItems[i].setAttribute('placeholder', '')
      p.removeChild(span);
    }
  }
}

