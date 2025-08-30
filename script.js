// Function to add another shot input field
function addShot() {
  const shotInputsContainer = document.getElementById('shotInputs');
  const newShotInput = document.createElement('div');
  newShotInput.classList.add('shot-input');

  newShotInput.innerHTML = `
    <label for="distance">Distance to Goal (meters):</label>
    <input type="number" class="distance" placeholder="Enter distance" step="0.1" required>
    
    <label for="angle">Angle from Goal (degrees):</label>
    <input type="number" class="angle" placeholder="Enter angle" step="1" max="180" required>

    <label for="shotType">Type of Shot:</label>
    <select class="shotType">
      <option value="foot">Foot</option>
      <option value="head">Header</option>
    </select>

    <label for="situation">Shot Situation:</label>
    <select class="situation">
      <option value="openPlay">Open Play</option>
      <option value="setPiece">Set Piece</option>
      <option value="counterAttack">Counter Attack</option>
    </select>

    <label for="pressure">Defender Pressure:</label>
    <select class="pressure">
      <option value="low">Low Pressure</option>
      <option value="medium">Medium Pressure</option>
      <option value="high">High Pressure</option>
    </select>
  `;

  shotInputsContainer.appendChild(newShotInput);
}

// Function to calculate xG for a single shot
// Function to calculate xG for a single shot
function calculateXGForShot(distance, angle, shotType, situation, pressure) {
  let xg = 0;

  // Adjust xG based on distance with an exponential decay formula
  const distanceFactor = Math.exp(-distance / 30);  // Exponentially decaying factor
  xg += distanceFactor;

  // Adjust based on angle
  if (angle <= 30) {
    xg += 0.3;
  } else if (angle <= 60) {
    xg += 0.2;
  } else if (angle <= 90) {
    xg += 0.1;
  } else {
    xg += 0.05;
  }

  // Shot type adjustment
  xg += (shotType === "foot") ? 0.1 : -0.1;

  // Situation adjustment
  if (situation === "openPlay") {
    xg += 0.1;
  } else if (situation === "setPiece") {
    xg += 0.05;
  } else if (situation === "counterAttack") {
    xg += 0.15;
  }

  // Defender pressure adjustment
  if (pressure === "low") {
    xg += 0.1;
  } else if (pressure === "medium") {
    xg += 0.05;
  } else if (pressure === "high") {
    xg -= 0.1;
  }

  // Ensure xG is between 0 and 1
  return Math.max(0, Math.min(1, xg));
}


// Function to calculate the total xG for all shots
function calculateTotalXG() {
  const distances = document.querySelectorAll('.distance');
  const angles = document.querySelectorAll('.angle');
  const shotTypes = document.querySelectorAll('.shotType');
  const situations = document.querySelectorAll('.situation');
  const pressures = document.querySelectorAll('.pressure');

  let totalXG = 0;

  // Loop through each shot input and calculate xG
  distances.forEach((distanceElem, index) => {
    const distance = parseFloat(distanceElem.value);
    const angle = parseFloat(angles[index].value);
    const shotType = shotTypes[index].value;
    const situation = situations[index].value;
    const pressure = pressures[index].value;

    if (isNaN(distance) || isNaN(angle)) {
      alert('Please enter valid values for all fields.');
      return;
    }

    totalXG += calculateXGForShot(distance, angle, shotType, situation, pressure);
  });

  // Display the total xG
  document.getElementById('total-xg-result').textContent = totalXG.toFixed(2);
}
