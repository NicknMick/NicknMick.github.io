const API_URL = "http://localhost:3000";

document.getElementById('create-account').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('crName').value;
    const password = document.getElementById('crPassword').value;

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({username, password}),
    });
    if (response.ok) alert('Registration Successfull!');
});