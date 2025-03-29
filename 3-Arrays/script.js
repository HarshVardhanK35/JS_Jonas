"use strict";

// ------------------------------------------------------------------------------------------------------------------------------------
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "premium",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50],
  interestRate: 0.7,
  pin: 3333,
  type: "standard",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700],
  interestRate: 1,
  pin: 4444,
  type: "basic",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// BANKIST APP

// 1. Displaying Movements
// ---
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  // here movements.slice() used to get the copy, so this will not change the actual array
  const moves = sort
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;

  moves.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = `${acc.balance} EUR`;
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
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, out) => {
      return acc + out;
    }, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

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
  labelSumInterest.textContent = `${interest}€`;
};

// Bonus: Update the UI
const updateUI = (acc) => {
  // display current balance
  calcDisBalance(acc);

  // display summary
  calcDisplaySummary(acc);

  // display movements
  displayMovements(acc.movements);
};

// 5. Implementing Login
// ---
let currentAccount;
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

    // Update The UI
    updateUI(currentAccount);
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
  const amount = +inputLoanAmount.value;

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => {
      return mov >= 0.1 * amount;
    })
  ) {
    // add amount to the user movements
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
  // clear the input fields
  inputLoanAmount.value = "";
  // inputLoanAmount.blur();
});

// 9. Sort the movements
// ---
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// ------------------------------------------------------------------------------------------------------------------------------------
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// ------------------------------------------------------------------------------------------------------------------------------------
// 1. Simple Array Methods

let arr = ["a", "b", "c", "d", "e"];

// SLICE
// slice method does not mutate the original array instead it returns a new array with the sliced elements
// ---
// console.log(arr.slice(2)); // ["c", "d", "e"]
// console.log(arr.slice(2, 4)); // ["c", "d"] --- with the end index not included
// console.log(arr.slice(-2)); // ["d", "e"] --- negative index starts from the end of the array
// console.log(arr.slice(1, -2)); // ["b", "c"] --- negative index starts from the end of the array

// SPLICE
// splice method does mutate the original array and returns the removed elements
// ---
// console.log(arr.splice(0, 1))
// console.log(arr)
// ---
// console.log(arr.splice(2)); // ["c", "d", "e"]
// arr.splice(-1); // ["a", "b", "c", "d"]
// arr.splice(1, 2); // ["a", "d"] --- with the end index not included
// console.log(arr);

// REVERSE
// reverse method mutates the original array and returns the reversed array
// ---
const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse()); // ["f", "g", "h", "i", "j"]
// console.log(arr2); // ["f", "g", "h", "i", "j"]

// CONCAT
// concat method does not mutate the original array instead it returns a new array with the concatenated arrays
// ---
const letters = arr.concat(arr2);
// console.log(letters); // ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// console.log([...arr, ...arr2]); // we can also use the spread operator to concatenate arrays

// JOIN
// join method does not mutate the original array instead it returns a string with the elements joined by the specified separator
// --- returns type is 'string'
// console.log(letters.join(" - ")); // a - b - c - d - e - f - g - h - i - j

// ------------------------------------------------------------------------------------------------------------------------------------
// 2. The new At Method (ES2022)

// The 'AT' method is a new method that is introduced in ES2022 and it is used to access elements in an array
// we have to specify the index of the element that we want to access
// a replica or an alternative for bracket notation that is => console.log(letters[0]); // "a"
// ---
// console.log(letters.at(0)); // "a"

// the 'AT' method is useful when we want to access elements in an array with a negative index
// a replica for .slice() method that is => console.log(letters.slice(-1)); // ["j"] and we can access that element with its index that is '0'
// ---
// console.log(letters.at(-1)); // "j"

// use cases for 'AT' method: best when we use to access with negative index and while method chaining
// this 'AT' is also used on strings

// ------------------------------------------------------------------------------------------------------------------------------------
// 3. Looping Arrays: forEach Method

// forEach method is used to loop through the elements of an array and it is a higher order fn.
// it takes a callback fn. as an argument and it is called for each element in the array
// ---
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// positive values are deposits and negative values are withdrawals

// we used to have for-of loop to loop through the elements of an array and forEach method is a better alternative
// ---
// for (const movement of movements) { // --- to get index also: for (const [ind, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement} at index ${ind}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)} at index ${ind}`);
//   }
// }

// forEach method is a higher order fn. and it takes a callback fn. as an argument and it is called for each element in the array
// forEach loops over the array and for every iteration the callback fn. is applied / executed
// as forEach calls this callback fn., in each iteration it passes the current element as an arg, the current index and the entire array
// ---
// movements.forEach((crrEle) => {
//   if (crrEle > 0) {
//     console.log(`You deposited ${crrEle}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(crrEle)}`);
//   }
// })
// BTS
// 0: function(200)
// 1: function(450)
// 2: function(-400) ...

// in forEach we can access the 'index' and 'current array' in addition to 'current element'
// but the order of these arguments is fixed and we cannot change that (order: important)
// ---
// movements.forEach((crrEle, ind, arr) => {
//   if (crrEle > 0) {
//     console.log(`Movement ${ind + 1}: You deposited ${crrEle}`);
//   } else {
//     console.log(`Movement ${ind + 1}: You withdrew ${Math.abs(crrEle)}`);
//   }
// })

// NOTE:
// 1. in 'for-of' we get the index at '1st' and in 'forEach' we get the index at '2nd' position
// 2. "continue" and "break" statements do not work in 'forEach' method and these works on 'for-of' loop

// ------------------------------------------------------------------------------------------------------------------------------------
// 4. forEach With Maps and Sets

// forEach method can also be used with Maps and Sets and it works in the same way as it works with arrays
// ---

// Map
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

currencies.forEach((value, key, map) => {
  // console.log(`${key}: ${value}`);
});

// Set
// as sets do not have keys or indexes, so the first two arguments are the same
// but to avoid confusion JS lang developers has followed the three arguments pattern for sets also
// so use throwaway variables like '_' which indicate that we are not going to use '_' in the callback fn. parameters
// ---
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
currenciesUnique.forEach((value, _, map) => {
  // console.log(`${value}: ${value}`); // res: USD: USD, GBP: GBP, EUR: EUR (which indicate that sets have only values and no keys)
});

// ------------------------------------------------------------------------------------------------------------------------------------
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, 
  - and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. 
    - A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, 
  - not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array 
    - (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") 
  - or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = (dogsJulia, dogsKate) => {
  let newDogsJulia = dogsJulia.slice();

  newDogsJulia.splice(0, 1);
  newDogsJulia.splice(-2);

  const dogs = [...newDogsJulia, ...dogsKate]; // we can use ".concat()" method also on 2 arrays

  dogs.forEach((dogsAge, i) => {
    if (dogsAge >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and is ${dogsAge} years old`
      );
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

// ------------------------------------------------------------------------------------------------------------------------------------
// 5. Data Transformation: Map, Filter and Reduce

// MAP
// MAP is similar to forEach method but the main difference is that MAP creates a new array based on the original array
// performs some operation on each element of the original array and then returns a new array with the results of those operations
// ---

// FILTER
// Filters the elements on a certain condition and prepares a new array with the elements that satisfy that condition and returns that new array
// ---

// REDUCE
// reduce is used to reduces or accumulates all the elements of the array into a single value
// (eg: sum of all elements into a value, average of all elements, etc.)
// REDUCE has an accumulator and the current element and this keeps adding the current element to the accumulator

// ------------------------------------------------------------------------------------------------------------------------------------
// 6. The map Method

const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const rupToUsd = 0.012;

// using map method
const movementsUSD = movements1.map((movement) => {
  // using functional programming which creates a new array
  return movement * rupToUsd;
});
// console.log(movementsUSD)

// using for-of method
const movementsUSDfor = [];
for (const movement of movements1) {
  movementsUSDfor.push(movement * rupToUsd); // manually creating a new array while looping through the original array
}
// console.log(movementsUSDfor)

// with map method also we have three arguments like forEach method that are: current element, current index and the entire array
// ---
const movementsDescriptions = movements1.map((movement, i, arr) => {
  if (movement > 0) {
    return `Movement ${i + 1}: You deposited ${movement}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(movement)}`;
  }
  // or we can use ternary operator
  // return `Movement ${i + 1}: You ${movement > 0 ? "deposited" : "withdrew"} ${Math.abs(movement)}`;
});
// console.log(movementsDescriptions)

// Note:
// each of the element is logged to the console after every operation while using for method, this is called "side effects"
// but with map every string is added into a new array and logged to the console at once

// ------------------------------------------------------------------------------------------------------------------------------------
// 7. The filter Method

// filter method is used to filter the elements of an array based on a certain condition .. and it returns a new array with the elements that satisfy that condition
// ---
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const depositsOnly = movements2.filter((mov) => {
  if (mov > 0) {
    return mov;
  }
});
// console.log(depositsOnly)

// make an array similarly for withdrawals ..

// NOTE:
// advantages of using these higher order functions like map, filter, reduce in JS is that ..
// we can chain different methods together (with string and array methods together and separately also) ..
// this cannot be achieved with for, forEach and for-of looping ..

// ------------------------------------------------------------------------------------------------------------------------------------
// 8. The reduce Method

// reduce method is used to reduce or accumulate all the elements of an array into a single value
//  - (ex: adding up all the elements of an array into a value.)
// reduce method has an accumulator and the current element and this keeps adding the current element to the accumulator
// ---
// reduce method has two arguments: the callback fn. and the initial value of the accumulator
// the callback fn. has four arguments: accumulator, current element, current index and the entire array
// ---
const movements3 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totalBal = movements3.reduce((acc, cur, ind, arr) => {
  return acc + cur;
}, 0);
// console.log(totalBal)

// with reduce method we can do more stuff not only simple additions and multiplications etc.,
// in the below example, we are trying to get the largest element from an array ..
// ---
const max = movements3.reduce((acc, cur, ind) => {
  if (acc > cur) {
    return acc;
  } else {
    return cur;
  }
}, movements3[0]);
// console.log(max)

// ------------------------------------------------------------------------------------------------------------------------------------
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and 
calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: 
  - if the dog is <= 2 years old, humanAge = 2 * dogAge. 
  - If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = (ages) => {
  const humanAges = ages.map((humanAge) => {
    return humanAge <= 2 ? 2 * humanAge : 16 + 4 * humanAge;
  });
  const adultAges = humanAges.filter((humanAge) => {
    return humanAge > 18;
  });
  const avg =
    adultAges.reduce((acc, cur, ind, arr) => {
      return acc + cur;
    }, 0) / arr.length;
  return avg;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2)

// ------------------------------------------------------------------------------------------------------------------------------------
// 9. Chaining Methods

// chaining methods is a powerful feature of higher order functions in JS and it is used to chain multiple methods together
// ---
const movements4 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const rupToUsd1 = 1.1;

const totalDepositsUSD = movements4
  .filter((mov) => {
    return mov > 0;
  })
  .map((mov) => {
    return mov * rupToUsd1;
  })
  .reduce((acc, curMov) => {
    return acc + curMov;
  }, 0);
// console.log(totalDepositsUSD)

// NOTE:
// 1. chaining methods is a great way to write clean and readable code but chaining too many methods can raise performance issues
// 2. Bad Practice: to chain methods that mutate the original array (like splice, reverse, etc.) --- avoid mutating arrays

// ------------------------------------------------------------------------------------------------------------------------------------
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// already done ...

const calcAverageHumanAge1 = (ages) => {
  const humanAges = ages
    .map((humanAge) => {
      return humanAge <= 2 ? 2 * humanAge : 16 + 4 * humanAge;
    })
    .filter((humanAge) => {
      return humanAge > 18;
    })
    .reduce((acc, cur, ind, arr) => {
      return acc + cur / arr.length;
    }, 0);
  return humanAges;
};

const avg11 = calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);
const avg22 = calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg11, avg22)

// ------------------------------------------------------------------------------------------------------------------------------------
// 10. The find Method

// find method is used to find the first element in the array that satisfies a certain condition and returns that element .. it requires a boolean condition
// ---
const movements5 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements5.find((mov) => {
  return mov < 0;
});
// console.log(firstWithdrawal)

// using find method
const account = accounts.find((acc) => {
  return acc.owner === "Jessica Davis";
});
// console.log(account)

// using for-of method
for (const account of accounts) {
  if (account.owner === "Jessica Davis") {
    // console.log(account)
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------
// 11. Implementing Login

// The default behavior of submit in form of a HTML doc is to reload the page and we can prevent that by using "e.preventDefault()" method
// btnLogin.addEventListener('click', (e) => {
//   e.preventDefault()
//   console.log('Login')
// })

// ------------------------------------------------------------------------------------------------------------------------------------
// 12. FindIndex Method

// findIndex returns the index of the found element not the element like find method
// similar to find.. findIndex has access to current index and current array
// ---
// as an example and explanation of syntax, I have demonstrated the application fo findIndex() by deleting the account of the user

// ------------------------------------------------------------------------------------------------------------------------------------
// 13. The findLast and findLastIndex methods

// these methods start searching from the last index {findLast: "searches for element"; findLastIndex: "searches for last index"}
// both are similar to find and findIndex...
// ---
// ex:
const movements6 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// findLast
const lastElement = movements6.findLast((mov) => {
  return mov < 0;
});
// console.log(lastElement)

// use-case: "Your latest large movement was X moments ago"  // -> this searches from the last occurred transactions

// findLastIndex -> largeMovementIndex that is greater than 1000
const largeMovementIndex = movements6.findLastIndex((mov) => {
  return Math.abs(mov) > 1000;
});
// console.log(`The latest large movement was ${movements.length - largeMovementIndex} moments ago`)

// ------------------------------------------------------------------------------------------------------------------------------------
// 14. Some and Every

// SOME:
// similar to includes method ".includes()" -> returns 'true' if the passed element is there inside an array and -1 if not
// includes returns true only passed arg is exactly equal and present in the given array -> "testing for equality"
// ---
// but SOME takes a cb fn. -> test for a condition instead
// ---
// to check any deposits, we check for positive movements in the array (greater than 0) .. as for equality '===' we can use "includes"
// ---

const anyDeposits = movements6.some((mov) => {
  return mov > 0;
});

// Note:
// a real-time application was implemented back in the BANKIST application (at requesting loan section)

// ------------------------------------------------------------------------------------------------------------------------------------
// EVERY:
// true is returned, if all elements in the array satisfies a condition ..
// so to check whether an account has all positive movements that is all are deposits ..

const hasDeposits = account4.movements.every((mov) => {
  return mov > 0;
});
// console.log(hasDeposits)

// ------------------------------------------------------------------------------------------------------------------------------------
// 15. Flat and flatMap:

// FLAT:
// if there are nested arrays, ex: [[[1, 2, 3], 4, 5], [6, 7, [8, 9]], [11, 21]]
// the flat method.. flattens the array into single array without any nested arrays
// flat always works by "1" level 'default' but we can 'specify the level by passing the args'
// ---

const arr1 = [[1, 2, 3], 4, 5, [6, 7]]; // level-1 of nesting
// console.log(arr1.flat())  // (7) [1, 2, 3, 4, 5, 6, 7]

const arrDeep = [
  [[1, 2], 3, 4],
  [5, [6, 7, 8]],
]; // level-2 of nesting
// console.log(arrDeep.flat(2))     // (8) [1, 2, 3, 4, 5, 6, 7, 8]

// without chaining
// const accountMovements = accounts.map((acc) => {
//   return acc.movements
// })
// const allMovements = accountMovements.flat()
// console.log(allMovements)

// const sumOfMovements = allMovements.reduce((acc, mov) => {
//   return acc + mov
// }, 0)
// console.log(sumOfMovements)

// with chaining of methods
const totalOfAccMovements = accounts
  .map((acc) => {
    return acc.movements;
  })
  .flat()
  .reduce((acc, mov) => {
    return acc + mov;
  }, 0);
// console.log(totalOfAccMovements)

// FLATMAP:
// if there is a use of map 1st and flat at second, we use flatMap() method to replace both usage of map() and flat()
// ---
// .map((acc) => {
//   return acc.movements     // replaced with flatMap()
// }).flat()
// ---
// flatMap() just goes 1 level deep.. if we want to go deep than 1 we can use 'flat' and 'map' separately

const totalOfAccMovements1 = accounts
  .flatMap((accMov) => {
    return accMov.movements;
  })
  .reduce((acc, mov) => {
    return acc + mov;
  }, 0);
// console.log(totalOfAccMovements1)

// ------------------------------------------------------------------------------------------------------------------------------------
// Coding Challenge #4
/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). 
  - HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? 
  - Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
*/

// TEST DATA:
// ---
const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
// ---
const huskyWeight = breeds.find((breed) => {
  return breed.breed === "Husky";
}).averageWeight;
// console.log(huskyWeight)

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
// ---
const dogBothActivities = breeds.find((breed) => {
  return (
    breed.activities.includes("running") && breed.activities.includes("fetch")
  );
}).breed;
// console.log(dogBothActivities)

// 3. Create an array "allActivities" of all the activities of all the dog breeds
// ---
// using map() and flat() separately
const allActivities = breeds
  .map((breed) => {
    return breed.activities;
  })
  .flat();
// console.log(allActivities)

// using flatMap()
const allActivities1 = breeds.flatMap((breed) => {
  return breed.activities;
});
// console.log(allActivities1)

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions).
// --- a set to make unique
const setOfAllActivities = [...new Set(allActivities)];
// console.log(setOfAllActivities)

// 5. Many dog breeds like to swim. What other activities do these dogs like?
// Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
// ---
const breedsIncludeSwimming = breeds
  .filter((breed) => {
    return breed.activities.includes("swimming");
  })
  .flatMap((breedsActivities) => {
    return breedsActivities.activities;
  });
const swimmingAdjacent = [
  ...new Set(
    breedsIncludeSwimming.filter((activities) => {
      return activities !== "swimming";
    })
  ),
];
// console.log(swimmingAdjacent)

// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
// ---
const breedsWithWeightAbove10 = breeds.every((breed) => {
  return breed.averageWeight >= 10;
});
// console.log(breedsWithWeightAbove10)

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
// ---
const activeBreeds = breeds.some((breed) => {
  return breed.activities.length >= 3;
});
// console.log(activeBreeds)

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
// ---
const breedsWeightsLikeFetch = breeds
  .filter((breed) => {
    return breed.activities.includes("fetch");
  })
  .map((breed) => {
    return breed.averageWeight;
  });
const heaviestBreedsLikeToFetch = Math.max(...breedsWeightsLikeFetch);
// console.log(heaviestBreedsLikeToFetch)

// ------------------------------------------------------------------------------------------------------------------------------------
// 16. Sort Method

// sort method is used to sort the elements of an array and it mutates the original array and returns the sorted array
// by default sort method sorts the elements of an array as strings and it is not suitable for numbers and we have to use a callback fn. to sort numbers
// ---
const numbers = [74, 18, 10, 5, -105, 105, -34, 89];
// console.log(numbers.sort()) // (8) [-105, -34, 10, 105, 18, 5, 74, 89]

// sort converts numbers to strings and then sorts them .. by checking the UTF-16 code of the numbers
// so with this, we get 1's 1st even it is negative or positive and then 2's 2nd and so on ..
// so to sort numbers we have to use a callback fn. to sort numbers
// ---
// we can provide a compare fn. which takes (a, b) to the sort method .. the outcome will decide which element comes first and which comes next
// 1. return < 0 .. 'a' comes 1st
// 2. return 0 .. nothing changes
// 3. return > 0 .. 'b' comes 1st
// ---
const compareFn = (a, b) => {
  return a - b;
};
// console.log(numbers.sort(compareFn)) // (8) [-105, -34, 5, 10, 18, 74, 89, 105]

// simply
numbers.sort((a, b) => {
  return a - b;
});
// console.log(numbers)

// sort method mutates the original array and returns the sorted array

// ex:
const products = [
  {
    name: "laptop",
    price: 1000,
  },
  {
    name: "desktop",
    price: 1500,
  },
  {
    name: "mobile",
    price: 500,
  },
  {
    name: "tablet",
    price: 300,
  },
];
products.sort((a, b) => {
  return a.price - b.price;
});
// console.log(products)

// ------------------------------------------------------------------------------------------------------------------------------------
// metro - help
// ---
const data = [
  {
    id: 6327,
    name: "FSD and INSTAMART gaps",
    priority: 19,
    lines: null,
    articleGroups: null,
    criteriaRules: [
      {
        id: 17391,
        key: "sourceOfScan",
        operator: "IN",
        valuesList: ["FSD", "GAPCHECK_INSTAMART"],
      },
    ],
    store: {
      countryCode: "RU",
      storeId: 10,
      salesLineId: "MCC",
    },
  },
  // {
  //   "id": 4323,
  //   "name": "gsg and gaps",
  //   "priority": 12,
  //   "lines": null,
  //   "articleGroups": null,
  //   "criteriaRules": [
  //     {
  //       "id": 1234,
  //       "key": "sourceOfScam",
  //       "operator": "US",
  //       "valuesList": [
  //         "GSG",
  //         "GSG_GAS"
  //       ]
  //     }
  //   ],
  //   "store": {
  //     "countryCode": "FU",
  //     "storeId": 11,
  //     "salesLineId": "BCC"
  //   }
  // }
];
const obj = Object.values(data);
// console.log(obj)

const mappedObj = obj.map((ele, ind, arr) => {
  return {
    id: ele.id,
    name: ele.name,
    priority: ele.priority,
  };
});
// console.log(mappedObj)

// ------------------------------------------------------------------------------------------------------------------------------------
// 17. Array Grouping

// grouping the elements of an array based on a certain condition and it is a common use-case in JS
// ---
// syntax: Object.groupBy()
// which takes the array to group and a callback fn. which is a condition to group the elements of 1st arg: array
// ---
const movements7 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const groupedMovements = Object.groupBy(movements7, (moves) => {
  return moves > 0 ? "deposits" : "withdrawals";
});
// console.log(groupedMovements)

// {deposits: Array(5), withdrawals: Array(3)}
// deposits: (5) [200, 450, 3000, 70, 1300]
// withdrawals: (3) [-400, -650, -130]
// ---
// we get the typeof the result as an object ..
// the keys are the conditions that we have passed in the callback fn. and the values are the elements that satisfy that condition

// grouping accounts on the basis of movements made:
// ---
const groupedAcc = Object.groupBy(accounts, (acc) => {
  if (acc.movements.length >= 8) {
    return "active";
  } else if (acc.movements.length >= 5) {
    return "moderate";
  } else {
    return "inactive";
  }
});
// console.log(groupedAcc)

// grouping accounts on the basis of type:
// ---
const groupedAccType = Object.groupBy(accounts, (acc) => {
  return acc.type;
});
// console.log(groupedAccType)

// ------------------------------------------------------------------------------------------------------------------------------------
// 18. More Ways of Creating and Filling Arrays

// arrays can be created in different ways in JS and we can fill the arrays with some values also
// ---
// basic array creation:
// - we basically been doing this since practicing JS .. console.log([1, 2, 3]) .. or ..
//  - creating an array and logging it to the console .. const newArr = [1, 2, 3]; console.log(newArr)
// ---
// using "new Array()" constructor:
// - using this we can create an array by passing multiple arguments which creates an array or we can pass a single argument which creates an empty array
// ---

const newArr = new Array(1, 3, 4, 5, 6);
// console.log(newArr) // (5) [1, 3, 4, 5, 6]

const x = new Array(7); // creates an empty array with 7 empty slots
// console.log(x) // (7) [empty × 7]

// only one method that works on this constructor that is .fill() method:
// - this method fills the array with the passed value
// - this is similar to .slice() method (which takes 2, 3 arg as indexes and fills the array with the passed value)
// ---
const y = new Array(7).fill(1);
// console.log(y) // (7) [1, 1, 1, 1, 1, 1, 1]

// fill method also takes 2, 3 arguments like slice method:
// - 1st arg: value to fill, 2nd arg: start index, 3rd arg: end index
// ---
const z = new Array(7).fill(1, 3, 5);
// console.log(z) // (7) [empty × 3, 1, 1, empty × 2]

// Array.form() method:
// - this method is used to create an array from an array-like object or an iterable object (like a string, set, map, etc.)
// - takes in an object {length: 7, cb-fn} which create an array with length 7 and based on the return value of the cb-fn
// ---
const a = Array.from({ length: 7 }, () => {
  return 3;
});
// console.log(a) // (7) [3, 3, 3, 3, 3, 3, 3]

// the callback fn. takes: current element, and index to create an array
// in the position of current element .. we can pass throwaway variables like '_' to indicate that we are not going to use that variable ..
// because 1st arg has no importance but we have to pass it.
// ---
const b = Array.from({ length: 3 }, (cur, i) => {
  return i + 1;
});
// console.log(b); // (3) [1, 2, 3]

// the main use-case:
// Array.from() is introduced in JS, to create arrays from array-like structures in JS like strings, maps, sets, NodeList, etc. that are iterable
// perfect example is:
// - 'NodeList'.. which is returned by "querySelectorAll()" method .. this is array-like structure but we cannot apply map() like methods on it
// - so, we have to convert it from NodeList to an array to apply map() like methods on it!
// ---
// NodeList

labelBalance.addEventListener("click", () => {
  const movementsUI = Array.from(document.querySelectorAll(".movements__value")); 

  // using MAP on converted NodeList
  // movementsUI.map((mov) => {
    // console.log(mov.textContent);
  // });

  const movementsUI1 = Array.from(document.querySelectorAll(".movements__value"), (ele) => {
    return +ele.textContent.replace("€", "");
  });
  console.log(movementsUI1); // res: (8) [1300, 70, -130, -650, 3000, -400, 450, 200]
});

// actual NodeList(8): 
// [div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value]
// --- 
// after conversion .. returns following array:
// [div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value]


// ------------------------------------------------------------------------------------------------------------------------------------
// 19. Non-destructive alternative method: toSorted, toReversed, toSpliced, with

// these methods are used to create a new array without mutating the original array as reverse(), sort(), splice() methods mutate the original array
// ---

// toReverse() method:
// - used to create a new array with the elements reversed and the original array remains the same
// ---
const arr3 = [1, 2, 3, 4, 5];
const arrReversed = arr3.toReversed();
// console.log(arrReversed) // (5) [5, 4, 3, 2, 1]

// as we can also use .slice() and .reverse() together to create a new array with the elements reversed (as slice() method creates a new copy of original array)
// ---
// const arrReversed1 = arr3.slice().reverse() // (5) [5, 4, 3, 2, 1]

// ---
// toSorted() and toSpliced() works as same as sort() and splice() methods but they do not mutate the original array
// ---

// .with() method:
// - used to create a new array with the elements of the original array and some new elements added to it
// ---
const arr4 = [1, 2, 3, 4, 5];
const arrWith = arr4.with(1, 1);

// console.log(arrWith); // (6) [1, 1, 3, 4, 5]
// console.log(arr4); // (5) [1, 2, 3, 4, 5]


// ------------------------------------------------------------------------------------------------------------------------------------
// 20. Summary: Which Array Method to Use?

// - if someone wants to ..

// 1. to mutate the original array:
// --
// - add elements: push()- at end, unshift()- at start
// - remove elements: pop()- from end, shift()- from start, splice()- from anywhere
// - others: .reverse, .sort, .fill

// Note:
// - all these methods mutate the original array and we have to use them carefully .. these must be avoided usually
// - use non-destructive approach instead of these destructive methods


// 2. to create a new array based on the original array:
// --
// - with same length as original array: use map() method -- to loop over the array

// - with different length as original array: 
// use filter() method -- to filter the elements of the array on a condition; 
// use .slice() method -- extract a part of the array
// with one item replaces -- user .with() method

// and to flatten the array: use flat() and flatMap() methods
// non-destructive methods: toSorted(), toReversed(), toSpliced()
// join two arrays: use concat() method


// 3. An array Index:
// --
// - based on value: use indexOf() method
// - based on condition: use findIndex() and findLastIndex() methods


// 4. An array element:
// -- 
// - based on test condition: use find() and findLast() methods
// - based on position: use at() method


// 5. to know if an array includes a certain element:
// --
// - based on a value: use includes() method
// - based on a condition: use some() and every() methods


// 6. A new string:
// --
// - based on the separator: use join() method


// 7. to transform an array into a value:
// --
// based on accumulator: use reduce() method


// 8. to just loop over an array:
// --
// based on a callback: use forEach() method 


// More array tools and techniques:
// --
// group an array by categories: Object.groupBy()
// create an array from scratch: 
// Array.from() and .. 
// "new Array(n)" constructor -> creates a new array with 'n' empty positions (on it use .fill to fill those positions)

// joining two arrays: 
// in addition to concat() method, we can use spread operator '...' to join two arrays
// [...arr1, ...arr2] -> joins two arrays

// to get unique values from an array: [...new Set(arr)] 


// ------------------------------------------------------------------------------------------------------------------------------------
// 21. Array Methods Practice

const accountsMovements = accounts.flatMap((acc) => {
  return acc.movements
})

// 1. sum up all the deposits in the bank 
// ---
const bankDepositSum = accountsMovements.filter((moves) => {
  return moves > 0
}).reduce((acc, cur) => {
  return acc + cur
}, 0)
// console.log(bankDepositSum)

// 2. count how many deposits in the bank with at least 1000
// ---
const deposits1000 = accountsMovements

// --- using filter
// .filter((moves) => {
//   return moves >= 1000
// }).length

// --- using reduce
.reduce((count, cur) => {
  return cur >= 1000 ? count + 1 : count
}, 0)

// console.log(deposits1000) // actual count of deposits: 6

// ***
// 3. advanced case of reduce methods: create a new object instead of a single value
// ***
const sums = accountsMovements.reduce((acc, cur) => {
  cur > 0 ? acc.deposits += cur : acc.withdrawals += cur;
  return acc;
}, {deposits: 0, withdrawals: 0});
// console.log(sums) // -- destructure the 'sums' object into {deposits, withdrawals} and log these variables separately.

// 4. convert any string to a title case (Title Case)

const convertTitleCase = (title) => {

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1)
  }
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and', 'of', 'at', 'from', 'to']

  const titleCase = title.toLowerCase().split(' ').map((word) => {
    return exceptions.includes(word) ? word : capitalize(word)
  })
  .join(' ')

  return capitalize(titleCase)
}
// console.log(convertTitleCase('and this is a nice title')) // res: ["this", "is", "a", "nice", "title"]


// ------------------------------------------------------------------------------------------------------------------------------------
// 22. Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: 
  - recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, & weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). 
  - Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the array containing dog objects, and for each dog, 
//   - calculate the recommended food portion (recFood) and add it to the object as a new property. 
//   - Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
// ---
dogs.forEach((dog) => {
  return dog.recommendedFood = Math.floor((dog.weight ** 0.75) * 28)
})
// console.log(dogs)

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
//   - HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const sarahDog = dogs.find((dog) => {
  return dog.owners.includes('Sarah')
})
// console.log(sarahDog)
// console.log(`Sarah's dog eats too ${sarahDog.recommendedFood < sarahDog.curFood ? "much" : "little"}`)

// 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
const ownersTooMuch = dogs.filter((dog) => {
  return dog.curFood > dog.recommendedFood
}).flatMap((dogDetails) => {
  return dogDetails.owners
})
// ---
const ownersTooLittle = dogs.filter((dog) => {
  return dog.curFood < dog.recommendedFood
}).flatMap((dogDetails) => {
  return dogDetails.owners
})
// console.log(ownersTooMuch)
// console.log(ownersTooLittle)

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" 
//   - and "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersTooMuch.join(' and ')}'s dogs are eating too much`);
// console.log(`${ownersTooLittle.join(' and ')}'s dogs are eating too little`);

// 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.some((dog) => {
  // return dog.curFood === dog.recommendedFood
}))

// -for 6 7-
const okayAmount = (dog) => {
  return dog.curFood < dog.recommendedFood * 1.1 && dog.curFood > dog.recommendedFood * 0.9
}
// 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
console.log(dogs.every((dog) => {
  // return okayAmount(dog)
}))

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsEatingOkayAmt = dogs.filter((dog) => {
  return okayAmount(dog)
})
// console.log(dogsEatingOkayAmt)

// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', 
//   - based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
const dogsGroupedByFood = Object.groupBy(dogs, (dog) => {
  if (dog.curFood > dog.recommendedFood) return "Too Much"
  if (dog.curFood < dog.recommendedFood) return "Too Little"
  if (dog.curFood === dog.recommendedFood) return "Exact"
})
// console.log(dogsGroupedByFood)

// 9. Group the dogs by the number of owners they have
const dogsGroupedByOwners = Object.groupBy(dogs, (dog) => {
  return (`${dog.owners.length}-owners`)
})
// console.log(dogsGroupedByOwners)

// 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
const dogsSorted = dogs.toSorted((a, b) => {
  return a.recommendedFood - b.recommendedFood // ascending order
})
console.log(dogsSorted)