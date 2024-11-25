let fields = [null, null, null, null, null, null, null, null, null];

let currentSymbol = "cross";

function init() {
  render();
}

function render() {
  let contentDiv = document.getElementById("content");
  let tableHTML = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let value = fields[index];
      let symbol = "";

      if (value === "cross") {
        symbol = renderSVGCross();
      } else if (value === "circle") {
        symbol = renderSVGCircle();
      }

      tableHTML += `<td class="${value === "circle" ? "circle" : ""}" onclick="handleCellClick(${index}, this)" data-index="${index}">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  contentDiv.innerHTML = tableHTML;
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  render();
}

function handleCellClick(index, cell) {
  if (fields[index] === null) {
    fields[index] = currentSymbol;
    cell.innerHTML =
      currentSymbol === "cross" ? renderSVGCross() : renderSVGCircle();
    currentSymbol = currentSymbol === "cross" ? "circle" : "cross";
    cell.onclick = null;
    if (checkWin()) {
      drawWinningLine(checkWin());
    }
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return combination;
    }
  }
  return null;
}

function drawWinningLine(indices) {
  const [a, b, c] = indices;
  const contentDiv = document.getElementById("content");
  const tds = contentDiv.getElementsByTagName("td");

  const tdA = tds[a];
  const tdC = tds[c];
  const rectA = tdA.getBoundingClientRect();
  const rectC = tdC.getBoundingClientRect();
  const contentRect = contentDiv.getBoundingClientRect();

  const x1 = rectA.left - contentRect.left + rectA.width / 2;
  const y1 = rectA.top - contentRect.top + rectA.height / 2;
  const x2 = rectC.left - contentRect.left + rectC.width / 2;
  const y2 = rectC.top - contentRect.top + rectC.height / 2;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  let line = document.createElement("div");
  line.className = "winning-line";
  line.style.width = `${length}px`;
  line.style.height = "5px";
  line.style.position = "absolute";
  line.style.left = `${(x1 + x2) / 2 - length / 2}px`;
  line.style.top = `${(y1 + y2) / 2}px`;
  line.style.transform = `rotate(${angle}deg)`;

  contentDiv.appendChild(line);
}

function renderSVGCircle() {
  return `
        <svg width="70" height="70">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00BDEF" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0,200" to="188,200" dur="125ms" fill="freeze" />
            </circle>
        </svg>
    `;
}

function renderSVGCross() {
  return `
        <svg width="70" height="70">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0,100" to="70,100" dur="125ms" fill="freeze" />
            </line>
            <line x1="10" y1="60" x2="60" y2="10" stroke="#FFC000" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0,100" to="70,100" dur="125ms" fill="freeze" />
            </line>
        </svg>
    `;
}
