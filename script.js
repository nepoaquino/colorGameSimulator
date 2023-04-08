"use strict";

const colors = ["red", "blue", "green", "yellow", "#ddd", "purple"];

const colorSvgs = Object.fromEntries(
  colors.map((color) => [
    color,
    `<svg><rect width="100" height="100" style="fill:${color}"/></svg>`,
  ])
);

const history = [];

function rollDice() {
  const shuffledColors = shuffle(colors);
  const [color1, color2, color3] = shuffledColors.slice(0, 3);
  const resultColors = [color1, color2, color3];

  const resultElement = document.getElementById("result");
  const resultHTML = resultColors.map((color) => colorSvgs[color]).join("");
  resultElement.innerHTML = `You rolled: <br>${resultHTML}`;

  // add the result to the history
  const resultText = resultColors.join(" ");
  history.unshift({
    text: resultText,
    html: resultHTML,
  });

  // update the history table
  const historyTable = document.getElementById("history-table");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${history.length}</td>
    <td>${resultHTML}</td>
  `;
  const tbody = historyTable.querySelector("tbody");
  tbody.insertBefore(newRow, tbody.firstChild);
}

function toggleHistory() {
  const historyElement = document.getElementById("history");
  const historyTable = document.getElementById("history-table");

  if (historyElement.style.display === "none") {
    // show the history
    historyElement.style.display = "block";

    // add each item in the history to the table
    historyTable.innerHTML = `
      <thead>
        <tr>
          <th>Roll</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        ${history
          .map((item, index) => {
            return `
          <tr>
            <td>${history.length - index}</td>
            <td>${item.html}</td>
          </tr>
        `;
          })
          .join("")}
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
