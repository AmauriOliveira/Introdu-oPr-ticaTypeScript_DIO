import { sumInputInterface } from './interface';

const btn = document.getElementById('btn');

const input1 = document.getElementById('input1') as HTMLInputElement;
const input2 = document.getElementById('input2') as HTMLInputElement;

function sum(inputSum: sumInputInterface): number {
  const { number1, number2, isPrint, phrase } = inputSum;
  if (isPrint) console.log(`${phrase} ${number1 + number2}.`);

  return number1 + number2;
}

if (btn && input1 !== null && input2 !== null) {
  btn.addEventListener('click', () => {
    const input: sumInputInterface = {
      number1: parseFloat(input1.value),
      number2: parseFloat(input2.value),
      isPrint: true,
      phrase: 'The result is:',
    };

    sum(input);
  });
}
