"use strict";

const colors = ["red", "blue", "green", "yellow", "white", "purple"];
const colorSvgs = Object.fromEntries(
  colors.map((color) => [
    color,
    `<svg><rect width="200" height="200" style="fill:${color}"/></svg>`,
  ])
);

const history = [];
let rolling = false;

function rollDice() {
  if (rolling) return;
  rolling = true;
  setTimeout(() => (rolling = false), 2000);

  const resultColors = Array.from(
    { length: 3 },
    () => colors[Math.floor(Math.random() * colors.length)]
  );
  const resultHTML = resultColors.map((color) => colorSvgs[color]).join("");
  document.getElementById("result").innerHTML = `You rolled: <br>${resultHTML}`;

  setTimeout(() => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${history.unshift(resultColors.join(", ")) + 1}</td>
      <td>${resultHTML}</td>
    `;
    document
      .querySelector("#history-table tbody")
      .insertBefore(
        newRow,
        document.querySelector("#history-table tbody").firstChild
      );
  }, 2000);
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
  const toggleBtn = document.querySelector("button:nth-of-type(2)");

  if (
    historyElement.style.display === "none" ||
    !historyElement.style.display
  ) {
    // show the history
    historyElement.style.display = "block";

    // create the table if it doesn't exist yet
    if (!historyTable.hasChildNodes()) {
      historyTable.innerHTML = `
        <thead>
          <tr>
            <th>Roll</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          ${history
            .map(
              (item, index) => `
            <tr>
              <td>${history.length - index}</td>
              <td>${item.html}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      `;
    }

    // append the table to the history element if it's not already there
    if (historyTable.parentElement !== historyElement) {
      historyElement.appendChild(historyTable);
    }

    // smoothly scroll to the history table
    const historyTablePosition =
      historyTable.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = historyTablePosition - startPosition;
    const duration = 1000;

    let start;

    function step(timestamp) {
      const progress = timestamp - start || 0;
      const t = progress / duration;
      window.scrollTo(0, easeInOutCubic(t, startPosition, distance, 1));
      if (progress < duration) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame((timestamp) => {
      start = timestamp; // assign the timestamp to start
      step(timestamp);
      toggleBtn.textContent = "Hide History";
    });
  } else {
    // hide the history
    historyElement.style.display = "none";
    toggleBtn.textContent = "Show History";
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}
