//! !! OBJECT ORIENTED PROGRAMMING !!
//? ---------------------------------
/**
 ** POINTS TO REMEMBER:
 * ---
 * - in a regular fn call, "THIS" keyword sets to 'undefined' (in strict mode) and to the global object (in non-strict mode)
 * - 
 * 
 */
/**
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 1. What is Object Oriented Programming?
 * ? ---------------------------------------
 * NOTE: All examples are based on traditional OOPs
 * 
 * * a paradigm that is based on the concept of objects.. (paradigm : style of the code => how we write and organize the code) .. we use objects to model (describe) real-world or abstract features 
 * 
 * * Objects contain 'data: properties' & 'code / functions: methods'; so using Objects we can pack data and behavior/fns into a block 
 * - objects are self-contained pieces / blocks of code | where objects are building blocks of applications, which interact with each other
 * 
 * * The interactions between objects are made through a public Interface -> API - Application Programming Interface | 
 *   - the code outside of these objects can access and communicate with the object and methods inside the object (methods inside this interface)
 * 
 * - this paradigm was developed to organize the code to make it flexible and maintained easily
 * 
 * - till now we have been using objects as loose collections of data and without making them to interact with each other and also we didn't generate objects programmatically
 * * but in OOPs we code to generate new Objects without simply using object literals 
 * 
 * - In traditional OPPs, we use CLASSES to generate objects {classes are type of blueprints: blueprint is a plan with set of rules} .. 
 *   - so with these classes as blueprint we can build objects with set of rules and logic inside it!
 * 
ex - class:
---
User {
    // properties
    userName
    password
    email

    // methods
    login(pwd) {.. login-logic ..}
    sendMessage(str) {.. logic ..}
}
 * - here in the above ex., everything is packed {properties and methods} it just contains description of user-details but not the real-world data of the user (username not the value)
 * - using this class a new Object is constructed .. every object that was Constructed from a class which is called "INSTANCE" of that Class and process is called "INSTANTIATION"
 * 
ex - instance: 
---
-----------------OBJECT(1)-----------------
{
    // properties
    userName = "Harsha"
    password = "13e2#f31*gh%4aa3f"
    email = "harsha@email.com"

    // methods
    login (pwd) {.. login-logic ..}
    sendMessage (str) {.. logic ..}
}
-----------------OBJECT(2)-----------------
{
    // properties
    userName = "Harsha"
    password = "13e2#f31*gh%4aa3f"
    email = "harsha@email.com"

    // methods
    login (pwd) {.. login-logic ..}
    sendMessage (str) {.. logic ..}
}
 * - Instance(s) is / are a real object(s) that was / were built from class(s) which now can be used in the code and (class is not an object)
 *   - this instance is like a real-house that will be built from a blueprint that was created .. so with the use of this same blueprint we can build as many objects as we can on our need
 * 
 * ? how do we create classes - at FIRST?
 * ---
 * There are four fundamental principles which helps us to create a good class: ABSTRACTION, ENCAPSULATION, INHERITANCE, POLYMORPHISM
 * 
 * ! 1. ABSTRACTION: 
 * ---
 * * ignoring the details that are not matter to us .. implementing an overview instead of messing with the insider details that may be unnecessary
 * ex: 
 * - in JS, we don't need to know how addEventListener works behind the scenes, we just need to know how to use it!
 * - we don't need to know how the car-engine works, we just need to know how to drive the car!
 * - a phone, we don't need to know how the phone works, we just need to know how to use it!
 * 
 * ! 2. ENCAPSULATION:
 * ---
 * * keep some methods and properties private inside a class, that means they are not accessible from outside of the class but only inside of the class
 * 
THEORETICAL example - encapsulation:
---
User {
    // properties
    userName
    PRIVATE password
    PRIVATE email

    // methods
    login(pwd) {
        this.password
    }
    sendMessage(str) {.. logic ..}

    PRIVATE method1() {.. logic ..}     // .. as these methods were used inside the obj where it were declared but not outside of those classes 
}
 * - this is an hypothetical example, as PRIVATE keyword does not exist in JS | 
    - these properties with PRIVATE can not be accessible by other code that is outside of the obj .. where it was declared 
    - however they can be accessible inside the class
 * - this prevents external environment to accidentally manipulate the internal PRIVATE properties / state
 * 
 * * In an API, all methods are not private they made public for interaction .. so API methods are not encapsulated
 * 
 * ? Why Encapsulation?
 * ---
 * - even if we change the logic inside private methods, it could not break the code. (because private methods are not used anywhere outside the class where it had been declared)
 * 
 * ! 3. INHERITANCE
 * ---
 * * making all properties and methods of a certain class available to it's child class, forming a hierarchial relationship between classes. this allows us to 'reuse common logic' and helps to model real-world relationships 
 * 
User {
    userName
    password
    email

    login(pwd) {.. login-logic ..}
    sendMessage(str) {.. logic ..}
}
--------------------------------------------- >>> ADMIN is an EXTENDED USER
Admin {
    userName
    password
    email
    permissions     // additional property

    login(pwd) {.. login-logic ..}
    sendMessage(str) {.. logic ..}
    deleteAllUsers() {.. logic ..}      // additional method
}
 * - in above example, there are similarities between User and 'Admin' classes .. as Admin has lot properties common to 'User' class has! 
 * - as User and Admin classes has similar properties .. so, Inheritance can be used here and one class inherit from other then we have one parent and child class
 * - class which "inherits" from other is child.. so a child class "extends" it's parent class .. 
 * - so child class inherits some prop & logic from parent and additionally of it's own props & logic .. 
 * 
 * ! 4. POLYMORPHISM
 * --- 
 * - "MANY SHAPES"
 * * a child class can "overwrite" a method it inherited from a parent class 
ex: 

                                        <CHILD>
                                        Author {
                                            // properties
                                            userName
                                            private password
                                            private email

                                            // methods
                                            ** login(pwd) {.. more-diff-login-logic ..}
                                            sendMessage(str) {.. logic ..}
                                        }
                                    /
                                INHERITANCE
                                / 
                <PARENT>
                User {
                    // properties
                    userName
                    private password
                    private email

                    // methods
                    ** login(pwd) {.. login-logic ..}
                    sendMessage(str) {.. logic ..}
                }
            /
        INHERITANCE
        /
<CHILD>
Admin {
    // properties
    userName
    private password
    private email

    // methods
    ** login(pwd, key) {.. diff-login-logic ..}         // extra params needed (key)
    sendMessage(str) {.. logic ..}
}                        
 * 
 * - if we focussed on LOGIN method, there are differences in logic used for LOGIN method as ADMIN-user requires more secure one (which has 2-factor authentication)
 * - as they (author & admin) inherits same LOGIN method from User (main) class .. so, how logic would change? 
 * ? HOW
 * ---
 * - in each inherited classes just write a new method .. which is also called 'LOGIN' - so, own 'LOGIN' method overwrites the one which was inherited from User class. 
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ? NOTE: 
 * - OOPs are implemented differently using JS
 * 
 * ! 2. OOPs in JS
 * ---------------
 * ? CLASSICAL OOPS: "CLASSES"
 * ---
 * 1. class is a blueprint, these classes are used to create objects which are called 'instances' | the process of creating instances is called "INSTANTIATION"
 * 2. In classical OOP, Behavior (methods) are copied from the classes to all it's instances
 * 
 * 
 *  ---------------------------
 * ? OOP with JS: "PROTOTYPES"
 * --
 *          PROTOTYPE
 *              |
 *              ^   PROTOTYPAL INHERITANCE | Arrow Pointing Upwards: Indication of Delegation
 *              |
 *            Object
 * --
 * 1. all objects linked to a prototype obj; so that each obj has a prototype | 
 *   - prototype objects contains methods and properties so that all the objects linked to that prototype can get access and use them |
 *   - this behavior is called "PROTOTYPAL INHERITANCE"
 * 
 * ? PROTOTYPAL INHERITANCE:
 * - all the objects linked to a certain prototype object can use the methods and props that are defined on that prototype
 *   - objects inherit methods and props from a prototype, so this is why it is called "prototypal inheritance"
 * ? NOTE: prototypal inheritance (which is an instance inheriting from a class) is different from class - inheritance (which is one class inheriting another class) 
 * 
 * 2. Objects "delegate" behavior (methods) to the linked prototype object (behavior: term used to indicate methods)
 * - technically, objects delegate their behavior to the prototype
 * 
 * NOTE:
 * - we have seen this type of prototypal inheritance behavior before so many times while implementing Arrays
 * - each time we are able to use .map on arrays cause of this inheritance (actually it is called "Array.prototype.map()")
 * - Array.prototype is the prototype object of all arrays that we create in JS .. this object contains all the methods that we can use on arrays!
 * - each time an array created .. inturn it is linked to prototype and therefore, it has access to all those methods 
 * - each time a new array created inherits the methods from "Array.prototype" | so 'map' has not defined from the num array but on the "Array.prototype"
 * 
 * ! Question: How to implement OOPS in JS programmatically?
 * ---
 * - there are three diff ways / techniques of doing this:
 * 
 * * 1. Constructor Functions
 * ---
 * - creating objects from functions,
 * - with this built-in objects were implemented in JS (Arrays, Maps, Sets, etc)
 * 
 * * 2. ES6 Classes
 * ---
 * - Modern way of doing OOP in JS, "SYNTACTIC SUGAR" over constructor fns, a layer of abstraction over constructor fns
 * - simpler way to do OOPs in JS, BTS ES6 classes actually implemented with constructor fns. so these also use prototypal inheritance
 * 
 * * 3. Object.create()
 * ---
 * - easiest way to link an object to a prototype object
 * - however, Object.create() is not used as much as the other two ways
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 3. Constructor Functions and the New Operator
 * -----------------------------------------------
 * - we can use constructor functions to create objects using a fn. so the diff between normal and constructor fn is that we call a constructor fn with "new" operator
 * 
 * - rules:
 * 1. constructor fn naming shall be started with a capital 
 * 2. do not use arrow fns. to create constructor fns .. cause these do not have access to 'this' keyword (their own 'this' keyword) => only fn expressions and declarations
 * 3. constructor fns must be called with "new" keyword
 * 4. the props on the Obj must be created with exact variable name passed as parameter | (may be or may not be the same param name)
 * 
const Person = function (name, birthYear) {...}
new Person ("Harsha", 2001)
 * 
 * ? "new" operator and working of "new" behind the scene:
 * - we call a constructor function with "new fnName (param1, param2)" 
 * 
 * BTS
 * ---
 * 1. new empty object is created "new {}"
 * 2. function is called, and 'this' keyword is set to newly created object => 'this' = {} => 'this' points to new Object that was created
 * 3. this created object is linked to a 'prototype' => {} linked to a prototype 
 * 4. NO NEED of 'RETURN' statement inside the constructor fn. 'new' keyword take care of that and Object which was created is returned 'AUTOMATICALLY'
 * 
const Person = function (name, birthYear) {
    console.log(this)                               // logging this to the console .. returns: "Person {}"
}
    here, as described before 'this' pointed to the object - Person {} 
--------------------------------------------------------------------------------------------------------------
 * ex
const Person = function (name, birthYear) {
    this.name = name
    this.birthYear = birthYear                          // defined props with same name matching to the parameters declared (as per convention)

    // NO NEED OF RETURN STATEMENT
}
const harsha = new Person ("Harsha", 2001)          // 'new' takes care of returning the object
console.log(harsha)                                 // returns: Person {name: 'Harsha', birthYear: 2001}
 * 
 * - "this.name" creates a property on the object that was returning from the "Person" constructor fn. (same with "this.birthYear")
 * 
 * Note: 
 * - Now, with this constructor function as blueprint we can create as many objects as we need {const vardhan = new Person('Vardhan', "2001")}
 * 
 * ! technically, the object created from a 'class' are called as an "instance" .. but here we did not create 'CLASSES' to instantiate an object
 * ! as JS does not have classes before 'ES6' .. we used constructor fns. to create objects here .. so initially JS has 'constructor fns' to simulate 'classes'
 * 
 * ? so we can say that 'harsha' is an instance of 'Person' => `const harsha = new Person ("Harsha", 2001)`
 * - to check an object is an instanceof a cons. fn. or not? we have an operator to check this! 
 *   => clg(harsha instanceof Person) => returns: a boolean {true / false}
 * - 'this.name' and 'this.birthYear' are the "instance properties"
 * 
---
 * ! CREATING METHODS
---------------------
const Person = function (name, birthYear) {

    // instance properties
    this.name = name
    this.birthYear = birthYear

    // methods
    this.calcAge = function () {
        console.log(new Date().getFullYear() - this.birthYear)  // But this is not a GOOD PRACTICE: to create a method directly inside a cons. fn.
    }
}
const harsha = new Person ("Harsha", 2001)
console.log(harsha)
 *                          ! this is a bad practice: to create direct method inside a cons.fn. cause if we created 100 or 1000s of objects 
 *                              * all these objects would carry out this function .. every time we create a new object would get this method => if we 100 objects.. we have 100 copies of same fns
 *                                  * so, we use prototype and prototypal inheritance to avoid this practice!
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 4. Prototypes
 * ---------------
 * Intro:
 * - Each and every fn. in JS has already a property called "Prototype".. so, each object created from a cons.fn. has access to all methods and props (that we define on constructor's prototype property)
 *   - all the objects that are created with cons. fn. will inherit, and gets access to all the methods and props that are defined on this proto prop
 * 
 * ! Adding method to Prototype Property:                                               # IMPLEMENTING BASIC PROTOTYPAL INHERITANCE
 * ---
 * using previous example:
 
const Person = function (name, birthYear) {
    this.name = name
    this.birthYear = birthYear  
}

// setting a methods to prototype property as "Person.prototype.methodName = function () {...}"
// as "Person.prototype" is an Object .. so we can add methods to this object .. using (dot) notation
---
Person.prototype.calcAge = function(){
    return (new Date().getFullYear() - this.birthYear);
}

// calling methods
---
const harsha = new Person ("Harsha", 2001)
console.log(harsha.calcAge())
 * 
        clg(harsha) => returns: Person {name: 'Harsha', birthYear: 2001} // no calcAge method is visible here
                                        ⬇️
 * - after logging the object "harsha" to the console, we can see that there is no method called "calcAge" on the object .. but we can still call this method on the object
 * - this is because the object "harsha" has access to the method that was defined on the prototype property of the constructor function .. this is "PROTOTYPAL INHERITANCE"
 * 
 * NOTE:
 * ---
 * - we solved the problem of 'N' copies of methods .. when we instantiate 'N' objects from a cons. fn. (when we add calcAge() directly into the constructor fn., without using "cons.fn.prototype = method")
 * 
 * ! HOW AND WHY THIS ACTUALLY WORKS?
 * ---
 * - any object always has access to methods and props from it's prototype.. and here prototype of object: 'harsha' is Person prototype
 * 
 * - confirmation: each object has a special prop called "__proto__" .. (which points to the prototype of the object)
 *  ex: console.log(harsha.__proto__) => returns: {calcAge: ƒ, constructor: ƒ} .. this is the prototype of the object 'harsha'
 * 
 * - this above example explains us that prototype of harsha object is the prototype property of the constructor fn.: Person
 *  ex: console.log(harsha.__proto__ === Person.prototype) => returns: true
 * 
 * ! CONFUSION:
 * ! SHOULDN'T PERSON.PROTOTYPE BE THE PROTOTYPE OF PERSON (in Person.prototype => the prototype here, is not the prototype of the constructor fn.: Person)
 * ? no, it is not the prototype of Person!!! but it is the prototype of all the objects that are created with the Person constructor fn.
 * ? CONFIRMED-1: harsha.__proto__ === Person.prototype => {returns: true}
 * ? CONFIRMED-2: clg (Person.prototype.isPrototypeOf(Person)) => {returns: false} (here, isPrototypeOf() used to check if the prototype of the object is the prototype of the constructor fn. or not)
 * 
 * ! Where does the "__proto__" come from for a Object: harsha?
 * ---
 * - as per 3rd point of bts of "new", this created object is linked to a 'prototype' => {} linked to a prototype 
 *   - it is stated that: 'new' operator create "__proto__" prop for any instance created from a cons. fn. and sets the value to the prototype property of that constructor fn.: Person
 * 
 * ! Setting a Property on Prototype (Not Only a Method):
 * ---
 * - we can set a property on prototype as well .. so that all the objects that are created from the constructor fn. will inherit this property

const Person = function (name, birthYear) {
    // instance properties
    this.name = name
    this.birthYear = birthYear
}

// setting a method on prototype
Person.prototype.calcAge = function() {
    return(new Date(). getFullYear() - this.birthYear)
}

// setting a property on prototype
Person.prototype.species = 'Homo Sapiens'

// creating objects
const harsha = new Person ("Harsha", 2001)

// logging the object: "harsha"
console.log(harsha)

Result:
---
Person {name: 'Harsha', birthYear: 2001}
    birthYear: 2001
    name: "Harsha"
    [[Prototype]]: Object
        > calcAge: ƒ ()
        > species: "Homo Sapiens"
        > constructor: ƒ (name, birthYear)
        > [[Prototype]]: Object
 * 
 * - from now on whatever the object that will be created from the cons.fn. will inherit the prototype properties and methods
 *   - visible under __proto__ object of the object that will be created 
 * 
 * * to check own properties of an object created from a constructor function
 * - use ".hasOwnProperty()"
ex: 
console.log(harsha.hasOwnProperty('name'))  // returns: true
console.log(harsha.hasOwnProperty('species'))   // returns: false 
 * 
 * - species property is not inside of the object 'harsha', it has access to it on "__proto__" because of it's prototype
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 5. Prototypal Inheritance and Prototype Chain
 * -----------------------------------------------
 * 
 * Explanation:
 * ---
 * 1. till now we defined a Constructor Function: 'Person' 
 * 2. we set a method: calcAge() on the prototype of the constructor fn.: Person => which is 'Person.prototype' (which is an Object)
 * 
 * - so, this Person.prototype also refers back to the 'Person' constructor fn. itself (which points back to person itself)

        Person = fn(name, year) {
            this.name = name
            this.year = year
        }
                            \\ .prototype ⬇️ POINTS-DOWN
                             \\
                              \\ .constructor ⬆️ POINTS-UP

                                Person.prototype.calcAge = function() {
                                    return(new Date(). getFullYear() - this.birthYear)
                                }
 * - This 'prototype' is not for the 'Person', but for all the objects that are created from the 'Person' constructor fn.
 * 
 * - Using 'new' operator we create an object: 
 *  1. first, an empty object will be created .. 
 *  2. "this" refers to the empty object (inside the fn. call) .. inside execution context 'this' is the new empty object ("this === {}")
 *      - that is why we set the properties on 'this' (this.name = name, this.birthYear = birthYear)
 *  3. new object is linked to the constructor fn.'s prototype property (so, Person.prototype is now the new object's prototype => which is denoted with __proto__)
 *  
 * NOTE:
 *   - this whole process just works with 'Constructor Functions' and 'ES6 Classes' but not with 'Object.create()' syntax
 *  
 * * every time we call 'ObjectName'.someMethod() (ObjectName: "harsha" that is created from a class / cons.fn.), JS looks for that fn. on the Object if it is not defined inside the Object, then it looks for it into it's prototype / __proto__
 * * getting access of methods and props from a prototype is called "PROTOTYPAL INHERITANCE / DELEGATION" (... simply an object inherited / delegated a behavior / method to it's prototype ...)
 * 
 * ! Prototype Chain:
 * ---
 * ? The ability of looking up for methods and props from a prototype is called "PROTOTYPE CHAIN"
 * 
 * - in JS, all objects have a prototype: so, Person.prototype itself a prototype and it is an object too.. so it must also have a prototype
 *   - the prototype of 'Person.prototype' is "Object.prototype" 
 *   - (which happens BTS, where Person.prototype is created with 'Object' constructor so, it has Object.prototype as it's prototype)
 * 
 * - so, Objects: 'harsha' which was created from Person constructor fn. and has Person.prototype as it's prototype..
 *   - similarly, Person.prototype is created with Object Constructor fn. and has Object.prototype as it's prototype
 * 
 * * so, this entire series of links between 'prototypes' is called "PROTOTYPE CHAIN" (where Object.prototype is the top of this chain)
 *   - where __proto__ of Object.prototype points to "null" as it is the end of the chain !!!
 * 
 * PROTOTYPE CHAIN == SCOPE CHAIN 
 *   => in proto chain, JS looks for the props and methods whereas in scope chain JS looks for the variables/scopes
 * 
ex for a method lookup in a proto chain: 
---
harsha.hasOwnProperty('name')

 * ? Searching For hasOwnProperty() a Built-in Method:
 * ---
- JS, tries to find "hasOwnProperty()" method on the Object: 'harsha' itself (but JS cannot find this method on the Object created) if it cannot find it there ..
    - so it looks for "hasOwnProperty()" on it's __proto__ that is: "Person.prototype" if it cannot find there .. 
        - then it searches inside the __proto__ of Person.prototype and definitely finds there which is the top level of the chain that is: "Object.prototype" 

        Check Using: 
        console.log(harsha.__proto__) // Person.prototype
        console.log(harsha.__proto__.__proto__) // Object.prototype
        console.log(harsha.__proto__.__proto__.__proto__) // returns: null (so, Object.prototype is on top)

- !!! From any level the methods can not be copied they simply gets inherited !!!
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 5. Prototypal Inheritance on Built-In Objects
 * -----------------------------------------------
 * - Prototypal Inheritance on Built-In Objects: such as Arrays 
 * 
const arr = [3, 4, 3, 6, 7, 5, 6, 7, 9]
console.log(arr.__proto__) // this returns all the methods that can be used on an array // inherited from prototype of Array constructor function
 * 
 * - this arr.__proto__ returns a bunch of methods (but any array created does not have all these methods but every array inherit them from it's prototype)
 * 
 * ? From Where Does Every Array Inherit These Methods?
 * ---
 * * every array created in code inherit methods like: (map, reduce, filter, concat, etc.,) from a common constructor fn. that is Array constructor fn. (which is common for every array)
 * 
clg(arr.__proto__ === Array.__proto__)  // returns: true => which means every array inherits methods from prototype of Array constructor fn. 
 * 
 * ! Addition of New Method to the Prototypes of an Array Constructor
 * ---
 * - we can add a new method to the prototype of an Array constructor and every array that was created in the code gets access to it by inheritance
 * 
// adding a method to the prototype of Array constructor
Array.prototype.unique = function () {
    return [...new Set(this)]
}

console.log(arr.unique()) // returns: (6) [3, 4, 6, 7, 5, 9]
 * 
 * ! from above code, we extended prototype of a built-in object: Array => however this is not a good idea
 * 
 * - so, DOM elements are also objects and they have '__proto__' on them

// select an element, h1
const h1 = dom.querySelector('h1')
console.dir(h1)
 * - with this we can see different levels of prototypes of elements on DOM tree
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 6. Coding Challenge #1
 * ------------------------
 * 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
 * 
// create a constructor fn. on the name of Car
const Car = function(make, speed) {
    this.make = make
    this.speed = speed
}

// create a prototype: accelerate on constructor fn.
Car.prototype.accelerate = function(){
    this.speed = this.speed + 10
    return this.speed
}

Car.prototype.brake = function() {
    this.speed = this.speed - 5
    return this.speed
}

// Instantiate two objects
const bmw = new Car('BMW', 120)
const mercedes = new Car('Mercedes', 95)

console.log(bmw)
console.log(mercedes)

console.log(bmw.accelerate())
console.log(bmw.brake())
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 7. ES6 Classes
 * ----------------
 * 
 * - the modern way of implementing OOPs in JS | whereas syntax is different => there are two ways of implementing this... "Class Declaration" and "Class Expression"
 * - as classes are similar to functions that's why we have two types of syntaxes: declaration and expression
 * 
 * Class Expression:
 * ---
const Person = class{...}
 * 
 * Class Declaration:
 * ---
class PersonCl{
    constructor(firstName, birthYear) {     // add a constructor method in the Class: "PersonCl" | this takes 
        this.firstName = firstName
        this.birthYear = birthYear
    } 
}
 * - add a method: constructor(param1, param2) | this works as a fn. and arguments passed to it will be taken as properties while creating instance from the class
 * - when we create a new instance, constructor inside the class will be called and returns a new object with property values passed as arguments
 * 
 * ! Including Methods Inside a Class (Outside Constructor Fn. of That Class):
 * ---
class PersonCl{
    constructor(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }

    // Fn. declared here... are to be added on to the ".prototype" property of "PersonCl"
    calcAge() {
        return (new Date().getFullYear() - this.birthYear)
    }
}
 * - the fns. that were declared inside a class and outside constructor fn. are taken into the prototypes of the objects (objects that will be created as instances from a class)
 * - by this way the methods are created on the prototypes of the instances created from a class 
ex: check out: 
---
console.log(vardhan.__proto__ === PersonCl.prototype)   // returns: true
 * 
 * - no need to use "PersonCl.prototype.methodName = function() {...}" to add methods to the prototype of the class we can simply declare them inside the class .. 
 *   - we can also follow this as well: "PersonCl.prototype.methodName = function() {...}"
 * 
 * ! Important Things to Know About Classes:
 * ---
 * 1. classes are NOT hoisted! 
 * 2. just like functions, classes are also 1st- class citizens (which means that we can pass these classes into a fn. and return them from fns => cause classes are fs. BTS)
 * 3. class body (all the code inside the class) executed each time in "STRICT mode"
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 8. Setters and Getters
 * ------------------------
 * ? 1. Getters and Setters in Objects:
 * ---
 * - every object in JS, can have setters and getter properties.. we call these special properties as "ACCESSOR PROPERTIES" (while other normal properties are "DATA" properties)
 * - these are basically functions that get and set a value, but outside of the object .. they are used as properties
 * 
 * ! we transform a method into a property using "get" and "set" keywords
 * 
const account = {
    owner: 'Harsha',
    movements: [200, 300, 400, 500, 300],

    // ACCESSOR PROPERTIES
    get latest() {
        return this.movements.slice(-1).pop()       // normal method with 'get' at the beginning
    },

    set latest(mov) {
        this.movements.push(mov)        // normal method with 'set' at the beginning
    }
}
console.log(account.latest) // returns: 300
account.latest = 50         // setters can not be called as methods like this: "latest(50)"
 * 
 * rules:
 * ---
 * - these can be called on an object with simply as a property name (without any parenthesis)
 * - any setter method must have a parameter at least
 * 
 * ? Getter and Setters in Classes:
 * ---
class PersonCl{
    constructor(fullName, birthYear) {
        this.fullName = fullName
        this.birthYear = birthYear
    }

    calcAge() {
        return (new Date().getFullYear() - this.birthYear)
    }

    // getter
    get age() {
        return (new Date().getFullYear() - this.birthYear)
    }

    // setters
    set fullName(name) {
        // console.log(name)
        if(name.includes(' ')){
            this._fullName = name
        }
        else {
            alert(`${name} is not a full name!`)
        }
    }
    get fullName() {
        return this._fullName
    }
}
const vardhan = new PersonCl('harsha vardhan', 2001)
vardhan._fullName = 'Harsha Vardhan'
console.log(vardhan)
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 9. Static Methods
 * -------------------
 * - static methods are attached to the constructor function itself, not to the prototype 
 * ---
 * Array.from() 
 * ---
 * => Array is the constructor function and from() is the static method
 * ex:
 * - Array.from(document.querySelectorAll('h1')) => returns: an array of all the 'h1' elements
 * - However, we can not use from like this: [1, 3, 5].from() .. even [1, 3, 5] is an array 
 * 
 * * So, here from() is attached to the entire 'Array Constructor' but not on the prototype of the Array Constructor, therefore all normal arrays do not inherit this method
 * 
 * ? Static Methods in Constructor Functions:
 * ---
const Person = function (name, birthYear) {

    // instance properties
    this.name = name
    this.birthYear = birthYear
}

// adding a static method on to a cons. fn.
Person.greet = function() {
    console.log('Hey there! 👋')
}

// calling the static method from a cons. fn...
Person.greet() // returns: Hey there! 👋

// creating an instance and calling the static method on the instance... 
const harsha = new Person ("Harsha", 2001)
!!! harsha.greet() // returns an error: harsha.greet is not a function !!!
 * 
 * ? Static Methods on Classes:
 * ---
class PersonCl{
    constructor(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }

    // instance methods
    calcAge() {
        return (new Date().getFullYear() - this.birthYear)
    }

    // static method
    static greet() {
        console.log('Hey there! 👋')
    }
}

// calling the static method on the class itself
PersonCl.greet() // returns: Hey there! 👋

// creating an instance and calling the static method on the instance...
const vardhan = new PersonCl('Harsha Vardhan', 2001)
!!! vardhan.greet() // returns an error: vardhan.greet is not a function !!!
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 10. Object.create()
 * ---------------------
 * - we can use Object.create() to manually set a prototype of an object to any other object that we want!
 * 
 * steps:
 * 1. create a prototype object that would be the prototype for all the objects (we manually set prototype using: Object.create())
 * 2. create a new object using that prototype object (using Object.create())
 * 3. add properties to the new object (if needed!)
 * 
const PersonProto = {
    calcAge(){
        return (new Date().getFullYear() - this.birthYear)
    },
}

const steve = Object.create(PersonProto)
steve.fullName = 'Steve Jobs'
steve.birthYear = 1955

console.log(steve)

// without hardcoding the fullName and birthYear props... create a method which create an object with these props
PersonProto.init = function(fullName, birthYear){
    this.fullName = fullName
    this.birthYear = birthYear
}

const stark = Object.create(PersonProto)
stark.init('Tony Stark', 1970)

console.log(stark)

// check the prototype of object created: "steve" and PersonProto are equal or not?
console.log(steve.__proto__ === PersonProto) // returns: true
 * 
 * Summary:
 * ---
 * Automatic: 
 * - with the constructor fn. new operator is used which automatically sets the prototype of the instances to the constructor's prototype property
 * 
 * Manual: 
 * - we can set the prototype of an object manually using Object.create() method to any Object that we want
 * 
 * ? the prototype chains work exactly similar here, but the difference is that we don't need 'constructors' and 'classes'
 * ? we need Object.create() to implement inheritance between classes !!!
 * 
 * Conclusion:
 * ---
 * - Object.create(): creates a new object and the prototype of the object will be the object that we passed as an argument to the Object.create()
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 11. Coding Challenge #2
 * -------------------------
 * 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
 * ? -------------------------------------------------------
class CarCl{
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    // methods
    accelerate() {
        this.speed = this.speed + 10
        return this.speed
    }
    brake() {
        this.speed = this.speed - 5
        return this.speed
    }

    // getter
    get speedUS() {
        return this.speed / 1.6
    }

    // setter
    set speedUs(speed) {
        this.speed = speed * 1.6 
    }
}
// create an instance
const ford = new CarCl('Ford', 120)

// using getters
console.log(ford.speedUS) // returns: 75

// using setters
ford.speedUs = 50
console.log(ford) // returns: CarCl {make: "Ford", speed: 80}
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 12. Inheritance Between "Classes": Constructor Functions
 * ----------------------------------------------------------
 * Intro: 
 * - Here, we implement a real inheritance between classes using cons.fn. (but real classes do not exist in JS)
 *   - So, we create a STUDENT class that inherits from the PERSON class .. where STUDENT is also a PERSON but a SPECIFIC one
 * 
 * - Here, with class inheritance.. the prototype of the Student fn is same as the prototype of the Person fn.
 *   - so that all instances of Student Class can get access to the methods and props of Person's Class Prototype .. through the prototype chain
 * 
 * - So, we need to do the Person.prototype to be the prototype of Student.prototype.. to link these 2 prototype objects we use Object.create()
 *   - ex: Student.prototype = Object.create(Person.prototype)
 * 
 * - here, we didn't use "Student.prototype = Person.prototype" cause it does not create a prototype chain
 *   - here we want Person prototype to be inherited by Student but should not be the exact same object and that is why we needed "Object.create()"
 * 
// ! Create 'Person' Class
// ---
const Person = function(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
}
Person.prototype.calcAge = function() { 
    return (new Date().getFullYear() - this.birthYear)
}

// ! Creating a 'Student' Class (CHILD)
// ---
const Student = function(firstName, birthYear, course) {    // additional properties, as remaining properties are inherited from Person constructor (class)

    // this.firstName = firstName
    // this.birthYear = birthYear       
// ? this type of code violates "DRY principle" as the same props got repeated in both PERSON and STUDENT constructors

    // Person(firstName, birthYear)     
// ? Instead, we call Person() but it would be a normal fn. call and "THIS" keyword sets to undefined (in strict mode)
// ? does not work => returns: Uncaught TypeError: Cannot set property 'firstName' of undefined

// ? Instead, we have to manually set 'THIS' keyword to the 'PERSON' class: 
// ? we use call() on Person fn. call and set THIS keyword manually inside the Person fn. 
    // ! Person.call(this, firstName, birthYear)     
// ? manually set THIS keyword by using call() method which sets THIS keyword to the object that is calling the function
    this.course = course
}

// - Linking Prototypes
// Student.prototype = Object.create(Person.prototype)

// - creating a new method on to the prototype of Student class
Student.prototype.introduce = function() {
    return(`Hi! My name is ${this.firstName} and I got enrolled into ${this.course}`)
}

// - creating an instance using Student class
const mike = new Student('Mike', 2001, 'Mechanical Engineering')
console.log(mike.introduce())

// - JS looks for calcAge() on Student's Object: Mike's Prototype .. if JS don't find there it looks in higher levels that is it can reach up from Student's prototype to Person's prototype.. this is how exactly prototype chain works in JS
// console.log(mike.calcAge())

// - I did not understand this!
Student.prototype.constructor = Student
console.dir(Student.prototype.constructor)
 * 
 * 
 * ! Connection of Two Classes! Rules to be Followed:
 * ---
 * ? 1. There must be a 'PARENT' class, and create a CHILD class which must contain some properties that must be inherited from the PARENT later!
 * ?    - while inheriting from parent.. use ".call()" to attach this on to the class 
 * ? 2. The prototypes of CHILDREN and PARENT must be connected through "Object.create({..Type: Object..})" 
 * ?    - .create() takes an Object type which CAN be a prototype
 * 
 * ? 3. THE STEP I DID NOT UNDERSTAND !!! THIS HAS TO BE FOLLOWED !!!
Student.prototype.constructor = Student
console.dir(Student.prototype.constructor)
 * 
 * ! REMEMBER: 
 * !!! POLYMORPHISM ALERT !!!
 * ! when there are same methods on PARENT & CHILD levels then the 1st appeared method will be taken for execution.. (the other will be overwritten) 
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 13. Coding Challenge #3
 * -------------------------
 * 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
 * 
// --- Car Class --- PARENT
// create a constructor fn. on the name of Car
const Car1 = function(make, speed) {
    this.make = make
    this.speed = speed
}

// create a prototype: accelerate on constructor fn.
Car1.prototype.accelerate = function(){
    this.speed = this.speed + 10
    return this.speed
}

Car1.prototype.brake = function() {
    this.speed = this.speed - 5
    return this.speed
}

// --- EV Class --- CHILD
const EV = function(make, speed, charge) {
    Car1.call(this, make, speed)
    this.charge = charge
}

// connecting the prototypes ... use: Object.create()
EV.prototype = Object.create(Car1.prototype)

// creating new method: 'chargeBattery' on to the CHILD(EV) Class
EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo
} 

// !!! POLYMORPHISM !!! 'accelerate' method: car's speed +20, charge -1%. 
EV.prototype.accelerate = function() {
    this.speed = this.speed + 20
    this.charge = this.charge - 1
    console.log(`${this.make} EV is going at ${this.speed} with a charge of ${this.charge}`)
}

console.dir(EV)

// creating an instance from EV..
const tesla = new EV('Tesla', 120, 23)
console.log(tesla)

// test: methods
tesla.chargeBattery(90)
tesla.accelerate()
 * 
 * ! REMEMBER: 
 * !!! POLYMORPHISM ALERT !!! -> (at accelerate method)
 * ! when there are same methods on PARENT & CHILD levels then the 1st appeared method will be taken for execution.. (the other will be overwritten) 
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 14. Inheritance Between Classes: Using 'ES6 Classes'
 * ------------------------------------------------------
 * 
 * - to inherit from Person class using ES6 classes we need 2 keywords: EXTENDS, SUPER
 * 1. Extends UseCase: 
 *   - class StudentCl extends PersonCl {...} 
 * 2. Super UseCase: 
 *   - super() fn: is a replacement for .call(this, param1, param2) where param1, param2 .. must be same as the properties of PARENT class
 *   - this is a constructor fn. for PARENT inside CHILD class which is for declaring properties inside CHILD that were to be inherited from PARENT!
 * 
 * ! Rules:
 * ---
 * 1. super() must happen at 1st inside the constructor() of a 'PARENT' class
 *   - after that super() fn call we have to declare other properties and methods
 * 
class PersonCl{
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance Methods
    calcAge() {
        return new Date().getFullYear() - this.birthYear
    }

    greet() {
        return `Hi, my name is ${this.fullName}`
    }

    get age() {
        return new Date().getFullYear() - this.birthYear
    }

    set fullName(name) {
        if (name.includes(' ')){
            this._fullName = name
        }
        else{
            alert(`${name} is not a full-name`)
        }
    }

    get fullName(){
        return this._fullName
    }

    // static methods
    static hey() {
        return `Hey there! 👋`
    }
}

// Demonstration: If we do not need extra properties, we do not need constructor function at all inside CHILD
// ---
class StudentCl extends PersonCl {}         // this creates a new Student Class: StudentCl which is an extended version of Parent class: PersonCl

const eren = new StudentCl('Eren Yeager', 2001)
console.log(eren)                                           // * returns: StudentCl {_fullName: 'Eren Yeager', birthYear: 2001}

// when extra properties are needed on a CHILD class
// ---
class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course) {
        super(fullName, birthYear)                                              // ! Always to happened 1st !
        this.course = course                                                    // Extra Properties
    }

    // defining methods
    introduce() {
        console.log(`Hi! My name is ${this.fullName} and I enrolled into ${this.course} course`)
    }

    //! OVERRIDE alert: calcAge() is already defined inside Parent of StudentCl and that will be OverRode

}
const eren = new StudentCl('Eren Yeager', 2001, 'Genocide')
console.log(eren)                                           // * returns: StudentCl {_fullName: 'Eren Yeager', birthYear: 2001}
 * 
 * 
 * ! if there are same methods inside both Parent and Child classes .. then the method which appears 1st in the prototype chain is executed 1st when called! => this is the process of OVERRIDING the method coming from parent class 
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 15. Inheritance Between Classes: using 'Object.create()'
 * ---------------------------------------------------------
 * 
// ? Initializing an Object that mocks as a prototype for it's CHILD Classes and also for instances / objects created from that respective prototype
const PersonProto = {
    calcAge() {
        console.log(new Date().getFullYear() - this.birthYear)
    }, 

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

// ? 1st Level: creating a Child class: 'StudentProto' from Parent class: 'PersonProto' => relationship between Parent and Child classes
const StudentProto = Object.create(PersonProto)

// ? if we want more properties.. create a method inside StudentProto which is 'init()'
StudentProto.init = function(firstName, birthYear, course) {

// * INHERITANCE of Properties / Methods from PersonProto object and setting 'this' keyword manually on to the 'PersonProto' class
    PersonProto.init.call(this, firstName, birthYear)
    this.course = course
}

// ? initializing new method on to StudentProto which will be inherited by objects that will be created from æStudentProto'
StudentProto.introduce = function () {
    console.log(`Hi! My name is ${this.firstName} and I enrolled into ${this.course} course`)
}

// ? 2nd Level: creating instances: objects "mark" a student from ChildClass: StudentProto
const mark = Object.create(StudentProto)

// ? assigning properties
mark.init('Mark Zuckerberg', 2001, 'Computer Science')

console.log(mark)
 *
 * ! at 1st Level: with Object.create() we just built a relationship between ParentClass: PersonProto and ChildClass: StudentProto
 * ! at 2nd Level: again we have to use Object.create() which creates Instances / Objects from ChildClass: StudentProto 
 * 
 * ! COMMENTS:
 * - by using Object.create(), we have no worries of Constructors Functions and ES6 Classes
 * - this pattern is lot better than trying to mock classes that look like adopted from other languages like: Java, C++ etc., (basically faking classes)
 * - using this we are linking classes together which serve as the prototype of each other classes and instances
 * 
 * ! NOTE: Mostly we have been using ES6 classes now-a-days .. so from now on we will be using ES6 classes !!!
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 15. Another Example using ES6 Classes
 * ---------------------------------------
 * ? here we have used an example that we used earlier that is BANKIST application!
 * 
 * - so, basically in this we are creating a new Class 'Account' with properties: owner(Owner of the Account), currency, pin, movements(deposits and withdrawals), etc.,
 * - with movements we have to include an array inside of the class and which contains both deposits(+) and withdrawals(-)
 *   - we can pass 'movements' as an array inside the constructor fn like shown as following:
 * 
 * 
 * 
// way-1
--------
constructor(param1, param2, param3, movements) {
    this.param1 = param1
    ... (for other parameters)
    this.movements = movements      //? this can be passed as an argument while creating an instance with 'new' operator
}
// way-2                        => //! without passing a new array every time a "new Account" created.. we just assign an empty array by default
--------
constructor(param1, param2, param3) {
    this.param1 = param1
    ...
    this.movements = []
    this.locale = navigator.language

}
 * 
 * 1. to deposit: 
 *   - we have to push a positive value that is: ".push(value)" which pushes onto the movements array
 * 2. to represent withdrawals: 
 *   - we have to push a negative value that is: ".push(-value)" into the movements array
 * 
 * ex: Instance.movements.push(100)     //! here movements array is directly used for interactions which is not a good practice!
 *! - Instead of interacting with properties directly we have to use methods .. deposit(val) and withdraw(val) .. which looks more realistic and operational
 * 
 * - these methods: deposit(val) and withdraw(val) 
 *   - the interface to our object a "public interface" acts like an 'API'
 * 
 * !------------------
 * !ABSTRACTION ALERT!
 * ---
 * - here in below snippet, 'withdraw' method abstracts / shadows the functionality of pushing a negative value into an array
 * - simply, user can use 'withdraw(100)': but BTS the code will push '-100' into the movements array (which avoids the usage of code: ".push(-100)")
--- 
//! API: Public Interface of an Object
deposit(val) {
    this.movements.push(val)
}
withdraw(val){
    this.deposit(-val)                  //! calling a method inside another using 'this' keyword
} 
 * 
 * - even after all of these any user can interact directly with movements array and can push any value into it which is not a good practice
 * - and can interact with the 'pin' outside the account set by the user (which is private data! and shall not be accessed outside of the class)
 * 
 *
 *! even with the functionality: requestLoan()
---
approveLoan(val) {
    return true;                //! Skipping the approval process
}
requestLoan(val) {
    if(this.approveLoan(val)) {
        this.deposit(val)
        console.log(`Loan approved: ${val}`)
    }
}
 * in public interface, we only need requestLoan() method and not approveLoan() method .. as approveLoan() must be PRIVATE and accessed through internally
 * that is .. harshaAcc.requestLoan(1000) ✅
 * but not .. harshaAcc.approveLoan(1000) ❌ 
 * 
 * - in real world, this shall not be allowed outside the class
 *
 * ! TO AVOID THIS WE NEED TO USE 'ENCAPSULATION' and 'DATA PRIVACY'!!! 
 *  - which is the next topic to be discussed
 * 
 * CODE SNIPPET:
 * ---
// - create an 'Account' Class
class Account{
    constructor(owner, currency, pin) {
        this.owner = owner
        this.currency = currency
        this.pin = pin
        this.movements = []                                     //! resembles default property without depending upon input/args when every time a new Account is created 
        this.locale = navigator.language                        //! resembles default property
    }

    // creating deposit and withdraw methods
    //! API: Public Interface of an Object
    deposit(val) {
        this.movements.push(val)
    }
    withdraw(val){
        this.deposit(-val)                  //! calling a method inside another using 'this' keyword
    } 
}

// - create an instance
const harshaAcc = new Account('Harsha', '$', 1111)              //! returns: Account {owner: 'Harsha', currency: '$', pin: 1111, movements: Array(0), locale: 'en-IN'}

console.log(harshaAcc)
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 16. Encapsulation: Private Class Fields and Methods
 * -----------------------------------------------------
 * ? Encapsulation:
 * ---
 * - this is to keep some props and methods private inside the class and making sure those are not accessible from outside the class
 * - this is required so that outside code will not able to manipulate the data inside a class
 * 
 * - in other languages other than JS where OOPs are used we call properties in JS as "FIELDS" in other languages, so JS has also introduced "Private Class Fields" ib ES2022
 * - with these private class fields we can implement encapsulation in JS! (in this way, we are forcing class based pattern into JS this turns prototype based language to class based lang to look like Java or C++)
 * 
 * - upto now we have these below types in classes of JS:
 * 1. PUBLIC fields
 * 2. PRIVATE fields
 * 3. PUBLIC methods
 * 4. PRIVATE methods
 * 5. STATIC version of all the above
 * 
 * - 1st: what is a field? => field is like a property that is on all class instances .. 
 *   - we can declare everything as a field that want to be present on all instances but not on the prototypes .. these will not be inherited by the instances
 * 
 * ! To create these FIELDS
 * ---
 * 1. PUBLIC fields:
 * ---
 * - those fields that must be on every instance of the class but not on the prototype .. (bank = 'ABC Bank' => this has to a common on every instance!)
 *  ? - declaration: placed outside a constructor() of a class 
 * 
 * 2. PRIVATE fields: 
 * ---
 * - those must not be manipulated from outside of the class and not be accessed outside of a class where it was declared ..
 *   - ex: movements.. that has to be manipulated through another method (either deposit or withdraw or some other) but not direct manipulation
 *   - should not be acc1.movements = [] (this is not a good practice)
 *  ? - declaration: starts with a '#' symbol also outside the constructor() of that class
 * 
 * - after declaring private fields, those cannot be accessed from outside but can be within the class
 * 
 * ! Note:
 * - till now every field that was declared outside constructor() of a class is not dependent on the parameters of the constructor
 * - if a field is dependent on the parameters of the constructor then it has to be declared outside the constructor() of that class with '#fieldName1' ..
 *  -  assigned with a value inside constructor based on the parameters passed to the constructor
 *   - same like variable declared with 'let'  
 * 
 * 3. PUBLIC methods:
 * ---
 * - these are the methods that are accessible from outside of the class and can be called from outside of the class like a public interface (API)
 * 
 * 4. PRIVATE methods:
 * ---
 * - declared same as public methods but with '#' symbol at the beginning of the method name
 * - so we change the method 'approveLoan()' - which has to be a private method and cannot be accessed by the end-user
 * ex: #approveLoan(val) {...} => so, we cannot execute this method from outside of the class => harshaAcc.#approveLoan(1000) ❌
 * 
 * 5. STATIC versions of all the above:
 * ---
 * - these implementation has been skipped, as these are accessed with the classes itself but not with the instances 
 *  - (as these static methods are not attached to prototype hence these are not inherited!)
 * - similar to every filed and method declaration, but with static keyword at the beginning
 * 
code:
-
class Account{

    //! PUBLIC fields
    locale = navigator.language;
    bank = 'ABC Bank';              // this is same as - creating: this.bank = 'ABC Bank' in constructor

    //! PRIVATE fields
    #movements = [];       
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner
        this.currency = currency

        //! pin dependent on the parameter declared in the constructor
        this.#pin = pin
    }

    //! PUBLIC METHODS
    getMovements() {
        return [...this.#movements]
    }  
    deposit(val) {
        this.#movements.push(val)
    }
    withdraw(val){
        this.deposit(-val)
    }

    //! PRIVATE METHODS
    #approveLoan(val) {
        return true;            //! Skipping the approval process (logic)
    }
    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val)
            console.log(`Loan approved: ${val}`)
        }
    }

    //! STATIC METHODS: PUBLIC
    static test() {
        console.log('Test')
    }
                                    //? these static methods can be accessed on the class not on the instance
    //! STATIC METHODS: PRIVATE
    static #test() {
        console.log('Test')
    }
}

const harshaAcc = new Account('Harsha', '$', 1111)

harshaAcc.deposit(250)
harshaAcc.withdraw(140)
harshaAcc.deposit(300)

harshaAcc.getMovements().push(250)
console.log(harshaAcc)
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 17. Chaining Methods
 * ----------------------
 * - if we want to chain methods like this: acc1.deposit(100).deposit(200).withdraw(50).requestLoan(1000)
 *  - this is possible by returning 'this' keyword in every method that we want to chain
 * 
 * - so, in every method we have to return 'this' keyword to make the chaining possible .. this will enable chaining of methods
 * 
 * 
deposit(val) {
    this.#movements.push(val)
    return this
}
withdraw(val){
    this.deposit(-val)
    return this
}
requestLoan(val) {
    if(this.#approveLoan(val)) {
        this.deposit(val)
        console.log(`Loan approved: ${val}`)
    }
    return this
}

// - so, we can chain the methods like this:
harshaAcc.deposit(100).deposit(200).withdraw(50).requestLoan(1000)
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 18. ES6 Classes Summary
 * -------------------------
 * 
PARENT CLASS:
---
class Person{
    constructor(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
}

CHILD CLASS:
---
// ! KEYWORDS Used:
- 'class': is used to define a class 
- 'extends': is used to inherit a child class from a parent class .. this also takes care of prototype chaining automatically
- 'static': to make any field or method static and available on the class itself but not on the instances
- 'super': is used to make a call to 'parent' class constructor inside the 'child' class constructor .. this has to be called before 'this' keyword is used inside the constructor
- 'get': is used to define a getter method .. we can get a value out of an object by simply writing a methods instead of writing a method
- 'set': we can define a prop by setting a value to it (instead of calling a method) .. if we have a setter for a prop that is already defined then we define a new prop by prefixing it with '_'


//! CONSTRUCTOR method: constructor(){...} => this is a method that is called with 'new' operator.. when a new object is created from a class

//! Diff between Instance Properties and Public fields / properties:
- we set these instance props based on the input data of the constructor method (unique for each object) => ex: "startYear"
- but 'public fields' are same for all the objects created from the class => ex: "university"

//! STATIC methods:
- static methods can only access other static methods and fields but not the instance methods or instance fields

//? child class: 'STUDENT' is "extending" from parent: 'PERSON' class and it sets a "prototype chain" automatically!
class Student extends Person{
    
//? PUBLIC fields => available on every created instance / object of the class but not on the prototype
    university = 'IIT';

//? PRIVATE fields: 'NOT' accessible from outside of the class
    #studyHours = 2;
    #course;

//? Static field (PUBLIC): available on the class itself but not on the instances/objects
    static numSubjects = 12;

//! Constructor Method Starts..
//? constructor method: to set properties of the class
    constructor(firstName, birthYear, startYear, course) {
        super(firstName, birthYear)

//? Instance Property: 'this' keyword is used to set properties on the class
        this.startYear = startYear
        this.#course = course //? Redefining Private Field and assigning a value to it from constructor method
    }
//! Constructor Method Ends..

//? Private Method: 
    #makeCoffee() {
        console.log('Here is the coffee you asked for!')
    }
    study(h) {
        this.#makeCoffee()                                  //? referencing a private method inside a public method
        this.#studyHours = this.#studyHours + h             //? referencing a private field inside a public method
    }

//? Getters and Setters: to get and set the values of the properties of the class 
    get testScore() {
        return this._testScore
    }
    set testScore(score) {
        this._testScore = score
    }

//? Static Method: available on the class itself but not on the instances/objects
    static printCurriculum() {
        console.log(`There are ${this.numSubjects} subjects in the curriculum`)     //? .numSubjects is a static field
    }
}

//! 'new' operator: to create an INSTANCE / OBJECT from a class
const harsha = new Student('Harsha', 2001, 2018, 'Computer Science')
 * 
 * 
 * Summary:
 * --
 * - ES6 classes are a huge improvement over the old constructor functions
 * - Classes are 'Syntactic Sugar' over constructor functions
 * - Classes are NOT hoisted .. and are 1st-class citizens and a Class body is always executed in 'strict mode'
 * 
 * 
 * ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * ! 19. Coding Challenge #4
 * -------------------------
 * 
 * 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, 
    and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
 * 
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    // methods
    accelerate() {
        this.speed = this.speed + 10
        return this.speed
    }
    brake() {
        this.speed = this.speed - 5
        console.log(`${this.make} is going at ${this.speed}`)
        return this
    }

    // getter
    get speedUS() {
        return this.speed / 1.6
    }

    // setter
    set speedUs(speed) {
        this.speed = speed * 1.6
    }
}

class EVCl extends CarCl{
    #charge;
    constructor(make, speed, charge){
        super(make, speed)
        this.#charge = charge
    }

    chargeBattery (chargeTo) {
        this.#charge = chargeTo
        return this
    } 

    accelerate() {
        this.speed = this.speed + 20
        this.#charge = this.#charge - 1
        console.log(`${this.make} EV is going at ${this.speed} with a charge of ${this.#charge}`)
        return this
    }
}
const ferrari = new EVCl('Ferrari', 120, 23)
console.log(ferrari)

ferrari.accelerate().accelerate().accelerate().brake().chargeBattery(50).accelerate()
 * 
 * 
 * 
*/