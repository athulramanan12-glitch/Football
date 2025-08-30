// --- core model for one shot ---
function calculateXGForShot(distance, angle, shotType, situation, pressure) {
  // numbers
  distance = Number(distance);
  angle = Number(angle);

  if (!isFinite(distance) || !isFinite(angle)) return 0;

  let xg = 0;

  // distance (exponential decay)
  const distanceFactor = Math.exp(-distance / 30);
  xg += distanceFactor;

  // angle contribution
  if (angle <= 30) xg += 0.3;
  else if (angle <= 60) xg += 0.2;
  else if (angle <= 90) xg += 0.1;
  else xg += 0.05;

  // shot type
  xg += (shotType === "foot") ? 0.1 : -0.1;

  // situation
  if (situation === "openPlay") xg += 0.1;
  else if (situation === "setPiece") xg += 0.05;
  else if (situation === "counterAttack") xg += 0.15;

  // pressure
  if (pressure === "low") xg += 0.1;
  else if (pressure === "medium") xg += 0.05;
  else if (pressure === "high") xg -= 0.1;

  // clamp 0..1
  return Math.max(0, Math.min(1, xg));
}

// --- helpers ---
function createShotInputBlock() {
  const div = document.createElement("div");
  div.className = "shot-input";
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
  return div;
}

// --- expose functions for your inline onclick handlers ---
window.calculateXG = function () {
  const distance = document.getElementById("distance")?.value;
  const angle = document.getElementById("angle")?.value;
  const shotType = document.getElementById("shotType")?.value;
  const situation = document.getElementById("situation")?.value;
  const pressure = document.getElementById("pressure")?.value;

  const xg = calculateXGForShot(distance, angle, shotType, situation, pressure);
  const out = document.getElementById("xg-result");
  if (out) out.textContent = xg.toFixed(2);
};

window.addShot = function () {
  const wrap = document.getElementById("shotInputs");
  if (wrap) wrap.appendChild(createShotInputBlock());
};

window.calculateTotalXG = function () {
  const distances = document.querySelectorAll("#shotInputs .distance");
  const angles = document.querySelectorAll("#shotInputs .angle");
  const shotTypes = document.querySelectorAll("#shotInputs .shotType");
  const situations = document.querySelectorAll("#shotInputs .situation");
  const pressures = document.querySelectorAll("#shotInputs .pressure");

  let total = 0;
  const n = Math.min(
    distances.length, angles.length,
    shotTypes.length, situations.length, pressures.length
  );

  for (let i = 0; i < n; i++) {
    const d = distances[i].value;
    const a = angles[i].value;
    const st = shotTypes[i].value;
    const si = situations[i].value;
    const pr = pressures[i].value;

    if (d !== "" && a !== "") {
      total += calculateXGForShot(d, a, st, si, pr);
    }
  }

  const out = document.getElementById("total-xg-result");
  if (out) out.textContent = total.toFixed(2);
};
