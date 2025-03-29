/**
 * ! Components of any Architecture
 * ----------------------------------
 * 1. Business Logic:
 *      - code that solves all business problems
 * 
 * 2. State:
 *      - stores all the application data frontend basically, if there is a change in the state there must be a change in UI and vice versa
 *      - storing and maintaining data of a state and maintaining state in sync is the most difficult task!
 *      - there are many state maintaining libraries exist: redux mobX
 * 
 * 3. HTTP Library:
 *      - responsible for making and receiving data through fetch calls: AJAX calls, 
 * 
 * 4. Application Logic (router):
 *      - handles navigation and UI events
 *      - code/logic that is only concerned about implementation of application!
 * 
 * 5. Presentation Logic: 
 *      - code that is concerned about the visible part of an application, 
 *      - helps in displaying application state
 *      - in order this keeps application state in sync
 * 
 * ! Model View Controller (MVC) Architecture
 * --------------------------------------------
 * MODEL (business logic, application state) - contains business logic that manipulates the state - contains HTTP library for getting data from an API/web server, 
 * 
 * CONTROLLER (application logic) - bridge between MODEL and VIEW 
 * 
 * VIEW (presentation logic) - application part that interacts with user
 * 
 * ! Helpers & Configuration Files
 * ---------------------------------
 * configuration (config.js) file: 
 * - we put all the common variables & constant variables that has to be reused across the project!
 * - we do not put all the variables in this file just some variables that define imp data in them!
 * - ex: a URL, at some time if that URL needs to change, then if changing at config file is just enough!
 * 
 * helpers (helpers.js) file:
 * - we include the functions that has to be common in all the files! that is we re-use several times in our project!
 * 
 * ! Event Handlers in MVC: Publisher - Subscriber Pattern
 * ---------------------------------------------------------
 * - as from the previous code events like: [haschange, load] are handled inside controller
 * 
In controller.js:
---
const eventArray = ['hashchange', 'load',]
eventArray.forEach((ev = "#") => {
  window.addEventListener(ev, controlRecipes)
})
 * - but these are DOM events that need to be there in the "views.js" as this file shall contain all the 'dom' events but handled in "controller.js" file
 * 
 * 1. so, when we put the above code inside 'views' file then the 'controlRecipes function' has to be imported into 'views' module 
 * 2. or else, when we leave this above code inside 'controller.js' file but 'controller' file shall not contain "DOM events like: haschange, load"
 *  - both of these above things violates the MVC pattern!
 *  - because view shall not know anything about the controller file! so we shall not import the 'controller' inside of 'views file'
 * 
 * ! so, we do have "Publisher-Subscriber" a Design Pattern to solve this!
 * 
 *                      "module controller.js"                       "class RecipeView"
 *      function call     controlRecipes()--- SUBSCRIBER             addHandlerRender() --- code that knows when to react: Publisher
 *      data flow             init()            \
 *                            /              code that reacts
 *                           /
 *              Subscribe to Publisher 
 * 
 * 
 * ? Publisher shall not know that Subscriber even exist! (as view can not access)
 * sol: Subscribe to Publisher by passing in the subscriber function as an argument
 * 
 * - as soon as the program loads, "init()" function is called which in turn calls addHandlerRender() function from the view (as controller import both model and view)
 * 
 * Process: 
 * ---
 * 1. as we call addHandlerRender().. we pass in controlRecipes() fn as an argument! 
 * 2. so, addHandlerRender() listens fro events (addEventHandler) and uses controlRecipes() as a callback!
 * 
 * Note: 
 * - this allows to keep 'handler' in 'controller' and 'listener' in the 'view' 
 * 
inside recipeView.js:
---
addHandlerRender(handler){
    const eventArray = ['hashchange', 'load',]
    eventArray.forEach((ev) => {
    window.addEventListener(ev, handler)
    })
}

inside controller.js:
---
const init = function() {
  recipeView.addHandlerRender(controlRecipes)
}
init()
 * 
 * ! Implementing Errors and Success Messages
 * -------------------------------------------
 * error is handled in "model.js" file with catch(err) block..
catch(err) {
    console.error(`${err}`)
}
 * - this is not the correct way of handling the error but user shall view the error (so, views file is important)
 * - 
 * 
 * 
 * 
 * ! truly private "#" and protected using "_" properties with classes
 * 
 * 
 * 
 * 
 * 
 * 
 */
