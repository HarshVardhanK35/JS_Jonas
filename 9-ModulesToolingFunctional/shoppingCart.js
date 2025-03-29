// console.log('exporting module')

const shoppingCost = 10
const cart = []

export const addToCart = function(product, quantity) {
    cart.push({ product: product, quantity: quantity })
    console.log(`${quantity} ${product} packets were added to the cart!`)
}

export {cart}

export default function(product, quantity) {
    cart.push({ product: product, quantity: quantity })
    console.log(`${quantity} ${product} packets were added to the cart!`)
}
