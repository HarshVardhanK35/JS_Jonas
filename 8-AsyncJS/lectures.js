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
 * - the setTimeout -- timer will run in the background of JS callstack without preventing the main code from execution .. in which we have also registered cb fn. which will be executed after 5000 ms timer
 * - 
 * - so, asynchronous code is non-blocking in nature! 
 * 
 * ! CONCLUSION:
 * - callbacks 'alone' do not aid in writing asynchronous code in JS. only certain fns like setTimeout, etc with these only we can write a code in asynchronous way!
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
 * - this above example demonstrates the fact that callbacks alone make the code asynchronous but setTimeout and even a 'src' attribute for an image also does
 * - so, setting 'src' attribute to the image is an asynchronous process, which loads in the background in JS. 
 *  - once the image has finished loading, a load event will be automatically emitted by JS and we can listen to that using 'addEventListener'
 * 
 * - ex-3: also an eventListener listening to a click event, which do not happen at once, it waits until the event to happen and then executed.
 *  
 * ! The Most Important UseCase of ASYNCHRONOUS Programming:
 * ---
 * ! AJAX CALLS (Asynchronous JavaScript And XML):
 * AJAX - allows us to communicate with the remote webservers in an Asynchronous way, in practice - AJAX calls request data from server dynamically
 * 
 *                                                                  has an API 
 *          --------------- AJAX HTTP Request --------------->       /
 *      CLIENT                                                  SERVER
 *          <---------- RESPONSE: Sending the Data -------------
 * 
 * 
 * - this back and forth happens asynchronously in 'background' => SERVER usually contains an API (API has the data that we requesting for!)
 * 
 * ! API (Application Programming Interface):
 * - piece of software that can be used by another, in order to allow applications to talk to each other
 * - pieces of softwares that communicate with each other (that is exchanging information!)
 * ex: 
 *  - until now we used Geolocation API, DOM API, SELF-written API (Own Class API) etc
 *  - Online API: App running on servers, that receives requests for data, sends back data as a response (an online API can be built using backend)
 * 
 * - Online API / web API or we can use 3rd party web APIs to get the data from backend and present that on frontend 
 * 
 * NOTE:
 * - In AJAX, XML is the data format that is used to transmit data across the softwares .. but now-a-days we have been using JSON format to transmit the data across platforms!
 * 
 * ! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 2. Our First AJAX Call: XMLHttpRequest
 * ------------------------------------------
 * 
 * Note: The URLs used are took from a gitHub repository: "/public-apis"
 * ! - make sure that API has CORS (Cross Origin Resource Sharing) set to - 'YES' (or Unknown)
 * - here we are using Urls which has no "authentication"
 * 
 * 
 * ! XMLHttpRequest Function (old way)
 * -----------------------------------

const getCountryData = (country) => {
    const request = new XMLHttpRequest()
    request.open('GET', 'https://restcountries.com/v2/name/portugal')
    
    //! sending request is an asynchronous operation, which emits a load event that has to be listened here
    request.send()
    
    request.addEventListener('load', () => {
        console.log(this.responseText)
        
        //! parsing the DATA using "JSON.parse()" => converts "string JSON type" to 'JSON' object
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
 * - request.open('{Method}', '{url}') => CRUD operation can be of type "GET", "POST" etc.,
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
 * ? so, if we data in a specific order.. we have to "chain the requests" => that is the concept called "CALLBACK HELL"
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
 */