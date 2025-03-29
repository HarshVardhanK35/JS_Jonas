// console.log("Strings")


/**
 * --- Strings in JS and It's Methods---
 * 
 * methods on strings:
 * ---
 * whenever we call methods on strings JS automatically converts strings into objects as methods can not be applied on the primitives 
 * this process of conversion is called "BOXING"
 * ex: new String(str) --- converts into an object
 * ---
 * - indexOf() and lastIndexOf() 
 *  : takes a character and checks whether the passed character is present in the string or not and returns "index- position"
 *  : else returns '-1'
 *  : indexOf start searching from index:0 and lastIndexOf starts searching for character from last index of that str(str.length)
 * 
 * - slice()
 *  : slice extracts a part of a string from given index value (that is sub-string)
 *  : if arg passed are only one, then it extracts from that index to last index .. (4) => (4, str.length)
 *  : if two were passed, then it extracts str from 1st value to 2nd value - 1 of the string .. (4, 7) => (4, 7-1)
 * 
 * - .toUpperCase() and .toLowerCase()
 * 
 * - .replace('', '') case-sensitive method; takes two chars and replaces the 1st char in the string with second char (only 1st appearance)
 * - .replaceAll('', '') this also works as .replace() but it does for all appearances in string
 * 
 * - 'replaceAll' is introduced recently and before 'replace' is only used to replace a part of strings with regular expressions
 *  - .replace(/doors/g, 'gates') this does not require replaceAll() as it replaces all the appearances of 'doors' with 'gates'
 * 
 * boolean methods:
 * - .includes('') returns true if the passed char is present in the string
 * - .startsWith('') returns true if the string starts with the passed char
 * - .endsWith('') returns true if the string ends with the passed char
 * 
 * - .split('') splits the string into an array of substrings based on the passed 'char' as an argument
 * - .join('') joins the array of substrings into a single string with the passed 'char' as an argument
 * - .padStart() and .padEnd() adds the passed char to the string at the start and end of the string 
 * - .repeat() repeats the string for the given number of times as argument
 */

// example for replace() using regular expressions:


const checkMidSeat = (seat) => {
    const s = seat.slice(-1)
    if(s === 'A' || s === 'F'){
        // console.log('lucky! u got window seat!')
    }
}
checkMidSeat('11A')

// - split
const str = 'a+very+nice+day'
// console.log(str.split("+"))

// we can apply destructuring on this and get two separate variables with this!
const [firstName, lastName] = "Millian Max".split(' ')

// - join
// Joining can be done with this way ..
// console.log(`Hi, Mr. ${lastName} ${firstName}`) // and ..

// another way of doing this.. use .JOIN() method with a separation string
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ') 
// console.log(newName)

// --- function to capitalize names
const capitalizeName = (str) => {
    let names = str.split(' ')
    const namesUpper = []
    for (const n of names) {
        
        // const updatedName = n[0].toUpperCase() + n.slice(1) // 1st way
        const updatedName = n.replace(n[0], n[0].toUpperCase()) // 2nd way

        namesUpper.push(updatedName)
    }
    // console.log(namesUpper.join(' '))
}
capitalizeName("john ann millian max")
capitalizeName("harsha vardhan")

// --- Padding
const message = 'Go to gate 23!'
// console.log(message.padStart(25, '+').padEnd(30, '-')) 
// padding with '+' at start and end of the string for 25 characters and 30 characters 
// this will add the passed char to the string at the start and end of the string for the given 'number' as length 

// application of padding
const maskCreditCard = (number) => {
    const numStr = number + ''
    const slicedStr = numStr.slice(-4)
    console.log(slicedStr.padStart(numStr.length, '*'))
}
// maskCreditCard(12345678)

// --- Repeat
const message2 = 'Bad weather... All departures delayed... '
// console.log(message2.repeat(5)) // repeats the string for 5 times

// -------------------------------------------------------------------------------------------------------------------------------
/*
------------------------------------------------------------------------------------------------------------------------
Coding Challenge #4
---

Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

const testData = (content) => {
    const alignedContent = content.split('\n')
    for (const [ind, elements] of alignedContent.entries()){
        const [first, second] = elements.toLowerCase().trim().split('_')
        const res = `${first}${second.replace(second[0], second[0].toUpperCase())}`
        // console.log(`${res.padEnd(20, " ")} ${'✅'.repeat(ind + 1)}`)
    }

}

testData(
    "underscore_case\nfirst_name\nSome_Variable\ncalculate_AGE\ndelayed_departure"
)