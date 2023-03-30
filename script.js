   // Maps numbers to colors using an object
   const colorMap = {
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow",
    5: "orange",
    6: "purple",
  };

  function mapToColor(num) {
    return colorMap[num];
  }

  function rollDice() {
    const diceRolls = rollThreeDice();
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = "You rolled: <br>" +
      diceRolls
        .join(" ")
        .replace(
          /(red|blue|green|yellow|orange|purple)/g,
          '<span style="color: $1">$1</span>'
        );
  }

  function rollThreeDice() {
    const diceRolls = [];
    for (let i = 0; i < 3; i++) {
      diceRolls.push(mapToColor(Math.floor(Math.random() * 6) + 1));
    }
    return diceRolls;
  }
