// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// CHANGED URL:
// https://countries-api-836d.onrender.com/countries/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//! Render Data in HTML
const renderData = function(data, className = ''){
    const html = 
    `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1
}

//! Render an Error
const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg)
    countriesContainer.style.opacity = 1
}

//! AJAX call
const getCountryAndNeighbor = function (country) {

    //! AJAX call (1)
    const request = new XMLHttpRequest()
    request.open('GET', `https://restcountries.com/v2/name/${country}`)
    
    request.send()
    
    request.addEventListener('load', function() {
        // console.log(this.responseText)
    
        //! parsing the DATA 
        const [data] = JSON.parse(this.responseText)  // "this" === request object
        console.log(data)

        //! render the data
        renderData(data)
        
        //! Check for Neighbours
        const neighbor = data.borders?.[0]
        // console.log(neighbor)
        
        //! AJAX Call (2)
        const request2 = new XMLHttpRequest()
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`) 

        request2.send()

        request2.addEventListener('load', function() {
            const data = JSON.parse(this.responseText)
            renderData(data, 'neighbour')
        })
    })
}
// getCountryAndNeighbor('portugal')

//! AJAX Call
// const request = new XMLHttpRequest()
// request.open('GET', `https://restcountries.com/v2/name/${country}`)
// request.send()

//! HELPER Fn: Returns a Promise
const getJSON = function(url, err = 'Something Went Wrong!') {
    return fetch(url)
    .then((res) => {
        //! throwing new error: when there is an error !
        if(!res.ok){
            throw new Error(`${err} Error: ${res.status}`)
        }
        //! no error !
        return res.json()
    }) 
}

//! Fetch API Call
const getCountryData = function(country) {
    // country
    getJSON(`https://restcountries.com/v2/name/${country}`, "Country Not Found!")
    .then(([data]) => {                         // destructuring    
        renderData(data)

        // neighbor
        const neighbor = data.borders?.[0] 

        // if there is no neighbour
        if (!neighbor) throw new Error("No Neighbor Found!");
        
        return getJSON(`https://restcountries.com/v2/alpha/${neighbor}`, "Country Not Found!")          // here another promise will be returned => neighbor
    })
    .then((data) => {
        renderData(data, 'neighbour')
    })
    .catch((e) => {
        renderError(e.message)
    })
    .finally(() => {
        console.log('Runs Even Promise is Fulfilled or Rejected!')
    })
}

// btn.addEventListener('click', () => {
//     getCountryData('portugal')
// })

// ! Coding Challenge #1
// !---------------------
// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
// Here are your tasks:

// * PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. 
//     - Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
//     - The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. 
//     - Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. 
//     - Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. 
//     - This is an error with the request. Remember, fetch() does NOT reject the promise in this case. 
//     - So create an error to reject the promise yourself, with a meaningful error message.

// * PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

//! Helper Function
// const helperJSON = function(url) {
//     return fetch(url)
//     .then((res) => {
//         if(res.status === 403){
//             throw new Error(`Problem With Geocoding - ${err} Error: ${res.status}`)
//         }
//         return res.json()
//     })
// }

// const whereAmI = (lat, lng) => {
//     fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}8&longitude=${lng}`)
//     .then((res) => {
//         if(!res.ok) {
//             throw new Error(`Problem With Geocoding - ${err} Error: ${res.status}`)
//         }
//         return res.json()
//     })
//     .then((data) => {
//         console.log(`You are in ${data.city}, ${data.countryName}`)

//         return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
//     })
//     .then((res) => {
//         if(!res.ok) {
//             throw new Error(`Country Not Found: ${res.status}`)
//         }
//         return res.json()
//     })
//     .then(([data]) => {
//         renderData(data)
//     })
//     .catch((err) => {
//         console.log(err.message)
//     })
// }

//! TEST DATA
// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)

//! CHECKING EVENT LOOP EXECUTION
// console.log('TEST-1')
// setTimeout(() => {
//     console.log('CallBack Queue: Timeout Execution After 0 Sec')
// }, 0)
// Promise.resolve('MICROTASKS QUEUE -1: Resolved Successfully').then((res) => console.log(res))
// Promise.resolve('MICROTASKS QUEUE -2: Resolved Successfully').then((res) => {
//  // for(let i = 0; i < 1999999999; i++) {}
//     console.log(res)
// })
// console.log('TEST-2')


const lotteryPromise = new Promise(function(res, rej) {
    // console.log('Lottery Placed Here 🔽')

    setTimeout(function() {
        if(Math.random() >= 0.5) {
            res("You Won")
        }
        else{
            rej(new Error("You Lost"))     // we can pass a Error object that is: rej(new Error("you loast"))
        }
    }, 2000)
})
lotteryPromise.then((res) => {
    // console.log(res)
})
.catch((err) => {
    // console.error(err.message)
})

// Promisifying setTimeout() fn:
// const wait = function(sec){
//     return new Promise(function(resolve) {
//         setTimeout(resolve, sec * 1000)
//     })
// }
// wait(5).then(() => {
//     console.log(`I waited for 5 seconds`)
//     return wait(4)
// }).then(() => {
//     console.log(`I waited for 4 seconds`)
//     return wait(3)
// }).then(() => {
//     console.log(`I waited for 3 seconds`)
//     return wait(2)
// }).then(() => {
//     console.log(`I waited for 2 seconds`)
//     return wait(1)
// })
// .then(() => {
//     console.log(`I waited for 1 second`)
// })
// ---------------------------------------------
Promise.resolve('solved').then((res) => {
    // console.log(res)
})
Promise.reject(new Error('Problem!')).catch((err) => {
    // console.error(err.message)
})
// ---------------------------------------------

//! Promisifying Geolocation API 
const getLocation = function() {
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position), 
        //     err => reject(err)
        // )
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(resolve, reject)
        }
    })
}
// getLocation().then(pos => console.log(pos.coords))
// getLocation().catch(err => console.error(err))

const whereAmI = () => {

    getLocation()
    .then((pos) => {
        // const [lat, lng] = [pos.coords.latitude, pos.coords.longitude]
        const {latitude: lat,  longitude: lng} = pos.coords
        return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}8&longitude=${lng}`)
    })
    .then((res) => {
        if(!res.ok) {
            throw new Error(`Problem With Geocoding - ${err} Error: ${res.status}`)
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
        console.log(`You are in ${data.city}, ${data.countryName}`)

        return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
    })
    .then((res) => {
        if(!res.ok) {
            throw new Error(`Country Not Found: ${res.status}`)
        }
        return res.json()
    })
    .then(([data]) => {
        renderData(data)
    })
    .catch((err) => {
        console.log(err)
        console.log(err.message)
    })
}
// btn.addEventListener('click', whereAmI)

/* 
 ! Coding Challenge #2
-----------------------
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART - 1
---
1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) 
   - and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
       - The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART - 2
---
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image 
   - (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. 
           - Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/

// getElementByClass or querySelect
const imgSpace = document.querySelector('.images')

const createImage = function(imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img')
        img.src = imgPath

        img.addEventListener('load', function() {
            imgSpace.append(img)
            resolve(img)
        })
        img.addEventListener('error', function() {
            reject(new Error('Image Not Found!'))
        })
    })
}

const wait = function(sec){
    return new Promise(function(resolve) {
        setTimeout(resolve, sec * 1000)
    })
}

// let currImg 
// createImage('./img/img-1.jpg')
// .then((img) => {
//     currImg = img
//     return wait(2)
// }).then(() => {
//     currImg.style.display = 'none'
//     return createImage('./img/img-2.jpg')
// }).then((img) => {
//     currImg = img
//     return wait(2)
// }).then(() => {
//     currImg.style.display = 'none'
//     return createImage('./img/img-3.jpg')
// }).then((img) => {
//     currImg = img
//     return wait(1)
// }).then(() => {
//     currImg.style.display = 'none'
// })
// .catch(err => console.error(err))

const getLocation1 = function() {
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position), 
        //     err => reject(err)
        // )
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(resolve, reject)
        }
    })
}

//! updated version for consuming promises - using ASYNC/AWAIT
const whereAmI1 = async function() {
    try{
        const pos = await getLocation1()
        const {latitude: lat,  longitude: lng} = pos.coords
        // console.log(lat, lng)
        
        const countryFetch = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}8&longitude=${lng}`)
        //! create new error
        if(!countryFetch.ok){
            throw new Error('Problem While Fetching Your Location Data Using Your Coordinates')
        } 
        const {countryName} = await countryFetch.json()
    
        const res = await fetch(`https://restcountries.com/v2/name/${countryName}`)
        //! create new error
        if(!res.ok){
            throw new Error('Problem While Fetching Your Country')
        } 
        const [britIndia, India] = await res.json()
        renderData(India)
    }
    catch(err) {
        console.error(err)
        renderError(`Something Went Wrong: ${err.message}`)
    }
}
// whereAmI1()

const get3Countries = async function(c1, c2, c3) {
    try{
        //   const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
        //   const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
        //   const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)

        const [data] = await Promise.race([
            getJSON(`https://restcountries.com/v2/name/${c1}`), 
            getJSON(`https://restcountries.com/v2/name/${c2}`), 
            getJSON(`https://restcountries.com/v2/name/${c3}`)
        ])
        console.log(data)
        // const capitals = data.map(countryData => {
        //     return (countryData[0].capital)
        // })
        // console.log(capitals)
    }
    catch(err) {
        console.log(err)
    }
}
get3Countries('sri lanka', 'germany', 'tanzania')


const rejectTimer = function(sec) {
    return new Promise(function(_, reject) {            //? we have to only reject the promise not to resolve, so throw away variable (_) is placed inside resolve parameter 
        setTimeout(function() {
            reject(new Error("Request took too long!"))
        }, sec * 1000)
    })
}

Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`), 
    rejectTimer(1)
]).then((res) => console.log(res[0]))
.catch((err) => console.log(err))

Promise.allSettled([
    Promise.resolve('Success1'),
    Promise.reject('ERROR'),
    Promise.resolve('Success2')
]).then((res) => console.log(res))