let updateBalanceButton = document.getElementById('update') as HTMLInputElement;
let removeBalanceButton = document.getElementById('remove') as HTMLInputElement;
let cleanButton = document.getElementById('clean') as HTMLInputElement;
let inputField = document.getElementById('inputField') as HTMLInputElement;
let balance = document.getElementById('balance') as HTMLInputElement;

balance.innerHTML = '0';

function validateInput(input: string): number {
  let value = parseFloat(input);
  if (isFinite(value)) {
    return value;
  } else {
    alert('Please enter a valid number');
    return 0;
  }
}

function add(sum: number) {
  balance.innerHTML = (parseFloat(balance.innerHTML) + sum).toString();
}

function remove(subtraction: number) {
  balance.innerHTML = (parseFloat(balance.innerHTML) - subtraction).toString();
}

function limparSaldo() {
  balance.innerHTML = '0';
}

updateBalanceButton.addEventListener('click', () =>
  add(validateInput(inputField?.value))
);

removeBalanceButton.addEventListener('click', () =>
  remove(validateInput(inputField?.value))
);

cleanButton.addEventListener('click', function () {
  limparSaldo();
});
