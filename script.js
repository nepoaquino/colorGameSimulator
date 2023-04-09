"use strict";

const colors = ["red", "blue", "green", "yellow", "#ddd", "purple"];
const colorSvgs = Object.fromEntries(
  colors.map((color) => [
    color,
    `<svg><rect width="200" height="200" style="fill:${color}"/></svg>`,
  ])
);

const history = [];

function rollDice() {
  let resultColors = [];
  for (let i = 0; i < 3; i++) {
    const roll = Math.floor(Math.random() * 6) + 1;
    resultColors.push(colors[roll - 1]);
  }
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

function shuffle(colors) {
  // Fisher-Yates shuffle algorithm
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
}

function toggleHistory() {
  const historyElement = document.getElementById("history");
  const historyTable = document.getElementById("history-table");

  if (
    historyElement.style.display === "none" ||
    historyElement.style.display === ""
  ) {
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

    // smoothly scroll to the history table
    const historyTablePosition =
      historyTable.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = historyTablePosition - startPosition;
    const duration = 1000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(
        0,
        easeInOutCubic(progress, startPosition, distance, duration)
      );
      if (progress < duration) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  } else {
    // hide the history
    historyElement.style.display = "none";
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}
