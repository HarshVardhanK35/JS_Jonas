// !!! ADVANCED DOM AND EVENTS
// ?--------------------------
/**
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 1. How the DOM really works? 
 * ------------------------------
 * 
 * ! WHAT IS A DOM?
 * ---
 * DOM is an interface between JS code and the browser, with JS to interact with the browser.
 * create, modify, delete HTML elements; set styles, classes and attributes; listen and respond to events.
 * DOM tree generates with HTML doc and this tree is made with the nodes .. 
 * DOM is an API -> has lots of methods and properties to interact with DOM tree.
 * 
 * ex: 
 * methods => (.querySelector(); .querySelectorAll(); .addEventListener(); .createElement()); properties => (.textContent; .innerHTML)
 * these all methods are accessible only on document (an obj) => DOCUMENT is a type of node
 * each node in the DOM tree is represented as an object in JS .. 
 * 
 * ! INHERITANCE IN DOM NODES
 * ---
 * Inheritance make the nodes work => means the child nodes have access to methods and properties of their parent nodes
 * 
 *            NODE
 *             |
 *        ELEMENT-1 (parent)         => this holds: .innerHTML; .classList; .children; .append(); .remove(); .querySelector() etc.,
 *             |
 *       HTML element (child)        => so it this child element also gets the access to its parent (ELEMENT-1) and also from 'NODE'
 * 
 * so, these elements inherit more properties and methods from parents as well as from ancestors
 * 
 * let, a "document" which is 'parent' to both ELEMENT-1 and HTML element so any method on document, gets accessed by it's children
 * 
 * DOM API allows all the node types to listen to the events, we usually do it using ".addEventListener()" .. how does this work?
 * * cause there is special node type called "EventTarget" .. which is parent for all the nodes in the DOM tree including "window and document"
 * * so, all the nodes inherit the ".addEventListener()" method from "EventTarget" node (cause of inheritance)
 * 
 * NOTE: we have never created EventTarget node, this is because of abstraction in DOM API and this works behind the scenes
 * 
 * 
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 2. SELECTING, CREATING AND DELETING ELEMENTS
 * ----------------------------------------------
 * 
 * ! SELECTORS:
 * ---
 * to select the entire document, use => document.documentElement => total HTML| document.head => head | document.body => body
 * 
 * ! QuerySelector:
 * ---
 * to select an element use "querySelector" which selects the element on it's 1st appearance
 * but "querySelectorAll" selects every element that matches the argument passed to it => returns a NodeList[]
 * to select an element use => document.querySelector('.className') | document.querySelectorAll('.className') => returns a NodeList[]
 * 
 * ! DOCUMENT-GETTERS:
 * ---
 * document.getElementById('section--1') 
 * => this need an ID and return the element
 * document.getElementsByTagName('button') 
 * => this need a tag name and returns an HTMLCollection[] an array of all buttons in the present document / HTML page
 * doc.getElementsByClassName()
 * => this need a class name and returns the HTMLCollection (type: array)
 * 
 * ? difference between HTMLCollection and NodeList:
 * - so HTMLCollection changes when DOM changes where it will updates automatically but NodeList does not update itself on change in DOM
 * - 
 * 
 * ! Creating and Inserting Elements:
 * ---
 * .createElement()         => returns a dom element 
 * .insertAdjacentHTML()    => inserts an element into another another (this works different !)
 * 
 * ? ex: 
 * const allSections = document.querySelectorAll('.section')
 * const header = document.querySelector('.header')
 * 
 * * create an element
 * const message = document.createElement('div')
 * 
 * * add class to the element 
 * message.classList.add('cookie-message')
 * 
 * * using textContent  => to add text message inside the element 
 * message.textContent = 'we use cookies for improved functionality and analytics!'
 * 
 * * using innerHTML    => to add an HTML inside an element
 * message.innerHTML =  `we use cookies for improved functionality and analytics! <button class = "btn btn--close-cookie">Got it!</button>`
 * 
 * * to insert into the DOM using "header" element { const header =  document.querySelector('.header') }
 * header.prepend(message)
 * 
 * ? inserting through .prepend(<element>) and .append(<element>)
 * - prepend: adds an element as the 1st child of another element
 * - append: adds as an last child to an element
 * 
 * * NOTE: 
 * * 1. using both prepend and append simultaneously results in moving a component/element from 1st child to last child of an element
 * * 2. if we want to add same element at both places we use .. 
 * * => header.append(message.cloneNode(true)) which clones same message, prepends and appends message for selected element(header) at same time
 * 
 * - .before(): adds before the element
 * - .after() : adds after the element
 * ex: 
 * header.before(<element>)
 * header.after(<element>)
 * 
 * ! Deleting elements:
 * ---
 * ? for selecting an element '.' and '#' is used before the class and id respectively for the element
 * - select an element by using it's class(.) or id(#) while using "querySelector"
 * ---
 * document.querySelector('.btn--close-cookie')
 * .addEventListener('click', () => {
 *  message.remove()
 * })
 * 
 * - before '.remove()' method we used to select the 'parentElement' of the element we want to remove and used 'removeChild(<element>)'
 * ... could be like this ...
 * message.remove() === message.parentElement.removeChild(message)
 * 
 * * selecting parentElement from a childElement is like moving up and down this is called => DOM-TRAVERSING
 * 
 * 
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 3. Styles, Attributes and Classes
 * -----------------------------------
 * ! ---STYLES---
 * ! set a style on an element
 * ---
 * - to set styles use (.style) property and on it use desired style property that we want to set (.backgroundColor, .width, etc.,)
 * ---
 * message.style.backgroundColor = '#37383d'
 * message.style.width = '120%'
 * 
 * - to read a style property that was set manually using JS we use ...
 * ---
 * console.log(message.style.color)             => this style is not set manually using JS
 * console.log(message.style.backgroundColor)   => this style was set using JS | message.style.backgroundColor = '#37383d'
 * 
 * - to read the styles that were not set using JS ... we use getComputedStyle() fn.
 * - getComputedStyle(<element>).color (getting color prop)
 * - this gets the styles from the style sheet (that were already present with the element inside the style-sheet)
 * ---
 * console.log(getComputedStyle(message).color)
 * 
 * - to modify the height using getComputedStyle() fn. 
 * - as getComputedStyle(<element>) returns a string and if it consists any decimals then it is removed using Number.parseInt()
 * ---
 * message.style.height = Number.parseInt(getComputedStyle(message).height) + 30 + 'px'
 * 
 * ! CSS Custom Properties
 * ---
 * - usually called CSS variables .. similar to variables in JS .. 
 * - CUSTOM PROPERTIES
 * ---
 * :root {
  --color-primary: #5ec576;
  --color-secondary: #ffcb03;
  --color-tertiary: #ff585f;
  --color-primary-darker: #4bbb7d;
  --color-secondary-darker: #ffbb00;
  --color-tertiary-darker: #fd424b;
  --color-primary-opacity: #5ec5763a;
  --color-secondary-opacity: #ffcd0331;
  --color-tertiary-opacity: #ff58602d;
  --gradient-primary: linear-gradient(to top left, #39b385, #9be15d);
  --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03);
 * }
 * 
 * - as these were set on root .. that means on the "document.documentElement"
 * - modifying the custom CSS properties using JS and "document.documentElement" 
 * ---
 * document.documentElement.style.setProperty('--color-primary', 'red')
 * 
 * ! ---ATTRIBUTES---
 * ---
 * <div class="section__title"> here attributes are 'class' and for some elements that will be an 'id' ..
 * - for img-element it will be 'src' for link-element it is 'href' etc.,
 * - js recognizes only standard properties
 * 
 * ex:
 *  <img
        src="img/logo.png"
        alt="Bankist logo"
        class="nav__logo"
        id="logo"
 *  />
 * 
 * - selection
 * const logo = document.querySelector('.nav__logo')
 * 
 * - read the standard-attributes
 * console.log(logo.src)
 * console.log(logo.alt)
 * 
 * - non-standard attributes cannot be read but can be using .getAttribute
 * console.log(logo.designer) // undefined
 * console.log(logo.getAttribute('designer')) // harsha
 * 
 * - to read the class-names use.. 'className'
 * console.log(logo.className)
 * 
 * - to set an attribute..
 * logo.alt = 'Beautiful Minimalistic Logo'
 * 
 * - to get a relative value of an attribute 'src' of 'img' element use... getAttribute() or to get absolute use simple element.its_attribute
 * clg(logo.src)                // -> gives a url of image if there is any (absolute)
 * logo.getAttribute('src')     // -> img/logo.png (relative)
 * 
 * ! DATA ATTRIBUTES
 * ---
 *  <img
        src="img/logo.png"
        alt="Bankist logo"
        class="nav__logo"
        id="logo"
        data-version-number = '3.0'
 *  />
 * - get the data-attribute
 * ---
 * document.querySelector('.nav__logo').dataset.versionNumber // this returns value stored inside the "data-version-number"
 * 
 * * these special attributes are always stored inside dataset object .. we use a lot when we work with UI and when we need to store data in UI
 * 
 * ! CLASSES
 * ---
 * logo.classList.add() 
 * logo.classList.remove() 
 * logo.classList.toggle() 
 * logo.classList.contains() 
 * 
 * - pass in a value of class and also we can pass multiple values if that class of an element holds
 * 
 * set classNames using .. // this overwrites all the existing classes
 * logo.className = 'logo-class' 
 * 
 * 
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 4. Smooth Scrolling
 * ---------------------
 * ? 1. getBoundingClientRect()
 * element.getBoundingClientRect() => which gives the coordinates of the element.. on which the fn was tagged to.. 
 * the coordinates are...
 * ---
bottom: 554.5859375
height: 28.5
left: 47.5
right: 161.28125
top: 526.0859375
width: 113.78125
x: 47.5
y: 526.0859375
 * 
 * note: where top === y and left === x; these values are relative to the viewport and not to the document
 * 
 * ? 2. scrollX and scrollY
 * - to get the current scroll position of the window (how much the window is scrolled from a target position)
 * 
 * ex:
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', (e) => {

  // gets the coordinates of the element
  const s1Coords = section1.getBoundingClientRect()

  // current scroll position
  console.log('current scroll (x/y)', window.scrollX, window.scrollY)
})
 * 
 * ? 3. clientHeight and clientWidth 
 * - these are the properties of the element that gives the height and width of the element excluding the padding and margin
 * - there return height/width of viewport of the element
 * 
 * ? 4. window.scrollTo() 
 * - this is old method to 
 * - to scroll to a specific position in the window .. which is global function and takes coordinates as arguments
 * 
ex:
// scrolling
// window.scrollTo(s1Coords.left + window.scrollX, s1Coords.top + window.scrollY);

 * ? old way of scrolling smoothly
window.scrollTo({
       left: s1Coords.left + window.scrollX,
       top: s1Coords.top + window.scrollY,
       behavior: 'smooth'                        // this makes the scrolling smooth
})
 * 
 * ? modern way of smooth scrolling 
 * - this is done by using the "scrollIntoView()" method on the element that we want to scroll to .. this method is available on all the elements
 * - selected section that is "section1" and use "scrollIntoView()" method on it
 * 
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', (e) => {
       section1.scrollIntoView({ behavior: 'smooth' })
})
 * 
 *
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 5. Types of Events and Event Handlers
 * ---------------------------------------
 * ! Events
 * ---
 * - basically a signal that is generated by a certain DOM node (click, hover, keypress, etc.,)
 * - we can listen to these events and react to them using event listeners to handle them..
 * 
 * mouseenter event => when the mouse enters the element
 * mouseleave event => when the mouse leaves the element
 * 
// select the element
const h1 = document.querySelector('h1')

// ? adding an event listener
// ---
// add an event listener to the element
h1.addEventListener('mouseenter', (e) => {
       alert('addEventListener: Great! You are reading the heading')
})

// old way of adding an event listener
h1.onmouseenter = (e) => {
       alert('onmouseenter: Great! You are reading the heading')
}
 * 
 * reasons to use eventListener:
 * ---
 * 1. can add multiple event listeners to the same event and 
 * 2. we can remove the event listener using "removeEventListener()" method
 * 
// ? removing an event listener
// ---
// select the element
const h1 = document.querySelector('h1')

// create a named function to run after a particular event happened
const alertH1 = (e) => {
       alert('addEventListener: Great! You are reading the heading')

// remove the event listener after the event happened
       h1.removeEventListener('mouseenter', alertH1)
}
// add an event listener to the element
h1.addEventListener('mouseenter', alertH1)

// another way to remove the event listener - using "setTimeout()"
// ---
// 1. select the element
// 2. add an event listener to the element by creating a separate event handler fn.
// 3. remove the event listener using setTimeout() fn.

setTimeout(() => {
       h1.removeEventListener('mouseenter', alertH1)       
}, 3000)
 * 
 *
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 6. Event Propagation: Bubbling and Capturing
 * ----------------------------------------------
 * DOM TREE:
 * ---
       DOCUMENT
       |
       <html>
       |
       <body>
       |
       <header>
       |
       <h1>
       |
     // ? <a>
 * 
 * - the parents of the element <a> are <h1>, <header>, <body>, <html>, <document>
 * 
 * - when an event is tagged to the link element <a> and it is not generated at the target element, instead it is generated at the parent/root
 *     - from the top / parent element the capturing phase starts and travels all the way to the target element (top to bottom)
 *            - as soon as the event reaches the target element from the top (doc), the target phase starts .. where events are handled using event listeners
 * ? event listeners waits for the certain event to happen and then it runs the cb. fn. attached to it
 * 
 * - after reaching target, the event then starts traveling from target to document (top) which is 'bubbling phase'.. 
 *     - which travels through every parent element (but not through sibling element) of the target element ..
 * 
 * ? why all these things are important?
 * ---
 * - if the same event was tagged at any parent element of the target ele, then the same event will be triggered at the parent element as well ..
 * - so, we have handled exact same event at multiple elements in the DOM tree (that is 'twice') one at target and other at parent element ..
 * 
 * - by default, all the events can be handled in the target and in the bubbling phase ..
 * - not all the types of events do have capturing and bubbling phases .. 
 * 
 * NOTE: 
 * - this is event propagation and it is a default behavior of the events in the DOM tree
 * - events can be stopped from propagating using "stopPropagation()" method
 * 
 * 
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 7. Event Propagation in Practice
 * ----------------------------------
 * 
// to show a demo - creating a random number and with that number creating a random color rgb(255, 255, 255)

// generate a random number
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// generate a random color  
const randomColor = () => {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
}

// select an element for demo
<nav class="nav"> ---------------------------------------------- PARENT
<ul class="nav__links"> ---------------------------------------- PARENT
  <li class="nav__item">
    <a class="nav__link" href="#section--1">Features</a> ------- CHILD
  </li>
</ul>
</nav> 

// link-element > child
document.querySelector('.nav__link').addEventListener('click', function(e) {
       this.style.color = randomColor()    // this refers to the element that the event-handler is attached to
})
                                                                             "{I HAVE DID MISTAKE, THAT I TRIED TO APPLY this USING ARROW FN}"
// ul-element > parent                                                              "{I CORRECTED IT USING NORMAL FN EXPRESSION}"
document.querySelector('.nav__links').addEventListener('click', function(e) {
       this.style.color = randomColor()
})

// whole nav bar > parent
document.querySelector('.nav').addEventListener('click', function(e) {
       this.style.color = randomColor()
})
 * 
 * - the above code which applied random color to the elements {link, ul of links and total nav-bar} in the nav-bar when clicked on them
 * - when the same type of event that is 'click' is tagged to target and two parents of the target element, 
 *     when triggered the event .. the color changes for all the three elements (link, nav-links, nav-bar) when clicked on link-element
 * - observation: 
 *    - when an event is triggered at link-element, cause of same event the parents elements color also changes this is "event-propagation"
 * - whenever child element is clicked, it's parent element also gets clicked and the event is triggered at the parent level elements also
 * 
 * - fn(e) triggered at "link" but same appeared at all three event handlers (link, ul, nav) cause all of them handling exact same event 
 *     as "e" bubbles from link to its parents.. this is event bubbling
 * 
 * - e.target is same for all levels but e.currentTarget is different .. it changes for every level 
 * 
 * ? to stop this event propagation we use "stopPropagation()" method
 * ! event.stopPropagation()
 * ---

// link-element > child
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();    // this refers to the element that the event-handler is attached to
  e.stopPropagation()    // stops the event from bubbling up
});

// ul-element > parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
})
 *  
 * - so, after adding "e.stopPropagation()" to the link-element, the event is stopped from bubbling up to the parent elements
 * 
 * ? NOTE: 
 * - in practice, it is not a good idea to stop propagation, in complex apps with same event handlers at multiple levels we can use it to stop 
 * 
 * ? observations:
 * - event handlers are not picking up events during capture phase that is from top -> bottom
 *     - it happened only from bottom -> top which is through bubbling phase
 * - so, from above example, addEventListener() listened for events only during bubbling phase that is its default behavior
 * ? so we can listen to capture phase by passing 3rd param "true" to the "addEventListener()" method, instead of listening to bubbling phase 
 *     
 * ! NOTE:
 * ! - "CAPTURING" phase is not that important, but only BUBBLING for "event DELEGATION"
 * 
 * 
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 8. PAGE NAVIGATION
 * -----------------
document.querySelectorAll('.nav__link').forEach((el) => {
  el.addEventListener('click', function(e) {

    // to prevent the default behavior -- links to the sections 
    e.preventDefault()

    // get the ID out of the elements -- we need absolute path to the element
    const id = this.getAttribute('href') // after logging, we get #section--1, #section--2, #section--3 ...

    // scrolling to the section -- using "scrollIntoView()" method
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  })
})
 * 
 * - this is not the better solution to scroll if there are 1000s of links in the page, 
 *     - we are making 1000s of event handler function copies for each 1000 links, which could impact the performance
 * ? so we use "EVENT DELEGATION" to handle this
 * 
 * ! EVENT DELEGATION
 * ---
 * steps to implement event delegation:
 * 1. add event listener to the common parent element of all the elements that we are interested in ..
 * 2. determine what element originated the event => "e.target" property
 * 
// ? USING EVENT DELEGATION
// ---
document.querySelector('.nav__links').addEventListener('click', function(e) {       // event handling is done on the "nav__links" which is parent element

  e.preventDefault()  // to prevent the default behavior at any event handler function

  if(e.target.classList.contains('nav__link')) {        // matching strategy to check if the clicked element is the one we are interested in
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })        // scrolling to the section
  }
})
 * 
 * ---------------------------------------------------------------------------------------------------------------------------- 
 * ! 8. DOM Traversing
 * -------------------
 * - basically we can select an element based on another element (selecting relative ele to a certain other ele)
 * - traversing is moving up and down in the DOM tree .. 
 * 
 * ? remember: 
 * ? - querySelector() works on elements also but not only on document || 
 * ? - Nodes can be anything that can be texts, comments, elements anything! ||
 * ? - 
 *  
 * ! GOING DOWNWARDS: CHILD
 * ---
 * - selection of child elements can be done using ".childNodes", ".children", ".firstElementChild", ".lastElementChild" of an element
 * ---
// select an element -
const h1 = document.querySelector('h1')

// 'h1' has child nodes with class - "highlight" | if there any child nodes with class "highlight" at somewhere not under h1, then it will not be selected
console.log(h1.querySelectorAll('.highlight')) // returns a NodeList with 2 elements: NodeList(2) [span.highlight, span.highlight]

- to get the direct children we have to use ".children" property of the element
- to get all the children including texts, comments we use ".childNodes" property of the element

// to get children of 'h1' with class - "highlight"
console.log(h1.childNodes) // returns a NodeList with 5 elements: NodeList(5) [text, span.highlight, text, span.highlight, text]

// to get the live collection of direct children of 'h1' with class - "highlight"
console.log(h1.children) // returns an HTMLCollection with 3 elements: HTMLCollection(3) [span.highlight, br, span.highlight]

// 1st and last child of 'h1'
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'
 *  
 * ! GOING UPWARDS: PARENT
 * ---
 * - selection of parent elements can be done using ".parentNode", ".parentElement" of an element 
// ---
// to get direct parent of 'h1' use - parentNode similar to childNodes for children
console.log(h1.parentNode) // returns the parent element of 'h1' - section
console.log(h1.parentElement) // returns the parent element of 'h1' - section

// mostly, we have to find a parent element how far it is from the target, so we have to "closest()" method
// - closest() needs a query-string similar to querySelector() and querySelectorAll()
console.log(h1.closest('.header')) // returns the 'header' element which is the parent of 'h1'
console.log(h1.closest('h1')) // returns the 'h1' itself
 * 
 * - closest() being the opposite of querySelector() and querySelectorAll() .. both receive query-string as an argument
 *     - whereas querySelector() and querySelectorAll() finds the children no matter how deep in DOM tree
 *     - closest() finds the parent element no matter how far it is from the target element
 * 
 * ! GOING SIDEWAYS: SIBLINGS
 * ---
 * - we can only access to direct siblings .. using ".nextElementSibling" and ".previousElementSibling" properties of an element
 * ---
// to get the next sibling of 'h1' - nextElementSibling and previousElementSibling for previous sibling
console.log(h1.nextElementSibling) // returns the previous sibling of 'h1' - <h4> element
console.log(h1.previousElementSibling) // returns the next sibling of 'h1' - null cause there is no sibling
 * 
 * ! GET NODES
 * --- 
 * - use "previousSibling" and "nextSibling" to get the siblings of an element
 * 
 * ! to get all siblings of an element...
 * ---
console.log(h1.parentElement.children) // returns the HTMLCollection of all the children of 'h1' parent which is trick to get all the siblings
 * 
 * - this returns all the siblings of the element in the form of an HTMLCollection | so we can loop over it using "forEach"
 * 
 * ----------------------------------------------------------------------------------------------------------------------------
 * ! 9. Building a Tabbed Component
 * --------------------------------
 * - the whole component is with the class of "operations" as a parent .. and a container "operations__tab-container" which contains all the tabs 
 * - when a tab is clicked.. the content which was hidden gets displayed by changing the class to "active"
 
// HTML element:
// ---
// ? <div class="operations">
// ?  <div class="operations__tab-container">
    <button
// ?      class="btn operations__tab operations__tab--1 operations__tab--active"
      data-tab="1"
    >
      <span>01</span>Instant Transfers
    </button>
// ?    <button class="btn operations__tab operations__tab--2" data-tab="2">
      <span>02</span>Instant Loans
    </button>
// ?    <button class="btn operations__tab operations__tab--3" data-tab="3">
      <span>03</span>Instant Closing
    </button>
  </div>
  <div
// ?    class="operations__content operations__content--1 operations__content--active"
  >
// ?    <div class="operations__icon operations__icon--1">
    </div>
    <h5 class="operations__header">
      Transfer money to anyone, instantly! No fees, no BS.
    </h5>
  </div>
 // ? <div class="operations__content operations__content--2">
    <div class="operations__icon operations__icon--2">
    </div>
    <h5 class="operations__header">
      Buy a home or make your dreams come true, with instant loans.
    </h5>
  </div>
// ?  <div class="operations__content operations__content--3">
    <div class="operations__icon operations__icon--3">
    </div>
    <h5 class="operations__header">
      No longer need your account? No problem! Close it instantly.
    </h5>
  </div>
</div> 

 * ----------------------------------------------------------------------------------------------------------------------------
 * ! TABBED COMPONENT
 * 
 * ! DOM Traversing, Event Delegation in Practice:
 * ---
 * - the whole component is with the class of "operations" as a parent .. and a container "operations__tab-container" which contains all the tabs 
 * - when a tab is clicked.. the content which was hidden gets displayed by changing the class to "active"
 * 
// selecting the target elements
const tabs = document.querySelectorAll(".operations__tab")
const tabsContainer = document.querySelector(".operations__tab-container")
const tabsContent = document.querySelectorAll('.operations__content')

// implementing Event Delegation
tabsContainer.addEventListener('click', function(e) {
  
  // targeting the closest parent element - which is DOM traversing: Moving Upwards
  // we should not use parentElement as clicking on actual btn refers to it's parent element that is: whole container ("operations__tab-container")
  // we replaced it with closest so that it will trigger same for span and button as well
  const clicked = e.target.closest('.operations__tab')

  // guard clause - to protect clicks from returning null value
  // if clicked on between the buttons inside the container which returns a null: so it has to be checked
  if(!clicked) {
    return
  }

  // 1st remove the tabs content active class from all the tabs
  tabsContent.forEach((tc) => {
    tc.classList.remove('operations__content--active')
  })

  // in-order to make the tabs active.. 1st remove the active class from all the tabs
  tabs.forEach((t) => {
    t.classList.remove('operations__tab--active')
  })

  // to make buttons move up use.. classList.add()
  clicked.classList.add('operations__tab--active')

  // activating the content area using data attribute
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})
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