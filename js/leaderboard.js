// Function to update the leaderboard
function updateLeaderboard(playerName, time, flips) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, time, flips });
    leaderboard.sort((a, b) => a.time - b.time); // Sort by time in ascending order
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

// Function to display the leaderboard
function displayLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.name} - Time: ${entry.time} seconds, Flips: ${entry.flips}`;
        leaderboardElement.appendChild(listItem);
    });
}

// Call displayLeaderboard on page load
displayLeaderboard();