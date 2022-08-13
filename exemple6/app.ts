// Any
let anyThing: any;
anyThing = 1;
anyThing = true;
anyThing = 'hello';

let testAny: string;

testAny = anyThing;
// Unknown
let unknownThing: unknown;

unknownThing = 1;
unknownThing = true;
unknownThing = 'hello';

let testUnknown: string;
/* testUnknown = unknownThing; //Type 'unknown' is not assignable to type 'string'. */
// validation is required

if (typeof unknownThing === 'string') {
  testUnknown = unknownThing;
}

// Never
function throwMessageErroWithCode(message: string, statusCode: number): never {
  throw {
    message: message,
    code: statusCode,
  };
}

throwMessageErroWithCode('Internal Server Error', 500);
