"use strict";

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
const history = [];

function rollDice() {
  const [color1, color2, color3] = shuffle(colors).slice(0, 3);
  const resultElement = document.getElementById("result");
  const resultHTML = [color1, color2, color3]
    .map((color) => `<span style="color: ${color}">${color.toUpperCase()}</span>`)
    .join(" ");
  resultElement.innerHTML = `You rolled: <br>${resultHTML}`;

  // add the result to the history if it doesn't already exist
  const resultText = [color1, color2, color3].join(" ");
  if (!history.some((item) => item.text === resultText)) {
    history.push({
      text: resultText,
      html: resultHTML,
    });
  }
}

function toggleHistory() {
  const historyElement = document.getElementById("history");
  const historyTable = document.getElementById("history-table") || document.createElement("table");
  historyTable.setAttribute("id", "history-table");

  if (historyElement.style.display === "none") {
    // show the history
    historyElement.style.display = "block";

    // add each unique item in the history to the table
    historyTable.innerHTML = `
      <thead>
        <tr>
          <th>Roll</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        ${history.map((item, index) => {
          if (index === 0 || item.text !== history[index - 1].text) {
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${item.html}</td>
              </tr>
            `;
          } else {
            return "";
          }
        }).join("")}
      </tbody>
    `;

    // append the table to the history element
    historyElement.appendChild(historyTable);
  } else {
    // hide the history
    historyElement.style.display = "none";
  }
}

function shuffle(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
