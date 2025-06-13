let maxUsers = 0;
let loggedIn = [];

function setMaxUsers() {
    const input = document.getElementById('maxUsers').value;
    if (input > 0) {
        maxUsers = parseInt(input);
        loggedIn = []; // Reset on setting new max
        updateStatus(`Limit set to ${maxUsers} user(s).`);
        updateUserList();
    } else {
        updateStatus("Please enter a valid number greater than 0.");
    }
}

function updateStatus(message, isError = false) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.color = isError ? 'red' : 'green';
}

function updateUserList() {
    const container = document.getElementById('loggedInUsers');
    container.innerHTML = `<strong>Logged in users (${loggedIn.length}/${maxUsers}):</strong><br>` +
        loggedIn.map(user => `• ${user}`).join('<br>');
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;

    if (maxUsers === 0) {
        updateStatus("Set the max user limit first!", true);
        return;
    }

    if (loggedIn.length >= maxUsers) {
        updateStatus("Maximum login limit reached!", true);
        return;
    }

    if (loggedIn.includes(username)) {
        updateStatus("This user is already logged in.", true);
        return;
    }

    loggedIn.push(username);
    updateStatus(`Welcome, ${username}!`);
    updateUserList();
    this.reset();
});
