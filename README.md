#COLOR GAME SIMULATOR
This is a simple dice roll game where the player rolls three dice and tries to get three of the same color. The game uses six different colors: red, blue, green, yellow, orange, and purple. 

#How to Play
To play the game, simply click on the "Roll the Dice" button. The game will randomly select three colors and display them on the screen. If all three colors match, the player wins the game. If not, the player loses and can try again by clicking the "Roll" button.

#Technical Details
In this game, we use the "Fisher-Yates shuffle algorithm" to shuffle an array of six colors before selecting the first three colors as the result of the roll. This ensures that each color has an equal chance of being selected, resulting in a fair game.

The game is built using HTML, CSS, and JavaScript. The index.html file contains the structure of the game's user interface. The style.css file contains the game's styles, such as the button and text colors. The app.js file contains the game's logic, such as the random selection of colors and the check for a winning or losing roll.

The game uses an array of colors to represent the dice, and the shuffle function from app.js randomly shuffles the colors each time the player clicks the "Roll" button. The rollThreeDice function then selects the first three colors from the shuffled array and returns them to the rollDice function, which displays them on the screen.

Installation and Setup
To play the game, simply download or clone this repository and open the index.html file in your web browser. No additional setup or installation is necessary.

Feel free to use or modify the game as you see fit.
