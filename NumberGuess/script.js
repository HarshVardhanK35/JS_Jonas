let randNum = parseInt(Math.random() * 20 + 1)
let score = 20;
let highScore = 0;

console.log(randNum) // we can also use Math.trunc() & generates a random number b/w 0 & 20

displayMessage = (message) => {
  document.querySelector('.message').textContent = message
}

displayScore = (score) => {
  document.querySelector('.score').textContent = score
}

displaySecretNumber = (number) => {
  document.querySelector('.number').textContent = number
}

document.querySelector('.check').addEventListener('click', () => {
  const guessedVal = +document.querySelector('.guess').value

  if(!guessedVal) {
    displayMessage("No Number Was Entered!")
    return;
  }

  else if (guessedVal === randNum) {
    displayMessage("Guessed Correct Number!")
    displaySecretNumber(randNum)
    document.querySelector('body').style.backgroundColor = "#60b347"

    if (score > highScore) {
      highScore = score
      document.querySelector('.highscore').textContent = highScore
    }
  }

  else if (guessedVal !== randNum) {
    if (score > 1) {
      displayMessage(guessedVal > randNum ? "Guessed Too High!" : "Guessed Too Low!")
      score--
      displayScore(score)
    }
    else {
      displayMessage("You lost the game!")
      displayScore(0)
    }
  }
})

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  randNum = parseInt(Math.random() * 20 + 1)
  console.log(randNum)

  displayMessage("Start Guessing...")
  displayScore(score)
  displaySecretNumber('?')
  document.querySelector('.guess').value = ''
  document.querySelector('body').style.backgroundColor = '#222';
})