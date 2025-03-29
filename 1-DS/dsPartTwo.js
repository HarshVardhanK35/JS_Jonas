/**
 * --- SETS
 * ------- syn: new Set(type: iterable) -> takes in an iterable as an argument
 * collection of unique values .. no duplicates and can have mixed of data types .. order is irrelevant
 * new Set () ... takes in an "iterable" ... commonly an array is passed !!!
 * as strings are also iterables ('johannes') .. they can also be passed .. but they are splitted into an array of characters !
 *    - Set(5) {'j', 'o', 'h', 'n', 'a', 'e', 's'}
 * sets has no indices and there is no way of getting values out of the set using it's index.
 *
 * methods on sets:
 * -------------------
 * .size() // returns the number of elements that were present in the array
 * .has() // returns a 'true' ? "when there an element is there inside the set that we passed" : false
 * .add() // passed val is already there ? add does not work : adds value into the set
 * .delete() // "passed arg is there in the set" ? delete works : 'if console.logged returns a false'
 * .clear() // does not take any arg but clears all the elements from the set
 *
 * looping:
 * -----------
 * looping works! --- apply for-of on the set
 *
 */

// --- SETS
// --------------
const arr = ['jonas', 'Udemy', 'teaching']
const set = new Set(arr)

// console.log(set) // re: Set(4) {1, 2, 3, 4}

// Methods on Sets { .size, .add(), .delete() }
// ---

// 1. size: property: 
// returns the number of elements that are present in the set
// there is nothing that .size expects .. so no arg shall be passed!
// returns the actual size of the set : neglecting the duplicates

// console.log(new Set( ['Jonas', 'Max', 'Colt', 'Mead'] ) .size) // re: 4

// 2. has: method
// checks whether the passed arg is present in the set or not
// returns a boolean value: true or false
// console.log(set.has('Udemy')) // re: true

// 3. add: method
// adds a value to the set
// console.log(set.add('JavaScript')) // re: Set(5) {'jonas', 'Udemy', 'teaching', 'JavaScript'}

// 4. delete: method
// deletes a value from the set
// console.log(set.delete('Udemy')) // re: true
// console.log(set.delete(5)) // re: false "if passed element is not there" in the set

// looping in sets
for (const ele of arr) {
  // console.log(ele)
}

// spread operator use-case
const newSet = new Set([...arr])
// console.log(newSet)


/**
 * --- SETS - part.2
 * ----------------
 * new methods that were introduced in new era of JS .. (ES-2025)
 *
 * .intersection: (returns a set with the common elements from two sets)
 *   - syn: set1.intersection(set2) // returns a set with the common elements from two sets
 * 
 * .union: (returns a set of elements not the common ones .. removes the duplicates from two sets)
 *  - syn: set1.union(set2) // returns a set of elements not the common ones .. removes the duplicates from two sets
 * 
 * .difference: returns the unique elements from 1st array 
 * - syn: set1.difference(set2) // returns the unique elements from 1st array
 * 
 * .symmetricDifference: returns the unique elements from both the arrays.. opposite of intersection
 * - syn: set1.symmetricDifference(set2) // returns the unique elements from both the arrays
 */

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// tip: to get an array from a set .. use spread operator
// console.log([...commonFoods]) // return: (2) ['tomatoes', 'garlic']

// console.log(italianFoods.intersection(mexicanFoods)) // return: Set(2) {'tomatoes', 'garlic'}
const intersectionFoods = italianFoods.intersection(mexicanFoods)
const unionFoods = italianFoods.union(mexicanFoods)

// the other way to remove duplicates and mix all the elements .. make an arr with of all ele with spread and assign it to set
const bothFoods = [...italianFoods, ...mexicanFoods]
const unionHC = new Set(bothFoods)

const differenceFoods = italianFoods.difference(mexicanFoods)
const symmetricDiffFoods = italianFoods.symmetricDifference(mexicanFoods)

// console.log(intersectionFoods) // Set(2) {'tomatoes', 'garlic'}
// console.log(unionFoods) // Set(10) {'pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', …}
// console.log(unionHC) // result is same as unionFoods
// console.log(differenceFoods) // Set(4) {'pasta', 'gnocchi', 'olive oil', 'basil'}
// console.log(symmetricDiffFoods) // Set(8) {'pasta', 'gnocchi', 'olive oil', 'basil', 'tortillas', …}


/**
 * --- MAPS
 * -------
 * Maps are DS where we can map values to keys
 * - just like objects, data is stored in key value pairs
 * - but in maps, we can have any type of keys and not just strings as in objects
 * 
 * Diff. between Maps and Objects is: we can have only strings as keys but in maps we can have any type for keys
 * 
 * create an empty map with syn: new Map()
 * to add values, we use .set() method
 * to read values, we use .get() method
 * 
 * .has() // checks whether the passed arg is present in the map or not .. returns true or false
 * .set() // adds a key-value pair to the map
 * .get() // returns the value on passing the correct key value with correct data type
 * .delete() // passed arg ... will be a key and assigning values will also be deleted from the map
 * .size // a property, that returns the actual size or the number of key-value pairs that are present in the map
 */

const restaurant1 = new Map() // syn

restaurant1.set('name', 'quant pizzas') // key of type: string

// .set can take any type of value for keys1 .. ex: if restaurant1 has two branches in same locations
restaurant1.set(1, 'abc street, vzm')
restaurant1.set(2, 'xyz street, vzm')

// .set not only sets a key-value pair on to a map but also returns the complete map on logging it to the console!
// console.log(restaurant1.set())

// .get() method... returns the values on passing correct key value with correct data type
// here the data type is important, we will get correct output only when 1 is used instead of '1' otherwise we get undefined

// console.log(restaurant1.get('name'))
// console.log(restaurant1.get(1)) 

// --- use-case (1)
restaurant1.set('open', 5)
restaurant1.set('close', 22) // ... setting opening and closing hours of rest.

restaurant1.set(true, 'we are open')
restaurant1.set(false, 'we are close') // ... works based on the condition either true or false

const checkInTime = 24;
// console.log(restaurant1.get( checkInTime > restaurant1.get('open') && checkInTime < restaurant1.get('close')))

// --- use-case (2)
// restaurant1.set([1, 2], 'arrays') and restaurant1.get([1, 2]) are not same .. [1, 2] has different reference points
// these two arrays in 'set' and 'get' reference to different addresses
// so, create an array constant and use that instead (because array constant refers to same address)
const arr0 = [1, 2]
restaurant1.set(arr0, 'array things')
// console.log(restaurant1.get(arr0))

/**
 * --- Maps - Part (2)
 * ------------------
 * 1. conversion of objects to maps
 * 2. iteration on maps (as maps are also iterables)
 * 3. conversion of map to an array
 */

const restaurant11 = {
  name: 'classico italiano',
  location: 'via angelo Tavanti, Firenze',
  categories: ['italian', 'pizzeria', 'vegetarian', 'organic'],
  starterMenu: ['focaccia', 'bruschetta', 'garlic bread', 'caprese salad'],
  mainMenu: ['pizza', 'pasta', 'risotto'],
  openingHrs: {
    thu: { open: 7, close: 22},
    fri: { open: 5, close: 23},
    sat: { open: 5, close: 24}
  },
}

// --- conversion of object to map
// console.log(restaurant11.openingHrs)
const convertedMap = new Map(Object.entries(restaurant11.openingHrs))
// console.log(convertedMap)

// --- A Map
const question = new Map([
  ['question', 'what is the best language?'],
  [1, 'JavaScript'],
  [2, 'Python'],
  [3, 'Java'],
  ['correct', 1],
  [true, 'Correct!'],
  [false, 'Try again!']
]) 

// console.log(question);
// ---
// Output:
// Map(7) {
//   'question' => 'what is the best language?',
//   1 => 'JavaScript',
//   2 => 'Python',
//   3 => 'Java',
//   'correct' => 1,
//   true => 'Correct!',
//   false => 'Try again!'
// }

// --- iterate over map
// console.log('Choose any option...')
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Option ${key}: ${value}`)
  }
}
// re:
// Option 1: JavaScript
// dsPartTwo.js:231 Option 2: Python
// dsPartTwo.js:231 Option 3: Java

// const option = +prompt('Choose an option (must be 1 or 2 or 3)')
// console.log(question.get(question.get('correct') === option))

// --- conversion of map to an array
// console.log([...question])      // returns an array of arrays
// console.log([...question.keys()])   // returns an array of keys
// console.log([...question.values()])   // returns an array of values

/** ---------------------------------------------------------------------------------------------------
 * which DS to use?
 * 
 * sources of data:
 * - from the web service (data that is fetched from the web)
 * - from the user (user input or data written on DOM)
 * - from the programming language (source code)
 * 
 * we always have collections of data and we need to store them in a DS
 * 
 * but there are 4 types of DS that we can use:
 * - Arrays: when we need an ordered list of values
 * - Objects: when we need a collection of key-value pairs (keys1 are to describe the values)
 *    - JSON data that we get from the web is always in the form of objects
 * - Sets: when we need to store unique values
 * - Maps: when we need to map values to keys
 * 
 * when to use which DS?
 * 
 * --- Arrays vs Sets: only value data
 * - Arrays: when we need an ordered list of values, and when manipulation of data is needed! and there are so many methods on arrays
 * - Sets: when working on unique values, no duplicates allowed, needed when high performance is required! 
 * --- working and operations on sets is more faster than compared to arrays
 * 
 * --- Objects vs Maps: key-value pairs
 * - Objects: simple for key-value storage .. easy to access data through dot (.) and square braces [] .. 
 *      - use objects when functions as values are needed .. we can use this keyword on objects but not on maps .. 
 * - Maps: map keys1 can have any data types .. easy to iterate .. 
 */

// challenge #3
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. 
  The values are the events themselves, and the keys are the minutes in which each event happened 
      (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. 
    So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" 
    (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, 
    marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. 
const events = [new Set(...gameEvents.values())]
// console.log(events)

// 2. 
gameEvents.delete(64)

// 3. 
const keys1 = [...gameEvents.keys()]
// sol-1:
// const highTime = Math.max(...keys1)

// sol-2:
let maxTime = keys1[0]
for(let i = 0; i < keys1.length; i++) {
  if (maxTime < keys1[i]) {
    maxTime = keys1[i]
  } 
}
// console.log(maxTime) 
// console.log(`An event happened, on average, every ${maxTime / gameEvents.size} minutes`)

// 4.
for (let [min, event] of gameEvents){
  const half = min <= 45 ? 'FIRST' : 'SECOND'
  // console.log(`${half} HALF ${min}: ${event}`)
}



