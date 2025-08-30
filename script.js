function calculateXG() {
  // Get input values
  const distance = parseFloat(document.getElementById('distance').value);
  const angle = parseFloat(document.getElementById('angle').value);
  const shotType = document.getElementById('shotType').value;
  const situation = document.getElementById('situation').value;
  const pressure = document.getElementById('pressure').value;

  // Validate inputs
  if (isNaN(distance) || isNaN(angle)) {
    document.getElementById('xg-result').innerText = "Please enter valid values for distance and angle.";
    return;
  }

  let xg = 0;

  // Calculate xG based on distance
  if (distance <= 5) {
    xg += 0.4;
  } else if (distance <= 15) {
    xg += 0.3;
  } else if (distance <= 25) {
    xg += 0.2;
  } else {
    xg += 0.1;
  }

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

  // Modify based on shot type
  xg += (shotType === "foot") ? 0.1 : -0.1;

  // Modify based on situation
  if (situation === "openPlay") {
    xg += 0.1;
  } else if (situation === "setPiece") {
    xg += 0.05;
  } else if (situation === "counterAttack") {
    xg += 0.15;
  }

  // Modify based on defensive pressure
  if (pressure === "low") {
    xg += 0.1;
  } else if (pressure === "medium") {
    xg += 0.05;
  } else if (pressure === "high") {
    xg -= 0.1;
  }

  // Ensure xG is between 0 and 1
  xg = Math.max(0, Math.min(1, xg));

  // Display the result
  document.getElementById('xg-result').innerText = xg.toFixed(2);
}
