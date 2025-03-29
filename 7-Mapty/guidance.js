//! MAPTY PROJECT
//! This is a Guidance File for The Mapty Project

/**
 * ! 1. HOW TO PLAN A WEB PROJECT?
 * -------------------------------
 * - in a real-world project we have always start a project from a planning phase to development phases
 * - this planning phase has different steps included to start with:
 * 
 * 1. User Stories:
 * - many companies start with this step. which is a description of application's functionality from the user's perspective, 
 *      and then all the user stories has put together to describe an entire application
 * - this is high-level overview of an application, which allows devs to determine the features of an application
 * ex: 
 * As a ([type of user]- admin/user => WHO?), I want to (perform [an action] => WHAT?) (which [benefits] me! => WHY?)
 * 
 * 2. Features:
 * - all features that to be added are planned in this section
 * 
 * 3. Flowchart (WHAT we gonna build):
 * - all features that were planned has to get a sequence or to follow a path or flow
 * 
 * 4. Architecture (HOW we gonna build):
 * - how we organize our code and which JS features we use to get this done! 
 * 
 ** Note: with this Planning phase would be completed and Development phase (where implementation of JS code starts) gets started!
 * 
 * 
 * ! ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * ! 2. Using Geolocation API?
 * --------------------------
 * - use navigator.geolocation.currentPosition() => which takes two fns that are callbacks => one of them is called on success and another is called on error (if location is not fetched correctly!)
 * 
 if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        const {latitude} = pos.coords
        const {longitude} = pos.coords
        console.log(`https://www.google.co.in/maps/@${latitude},${longitude}`)
        }, () => {
            alert('Could not get your location! Try again!')
            })
            }
 * 
 * 
 * ! ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * ! 3. Displaying a Map Using Leaflet Library (Free)
 * -------------------------------------------------
 * - Leaflet, a 3rd party JS library for interactive maps which was developed by other developers and can be included into our code using hosted version or we can download it permanently on our device
 * - we can use hosted version using CDN- Content Delivery Network => so, now we can include either using CSS or JS
 * 
 * - There are more elegant ways to include this library using JS NPM (Node Package Manager) => that is by installing the package/library
 **  ex: npm install leaflet
 * 
 * 1st - using CDN by including JS:
 * ---
 * - there will be two tags: <link> and <script> in CDN section of leaflet library 
 * - copy them and paste inside the HTML head tag before our JS script: <script.js> 
 * Note: this downloads leaflet before our script tag loads...
 * 
 * ! as JS has to be included after the body tag but not inside header of an HTML doc., so we have to put "defer" in the script tag (as an attribute)
 * 
 * How to use?
 * - read the code inside the 'Overview' tab or read the docs

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
    
 * - get the above code from the Overview tab of leaflet's home page!
 * 
var map = L.map('map').setView([51.505, -0.09], 13);
=> L.map('map') .. 'L' is the entry point => where as .map() takes 'div' to substitute the actual map generated from the code
 * 
 * 
 * ! ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * ! 4. Displaying a Map Marker
 * ----------------------------
 * - display a marker on the map using the leaflet library, wherever the user selects a location on the map put a marker on that selected location
 * - we have to use the leaflet that is map.on() which is similar to the addEventListener() method in JS
 * 
 * - so, the on() method used on map is coming from the leaflet library, not from the JS

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      // console.log(pos)
      const { latitude } = pos.coords;
      const { longitude } = pos.coords;

      const coords = [latitude, longitude]

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      
      map.on('click', (mapEvent) => {
        // console.log(mapEvent)
        const {lat, lng} = mapEvent.latlng
        
        L.marker([lat, lng])
        .addTo(map)
        .bindPopup(L.popup({
          maxWidth: 250, 
          minWidth: 100, 
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup'
        }))
        .setPopupContent("Workout") //!
        .openPopup();
      })
    },
    () => {
      alert("Could not get your location! Try again!");
    }
  );
}
 * Explanation:
 * ---
 * - map.on('click', callbackFn()) => here 'map.on()' works similar to '.addEventListener' which takes an event as 1st arg and callback as 2nd arg
 * 
 * 
 * ! ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * ! 5. Rendering Workout Input Form
 * ---------------------------------
 * - right now we have a functionality that whenever user clicks on map a marker is getting marked on the exact location where it was clicked
 * - but we need to render a form so that a new workout can be added! on that form an eventListener is added, whenever user submits the form.. only then the marker is rendered with entered data inside the form
 * 
 * - follow up with the code for more details ...
 * 
 * 
 * ! ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * ! 6. Project Architecture
 * -------------------------
 * - architecture is giving a structure to the project, and in this project the main structure will come from objects and classes
 * - most imp of any of the architecture is to decide where to and how to store the data?
 * 
 * - here, the application's data directly comes from UserStories => location(lat, lang); distance; time; pace; steps/minute (running) and elevation gain (cycling)
 * - the best way is to design the classes as below ...
 * 
                Parent-class workout:
        id, distance, duration, coords, date, 
                     constructor()
                /                      \
              / Inheritance             \ Inheritance
            /                            \
    child-class Cycling:                child-class Running:
    name, elevationGain, speed             name, cadence, pace
        constructor()                      constructor() 
 * 
 * - as distance, duration, coords are same for both CHILDREN: {CYCLING, RUNNING} and these get inherited from the PARENT: {WORKOUT}
 * - 
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
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */