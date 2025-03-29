'use strict';

// -------------------------------------------------------------------------------------------------------------------------------
// BANKIST APP

// -------------------------------------------------------------------------------------------------------------------------------
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2024-10-18T21:31:17.178Z',
    '2024-11-23T07:42:02.383Z',
    '2024-12-28T09:15:04.904Z',
    '2025-01-01T10:17:24.185Z',
    '2025-01-08T14:11:59.604Z',
    '2025-01-27T17:01:17.194Z',
    '2025-02-06T11:36:17.929Z',
    '2025-02-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2024-10-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-11-25T06:04:23.907Z',
    '2024-12-25T14:18:46.235Z',
    '2024-12-05T16:33:06.386Z',
    '2025-01-10T14:43:26.374Z',
    '2025-02-07T18:49:59.371Z',
    '2025-02-11T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// -------------------------------------------------------------------------------------------------------------------------------
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// -------------------------------------------------------------------------------------------------------------------------------
// Functions

// 1. Displaying Movements and Dates
// ---

// 1.1 format dates
const formaMoveDates = (date, locale) => {

  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)))
  }

  const daysBetween = calcDaysPassed(new Date(), date)
  // console.log(daysBetween)

  if (daysBetween === 0) {
    return 'Today'
  }
  else if(daysBetween === 1) {
    return 'Yesterday'
  }
  else if (daysBetween <= 7) {
    return `${daysBetween} days ago`
  }
  else {
    // // dates
    // const day = `${date.getDate()}`.padStart(2, 0)
    // const month = `${date.getMonth() + 1}`.padStart(2, 0)
    // const year = date.getFullYear()
    
    // // display current date and time below the balance
    // return `${day}/${month}/${year}`

    // replacing it with internationalization and locale
    return new Intl.DateTimeFormat(locale).format(date)
  }
}

// 1.2 Displaying Movements 
// ---
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  // create a separate object for movement dates
  const combinedMovesDates = acc.movements.map((moves, i) => {
    return ({
      move: moves,
      moveDate: acc.movementsDates[i]
    })
  })
  // console.log(combinedMovesDates)

  // - here movements.slice() used to get the copy, so this will not change the actual array ..
  // - DISABLED THE FOLLOWING LINES -> THIS HAS THROWN AN ERROR .. SO DISABLED
  // ---
  // const moves = sort ? acc.movements.slice().sort((a, b) => {
  //       return a - b;
  //     })
  //   : acc.movements;
  
  // - CORRECT way of SORTING! 
  // ---
  if (sort) {
    combinedMovesDates.sort((a, b) => {
      return a.move - b.move;
    })
  }

  combinedMovesDates.forEach(function (obj, i) {

    const {move, moveDate} = obj;

    // checking the type ...
    const type = move > 0 ? "deposit" : "withdrawal";

    const date = new Date(moveDate)
    const displayDate = formaMoveDates(date, acc.locale)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${move.toFixed(2)}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};


// 2. Creating UserNames
// ---
// ex:
// --- single_user
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// --- accounts_array
// const accounts = [account1, account2, account3, account4];

// const account1 = {
//   owner: "Jonas Schmedtmann",

// this "createUsernames" fn. creates "username" a new key with values of 1st letters of names
// "createUsernames" is defined below ...

//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((part) => {
        return part[0];
      })
      .join("");
  });
};
createUsernames(accounts);


// 3. Calculate and Display the Balance
// ---

// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

const calcDisBalance = (acc) => {
  const balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance.toFixed(2)} EUR`;
};


// 4. Calculate and Display the Summary
// ---
const calcDisplaySummary = (acc) => {
  const incomes = acc.movements
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acc, inc) => {
      return acc + inc;
    }, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, out) => {
      return acc + out;
    }, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => {
      return mov > 0;
    })
    .map((deposit) => {
      return (deposit * acc.interestRate) / 100; // 1.2% interest rate
    })
    // new rule: if the interest is greater than or equal to 1, then only we will add that interest to the summary
    .filter((int, ind, arr) => {
      // console.log(arr)
      return int >= 1;
    })
    .reduce((acc, int) => {
      return acc + int;
    });
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};


// Bonus: Update the UI
const updateUI = (acc) => {
  // display current balance
  calcDisBalance(acc);

  // display summary
  calcDisplaySummary(acc);

  // display movements
  displayMovements(acc);
};

// Logout function / timer
const startLogoutTimer = () => {

  const tickTock = () => {

    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const sec = String(Math.trunc(time % 60)).padStart(2, 0)

    // In each call, print out the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`

    // when time is at 0, logout the user and update the UI 
    if(time === 0){
      
      // clear the timer
      clearInterval(timer)

      // display UI and welcome message
      labelWelcome.textContent = `Login to get started`

      // reset the opacity to zero
      containerApp.style.opacity = 0;
    }

    // decrease the time 1 sec every time
    time = time - 1
  }
  // set time to 5 minutes
  let time = 120
  
  // call timer for every second
  tickTock();
  const timer = setInterval(tickTock, 1000)

  return timer;
}

// -------------------------------------------------------------------------------------------------------------------------------
// Event handlers

// 5. Implementing Login
// ---
let currentAccount, timer;

// ---------------
// TEMPORARY LOGIN
// ---
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// Experimenting with Intl API
// ---

btnLogin.addEventListener("click", (e) => {
  // prevent form from submitting...
  e.preventDefault();

  // find the account with login account username
  currentAccount = accounts.find((acc) => {
    return acc.username === inputLoginUsername.value.toLowerCase().trim();
  });
  // console.log(currentAccount)

  // check the pin associated with curr.acc and the pin entered
  if (currentAccount?.pin === +inputLoginPin.value) {
    
    // clearing form fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); // to remove focus

    // display UI and welcome message
    labelWelcome.textContent = `Welcome, ${
      currentAccount.owner.split(" ")[0]
    }!`;
    containerApp.style.opacity = 1;

    // create current date and time
    // const now = new Date()
    // // dates
    // const day = `${now.getDate()}`.padStart(2, 0)
    // const month = `${now.getMonth() + 1}`.padStart(2, 0)
    // const year = now.getFullYear()
    // // time
    // const hour = `${now.getHours()}`.padStart(2, 0)
    // const minute = `${now.getMinutes()}`.padStart(2, 0)

    // // display current date and time below the balance
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`

    const now = new Date()
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: 'long', // gives month in words
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    }

    // to get the locale from the user browser
    const locale = navigator.language
    console.log(locale) // en-IN

    // pass the above local to below API
    // new Intl.DateTimeFormat(locale, options)

    labelDate.textContent = new Intl.DateTimeFormat(`${currentAccount.locale}`, options).format(now)

    // start the timer 
    if(timer) {
      clearInterval(timer)
    }

    // ! problem: when a user logs out and logs in again with another credentials, the timer will not start again..
    // ? I have to reset the timer for every time a new user logs in..
    timer = startLogoutTimer()

    // Update the UI
    updateUI(currentAccount);

    // console.log(currentAccount)
  }
});


// 6. Implementing Transfers
// ---
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find((acc) => {
    return acc.username === inputTransferTo.value;
  });
  // console.log(amount, receiverAcc)

  // currentAccount variable is defined inside implementation of login
  // check that receiver's username and currentAccount holder username are not equal (we can use optional chaining for this ?.)
  // check that amount greater than 0 and currentAcc balance must be greater than amount that has to transferred
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // operating with transfers
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add dates for transfer and received amounts 
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString())

    // Update The UI
    updateUI(currentAccount);

    // reset the timer for every transfer
    clearInterval(timer)
    timer = startLogoutTimer()
  }
  // clean the input fields
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
});


// 7. Delete an account
// ---
btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value.toLowerCase().trim() === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    // console.log("closed")

    const index = accounts.findIndex((acc) => {
      return acc.username === currentAccount.username;
    });

    // delete the account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }
});


// 8. Loan Request
// ---
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  // rule: to avail loan amt., there must be one deposit with at least 10% of requested loan amt
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => {
      return mov >= 0.1 * amount;
    })
  ) {

    // implementing setTimeout to delay the approval of loan sanction
    setTimeout(() => {
      // add amount to the user movements
      currentAccount.movements.push(amount);

      // Add dates for loan amount that was credited
      currentAccount.movementsDates.push(new Date().toISOString())

      // update UI
      updateUI(currentAccount);
    }, 3000)
  }

  // reset the timer for every transfer
  clearInterval(timer)
  timer = startLogoutTimer()

  // clear the input fields
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// 9. Sort the movements
// ---
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// -------------------------------------------------------------------------------------------------------------------------------
// LECTURES
// ----------------------------------
// 1. Converting and Checking Numbers
// ---

// NUMBERS
// --
// - all numbers are represented as floating pt numbers in JS (clg(23 === 23.0) => true)
// - numbers are represented as in 64 base 2 format .. this means these are stored in a binary format ..

// base 10 => 0 to 9 | binary base 2 => 0 and 1 
// so 0.1 + 0.2 is not equal to 0.3 and we can not do scientific calculations with JS .. 
// (0.1 + 0.2 === 0.3000000...4) because of the binary representation of numbers

// CONVERSION OF STRINGS TO NUMBERS (use Number() constructor)
// --
// console.log(Number("23")); // 23
// - there is another simpler way to convert this using "+" before the string containing numbers .. this is type coercion (implicit conversion)
// console.log(+"23"); // 23

// PARSING -- GLOBAL FUNCTIONS (parseInt, parseFloat)
// --
// - parseInt() => converts string to integer 
// - parseFloat() => converts string to float

// parseInt() accepts two arguments .. the string to be converted and the base of the number system .. 2nd arg: "regex" => which is the base of number system
// number system: 10 => decimal, 2 => binary, 8 => octal, 16 => hexadecimal .. if we do not provide the 2nd arg, then it will be considered as 10 by default
// console.log(Number.parseInt("30px", 10)); // 30
// console.log(Number.parseFloat("2.5rem")); // 2.5 .. // rem is not a number so it will stop at the first non-number character // paresInt("2.5") => 2

// CHECKING IF VALUE IS A NUMBER or INTEGER or FINITE
// --
// - isNaN() => checks if the value is not a number .. it will return true if the value is not a number
// console.log(Number.isNaN(20)); // false // Is-20-NotaNumber? => false
// console.log(Number.isNaN(23 / 0)); // false // Is-23/0-NotaNumber? => false

// - isFinite() => checks if the value is finite number .. it will return true if the value is a finite number
// console.log(Number.isFinite(20)); // true
// console.log(Number.isFinite(23 / 0)); // false

// - isInteger() => checks if the value is an integer .. it will return true if the value is an integer
// console.log(Number.isInteger(23)); // true
// console.log(Number.isInteger(23.0)); // true
// console.log(Number.isInteger(23.1)); // false // why? because 23.1 is a float number


// --------------------
// 2. Math and Rounding
// ---

// MATH OPERATIONS
// --
// - Math.sqrt() => square root of a number {clg(Math.sqrt(25)) => 5 | clg(25 ** (1/2)) => 5 | clg(8 ** (1/3)) => 2}

// - Math.max() => maximum of the numbers provided 
// console.log(Math.max(5, 18, 23, 11)) // 23
// console.log(Math.max(5, 18, "23", 11)) // 23
// console.log(Math.max(5, 18, "23px", 11)) // 'NaN' // does not perform type coercion

// - Math.min() => minimum of the numbers provided

// - Math.PI => value of PI
// console.log(Math.PI) // 3.141592653589793

// RANDOM NUMBERS 
// --
// => Math.random() => generates a random number between 0 and 1 (not including 1) .. this is a pseudo-random number
Math.random() * 6 // this generates a random number from 1 to 5 (without 6) which is of type: float
Math.trunc() // this will remove the decimal part of the number
// console.log(Math.trunc(Math.random() * 6) + 1) // this generates a random number from 1 to 6

Math.floor() // this will round the number to the nearest integer // higher or lower depending on the which side of dec part? 
// Math.floor(23.3) => 23 | Math.floor(23.9) => 23

// FN. TO GENERATE RANDOM NUMBER BETWEEN MIN and MAX
// --
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// console.log(randomInt(0, 2))

// ROUNDING NUMBERS
// --
Math.trunc(23.3) // 23 // removes the decimal part of the number
Math.round(23.3) // 23 // rounds the number to the nearest integer // 23.6 => 24 // 23.3 => 23
Math.ceil(23.3) // 24 // rounds the number to the higher integer // 23.1 => 24 
Math.floor(23.3) // 23 // rounds the number to the lower integer // 23.9 => 23

// for negative numbers
// --
// Math.trunc(-23.3) // -23 // -23.6 => -23
// Math.round(-23.3) // -23 // -23.6 => -24 // -23.3 => -23
// Math.ceil(-23.3) // -23 // -23.1 => -23 // -23.9 => -23
// Math.floor(-23.3) // -24 // -23.1 => -24 // -23.9 => -24

// ROUNDING DECIMALS
// --
// toFixed() => rounds the number to the number of decimal places specified returns a string convert to number with "+" or "Number()"
// console.log((2.7).toFixed(0)) // 3 // 2.7 => 3 .. type: string
// console.log((2.7).toFixed(3)) // 2.700 // 2.7 => 2.700 .. type: string
// console.log((2.345).toFixed(2)) // 2.35 // 2.345 => 2.35 .. type: string

// NOTE:
// - toFixed() on 2.7 which is a primitive so JS and primitives do not have methods .. BTS JS does boxing and converts into an number object after operation.. converted back to primitive that is str


// ---------------------
// 3. Remainder Operator => SKIPPED
// ---

// -----------------------
// 4. Numerical Separators => SKIPPED (10_000_000)
// ---

// ----------------------
// 5. Working with BigInt 
// ---
// - numbers are represented in 64 bits in JS .. 
//  - of these 64 ones and zeroes, only 53 are used to store the number itself and remaining are used to store the position of the decimal point
// - so the max number that can be represented is 2^53 - 1 => 9007199254740991 (53 - 1 => as numbers starts from 'zero')

// - to work with numbers greater than this, we can use "BigInt" .. BigInt is a new primitive in JS that allows us to work with numbers greater than 2^53 - 1
// 1. so, add 'n' at the end of the number to convert it into BigInt .. 
// 2. without 'n' => use BigInt() constructor


// ---------------------
// 6. Creating Dates
// ---
// - Date is a built-in object in JS that allows us to work with dates and times .. 
//  - there are 4 ways to create a date object
// 1. new Date() => creates a new date object with the current date and time
// 2. new Date("month day year hours:minutes:seconds") => creates a new date object with the specified date and time
// 3. new Date(year, month, day, hours, minutes, seconds) => creates a new date object with the specified date and time
// 4. new Date(milliseconds) => creates a new date object with the specified number of milliseconds since the Unix Epoch (Jan 1, 1970)

// - months are zero based in JS .. so January is 0 and December is 11
// - days are also zero based .. so Sunday is 0 and Saturday is 6
// - date object has many methods to work with dates and times

// - to get the current date and time
// const now = new Date()
// console.log(now)

// - to get the current date and time in milliseconds
// console.log(new Date().getTime())

// - to get the current date and time in string format
// console.log(new Date().toString())

// - to get the current date and time in UTC format
// console.log(new Date().toUTCString())

// - to get the current date and time in ISO format
// console.log(new Date().toISOString())

// - to get the time with given arguments 
// console.log(new Date(2037, 10, 19, 15, 23, 5)) // Thu Nov 19 2037 15:23:05 GMT+0530 (India Standard Time)

// - to get the time with given string
// console.log(new Date("December 24, 2015")) // Thu Dec 24 2015 00:00:00 GMT+0530 (India Standard Time)

// TIMESTAMPS
// --
// - timestamp is the number of milliseconds that have passed since the Unix Epoch (Jan 1, 1970)
// - to get the timestamp of the current date and time 
// console.log(new Date().getTime()) // 1739195347877
// console.log(Date.now()) // 1739195347877

// GETTERS
// const future = new Date(2037, 10, 19, 15, 23)
// console.log(future)
// future.getFullYear() => 2037 // future.getMonth() => 10 // future.getDate() => 19 
// future.getDay() => 4 // future.getHours() => 15 // future.getMinutes() => 23
// future.getSeconds() => 0 
// future.toISOString() => "2037-11-19T09:53:00.000Z"

// SETTERS
// to set a new year - use .setFullyear()
// future.setFullYear(2040)
// console.log(future) // Sun Nov 19 2040 15:23:00 GMT+0530 (India Standard Time)
// there are other methods: setMonth(), setDate(), setHours(), setMinutes(), setSeconds() .. etc


// -----------------------
// 7. Operations wit Dates
// ---
const future = new Date(2037, 10, 19, 15, 23)

const calcDaysPassed = (date1, date2) => {
  return Math.abs((date2 - date1) / (1000 * 60 * 60 * 24))
}

const daysBetween = calcDaysPassed(new Date(2037, 3, 16), new Date(2037, 3, 6))
// console.log(daysBetween)


// ----------------------------------
// 8. Internationalizing Dates (Intl)
// ---

// - JS has new internationalization API, which allows us to easily format numbers and strings according to different languages ..
// - the syntax used for internalizing dates ..
//  - "labelDate.textContent = new Intl.DateTimeFormat()"

// new Intl.DateTimeFormat(locale, ) .. 
// --
// 1. locale:
// 1st arg {en-US}: takes language-country .. this creates a format and on this we call .format(new Date())
// --- 
// new Intl.DateTimeFormat(en-US).format(now)

// continues ... inside the application code


// -------------------------------------
// 9. Timers: setTimeout and setInterval
// ---
// setTimeout is a function which require a fn. as a callback and time in milliseconds .. 
// this callback will be called after some time in future that was passed in 2nd arg
// sn:
setTimeout (() => {}, 3000) // => the callback fn. will get executed after 3 ms = 3000 seconds

// the fn will get delayed by 3 seconds .. 
// this do not stop the execution of code after the setTimeout fn. this setTimeout fn. registers cb fn. inside it into call stack 
// ex: 
// setTimeout(() => {
//   console.log("after 3 seconds")
// }, 3000)
// console.log("Executed just now!")

// this mechanism is called "ASYNCHRONOUS JS"

// PASSING ARGUMENTS INTO setTimeout()
// setTimeout((greet, daySes) => {
//   console.log(`${greet}, Good ${daySes}!`)
// }, 3000, 'Hello', 'Morning')                  // the values passed after the time given are taken as arguments to the cb fn.

// console.log("Hi")

// STOPPING the execution of a setTimeout fn. using clearTimeout() => parameter: must be the name of variable in which setTimeout is stored
const numArray = [2, 4, 6, 8];
const evenArrExecuter = setTimeout((...arr) => {
  // console.log(`Array consisting of even numbers ${arr}`)
}, 1000, ...numArray)

numArray.forEach((num) => {
  if (num % 2 !== 0) {
    clearTimeout(evenArrExecuter)
  }
})

// SetInterval: the callback fn. runs after every given time period
setInterval(() => {
  const now = new Date()
  // console.log(now)
}, 1000)


// ----------------------------------
// 10. Implementing a countdown timer
// ---
// code: at login section ...

// explanation:
// ---
// - the timer fn. is called at the time of login .. 
// - the timer fn. has to reset for every login, and for also if there is any activity in the account (transfers, loan, etc.)
// - the timer fn. will be called at the time of login and will run for 5 minutes .. 