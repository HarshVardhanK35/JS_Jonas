/**
 * ! 1. An Overview of Modern JS Development
 * --------------------------------------------
 * Modern JS includes bundling of JS modules into a JS Bundle but not writing complete JS into a single file
 *  - instead we create JS modules and also include 3rd party modules inside it using NPM (Node Package Manager)
 * 
 * This Build Process includes:
 *      Bundling -> Transpiling -> creating a JS bundle
 * 
 * - this whole process is done by tools => WEBPACK or PARCEL
 *   - BUNDLING - which joins all modules into one file
 *   - TRANSPILING - (conversion of modern JS back to ES5) => conversion of modern JS to OLD syntax as this old syn only is understood by browsers
 *  
 * - this ready to build JS bundle is set for production!
 * - we use a special tool to make this process, that are 'WEBPACK' and "PARCEL"
 * 
 * 
 * ! 2. An Overview of Modules in JS
 * ------------------------------------
 * - reusable piece of code which encapsulates implementation details (module -> a separate standalone file)
 * - we can import and export a piece of code from one module to another (whenever we export a module -> called a PUBLIC API)
 *   - this code inside public api is consumed into another file using import
 * - these other modules from which we import are called 'dependencies' of the importing module .. 
 * 
 * - Modules are small building blocks that are put together to build a complex application;
 * - Modules are developed in isolation, without thinking of entire codebase;
 * - Abstraction, Implement low-level code in modules and import these abstractions into other modules;
 * - Organized codebase, with modules we can organize our code;
 * - We reuse the same code/functions in other modules;
 * 
 * Modules Specifically in JS:
 * ES6 Modules:
 * - Modules are imported "synchronously"
 * - Only after the modules are imported, the file that we imported in will be executed!
 * - Imports and Exports has to be done at top-level.. so that the file where these were imported can be read 1st and then the code after imports will be executed 
 * - with synchronous loading only bundling and dead code elimination could be possible!
 *  
 * - But downloading of modules is an asynchronous process only import is a synchronous process!
 * - imports and exports works as pointer, whenever there is change in the exported file there will be the same changes done inside the imported file
 * - next, execution of files will be done
 * 
 * 
 * ! 3. Exporting and Importing of ES6 Modules
 * ----------------------------------------------
 * whenever we wanted to connect a module to the HTML file, we have to specify the type attribute to the script tag inside HTML file
 * 
 * created two files (shoppingCart.js and script.js) where script is connected to HTML as shown below..

 <script defer type="Modules" src="script.js"></script>
 *   - as shown like this we have to specify the type of the file as module, then only import and export functionalities work 
 * 
 * inside shoppingCart.js:
console.log('exporting module')
 * 
 * inside script.js:
import './shoppingCart.js'
console.log('importing module')
 * 
 * - as said earlier, all the imported modules will be executed 1st and then after the code inside the file where a file was actually imported
 * - even though we put the import statements at bottom of a file, they will be hoisted at top! Therefore, they will be executed first anyhow
 * - every module is executed in "strict" mode with ES6 modules! (by default)
 * 
 * ? whenever we declare variables inside a module, they are scoped to the file they were declared in! (private to the file itself) 
 * ? but if we want to use in another module/file, then we have to export them first and use them inside the file by importing!
 * 
 * ! Types of Exports:
 *      1. Named Exports
 *      2. Default Exports
 * 
 * ! ---------------------------------------------------------------------------------- Named Exports:
ex:
const shoppingCost = 10
const cart = []

//? exporting from a module
export const addToCart = function(product, quantity) {
    cart.push({ product: product, quantity: quantity })
    console.log(`${quantity} ${product} packets were added to the cart!`)
}

//? importing into a module
import { addToCart } from './shoppingCart.js'

addToCart('milk', 2)
 * 
 * ! Rules:
 * ---
 * 0. file extension '.js' has to be included strictly while importing "from './shoppingCart.js'" 
 * 
 * 1. with named imports, we have to specify the exact same name that we used while exporting and with curly braces "{}" 
ex: 
export const addToCart => while exporting 
import { addToCart } from './shoppingCart.js' => while importing
 * 
 * 2. Exports need to happen at the top level (not inside a block).. which might throw an error!
 * - the following code would not work..
ex:
if(true) {
    export const addToCart = function(product, quantity) {
        cart.push({ product: product, quantity: quantity })
        console.log(`${quantity} ${product} packets were added to the cart!`)
    }
}
 * 
 * ! exporting multiple values
// ? exporting from shoppingCart.js:
const variable1 = 'value1'
const variable2 = 'value2'

export {variable1, variable2}
 * 
// ? importing into script.js:
import { variable1, variable2 } from './shoppingCart.js'
 * 
 * 
 * ? - we can change the variable names as well while importing - (1) and exporting - (2)
import { variable1 as var1, variable2 } from './shoppingCart.js'

- while exporting with different name, we have to import with changed name only 
export {variable1, variable2 as var2} 
import {var2} from './shoppingCart.js'
 * 
 * 
 * ! Importing all using a '*':
 * ---
import * as shoppingCart from './shoppingCart.js'
shoppingCart.addToCart('breads', 2)
shoppingCart.variable1
 * 
 * - this adds every thing that was declared inside file: 'shoppingCart.js' module with an alias 'shoppingCart' 
 * - so we can access them with 'dot convention' that is: 'shoppingCart.addToCart()'
 * 
 * ! ---------------------------------------------------------------------------------- Default Exports:
 * - we use 'default' exports only when we need one thing per module!

// ? exporting:
export default function(product, quantity) {
    cart.push({ product: product, quantity: quantity })
    console.log(`${quantity} ${product} packets were added to the cart!`)
}

// ? importing:
import add from './shoppingCart.js'
add('shrimps', 2)
 * 
 * Note:
 * ! we can not use default and named exports at a time, we can use but it might become hard to read
 * 
 * !!! IMPORTS ARE NOT COPIES OF THE EXPORT !!!
 * ? they are like a live connection 
 * 
 * ! 3. Top-Level Await (ES2022)
 * -------------------------------
 * 
 * - starting from ES2022, we can use 'AWAIT' outside the 'ASYNC' functions and only works with "MODULES".
ex:
=> <script type="module" defer src="script.js"></script>

 * - the above line in HTML is required to make Top-Level Await to work in the script.js file!
 * 
in script.js:
---
const res = await fetch("https://jsonplaceholder.typicode.com/posts")
const data = await res.json()
console.log(data)

- without any async function wrap.. await works 
 * 
 * Note:
 * - this blocks the execution of entire code below it! 
 * 
 * ! applications of Top-Level Await!
const getLastPost = async function () {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()

    return ({title: data.at(-1).title, text: data.at(-1).body})
}
// on console log of ... getLastPost() returns a promise now!

// ? 1. using .then() to consume this promise!
getLastPost().then((data) => console.log(data))

// ? Using cleaner code! that is using top-level await
// 2. using await on getLastPost()
console.log(await getLastPost())
 * 
 * Note:
 * - this await functionality in an exporting module blocks the code inside the module that is importing it!
 * 
 * 
 * ! 4. The Module Pattern
 * -------------------------
 * NOT UNDERSTOOD ... SKIPPED!
 * 
 * ! 5. Common JS Modules
 * ------------------------
 * SKIPPED!
 * 
 * ! 6. Brief Intro to Command Line
 * ----------------------------------
 * - open a command line from the VS code which opens the command line associated with the file 
 * 
 * - on mac, use "ls" and on windows use "dir" to show the contents of the folder
 * - "cd" to change the directory! "cd .." to go for upper files in the respective folder (upside in the folder)
 * - "cd filename/" to get inside the desired file inside the respective folder (autocomplete the file name by pressing 'tab')
 * - "cd ../.." to go upside for two levels in a folder
 * - "clear" used to clear all the commands used till now inside command prompt!
 * - "mkdir <folderName>" to create a new directory / new folder (mkdir TEST => creates a TEST folder inside working folder)
 * - mac- "touch"; windows- "edit" used to create a file inside a working folder/directory
 * - mac- "rm"; wind- "del" to delete the files (rm script.js => deletes the file - "script.js")
 * - "mv" to move files to the parent folder (mv script.js ../) => (../ used for parent folder)
 * - "rmdir" => removes the working directory/folder (only works if it is empty)
 * - inside mac "rm -R TEST" => to remove the TEST folder from the working directory! "-R" means 'recursive' 
 * 
 * ! 7. Intro to NPM
 * --------------------
 * - before NPM, we include a link or script tag of specific packages that we want to work with in our project, 
 *      - whenever there is new version comes out.. we have to manually change the packages by either downloading or copy pasting the CDN links into HTML file
 * - So, NPM would be a better alternative for this problem
 * 
 * - download Node an LTS version of it on current working machine, this gives you access to NPM as well, NPM => (Node Package Manager) 
 * - version check: "npm -v" is used! (must be greater than 6)
 * 
 * - if we want to use NPM in project, 
 *      - initialize it: "npm init -y" => this creates a 'package.json' file
 * 
 * - PACKAGE.JSON: this stores an entire configuration of our PROJECT
 * 
 * - PACKAGE INSTALLATION:
 *      - go to the website of that certain package/dependency, then downloads tab, scroll to the package manager link "npm install <package-name>"
 * ex: leaflet: npm install leaflet
 * 
 * - in package.json, a new "dependencies" field/object was created after installing packages, which contains the names of the packages as keys and versions as it's values
 * 
 * ! demonstration on how packages/dependencies are helpful in writing easier code...
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'chocolate', quantity: 2},
    ],
    user: {loggedIn: false}
}
// ? using normal JS defined function to clone the 'state' object
const clonedState = Object.assign({}, state)

// ? usage of already declared 'functions' from a 'package manager' to deepClone an object
const deepClonedState = cloneDeep(state)

// ? changing the 'loggedIn-value' property inside an object
state.user.loggedIn = true

console.log(clonedState) //? with normal function.. the cloned object was changed
//! res: {cart: Array(2), user: {…}} => "cart: (2) [{…}, {…}], user: {loggedIn: true}" 

console.log(deepClonedState) //? with lodash functions.. the cloned object was not changed
//! res: {cart: Array(2), user: {…}} => "cart: (2) [{…}, {…}], user: {loggedIn: false}"
 * 
 * - like this NPM packages/dependencies would help to write best code in easiest way!
 * 
 * Note:
 * - whenever we share code with someone on GIT or another platform, we SHOULD NOT INCLUDE THE "node_modules" FOLDER
 * - but "package.json" is the most important one, whenever we share code without "node_modules" folder but including "package.json" 
 * 
 * ? so how could someone really work with "node_modules" folder and code inside it? 
 * - to install again all the node_modules, we use "npm i" (mandatory needed: "package.json")
 * 
 * Conclusion:
 * ---
 * ! However importing packages with entire path: "import cloneDeep from './node_modules/lodash-es/cloneDeep.js';" is not practical yet
 * ? so in the next topic we use parcel to fix this!
 * 
 * 
 * ! 8. Bundling With Parcel and NPM Scripts
 * -------------------------------------------
 * ? Parcel - Module Bundler => to install it we use: "npm install parcel --save-dev"
 * 
 * - dev dependency is different from the actual dependency we use in our project. 
 *      - dev dependency, that we needed to build our application! but not like a normal dependency that we include in our code!
 *  - dev dependency is simply a 'tool'
 * 
 * - we can use 'parcel' using "parcel index.html" but this is not possible .. cause it is locally installed package! as parcel is indeed installed locally so, it is local package not a global package
 * - we have to use "npx parcel index.html" to work with 'parcel' (NPX is basically an application build into NPM)
 * 
 * - we pass an entry point 'index.html' to 'parcel', in this entry point we included 'script.js' file.. 
 *      - so, if there are more modules inside script file, then this parcel will bundle up those modules that were there!
 * - in addition to bundling.. it also creates a development server with url: "localhost:234" 
 * 
 * Note: if there are any errors while installing parcel use: "sudo npm install parcel" which asks for password / use: "npm i parcel@<version-number>" (after uninstalling if installed before)
 * 
 * - parcel creates a "dist" folder which is served for production!
 * 
 * ? with parcel we can activate "hot-module replacement" so in script file we can use..

if(module.hot){
    module.hot.accept()         // this is hot-module reloading 
}
 * - this means whenever we change one of the modules in script file, then this process triggers a rebuild in terminal then that new modified bundle will then automatically injected into browser!
without reloading the entire page, which maintains the state inside the page! 
 * 

 * - so, without using this import statement: "import cloneDeep from './node_modules/lodash-es/cloneDeep.js'" 
    - we can simply use: "import cloneDeep from 'lodash-es'"
 * 
 * 
 * ! 9. Configuring Barbel and Polyfilling
 * -----------------------------------------
 * SKIPPED!
 * 
 * ! 10. Review: Writing Clean Code and Modern JS
 * -------------------------------------------------
 * ? Readable Code:
 * - use descriptive variable names: "what they contain"
 * - use descriptive function names: "what they do"
 * 
 * ? General:
 * - Use DRY principle
 * - Don't pollute global namespace, encapsulate instead
 * - do not use "var" to declare variables
 * - use strong type checks (=== or !==)
 * 
 * ? Functions:
 * - Generally, functions shall do one thing
 * - do not use more than 3 parameters in a function
 * - use default parameters whenever it is possible
 * - return same data type that was received in a function
 * 
 * ? OOP:
 * - use ES6 classes
 * - Encapsulate data and "do not mutate" it from the outside of a class
 * - implement method chaining
 * - do not use arrow functions as methods (in reg objects)
 * 
 * ? Avoid Nested Code:
 * - use early return (guard classes)
 * - use ternary (conditional) or logical operators instead of "if"
 * - use multiple if instead of if/else-if
 * - avoid for loops, instead use array methods 
 * - avoid callback based asynchronous APIs
 * 
 * ? Asynchronous Code:
 * - consume promises with Async/Await for best readability (without .then)
 * - whenever there are more promises mostly run them in parallel (use Promise.all())
 * - Handle errors and promise rejections (using try..catch block to handle errors!)
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */