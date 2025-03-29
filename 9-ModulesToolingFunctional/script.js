import { addToCart, cart } from './shoppingCart.js'
import { variable1 as var1, variable2 } from './shoppingCart.js'

addToCart('milk', 2)
console.log(cart)
// console.log(var1)

// import * as shoppingCart from './shoppingCart.js'
// shoppingCart.addToCart('breads', 2)

// import add from './shoppingCart.js'
// add('shrimps', 2)

// const res = await fetch("https://jsonplaceholder.typicode.com/posts")
// const data = await res.json()
// console.log(data)

// applications of Top-Level Await!
// const getLastPost = async function () {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts")
//     const data = await res.json()

//     return ({title: data.at(-1).title, text: data.at(-1).body})
// }
// on console log of ... getLastPost() returns a promise now!

// 1. using .then() to consume this promise!
// getLastPost().then((data) => console.log(data))

// using cleaner code! that is using top-level await
// 2. using await on getLastPost()
// console.log(await getLastPost())

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import { cloneDeep } from 'lodash-es'
const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'chocolate', quantity: 2},
    ],
    user: {loggedIn: false}
}
const clonedState = Object.assign({}, state)

const deepClonedState = cloneDeep(state)

state.user.loggedIn = true

console.log(clonedState)
console.log(deepClonedState)

if(module.hot){
    module.hot.accept()
}