// ---------------------------------------------------------------------------------------------------------------
// Optional Chaining on methods ?.

const restaurant = {

  name: 'classic 2K1',
  location: 'ABC street, 123-45-890, India',
  starters: ["paneer fry", "mushroom-65", "chicken-65", "chicken-55"],
  main: ["Paneer pulao", "Mushroom Biryani", 'chicken Biryani', 'chicken fry piece biryani'],

  order(startIndex, mainIndex) {
    return (`Order: ${this.starters[startIndex]} and ${this.main[mainIndex]}`)
  }
}
// console.log(restaurant.order ?. (1, 0) ?? "Method does not exist") // Order: mushroom-65 and Paneer pulao
// console.log(restaurant.orderFood ?. (1, 0) ?? "Method does not exist") // Method does not exist


// ---------------------------------------------------------------------------------------------------------------
// Looping through an Object: Object Keys, Values and Entries

const openingHrs = {
  thu: { open: 7, close: 22},
  fri: { open: 5, close: 23},
  sat: { open: 5, close: 24}
}

const keys = Object.keys(openingHrs);
const values = Object.values(openingHrs);
const entries = Object.entries(openingHrs);

// console.log(keys)
// console.log(values)
// console.log(entries)

let openStr = (`we open ${keys.length} days a week: \n`)
for (const day of keys) {
  openStr = openStr + `${day} `
}

for (const {open, close} of values) {
  const val = `open: ${open}, close: ${close}`
  // console.log(val)
}

for (const [day, {open, close}] of entries) {
  // console.log(`on ${day}, the shop is open at ${open} and close at ${close}`)
}


/* -------------------------------------------------------------------------------------------------------------------
We're building a football betting app (soccer for my American friends 😅)!

# CHALLENGE - 1:
Suppose we get data from a web service about a certain game (below).
  - In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players.
  - For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
    - and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players.
  - So create a new array ('players1Final') containing all the original team1 players plus...
    - 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array)
  - and prints each of them to the console, along with the number of goals that were scored in total
    - (number of player names passed in)
7. The team with the lower odd is more likely to win.
  - Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
  - Then, call the function again with players from game.scored
*/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// -------------------------------------------------------------------------------------------------------------------
// # CHALLENGE - 1:

// 1. "destructuring" - create separate player arr for teams 'players1' and 'players2'
const [players1, players2] = game.players;

// 2. "rest pattern" - 1st player - GoalKeeper and rest are FieldPlayers
const [tOneGK, ...tOneFieldPlayers] = players1
const [tTwoGK, ...tTwoFieldPlayers] = players2

// 3. "rest pattern" - create an array 'allPlayers' and must contain all 22 players
const [...allPlayers] = [...players1, ...players2]
// or
const allPlayers1 = [...players1, ...players2]

// 4. spread op - must contain additional three substitute players with main team
const player1Final = [...tOneFieldPlayers, 'Thiago', 'Couti', 'Peris' ];

// 5. "destructuring an object" -
// const {odds: {team1, x: draw, team2}} = game;
// or
const {team1, x: draw, team2} = game.odds

// 6. function to 'printGoals'
const printGoals = function (...players) {
  console.log(`${players.length} was the score`)
}
// printGoals (...game.scored);

// ------------------------------------------------------------------------------------------------------------------
/**
# CHALLENGE - 2:

Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console,
  - along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console
  - (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw").
  - HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scores' which contains the names of the players who scored as properties,
  - and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
 * 
 */


// 1. looping through an array
const playerScores = game.scored
for (const [ind, player] of playerScores.entries()) {
  const scoreStr = `Goal ${ind+1}: ${player}`
  // console.log(scoreStr)
}

// 2. calculate avg of odds - I have used entries but values is best option..

const odds = Object.values(game.odds)
let average = 0;
let oddsArr = [];
for (const oddValue of odds) {
  // console.log(oddValue) // returns: [team- name: odd- value] // so destructure the complete array [x, y] = [1, 2]
  average = average + oddValue
  oddsArr.push(oddValue)
}
// console.log(average/oddsArr.length)

// 3. print 3 odds in a formatted way {odd of victory `team1`: `value-odd`}
for (const [team, oddValue] of Object.entries(game.odds)) {
  const str = `odd of ${team === 'x' ? '' : 'victory'} ${team === 'x' ? 'draw' : game[team]}: ${oddValue}`
  // console.log(str)
}

// Bonus - challenge.2
const scores = {};
for (const player of game.scored) {
  scores[player] ? scores[player] = scores[player] + 1 : (scores[player] = 1);
}
game.scores = scores
// console.log(game)