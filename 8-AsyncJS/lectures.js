//! Asynchronous JS: Promises, Async/Await, AJAX

/**
 * ! 1. Asynchronous JS, AJAX and APIs
 * ------------------------------------
 * 
 * ! SYNCHRONOUS
 * - most of the code we write works synchronously, SYNCHRONOUS: Line by Line 
 * - each line of code waits for the previous line to execute .. long running code blocks the code execution
 * ex:
 * - an "alert()" fn which blocks the next lines of code execution, and can be run only after clicking on 'OK' in the alert window.
 * 
 * ! ASYNCHRONOUS
 * ex-1:
setTimeout(() => {
    console.log("hello world")
}, 5000)
console.log("with in 5 minutes")
 * 
 * - this 5 sec (5000 ms) timer would not stop execution of following lines of a code block
 * - the setTimeout -> timer will run in the background of JS callstack without preventing the main code from execution .. in which we have also registered cb fn. which will be executed after 5000 ms timer
 * - so, asynchronous code is non-blocking in nature! 
 * 
 * ! CONCLUSION:
 * - callbacks 'alone' do not aid in writing asynchronous code in JS. only certain fns like setTimeout, etc with these only we can write a code in asynchronous way!
 * 
 * ex-2: 
 * - src attribute setting on an Image (img)... 
 * 
const img = document.querySelector('.dog')
img.src = 'dog.jpg'
img.addEventListener('load', () => {
    img.classList.add('fadeIn')
})
p.style.width = '300px'
 * 
 * - this above example demonstrates the fact that callbacks alone do not make the code asynchronous but also setTimeout and even an 'src' attribute for an image does
 * - so, setting 'src' attribute to the image is an asynchronous process, which loads in the background in JS. 
 *   - once the image has finished loading, a load event will be automatically emitted by JS and we can listen to that using 'addEventListener'
 * 
 * - ex-3: also an eventListener listening to a click event, which do not happen at once, it waits until the event to happen and then executed.
 *  
 * ! The Most Important UseCase of ASYNCHRONOUS Programming:
 * ---
 * ! AJAX CALLS (Asynchronous JavaScript And XML):
 * AJAX - allows us to communicate with the remote webservers in an Asynchronous way, in practice - AJAX calls request data from server dynamically
 * 
 *                                                                  has an 'API' 
 *            -------------- AJAX HTTP Request --------------->     /
 *      CLIENT                                                  SERVER
 *          <---------- RESPONSE: Sending the Data -------------
 * 
 * - this back and forth happens asynchronously in 'background' => SERVER usually contains an API (API has the data that we requesting for!)
 * 
 * ! API (Application Programming Interface):
 * - piece of software that can be used by another software, in order to allow applications to talk to each other
 * - pieces of softwares that communicate with each other (that is exchanging information!)
 * ex: 
 *   - until now we used Geolocation API, DOM API, SELF-written API (Own Class API) etc
 *   - Online API: App running on servers, that receives requests for data, sends back data as a response (an online API can be built using backend)
 * 
 * - Online API / web API or we can use 3rd party web APIs to get the data from backend and present that on frontend 
 * 
 * NOTE:
 * - In AJAX, XML is the data format that is used to transmit data across the softwares .. but now-a-days we have been using JSON format to transmit the data across platforms!
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 2. Our First AJAX Call: XMLHttpRequest
 * -----------------------------------------
 * Note: The URLs used are took from a gitHub repository: "/public-apis"
 * 
 * ! - make sure that API has CORS (Cross Origin Resource Sharing) set to - 'YES' (or Unknown)
 * - here we are using Urls which has no "authentication"
 * 
 * ! XMLHttpRequest Function (old way)
 * -----------------------------------

const getCountryData = (country) => {
    const request = new XMLHttpRequest()
    request.open('GET', 'https://restcountries.com/v2/name/portugal')
    
    //! sending request is an asynchronous operation, which emits a load event that has to be listened here
    request.send()
    
    //! listening to the event: "LOAD"
    request.addEventListener('load', () => {
        console.log(this.responseText)
        
        //! parsing the DATA using "JSON.parse()" => converts "String JSON type" to 'JSON' object
        const [data] = JSON.parse(this.responseText)
        console.log(data)
    
        const html = 
        `
        <article class="country">
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
    })  
}
getCountryData('portugal')
getCountryData('usa')
 * 
 * - "XMLHttpRequest()" is a constructor fn and storing inside a new variable 'request'.. on which we can apply methods like (open, responseType, send, onload etc.,)
 * - request.open('{Method}', '{url}') => {METHOD} -> CRUD Operation can be of type "GET", "POST" etc.,
 * 
 * DATA IN PROCESS...
 * - we cannot use a variable to store the data which we got from the API, cause of ASYNCHRONOUS nature of the code.. so we listen to the event called 'load'
 * - we 'send' the request: using "request.send()" .. this runs in background 'asynchronously' once it is done it will emit the 'load' event and we listen to that using eventListener
 * 
 * AFTER GETTING DATA...
 * - once the data received, the cb fn. will be fired and on request object through 'this' keyword we attach the requestText property (The Response) => 'this' refers to 'request' object created from the constructor "XMLHttpRequest()"
 * - and parsing the data using "JSON.parse()"
 * 
 * GETTING ORDERLESS DATA...
 * - we get data in no order, every-time we refresh the page.
 * ? so, if we data in a specific order.. we have to "chain the requests" => that is called "CALLBACK HELL"
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 3. Welcome to Callback Hell
 * ------------------------------
 * 
 * - previously, we used fn to send requests to URL to get the country's data.. so multiple AJAX calls were made for multiple function calls (these were running in parallel and we get data.. whenever an AJAX call is completed!)
 * - so, in this we make a sequence of these requests!  
 * 
 * - we render a country that is border to a country that was requested (the border country data will be inside the country that we requested for!)

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

//! AJAX call
const getCountryAndNeighbor = function (country) {

    //! AJAX call (1)
    const request = new XMLHttpRequest()
    request.open('GET', `https://restcountries.com/v2/name/${country}`)
    
    //! sending the AJAX request
    request.send()
    
    request.addEventListener('load', function() {               // console.log(this.responseText)
    
        //! parsing the DATA 
        const [data] = JSON.parse(this.responseText)        // destructuring data
        console.log(data)

        //! render the data
        renderData(data)
        
        //! Check for Neighbours
        const neighbor = data.borders?.[0]          //! optional chaining "?."
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
getCountryAndNeighbor('portugal')
 * 
 * Note: 
 * - url used here: "https://restcountries.com/v2/alpha/${neighbor}" => the 'alpha' here refers to an alphaCode: 'ESP' inside > "borders: ['ESP']"
 * 
 * - from the above example, we have to get a neighbour of a country, so we used callback inside a callback (that was one cb inside another cb)
 * - so if there are 'n' number of neighbours, we have to write 'n' number of callbacks 
 * - which in turn creates NESTED CALLBACKS: 'CallBack Hell'
 * 
 * ! Callback Hell:
 * - when we have a lot of nested callbacks to perform asynchronous tasks in sequence! this nested callbacks is not only with AJAX calls but also with every other example

setTimeout(() => {
    console.log('1 second')
    setTimeout(() => {
        console.log('2 second')
        setTimeout(() => {
            console.log('3 second')
            setTimeout(() => {
                console.log('4 second')
                setTimeout(() => {
                    console.log('5 second')                     |- this is what callback structure looks like
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)
 * - easy to find this type of structure!
 * - with this structure, difficult to understand and find bugs, when it is difficult to understand.. it is harder to upgrade the code and hard to add new functionalities
 * 
 * ! Problem:
 * - hard to structure the code, so we have promises in the place of "PROMISES"!
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 4. Promises and the Fetch API
 * --------------------------------
 * - to avoid the problem we got with the "callback hell" we use promises with ES6 version of JS!
 * 
 * Using Fetch API:
 * ---
//! Normal AJAX Call
const request = new XMLHttpRequest()
request.open('GET', `https://restcountries.com/v2/name/${country}`)
request.send()

//! Fetch API Call
const req = fetch('https://restcountries.com/v2/name/portugal')

console.log(req) // it returns a pending state promise when we logged the data here 
 * 
 * ! Promise: 
 * !   - an object that is used as a placeholder for the future result of an asynchronous operation (like a container for an asynchronously delivered value)
 * - here the future value will be the response coming from an AJAX call => we use promise to handle this future value (from an AJAX call)
 * 
 * - by using promises, we do not need to use any callbacks, eventListeners to get the response from an API or results from an asynchronous operations
 * - using promise chaining, we can get results from a lot of asynchronous operations instead of nesting callback fns. (instead of callback hell)
 * 
 * - as promises work with asynchronous nature, they are time sensitive, these change overtime so promises can be in different states this is called a "Lifecycle of a PROMISE"
 *
 * ! Lifecycle of a promise:
 * * 1. Pending: "BEFORE the future value is available" ----- !!! after async task is finished !!! -----
 * * 2. Settled: "AFTER asynchronous task gets settled!" 
 *   * 2.1 FULFILLED Promises: a promise that successfully resolved and a value is now available
 *   * 2.2 REJECTED Promises: an error happened! during an asynchronous task! (ex: user is offline, can't connect to the server-online!)
 * 
 * NOTE:
 * - a promise gets settled only once, from then the state may remain unchanged forever => so a promise may get "fulfilled" or "rejected" (and this state is immutable)
 * 
 * - these states are relevant and useful when we use a promise to get a result, which is "CONSUMING a PROMISE"
 * - we can only consume it! when we have already one! here, we get a 'promise' from a "fetch" function
 * 
 * - while using Fetch API, fetch function builds the promise and returns it to consume! 
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 5. Consuming Promises
 * ------------------------
const getCountryData = function(country) {
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((res) => {
        return res.json()
    })
    .then(([data]) => {                         // destructuring
        console.log(data)
    })
}
getCountryData('portugal')
 * 
 * - fetch(`url`) returns a new promise, if we may get resolved solution from the promise (if promise may get resolved) =>  we use .then() to consume the promise
 *
 *     (1)                                   (2)
 * .then((res) => { return res.json() }).then((data) => { clg(data) })
 * 
 * 1) 1st .then() takes cb fn which has a parameter that gets from the resolved promise HERE WE HANDLE THE FULFILLED PROMISE, we get data inside the body which will be in "ReadableStream"
 *   - hence this has to be converted into JSON, so we use .json() on the response we get from the FULFILLED promise
 *   - the converted JSON object is also an asynchronous fn hence it has to be consumed again, return the JSON object and apply .then() again
 * 2) 2nd .then() again consumes the promise
 * 
 * Note:
 * - promises do not get rid of callbacks completely but they get rid of nested callbacks or callback hell completely!
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 6. Chaining Promises
 * -----------------------
 * - in order to get the neighboring country from a country, we have to chain two AJAX calls at a time .. the 1st country is required to get it's neighboring country

const getCountryData = function(country) {
    //? country
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((res) => {
        return res.json()
    })
    .then(([data]) => {                         // destructuring    
        renderData(data)

        //? neighbor
        const neighbor = data.borders?.[0]      // optional chaining
        return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)          // here another promise will be returned => neighbor
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        renderData(data, 'neighbour')
    })
}
getCountryData('sri lanka')
 * 
 * - instead of using long callback hells.. we used flat promises chaining here to get the neighbouring country of a country 
 * 
 * * Here, we returned a promise from a parent promise and we applied .then() on it!
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 7. Handling Rejected Promises
 * --------------------------------
 * - in a promise, if there were no errors then it is resolved successfully.. or if there are any errors, then it is a rejected promise! 
 * 
 * How to Handle Promise Rejections?
 * ---
 * - there is a chance of getting rejections is that when there is an internet disconnection!
 * 
 *                                                                                      cb on success           cb on error(network error!)
 *                                                                                                  |           |
 * * 1) error can be caught using second parameter which is also a cb fn that can be passed to .then(() => {}, () => {})

const getCountryData = function(country) {
    //? country
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((res) => {
        return res.json()
        }, (err) => {
//! error handling (!!! network connection problem !!!)
            alert(err)
    })
    .then(([data]) => {                         // destructuring    
        renderData(data)

        //? neighbor
        const neighbor = data.borders?.[0]
        return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)          // here another promise will be returned => neighbor
    })
}
btn.addEventListener('click', () => {
    getCountryData('sri lanka')
})
 * 
 * - here include a button in HTML, which let the user load the page on network and after loading .. disconnect the network from inspect of webpage, and click on button to fetch the country details
 * * - if there are chain of promises, we have to handle the error at each consumption of promise from a fetch request!
 * 
 * ! CATCH BLOCK:
 * 
 * * 2) so, we would have to do the error handling globally, at end of the chain is the better decision
 * 
const getCountryData = function(country) {
    //? country
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((res) => {
        return res.json()
    })
    .then(([data]) => {                         // destructuring    
        renderData(data)

        //? neighbor
        const neighbor = data.borders?.[0]
        return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)          // here another promise will be returned => neighbor
    })
//! catching errors !!!
    .catch((err) => {
        alert(err)
    })
}
btn.addEventListener('click', () => {
    getCountryData('sri lanka')
})
 * 
 * -------BLOCK-------
.catch((err) => {
    alert(err.message)
})
 * -------------------
 * - every error which has to be handled inside a catch block, is a real JS object! {!!! we can create own errors in JS with a error constructor !!!}
 * - so this error object contains a "message" property! 
 * 
 * ! FINALLY BLOCK:
 * - this also take a callback fn, which will be executed whether a promise gets "fulfilled" or "rejected"
 * 
 * ? UseCase:
 * - finally is useful to render a spinning wheel, to show that asynchronous is still loading in background! (buffering)
 * - the spinner gets rendered when an asynchronous operation starts, and ends when it is completed! 
 * 
 * NOTE:
 * - if user requested for a country that was not there, then there will be "404 Error: Not Found"
 * - but here we handled only an error happened when there is network connection, so next we handle a "404 Error"
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 8. Throwing Errors Manually
 * ------------------------------
 * - during a fetch, there was a 404 Error! (when an API could not find any data with provided details!)
 * - fetch fn. did not reject the request in this case! so we have to do this process manually!
 * 
 * - when there is a 404 Error! in the response object the "ok" property set to 'false' and status is set '404'
 *   - if there is no error the 'ok' is set to 'true' and status is set to '200'
 * 
 * - we can use the "ok" - false to reject the promise manually by creating a new error => defining error message...
 * -----------------------------
 * if (response.ok === false) {
 *  throw new Error()
 * }
 * -----------------------------
 * 
const getCountryData = function(country) {
    //? country
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((res) => {
        //! throwing new error: when there is an error !
        if(!res.ok){
            throw new Error(`Country Not Found: ${res.status}`)
        }
        //! no error !
        return res.json()
    })
    .then(([data]) => {                         // destructuring    
        renderData(data)

        //? neighbor
        const neighbor = data.borders?.[0]
        return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)          // here another promise will be returned => neighbor
    })
    .catch((e) => {
        console.log(e)
    })
    .finally(() => {
        console.log('Runs Even Promise is Fulfilled or Rejected!')
    })
} 
 * - "throw" immediately terminates the function .. when there is an error! 
 * - then the promise would immediately be rejected .. then the promise returned will be a rejected promise from this below code => .then()...
 * 
.then((res) => {
    //! throwing new error: when there is an error !
    if(!res.ok){
        throw new Error(`Country Not Found: ${res.status}`)
    }
    //! no error !
    return res.json()
})
 * - this rejected promise will be propagated all the way to the ".catch() handler" and then the 'HTML' or any RENDER fn inside catch handler will be fired 
 * - simply we are creating an error on our own to get handled when promise gets rejected, and gets into '.catch()' block 

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
 * 
 * ? What If
 * ... there is an error fetching a neighbor country also, so we have include similar error handler while fetching the data of neighbour (which is repetitive and not a DRY principle)
 * 
 * HELPER FUNCTION:
 * - so, we include a HELPER function in which we wrap up the fetch, error handler, and also the conversion to JSON!
 * 
//! The Helper Function That is Used to Handle the URL-Fetching, Error Handling and also Converts to JSON

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
 * 
 * 
// ! Coding Challenge #1
// ! --------------------
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:

// * PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. 
    - Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
    - The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. 
    - Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. 
    - Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. 
    - This is an error with the request. Remember, fetch() does NOT reject the promise in this case. 
    - So create an error to reject the promise yourself, with a meaningful error message.

// * PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
 * 
 * 
 * 
const whereAmI = (lat, lng) => {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}8&longitude=${lng}`)
    .then((res) => {
        if(!res.ok) {
            throw new Error(`Problem With Geocoding - ${err} Error: ${res.status}`)
        }
        return res.json()
    })
    .then((data) => {
        // console.log(data)
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
        console.log(err.message)
    })
}

whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 9. Asynchronous Behind The Scenes: The Event Loop
 * ----------------------------------------------------
 * 
 * - JS has a RUNTIME (container: contains all pieces to execute JS code), in which it consists of JS ENGINE, WEB APIS, CALLBACK QUEUE
 * 
 * 1. JS ENGINE: consists of HEAP (memory where objects are stored) & CALLSTACK (code exactly executed here!)
 * * Note: 
 *   1. JS has only one thread of execution, (that is it can do one thing at a time!)
 *   2. Not like JAVA (a multi threaded language) 
 * 
 * 2. WEB APIS: FETCH and GEOLOCATION APIs, TIMERS, DOM, etc., where these are not the part of JS language! 
 * 
 * 3. CALLBACK QUEUE (DATA STRUCTURE: Queue): this holds Ready-to-be-Executed callback fns. that are actually attached to some event that has occurred!
 * 
 * Note:
 * - whenever the callstack gets empty, the EVENT LOOP takes callbacks from CALLBACK queue and put them in the CALLSTACK
 * - EVENT LOOP is the essential part of JS RUNTIME, which makes asynchronous behavior possible
 * 
 * ! EVENT LOOP is the reason we have "non-blocking concurrency model" in JS
 * * CONCURRENCY MODEL: how a language handles multiple tasks happening at the same time
 * 
el = doc.querySelector('img')
el.src = 'dog.jpg'
el.addEventListener('load', () => {
    el.classList.add('fadeIn')    
})
fetch('url').then((res) => {
    return res.json()
})
 * 
 * - inside 'WEB APIs': where all the asynchronous tasks has to run! 
 * from above example, loading images takes place in the WEB APIs, if this takes place in the CALL STACK which would stop the flow of code execution!
 * 
 * two asynchronous tasks:
 * - after img gets loaded, we listen to a load event, this has to be registered inside the WEB APIS
 * - the next AJAX Call through FETCH API also happen in the WEB APIs env, 'then' method on fetch API also register a CB fn. inside WEB APIs
 * 
 * after asynchronous tasks execution:
 * - after loading of img, load event is emitted on the img and the registered cb will be put inside the CB queue! 
 * 
 * * Note: cb queue is an ordered list of all cb fns. in the line to get executed, 
 * if there were other callbacks already inside the cb queue! then the new cb fn. will go at the end of the queue.  
 * 
 * * IMPLICATION:
 * ? if there were cb of 1 sec timer and a new cb of timer 5 sec is added to the queue then, the new cb fn will only gets executed after 6 sec
 * 
 * ! EVENT LOOP:
 * - this checks the call stack is empty or not (except the global context!) and if call stack is empty, then event loop adds the 1st callback from the cb queue into the call stack
 *   - EVENT LOOP decides when callback has to get executed
 * 
 * ! EVENT LOOP, CallBack Queue, WEB APIs all together make code run asynchronously that is in a non-blocking way!
 * 
 * * PROMISE CB - Different way of Code Execution:
 * - now there is a callback related to a promise is left for execution!
 * - callbacks from promises does not get added into a callback queue, but this gets added into MICROTASKS queue!
 * 
 * ! MICROTASKS QUEUE:
 * - this has top priority over the callback queue in the context of execution! 
 * - EVENT LOOP checks for CBs in "microtasks queue" and executes completely (till the completion of microtasks queue) before going to execute the callbacks from callback queue!
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 10. The Event Loop in Practice
 * ---------------------------------
 * 
 * *  CHECKING EVENT LOOP EXECUTION:
console.log('TEST-1')
setTimeout(() => {
    console.log('CallBack Queue: Timeout Execution After 0 Sec')
}, 0)
Promise.resolve('MICROTASKS QUEUE: Resolved Successfully').then((res) => console.log(res))
console.log('TEST-2')
 * 
 * * RESULT:
1. TEST-1
2. TEST-2
3. MICROTASKS QUEUE: Resolved Successfully
4. CallBack Queue: Timeout Execution After 0 Sec
 * 
 * * if there is a larger task inside another microtask cb then the execution of timer gets delayed
console.log('TEST-1')
setTimeout(() => {
    console.log('CallBack Queue: Timeout Execution After 0 Sec')
}, 0)
Promise.resolve('MICROTASKS QUEUE -1: Resolved Successfully').then((res) => console.log(res))
Promise.resolve('MICROTASKS QUEUE -2: Resolved Successfully').then((res) => {
 // for(let i = 0; i < 1999999999; i++) {}                                                          // slows down the process of PROMISE CALLBACK
    console.log(res)
})
console.log('TEST-2')
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 11. Building a Simple Promise
 * --------------------------------
 * - Building a lottery example: where fulfilled promise is winning a lottery, and rejected promise is loosing a lottery!
 * 
//! Creating a New Promise:
const lotteryPromise = new Promise(function(res, rej) {
    if(Math.random() >= 0.5) {
        res("You Won")
    }
    else{
        rej("You Lost")
    }
})
 * * STEPS:
 * 1. creating a promise, using a Promise constructor! this means Promise is special type of an object
 * 2. this promise constructor takes a function with 2 params (resolve, reject): "an Executer Function" => as constructor fn runs, Executer fn executes
 *   - the resolve and reject that are passed are: function types
 * 
 * - Executer Function Behaves Asynchronously!
 * 
 * ex: lottery win will have 50% chances and other 50 with lose percentage
 * 
 * ? winning lottery implies => fulfilled promise that is promise is resolved: resolve fn. is called resolve() .. this takes a fulfilled value of promise and gets consumed by ".then()" method
 * ? loosing lottery implies => rejection of promise and reject() is called .. which is then handled using ".catch()" method 
 * 
//! Consuming Created Promise
lotteryPromise.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.error(err)
})
 * * .then()=> to get resolved value and .catch() => to get errors 
 * 
 * ! but the promises must be asynchronous so, include a timer fn inside the promise 
const lotteryPromise = new Promise(function(res, rej) {
    console.log('Lottery Placed Here 🔽')
    setTimeout(function() {
        if(Math.random() >= 0.5) {
            res("You Won")
        }
        else{
            rej(new Error("You Lost"))     // we can pass a Error object that is: rej(new Error("you lost"))
        }
    }, 2000)
})
    //? 
lotteryPromise.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.error(err.message)
})
 * 
 * ! Promisifying: converting callback based asynchronous behavior to promise based code
 * 
 * ex: 
 * Promisifying "setTimeout" function, in this process we don't need to 'reject' as the timer do not fail, so only 'resolve' 
 * 
//? Promisifying setTimeout() fn:
const wait = function(sec){
    return new Promise(function(resolve) {
        setTimeout(resolve, sec * 1000)
    })
}
wait(5).then(() => {
    console.log(`I waited for 5 seconds`)
    return wait(4)
}).then(() => {
    console.log(`I waited for 4 seconds`)
    return wait(3)
}).then(() => {
    console.log(`I waited for 3 seconds`)
    return wait(2)
}).then(() => {
    console.log(`I waited for 2 seconds`)
    return wait(1)
})
.then(() => {
    console.log(`I waited for 1 second`)
})
 * 
 * - we had avoided the below - callback hell using setTimeout function with above - promise structure:
 * 
setTimeout(() => {
    console.log('1 second')
    setTimeout(() => {
        console.log('2 second')
        setTimeout(() => {
            console.log('3 second')
            setTimeout(() => {
                console.log('4 second')
                setTimeout(() => {
                    console.log('5 second')                     |- this is what callback structure looks like
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)
 * 
 * ? there is a nice and easier way of creating a fulfilled or rejected promise immediately
 * ! using Promise.resolve() or Promise.reject() => these are static methods on 'Promise' constructor
 * 
Promise.resolve('solved').then((res) => {
    console.log(res)
})
Promise.reject(new Error('Problem!')).catch((err) => {
    console.error(err.message)
})
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 12. Coding Challenge #2
 * --------------------------
Build an image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART - 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) 
    - and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
        - The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART - 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image 
    - (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. 
            - Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
 * 
 * 
//? getElementByClass or querySelect
const imgSpace = document.querySelector('.images')

//? creating a new promise to load images
const createImage = function(imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img')
        img.src = imgPath
//? listening to 'load' and 'error' events
        img.addEventListener('load', function() {
            imgSpace.append(img)
            resolve(img)
        })
        img.addEventListener('error', function() {
            reject(new Error('Image Not Found!'))
        })
    })
}
//? 'wait' timer
const wait = function(sec){
    return new Promise(function(resolve) {
        setTimeout(resolve, sec * 1000)
    })
}
//? consuming image loading promise and displaying other images
let currImg 
createImage('./img/img-1.jpg')
.then((img) => {
    currImg = img
    return wait(2)
}).then(() => {
    currImg.style.display = 'none'
    return createImage('./img/img-2.jpg')
}).then((img) => {
    currImg = img
    return wait(2)
}).then(() => {
    currImg.style.display = 'none'
    return createImage('./img/img-3.jpg')
}).then((img) => {
    currImg = img
    return wait(1)
}).then(() => {
    currImg.style.display = 'none'
})
.catch(err => console.error(err))
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 13. Consuming Promises with Async/Await
 * ------------------------------------------
 * ? fetch('url').then((res) => console.log(res)) === const res = await fetch('url')
 * 
 * - using async-await in the place of .then() makes consuming promises easier!

const whereAmI1 = async function(country) {
//! used this method before, for consuming promises
    // fetch('https://restcountries.com/v2/name/portugal').then(res => console.log(res))

//! updated version - new code to consume promises with "ASYNC/AWAIT"
    const res = await fetch(`https://restcountries.com/v2/name/${country}`)
    const [data] = await res.json()
    console.log(data)
}
whereAmI1('portugal')
 * 
 * - Async/Await is the "syntactical sugar" over 'then' method in promises to consume
 * - { fetch('url').then((res) => console.log(res)) } and { const res = await fetch('url') } are exactly same and identical
 * 
 * * explanation:
 * - "fetch(`https://restcountries.com/v2/name/${country}`)" and "res.json()" returns promises .. so we use AWAIT on them and store them inside a variable .. instead of using ".then()" to consume
 * 
 * - using async/await and rewriting the 'whereAmI' function
//? using geolocation to get present location (lat; lng)
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
//? updated version for consuming promises - using ASYNC/AWAIT
const whereAmI1 = async function() {

    const pos = await getLocation1()
    const {latitude: lat,  longitude: lng} = pos.coords
    
    const countryFetch = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}8&longitude=${lng}`)
    const {countryName} = await countryFetch.json()

    const res = await fetch(`https://restcountries.com/v2/name/${countryName}`)
    const [data] = await res.json()
    renderData(data)
}
whereAmI1()
 * 
 * * NOTE:
 * ! when we request data more than 3 times a second using "reverse-geocoding" which may cause "403 Error" but we did not handle the error here with .catch()
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 14. Error Handling With try...catch Block
 * --------------------------------------------
 * - with async/await we cannot use .catch() method that we actually used while consuming promises with .then()
 * 
 * * Stupid Example:
try {
    let y = 1
    const x = 2
    x = 3           // assigning a value to const variable throws an error!
}
catch(err){
    console.log(err.message)
}
 * 
 * ? try...catch block with async/await:
 * ! throwing automatically generated errors while fetching data!
const getLocation1 = function() {
    return new Promise(function(resolve, reject) {

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
        
        const countryFetch = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}8&longitude=${lng}`)
        const {countryName} = await countryFetch.json()
    
        const res = await fetch(`https://restcountries.com/v2/name/${countryName}`)
        const [data] = await res.JSON()
        renderData(data)
    }
    catch(err) {                                        //! here the error came automatically while fetching data
        console.error(err)
        renderError(`Something Went Wrong: ${err.message}`)
    }
}
whereAmI1()
 * 
 * 
 * ? using try...catch block with async/await:
 * ! using try...catch to handle manually created errors 
const getLocation1 = function() {
    return new Promise(function(resolve, reject) {
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
        console.log(lat, lng)
        
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
whereAmI1()
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 15. Running Promises in Parallel
 * -----------------------------------
 * - here we take an example of getting capitals of three countries at a time 
 * - we can use getJSON() function three times to get data 
 * 
 * getJSON() function:
 * ---
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
 * --------------------------------------------------------------------------------
 * 
const get3Countries = async function(c1, c2, c3) {
    try{
      const data1 = await getJSON(`https://restcountries.com/v2/name/${c1}`)
      const data2 = await getJSON(`https://restcountries.com/v2/name/${c2}`)
      const data3 = await getJSON(`https://restcountries.com/v2/name/${c3}`)

      console.log(data1)
      console.log(data2)
      console.log(data3)
    }
    catch(err) {
        console.log(err)
    }
}
get3Countries('portugal', 'germany', 'tanzania')
 * 
 * - if we view inside network tab of the website (inspect page): we get to see that the AJAX calls / requests are happening one after another but why next request(s) has to wait for completion of 1st or previous request(s) 
 * - so we can confirm that these requests are happening in a sequential order! but we do not need to wait for one ajax call for previous one to complete and want them to complete in parallel
 * - so we have Promise Combinator "Promise.all()" to avoid this sequential AJAX calls (.all() is a static method on Promise constructor)
 * 
 * ! Promise.all()
 * - takes an array of promises which runs all the promises at same time and return a promise
 * - runs all promises in parallel
 * 
const get3Countries = async function(c1, c2, c3) {
    try{
        //   const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)           |
        //   const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)           | -> without using separate fetch calls we use "Promise.all()"
        //   const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)           |
        
        //! using Promise.all() to replace sequential AJAX calls 
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${c1}`), 
            getJSON(`https://restcountries.com/v2/name/${c2}`), 
            getJSON(`https://restcountries.com/v2/name/${c3}`)
        ])
        const capitals = data.map(countryData => {
            return (countryData[0].capital)
        })
        console.log(capitals)
    }
    catch(err) {
        console.log(err)
    }
}
get3Countries('portugal', 'germany', 'tanzania')
 * 
 * * Note:
 * ! if single Ajax call inside Promise.all() fails then whole Promise.all() fails
 * ? we have to use this whenever there are multiple asynchronous operations to handle and which do not depend on each other
 * 
 *  
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 16. Other Promise Combinator: race, allSettled and any
 * ---------------------------------------------------------
 * 
 * ? 1) Promise.race()
 * - this is also a Promise combinator instead of returning an array of results with "Promise.all()" this returns a single result that is faster than other promises
 * - returns data from a promise which loads faster than other promises
 * 
const get3Countries = async function(c1, c2, c3) {
    try{
        const [data] = await Promise.race([
            getJSON(`https://restcountries.com/v2/name/${c1}`), 
            getJSON(`https://restcountries.com/v2/name/${c2}`), 
            getJSON(`https://restcountries.com/v2/name/${c3}`)
        ])
        console.log(data)
    }
    catch(err) {
        console.log(err)
    }
}
get3Countries('sri lanka', 'germany', 'tanzania')
 * 
 * - Promise.race() short circuits whenever one of the promise gets settled whether it is fulfilled or rejected! 
 * 
 * - this can also used to reject a promise after a certain amount of time.. create a special timeout promise which rejects the operation after a certain time period!
 * 
//! Timer to reject a promise, if not get the data requested in given time period!
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

 * 
 * ? 2) Promise.allSettled()
 * - this also takes an array of promises and works as same as Promise.all() but the difference is Promise.all() short-circuits whenever there is an error
 * and Promise.allSettled() never short-circuits and returns all the results of settled promises
 * 
 * - this includes the rejected promise inside the result array that was returned!
 * 
Promise.allSettled([
    Promise.resolve('Success1'),
    Promise.reject(new Error('Rejected Promise')),
    Promise.reject('ERROR'),
    Promise.resolve('Success2')
]).then((res) => console.log(res))
 * 
 * 
 * ? 3) Promise.any()
 * - simply Promise.any() ignores any type of rejected promises
 * 
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 17. Coding Challenge #3
 * --------------------------
 * -  
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */