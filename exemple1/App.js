let btn = document.getElementById('btn');

let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');

function sum(number1, number2) {
  return Number(number1) + Number(number2);
}

btn.addEventListener('click', () => console.log(sum(input1.value, input2.value))); 