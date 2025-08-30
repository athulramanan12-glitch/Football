// Calculate xG for the single main form fields
function calculateXG() {
  const distance = parseFloat(document.getElementById("distance").value);
  const angle = parseFloat(document.getElementById("angle").value);
  const shotType = document.getElementById("shotType").value;
  const situation = document.getElementById("situation").value;
  const pressure = document.getElementById("pressure").value;

  const xg = calculateXGForShot(distance, angle, shotType, situation, pressure);
  document.getElementById("xg-result").textContent = xg.toFixed(2);
}

// Function to calculate xG for one shot based on parameters
function calculateXGForShot(distance, angle, shotType, situation, pressure) {
  let xg = 0.3; // base probability

  // distance effect
  if (distance > 20) xg *= 0.3;
  else if (distance > 10) xg *= 0.6;
  else xg *= 0.9;

  // angle effect
  if (angle > 60) xg *= 0.5;
  else if (angle > 30) xg *= 0.7;

  // shot type
  if (shotType === "head") xg *= 0.7;

  // situation
  if (situation === "setPiece") xg *= 0.8;
  if (situation === "counterAttack") xg *= 1.2;

  // defender pressure
  if (pressure === "high") xg *= 0.6;
  if (pressure === "medium") xg *= 0.8;

  return xg;
}

// Add another shot input block
function addShot() {
  const shotInputs = document.getElementById("shotInputs");

  const div = document.createElement("div");
  div.classList.add("shot-input");
  div.innerHTML = `
    <label>Distance to Goal (meters):</label>
    <input type="number" class="distance" placeholder="Enter distance" step="0.1" required>

    <label>Angle from Goal (degrees):</label>
    <input type="number" class="angle" placeholder="Enter angle" step="1" max="180" required>

    <label>Type of Shot:</label>
    <select class="shotType">
      <option value="foot">Foot</option>
      <option value="head">Header</option>
    </select>

    <label>Shot Situation:</label>
    <select class="situation">
      <option value="openPlay">Open Play</option>
      <option value="setPiece">Set Piece</option>
      <option value="counterAttack">Counter Attack</option>
    </select>

    <label>Defender Pressure:</label>
    <select class="pressure">
      <option value="low">Low Pressure</option>
      <option value="medium">Medium Pressure</option>
      <option value="high">High Pressure</option>
    </select>
  `;

  shotInputs.appendChild(div);
}

// Calculate total xG from all added shots
function calculateTotalXG() {
  const distances = document.querySelectorAll(".distance");
  const angles = document.querySelectorAll(".angle");
  const shotTypes = document.querySelectorAll(".shotType");
  const situations = document.querySelectorAll(".situation");
  const pressures = document.querySelectorAll(".pressure");

  let totalXG = 0;

  for (let i = 0; i < distances.length; i++) {
    const distance = parseFloat(distances[i].value);
    const angle = parseFloat(angles[i].value);
    const shotType = shotTypes[i].value;
    const situation = situations[i].value;
    const pressure = pressures[i].value;

    if (!isNaN(distance) && !isNaN(angle)) {
      totalXG += calculateXGForShot(distance, angle, shotType, situation, pressure);
    }
  }

  document.getElementById("total-xg-result").textContent = totalXG.toFixed(2);
}
