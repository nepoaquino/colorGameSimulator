"use strict";

// Constants
const colors = ["red", "blue", "green", "yellow", "white", "purple"];
const colorSvgs = Object.fromEntries(
  colors.map((color) => [
    color,
    `<svg><rect width="200" height="200" style="fill:${color}"/></svg>`,
  ])
);

// State
let selectedColors = [];
const history = [];
let rolling = false;

// Functions

// Toggle the selection of a color
function selectColor(color) {
  selectedColors.includes(color)
    ? (selectedColors = selectedColors.filter((c) => c !== color))
    : selectedColors.push(color);
}

// Handle dice roll
function rollDice() {
  if (rolling) return;
  rolling = true;
  setTimeout(() => (rolling = false), 6500);

  // Check selected colors
  if (selectedColors.length === 0 || selectedColors.length > 3) {
    alert(
      selectedColors.length === 0
        ? "Please select at least one color."
        : "You can only select up to 3 colors"
    );
    rolling = false;
    return;
  }

  // Disable color buttons
  const colorButtons = document.querySelectorAll(".color-btn");
  colorButtons.forEach((button) => (button.disabled = true));

  // Hide the svgPlaceHolder div if rolling is true
  const svgPlaceHolder = document.getElementById("svgPlaceHolder");
  svgPlaceHolder.style.display = "none";

  // Generate result colors and corresponding HTML
  const resultColors = Array.from(
    { length: 3 },
    () => colors[Math.floor(Math.random() * colors.length)]
  );
  const resultHTML = resultColors.map((color) => colorSvgs[color]).join("");
  document.getElementById("result").innerHTML = resultHTML;

  // Create an array of SVGs for the selected colors
  const guessHTML = selectedColors.map((color) => colorSvgs[color]).join("");

  // Update history after a delay
  setTimeout(() => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${history.unshift(resultColors.join(", "))}</td>
        <td>${resultHTML}</td>
        <td>${guessHTML}</td>
      `;
    const historyTableBody = document.querySelector("#history-table tbody");
    historyTableBody.insertBefore(newRow, historyTableBody.firstChild);

    // Show result popup
    const popupMessagePlaceHolder = document.getElementById(
      "popupMessagePlaceHolder"
    );

    const popup = document.getElementById("popUp");

    popupMessagePlaceHolder.textContent = resultColors.some((color) =>
      selectedColors.includes(color)
    )
      ? "YOU WON!"
      : "YOU LOSE :(";

    popup.appendChild(popupMessagePlaceHolder);

    // Reset after a delay
    setTimeout(() => {
      popupMessagePlaceHolder.textContent = "PICK A COLOR";
      colorButtons.forEach((button) => button.classList.remove("active"));

      // Re-enable color buttons
      colorButtons.forEach((button) => (button.disabled = false));
    }, 3000);

    selectedColors = [];
  }, 2000);
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Toggle history visibility
function toggleHistory() {
  const historyElement = document.getElementById("history");
  const historyTable = document.getElementById("history-table");
  const toggleBtn = document.querySelector("button:nth-of-type(2)");

  if (
    !historyElement.style.display ||
    historyElement.style.display === "none"
  ) {
    // Show the history
    historyElement.style.display = "block";

    // Append the table to the history element if it's not already there
    if (historyTable.parentElement !== historyElement) {
      historyElement.appendChild(historyTable);
    }

    // Smoothly scroll to the history table
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
    // Hide the history
    historyElement.style.display = "none";
    toggleBtn.textContent = "Show History";
  }
}

// Easing function for smooth scrolling
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// Event listeners for color buttons
const colorButtons = document.querySelectorAll(".color-btn");
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});
