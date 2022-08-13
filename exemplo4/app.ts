function SumString(valueOne: string, valueTwo?: string): string {
  return valueOne + valueTwo;
}

let someString: string = 'foo ';
let anotherString: string = 'bar';
console.log(SumString(someString, anotherString)); //foo bar
// Any
let anything: any;

anything = {}; // object
someString = anything;
anotherString = anything;
console.log(SumString(someString, anotherString)); //[object Object][object Object]

anything = []; // array
someString = anything;
anotherString = anything;
console.log(SumString(someString, anotherString)); //

anything = 'AHHHHH! '; // string
someString = anything;
anotherString = anything;
console.log(SumString(someString, anotherString)); //AHHHHH! AHHHHH!

anything = 3; // number
someString = anything;
anotherString = anything;
console.log(SumString(someString, anotherString)); //6

anything = true; // boolean
someString = anything;
anotherString = anything;
console.log(SumString(someString, anotherString)); //2

anything = () => console.log('bar'); // function
someString = anything;
anotherString = anything;
console.log(SumString(someString, anotherString)); //() => console.log('bar')() => console.log('bar')
