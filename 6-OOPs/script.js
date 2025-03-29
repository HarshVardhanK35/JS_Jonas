// const Person = function(name, birthYear) {

    // instance properties
    // this.name = name
    // this.birthYear = birthYear

    // methods
    //     this.calcAge = function() {
    //         console.log(new Date().getFullYear() - this.birthYear) // Methods are not used to set like this!
    //     }
// }

// console.log(Person.prototype)

// Person.prototype.calcAge = function() {
//     return (new Date().getFullYear() - this.birthYear)
// }

// adding a static method on to a cons. fn.
// Person.greet = function() {
//     console.log('Hey there! 👋')
// }

// Person.prototype.species = 'Homo Sapiens'

// calling static method on cons. fn.: 'Person'
// Person.greet()

// creating objects
// const harsha = new Person("Harsha", 2001)

// calling a static method on instance: 'harsha'
// console.log(harsha.greet())

// calling methods
// console.log(harsha.calcAge())

// console logging the instance
// console.log(harsha.hasOwnProperty('name'))
// console.log(harsha.hasOwnProperty('species'))


// const arr = [3, 4, 3, 6, 7, 5, 6, 7, 9]
    // console.log(arr.__proto__) // this returns all the methods that can be used on an array // inherited from prototype of Array constructor function

// adding a method to the prototype of Array constructor
// Array.prototype.unique = function() {
//         return [...new Set(this)]
//     }
    // console.log(arr.unique()) // returns: (6) [3, 4, 6, 7, 5, 9]

// ! -----------------------------------------------------------------------------
// Coding Challenge #1
// -------------------
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// const Car = function(make, speed) {
//     this.make = make
//     this.speed = speed
// }

// Car.prototype.accelerate = function() {
//     this.speed = this.speed + 10
//     return this.speed
// }

// Car.prototype.brake = function() {
//     this.speed = this.speed - 5
//     return this.speed
// }

// const bmw = new Car('BMW', 120)
// const mercedes = new Car('Mercedes', 95)

// console.log(bmw) 
// console.log(mercedes)

// console.log(bmw.accelerate())
// console.log(bmw.brake())

// class PersonCl {
//     constructor(firstName, birthYear) {
//         this.firstName = firstName
//         this.birthYear = birthYear
//     }

//     calcAge() {
//         return (new Date().getFullYear() - this.birthYear)
//     }

//     static greet() {        // static method
//         console.log('Hey there! 👋')
//     }
// }
// console.log(PersonCl)
// PersonCl.greet()

// const vardhan = new PersonCl('harsha vardhan', 2001)


// console.log(vardhan.__proto__ === PersonCl.prototype)

// Getters and Setters in Objects
// const account = {
//         owner: 'Harsha',
//         movements: [200, 300, 400, 500, 300],

//         get latest() {
//             return this.movements.slice(-1).pop()
//         },
//     }
// console.log(account.latest)

// const PersonProto = {
//         calcAge() {
//             return (new Date().getFullYear() - this.birthYear)
//         },

        // init(fullName, birthYear){
        //     this.fullName = fullName
        //     this.birthYear = birthYear
        // }
    // }
    // const steve = Object.create(PersonProto)

// steve.fullName = 'Steve Jobs'
// steve.birthYear = 1955

// console.log(steve)

// PersonProto.init = function(fullName, birthYear) {
//     this.fullName = fullName
//     this.birthYear = birthYear
// }
// const stark = Object.create(PersonProto)

// stark.init('Tony Stark', 1970)
// console.log(stark)

// console.log(steve.__proto__)

// ! -----------------------------------------------------------------------------
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class CarCl {
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }

//     // methods
//     accelerate() {
//         this.speed = this.speed + 10
//         return this.speed
//     }
//     brake() {
//         this.speed = this.speed - 5
//         return this.speed
//     }

//     // getter
//     get speedUS() {
//         return this.speed / 1.6
//     }

//     // setter
//     set speedUs(speed) {
//         this.speed = speed * 1.6
//     }
// }
// create an instance
// const ford = new CarCl('Ford', 120)

// using getters
// console.log(ford.speedUS) // returns: 75

// using setters
// ford.speedUs = 50
// console.log(ford) // returns: CarCl {make: "Ford", speed: 80}

// Class Inheritance
// ---
// Create 'Person'
// const Person = function(firstName, birthYear) {
//     this.firstName = firstName
//     this.birthYear = birthYear
// }
// Person.prototype.calcAge = function() { 
//     return (new Date().getFullYear() - this.birthYear)
// }

// Create 'Student'
// const Student = function(firstName, birthYear, course) {    // additional properties, as remaining properties are inherited from Person constructor (class)

    // this.firstName = firstName
    // this.birthYear = birthYear       // - this type of code violates "DRY principle" as the same props got repeated in both PERSON and STUDENT constructors

    // - Instead, we call Person() but it would be a normal fn. call and "THIS" keyword sets to undefined (in strict mode)
    // Person(firstName, birthYear)     // - does not work => returns: Uncaught TypeError: Cannot set property 'firstName' of undefined

    // - Instead, we manually set THIS keyword to the PERSON function: 
    // - we use call() on Person fn. call and set THIS keyword manually inside the Person fn. 
    // Person.call(this, firstName, birthYear)     
    // this.course = course
// }

// - Linking Prototypes
// Student.prototype = Object.create(Person.prototype)

// Student.prototype.introduce = function() {
//     return(`Hi! My name is ${this.firstName} and I got enrolled into ${this.course}`)
// }

// const mike = new Student('Mike', 2001, 'Mechanical Engineering')
// console.log(mike.introduce())

// JS looks for calcAge() on Student's Object: Mike's Prototype .. if JS don't find there it looks in higher levels that is it can reach up from Student's prototype to Person's prototype.. this is how exactly prototype chain works in JS
// console.log(mike.calcAge())

// Student.prototype.constructor = Student
// console.dir(Student.prototype.constructor)


// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. 
//      - Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. 
//      - Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). 
//      - Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

// --- Car Class --- PARENT
// // create a constructor fn. on the name of Car
// const Car1 = function(make, speed) {
//     this.make = make
//     this.speed = speed
// }

// // create a prototype: accelerate on constructor fn.
// Car1.prototype.accelerate = function(){
//     this.speed = this.speed + 10
//     return this.speed
// }

// Car1.prototype.brake = function() {
//     this.speed = this.speed - 5
//     return this.speed
// }

// // --- EV Class --- CHILD
// const EV = function(make, speed, charge) {
//     Car1.call(this, make, speed)
//     this.charge = charge
// }

// // connecting the prototypes ... Object.create()
// EV.prototype = Object.create(Car1.prototype)

// // creating new method: 'chargeBattery' on to the CHILD(EV) Class
// EV.prototype.chargeBattery = function(chargeTo) {
//     this.charge = chargeTo
// } 

// // 'accelerate' method: car's speed +20, charge -1%. 
// EV.prototype.accelerate = function() {
//     this.speed = this.speed + 20
//     this.charge = this.charge - 1
//     console.log(`${this.make} EV is going at ${this.speed} with a charge of ${this.charge}`)
// }

// console.dir(EV)

// const tesla = new EV('Tesla', 120, 23)
// console.log(tesla)
// tesla.chargeBattery(90)
// tesla.accelerate()


// ! Class-Inheritance: ES6 Classes
// ---
// class PersonCl{
//     constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     // Instance Methods
//     calcAge() {
//         return new Date().getFullYear() - this.birthYear
//     }

//     greet() {
//         return `Hi, my name is ${this.fullName}`
//     }

//     get age() {
//         return new Date().getFullYear() - this.birthYear
//     }

//     set fullName(name) {
//         if (name.includes(' ')){
//             this._fullName = name
//         }
//         else{
//             alert(`${name} is not a full-name`)
//         }
//     }

//     get fullName(){
//         return this._fullName
//     }

//     // static methods
//     static hey() {
//         return `Hey there! 👋`
//     }
// }

// class StudentCl extends PersonCl{
//     constructor(fullName, birthYear, course) {
//         super(fullName, birthYear)                                              // ! Always to happened 1st !
//         this.course = course                                                    // Extra Properties
//     }

//     // methods
//     introduce() {
//         console.log(`Hi! My name is ${this.fullName} and I enrolled into ${this.course} course`)
//     }

//     // OVERRIDE ALERT:
//     calcAge() {
//         return `I am ${new Date().getFullYear() - this.birthYear} years old`
//     }
// }

// const eren = new StudentCl('Eren Yeager', 2001, 'Genocide')
// console.log(eren)                                           // * returns: StudentCl {_fullName: 'Eren Yeager', birthYear: 2001}

// eren.introduce()
// console.log(eren.calcAge())

// ! Class-Inheritance: using Object.create()
// ---

// Initializing an Object that mocks as a prototype for children and also for instances created from that respective object
// const PersonProto = {
//     calcAge() {
//         console.log(new Date().getFullYear() - this.birthYear)
//     }, 

//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }
// }

// creating a Child class: 'StudentProto' from Parent class: 'PersonProto'
// const StudentProto = Object.create(PersonProto)

// if we want more properties.. create a method inside StudentProto which is 'init()'
// StudentProto.init = function(firstName, birthYear, course) {

    // INHERITANCE: Properties / Methods from PersonProto and setting this keyword manually on to the 'PersonProto' class
//     PersonProto.init.call(this, firstName, birthYear)
//     this.course = course
// }

// StudentProto.introduce = function () {
//     console.log(`Hi! My name is ${this.firstName} and I enrolled into ${this.course} course`)
// }

// const mark = Object.create(StudentProto)
// mark.init('Mark Zuckerberg', 2001, 'Computer Science')

// console.log(mark)
// mark.introduce()


// ! another class example
// ---
// class Account{

//     locale = navigator.language;            //! public field
//     bank = 'ABC Bank';              // this is same as - creating: this.bank = 'ABC Bank' in constructor

//     #movements = [];        //! private field
//     #pin;

//     constructor(owner, currency, pin) {
//         this.owner = owner
//         this.currency = currency
//         this.#pin = pin
//     }

//     getMovements() {
//         return [...this.#movements]
//     }  
//     deposit(val) {
//         this.#movements.push(val)
//         return this
//     }
//     withdraw(val){
//         this.deposit(-val)
//         return this
//     }

//     #approveLoan(val) {
//         return true;            //! Skipping the approval process (logic)
//     }
//     requestLoan(val) {
//         if(this.#approveLoan(val)) {
//             this.deposit(val)
//             console.log(`Loan approved: ${val}`)
//         }
//         return this
//     }
// }

// const harshaAcc = new Account('Harsha', '$', 1111)

// harshaAcc.deposit(250)
// harshaAcc.withdraw(140)
// harshaAcc.deposit(300)

// harshaAcc.getMovements().push(250)
// console.log(harshaAcc)


// class Person{
//     constructor(firstName, birthYear) {
//         this.firstName = firstName
//         this.birthYear = birthYear
//     }
// }

// class Student extends Person{
//     university = 'IIT';
//     #studyHours = 0;
//     #course;
//     static numSubjects = 12;

//     constructor(firstName, birthYear, startYear, course) {
//         super(firstName, birthYear)
//         this.startYear = startYear
//         this.#course = course
//     }

//     introduce() {
//         console.log(`Hi! I am ${this.firstName} and I enrolled into ${this.#course} at ${this.university}`)
//     }

//     #makeCoffee() {
//         console.log('Here is the coffee you asked for!')
//     }
//     study(h) {
//         this.#makeCoffee()
//         this.#studyHours = this.#studyHours + h
//         return this.#studyHours
//     }

//     get testScore() {
//         return this._testScore
//     }
//     set testScore(score) {
//         this._testScore = score
//     }

//     static printCurriculum() {
//         console.log(`There are ${this.startYear} subjects in the curriculum`)
//     }
// }

// Student.printCurriculum()

// const harsha = new Student('Harsha', 2001, 2020, 'Mechanical Engineering');
// harsha.introduce()
// console.log(harsha.study(5))


// Coding Challenge #4
// ---
// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, 
//      and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

// DATA CAR 1: 'Ferrari' going at 120 km/h, with a charge of 23%

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