// Example data model
let matchData = {
  teamA: { name: "Team A", goals: 2, xg: 1.6, shots: 12 },
  teamB: { name: "Team B", goals: 1, xg: 2.1, shots: 14 }
};

// Initialize Chart.js
const ctx = document.getElementById("xgChart");
let xgChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [matchData.teamA.name, matchData.teamB.name],
    datasets: [
      {
        label: "Goals",
        data: [matchData.teamA.goals, matchData.teamB.goals],
        backgroundColor: "rgba(75, 192, 192, 0.7)"
      },
      {
        label: "Expected Goals (xG)",
        data: [matchData.teamA.xg, matchData.teamB.xg],
        backgroundColor: "rgba(255, 99, 132, 0.7)"
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } }
  }
});

// Function to update table
function updateTable() {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = `
    <tr>
      <td>${matchData.teamA.name}</td>
      <td>${matchData.teamA.goals}</td>
      <td>${matchData.teamA.xg.toFixed(2)}</td>
      <td>${matchData.teamA.shots}</td>
    </tr>
    <tr>
      <td>${matchData.teamB.name}</td>
      <td>${matchData.teamB.goals}</td>
      <td>${matchData.teamB.xg.toFixed(2)}</td>
      <td>${matchData.teamB.shots}</td>
    </tr>
  `;
}

// Function to update chart & table if data changes
function updateMatchData(team, goals, xg, shots) {
  matchData[team].goals = goals;
  matchData[team].xg = xg;
  matchData[team].shots = shots;

  // Update chart
  xgChart.data.datasets[0].data = [matchData.teamA.goals, matchData.teamB.goals];
  xgChart.data.datasets[1].data = [matchData.teamA.xg, matchData.teamB.xg];
  xgChart.update();

  // Update table
  updateTable();
}

// Initialize table on page load
updateTable();
