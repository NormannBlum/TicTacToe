let fields = [null, "circle", null, null, "cross", null, null, "circle", null];

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

      tableHTML += `<td class="${
        value === "circle" ? "circle" : ""
      }">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  contentDiv.innerHTML = tableHTML;
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
