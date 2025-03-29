'use strict';
// functions are objects and have methods and properties
// ex for methods: .bind, .call, .apply
// ex for properties: .name, .length .. on functions

// --- 1. default parameters: An ES6 feature
// default values are taken only when the value is not passed
// to skip a value, pass undefined while calling the function (eg: bookingDetails('LH230', undefined, 100)) 

const bookingList = [];

const bookingDetails = function (flightNum, numPassengers = 230, price = 99) { // price = 99 * numPassengers can also be possible
    
    // numPassengers = numPassengers ?? 230 // old-way of assigning values .. nullish coalescing operator

    const booking = {
        flightNum: flightNum,
        numPassengers: numPassengers,
        price: price
    }
    // console.log(booking)
    bookingList.push(booking)
}

bookingDetails('LH230', 5)


// ------------------------------------------------------------------------------------------------------------
// --- 2. How passing arguments works: value / primitives vs reference

const flight = 'LH234'
const passenger = {
    name: 'Jonas',
    passport: 234234234
}
const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999'
    passenger.name = 'Mr. ' + passenger.name

    if (passenger.passport === 234234234) {
        // alert('Check-in')
    } else {
        // alert('Wrong passport')
    }
}

checkIn(flight, passenger)
// console.log(flight, passenger) // flight is not changed, but passenger is changed

// explanation: 
// flight is a primitive value, so it is passed by value, so the original value is not changed
// passenger is an object, so it is passed by reference, so the original object is changed

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000000)
}
newPassport(passenger)
checkIn(flight, passenger)

// we can observer how two functions manipulate the same object .. this is called "side-effects"
// explanation:
// newPassport function changes the passport number of the passenger object and checkIn function checks the passport number and alerts accordingly

// summary:
// there are 2 terms in programming while dealing with functions: "passing by value" and "passing by reference"
// JS does not have passing by reference, but it has passing by values
// we can pass a reference to the function, but we do not pass by reference


// ------------------------------------------------------------------------------------------------------------
// --- 3. First-class and higher-order functions

// First-class functions: 
// - JS treats functions as first-class citizens simply values, and functions are just another type of object
// - since functions are values, we can store them in variables, object (properties), and arrays 
// - we can pass functions as arguments to other functions and return functions from functions 
// - we can call methods on functions since they are objects (eg: .bind, .apply, .call)

// Higher-order functions:
// 1. A function that receives another function as an argument, that returns a new function, or both
// example: addEventListener etc., as this receives another function as an argument
//  -- we usually say that functions which are passed in are "callback functions"
// 2. function that returns a new function.  

// difference between first-class and higher-order functions:
// 1st class functions are just features... they are values


// ------------------------------------------------------------------------------------------------------------
// --- 4. Functions accepting callback functions

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase()
}
// - converts a sentence to a single word (removes spaces and converts to lowercase)
// console.log(oneWord("Hi there, How are you?")) // res: hithere,howareyou?

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ')
    return [first.toUpperCase(), ...others].join(' ')
}
// - converts the first word of a sentence to uppercase
// console.log(upperFirstWord("Harsha Vardhan")) // res: HARSHA Vardhan


// Higher-order function 
const transformer = function (str, fn) {
    console.log(`Original String: ${str}`)
    console.log(`Transformed String: ${fn(str)}`)
    console.log(`Transformed by: ${fn.name}`)
}

// transformer('JavaScript is the best', upperFirstWord)
// transformer('JavaScript is the best', oneWord)

// - calls them later! transformer is a higher-order function that accepts a callback function as an argument (that's upperFirstWord and oneWord)

// simpler example - 1:
const high5 = function () {
    console.log('👋')
}
// document.body.addEventListener('click', high5) // used in-built function (addEventListener) 

// simpler example - 2: 
// user fruit-processing function 

// another in-built function calling high5: 
// ['Jonas', 'Martha', 'Adam'].forEach(high5) // high5 is a callback function here

// Advantages of callback functions:
// ---
// - abstraction: hides the details of some code implementation
// - 'transformer' function does not really care about how transformation of string is done, it just transforms the input string


// ------------------------------------------------------------------------------------------------------------
// --- 5. Functions returning functions
// this is useful when we use functional programming paradigms 

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`)
    }
}
// greet('Hey')('Jonas') // Hey Jonas

// explanation:
// greet('Hey') returns a function, which is then called with 'Jonas' as an argument


// re-writing the above function using arrow functions
// ---
const greet1 = (greeting) => {
    return (name) => {
        console.log(`${greeting} ${name}`)
    }
}
// greet1('Hey')('Jonas') // Hey Jonas


// ------------------------------------------------------------------------------------------------------------
// --- 6. The call and apply methods
// these methods are available on all functions because functions are objects and 
// learn how to set the 'this' keyword manually
// 'this' keyword works only inside a function and it will be undefined when pointed outside of function or in the global scope

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function () {}
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`)
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name: name })
    }
}

const book = lufthansa.book

// this will not work because 'this' keyword is undefined
// book(239, "Jonas") 

// as these are three function methods
// to set the 'this' keyword manually: call, apply, and bind

// --- the call method
// - this method takes three arguments:
//  - function to call book method on to (lufthansa) and two arguments to pass to the function (book that are flightNum and name)
// ---
// book.call(lufthansa, 239, "Jonas")
// console.log(lufthansa)

// another example
const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: []
}

// --- apply method
// - this method is similar to call method, but the only difference is that it takes an array of arguments
// ---
const flightData = [583, 'George']
// book.apply(swiss, flightData) 
// console.log(swiss)

// we can use call method in place of apply method by using spread operator (...) to spread the array (if array is used to pass arguments)
// book.call(swiss, ...flightData)
// console.log(swiss)

// summary: 
// in call and apply methods, 1st argument is what we want this keyword point to (actually an object), 
// and the rest of the arguments.. that we want to pass to the function for the method to work


// ------------------------------------------------------------------------------------------------------------
// --- 7. The bind method

// case(1):
// - this also allows us to manually set the 'this' keyword, but it does not immediately call the function 
//  - instead, it returns a new function where 'this' keyword is bound
// 
const euroWings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: []
}

// book.call(euroWings, 23, 'Sarah') // this immediately calls the function
const bookEW = book.bind(euroWings) // this does not immediately call the function, but returns a new function
// bookEW(23, 'Sarah')

// case(1) partial applications: 
const airIndia = {
    airline: 'Air India',
    iataCode: 'AI',
    bookings: []
}

// as book methods takes two arguments, that are 'flightNum' and 'name' .. 
// if we passed one argument while calling "bind" onto 'book' method, then it will be a partial application .. 
// this is specifying parts of parameters of a function before calling it .. 
// in real-world, this is useful when we have a function with many parameters

const bookAI = book.bind(airIndia, 45) 
// bookAI('Vardhan') // Vardhan booked a seat on Air India flight AI45

//
// case(2) with event listeners:
const airGaruda = {
    airline: 'Garuda Indonesia',
    iataCode: 'GA',
    bookings: []
}
airGaruda.planes = 300
// console.log(airGaruda)

airGaruda.buyPlane = function () {

    console.log(this)
    this.planes = this.planes + 1
    console.log(this.planes)
}

document.querySelector('.buy').addEventListener('click', airGaruda.buyPlane.bind(airGaruda))

// console.log(airGaruda.buyPlane.bind(airGaruda)) 
// returns: 
// ƒ () {
//     console.log(this)                    |    
//     this.planes = this.planes + 1        | -> this fn is called when logged "airGaruda.buyPlane.bind(airGaruda)" to console
//     console.log(this.planes)             |
// }

// explanation:
// - here, 'this' keyword is not pointing to the object 'airGaruda' but to the 'buy' button element 
//  - so we use bind method to point 'this' keyword to the object 'airGaruda'

// 
// case(3) partial applications:
const addTax = (rate, value) => {
    return value + value * rate
}
const addVAT = addTax.bind(null, 0.23)
// console.log(addVAT(23))

// explanation:
// - here, we are setting the 'this' keyword to null, as we do not use 'this' keyword in the above function - addTax

// --- using function returning another function ..
const addTax1 = function (rate) {
    return function (value) {
        return(value + value * rate)
    }
}
const addVAT1 = addTax1(0.23)
// console.log(addVAT1(100))


// ------------------------------------------------------------------------------------------------------------
// challenge-1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. 
    This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. 
  Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)

2. Call this method whenever the user clicks the "Answer poll" button.

3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), 
    which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). 
This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 

4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. 
Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
    
    question: "what is your favourite programming language?",
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // this generates [0, 0, 0, 0]

    answers: new Array(4).fill(0),

    // Get the answer
    registerNewAns: function() {
        const option = +prompt(`${this.question}\n${this.options.join('\n')} (Write option number)`)
        typeof option === 'number' && option < this.options.length && this.answers[option]++

        this.displayResults()
        this.displayResults('string')
    },

    // display results
    displayResults: function(type = 'array') {
        if (type.toLowerCase() === 'string') {
            console.log(`Poll results are: ${this.answers.join(', ')}`)
        }
        else {
            console.log(this.answers)
        }
    }
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAns.bind(poll))

const anObject = {
    answers: [5, 2, 3]
}
// poll.displayResults.call(anObject)
// poll.displayResults.call(anObject, 'string')

// poll.displayResults.call({ answers: [5, 2, 3] }, 'string')


// ------------------------------------------------------------------------------------------------------------
// --- 8. Immediately Invoked Functions
// in JS, we need a function that is executed immediately and only once .. and then never again
// this is called IIFE (Immediately Invoked Function Expression)

// this disappears after it's execution

// -- normal function
// const runOnce = function () {
//     console.log('This will never run again')
// }
// runOnce()

// -- IIFE
// 1.
// (function () {
//     console.log('This will never run again')
// })();

// Correct IIFE syntax
// (() => {
//     console.log('This will never run again');
// })();

// 2.
// (() => {
//     console.log('This will also never run again');
// })()

// (function () {
//     console.log('This will also never run again')            } this is a function expression wrapped in parentheses
// }) ()                                                 --- called immediately here

// SKIPPED THIS CONCEPT .. AS IT IS PROVIDING A CONSTANT ERROR OF "Uncaught TypeError: {(intermediate value)} is not a function"


// ------------------------------------------------------------------------------------------------------------
// --- 9. Closures (part-1) --- HARDEST CONCEPT IN JS
// a closure is a function that has access to the parent scope, even after the parent function has closed

// a simple example for this is:

const var1 = 23;
const firstClosure = function () {
    const var2 = 10;
    console.log(var1 * var2)
}
// firstClosure() // --- 230

// -- so, 'var1' belongs to a different scope but it is accessible in the function 'firstClosure' which is of different scope
// -- this is because of "closure" --- (but this is not the actual way of representing a closure)

// actual example for closure:
function outerScope () {
    const outVar = 10;
    return function innerScope (inVar) {
        console.log(outVar * inVar)
    }
}
const closFn = outerScope()
// closFn(20) // --- 200

// here closFn is of global scope but has access to outVar in the outerScope function was no longer active 

// reason why the innerScope fn can access the outVar is because of closure 
//  - the outVar is stored in the heap memory and not in the call stack (not garbage collected) 
//      - even after the outerScope function is closed / executed

// with closures everything inside the fn has access to the variables outside of that fn
// ex: used inside fetch API, event listeners, and timers etc.

// a closure is a function that remembers all the variables that were present at the function's birthplace
// a closure has priority over the scope chain

// a closer look into closures: "console.dir(closFn)" .. this will have 'scopes' property which will have the 'outer scope variables'


// ------------------------------------------------------------------------------------------------------------
// --- 10. Closures (part-2) --- More closure examples

// -- example-1
// --- closure happens when you have re-assigned function without returning them
let f;
const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2)
    }
}  

const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2)
    }
}

// here 'f' will be assigned to 'a' variable 
// g()
// f() // --- 46

// re-assigning the value of 'f' with 'h' --- here 'f' has different scope and assigned to 'b' from 'a' 
// h()
// f() // --- 1554

// -- example-2
// timer example with closures 
const boardPassengers = function (n, waitSec) {
    const personsPerGroup = n / 3;

    setTimeout(() => {
        console.log(`we're now onboarding all ${n} passengers`)
        console.log(`There are 3 groups, each with ${personsPerGroup} passengers`)
    }, waitSec * 1000)

    console.log(`We will start boarding in ${waitSec} seconds`)
}

// this will work as 'personsPerGroup' and it is a global variable and is accessible in the function
const personsPerGroup = 1000
// boardPassengers(180, 3)

// explanation:
// - but 'personsPerGroup' in the function is a local variable and is accessible in the function even after the function is closed, cause of closure


// ------------------------------------------------------------------------------------------------------------
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// SKIPPED THIS CHALLENGE .. AS IT IS PROVIDING A CONSTANT ERROR OF "Uncaught TypeError: {(intermediate value)} is not a function"


