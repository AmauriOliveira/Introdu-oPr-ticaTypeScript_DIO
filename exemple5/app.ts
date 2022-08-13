/* function sum(
  valueOne: number | string,
  valueTwo: number | string
): number | string {
  if (typeof valueOne === 'string' || typeof valueTwo === 'string') {
    return `${valueOne.toString()}${valueTwo.toString()}`;
  } else {
    return valueOne + valueTwo;
  }
}
*/

type value = number | string;
// return number or string
function sum(valueOne: value, valueTwo: value): value {
  if (typeof valueOne === 'string' || typeof valueTwo === 'string') {
    return `${valueOne.toString()}${valueTwo.toString()}`;
  } else {
    return valueOne + valueTwo;
  }
}

console.log(sum(1, 2)); // 3 > sum(1, 2) = 3
console.log(sum('Hello ', 'World.')); //Hello World.
console.log(sum('Hello ', 2)); // Hello 2
console.log(sum(1, 'World.')); // 1World.
console.log(sum('1 ', '2.')); // 12 > string concatenation

/// return void
function printSum(valueOne: number, valueTwo: number): void {
  console.log(valueOne + valueTwo);
}

function printSubtraction(valueOne: number, valueTwo: number): void {
  console.log(valueOne - valueTwo);
}

//return callback function

function math(
  valueOne: number,
  valueTwo: number,
  callback: Function /* (valueOne:number, valueTwo: number) => () => {} */
): Function {
  return callback(valueOne, valueTwo);
}

math(1, 2, printSum); // 3
math(1, 2, printSubtraction); // -1
