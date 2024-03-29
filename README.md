https://nepoaquino.github.io/colorGameSimulator/
# COLOR GAME SIMULATOR

# How to Play
To play the game, simply click on the "Roll the Dice" button. The game will randomly select three colors and display them on the screen. If all three colors match, the player wins the game. If not, the player loses and can try again by clicking the "Roll" button.

# Technical Details
In this game, we use the Fisher-Yates shuffle algorithm to shuffle an array of six colors before selecting the first three colors as the result of the roll. This ensures that each color has an equal chance of being selected, resulting in a fair game.

The game is built using HTML, CSS, and JavaScript. The `index.html` file contains the structure of the game's user interface. The `style.css` file contains the game's styles, such as the button and text colors. The `script.js` file contains the game's logic, such as the random selection of colors and the check for a winning or losing roll.

The game uses an array of colors to represent the dice, and the `shuffle` function from `script.js` randomly shuffles the colors each time the player clicks the "Roll" button. The `rollThreeDice` function then selects the first three colors from the shuffled array and returns them to the `rollDice` function, which displays them on the screen.

Installation and Setup
To play the game, simply download or clone this repository and open the `index.html` file in your web browser. No additional setup or installation is necessary.

# License
This project is licensed under the MIT License.

# Acknowledgements
The Fisher-Yates shuffle algorithm used in this project was developed by Ronald Fisher and Frank Yates in 1938.
