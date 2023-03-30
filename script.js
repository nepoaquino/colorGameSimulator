const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

function rollDice() {
  const diceRolls = rollThreeDice();
  const resultEl = document.getElementById("result");
  resultEl.innerHTML =
    "You rolled: <br>" +
    diceRolls
      .join(" ")
      .replace(
        /(red|blue|green|yellow|orange|purple)/g,
        '<span style="color: $1">$1</span>'
      );
}

function rollThreeDice() {
  const shuffledColors = shuffle(colors);
  const diceRolls = [];
  for (let i = 0; i < 3; i++) {
    diceRolls.push(shuffledColors[i]);
  }
  return diceRolls;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
