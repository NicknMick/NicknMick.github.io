const API_URL = "http://localhost:3000";

const showAccCreateText = document.querySelector('.show-create');
const showLogInText = document.querySelector('.show-login');
const accCreateForm = document.getElementById('create-account');
const logInForm = document.getElementById('log-in');

function setCookie(name, value, days)
{
    let expires = "";

    if (days)
    {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name)
{
    const cookies = document.cookie.split('; ');

    for (let cookie of cookies)
    {
        let [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

// Create account on create submit
document.getElementById('create-account').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('crName').value;
    const password = document.getElementById('crPassword').value;
    const confirmedPass = document.getElementById('confirmPass').value;

    if (password === confirmedPass)
    {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });
        if (response.ok) alert('Registration Successful!');
        showLogIn();
    }
    else
    {
        alert('Passwords do not match!')
    }
});

// Login on log in submit
document.getElementById('log-in').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('logName').value;
    const password = document.getElementById('logPassword').value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });
    const data = await response.json();
    if (response.ok)
    {
        setCookie("authToken", data.token, 1);
        localStorage.setItem("currentUser", username);
        showTodoPage();
    }
    else
    {
        alert('Invalid Login Credentials!');
    }
});

document.querySelector('.logoutButton').addEventListener('click', function () {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('currentUser');
    location.reload();
});

document.getElementById('list-modification').addEventListener('submit', async function(e) {
    e.preventDefault();
    const taskTitle = prompt("Enter task title:");
    const taskDesc = prompt("Enter task description:");
    if (!taskTitle || !taskDesc) return;

    const authToken = getCookie("authToken");
    const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {'Content-Type': "application/json", "Authorization": `Bearer ${authToken}`},
        body: JSON.stringify({title: taskTitle, description: taskDesc})
    });
    if (response.ok) fetchTodos();
});

async function fetchTodos()
{
    const authToken = getCookie("authToken");
    const response = await fetch(`${API_URL}/todos`, {
        headers: {"Authorization": `Bearer ${authToken}`}
    });
    const todos = await response.json();
    console.log(todos);
    renderTodos(todos);
}

function renderTodos(todos)
{
    const todoList = document.querySelector('.list-area ul');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
                <div class="task-card">
                    <h2>${todo.title}</h2>
                    <p class="desc"><textarea disabled>${todo.description}</textarea></p>
                    <p class="completion">Completed: ${todo.completed}</p>
                    <form>
                        <p class="edit-card">
                            <button type="button" onclick="editTask(${todo.id})">Edit</button>
                        </p>
                        <p class="delete-card">
                            <button type="button" onclick="deleteTask(${todo.id})">Delete</button>
                        </p>
                        <p class="complete-card">
                            <button type="button" onclick="markComplete(${todo.id})">Mark as Complete</button>
                        </p>
                    </form>
                </div>
        `;
        todoList.appendChild(li);
    });
}

async function editTask(id)
{
    const newTitle = prompt("Edit task title:");
    const newDesc = prompt("Edit task description:");
    if (!newTitle || !newDesc) return;

    await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: {'Content-Type': "application/json", "Authorization": `Bearer ${getCookie("authToken")}`},
        body: JSON.stringify({title: newTitle, description: newDesc})
    });
    fetchTodos();
}

async function deleteTask(id)
{
    await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${getCookie("authToken")}`}
    });
    fetchTodos();
}

async function markComplete(id)
{
    await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: {'Content-Type': "application/json", "Authorization": `Bearer ${getCookie("authToken")}`},
        body: JSON.stringify({completed: true})
    });
    fetchTodos();
}

function showTodoPage()
{
    document.querySelector('.sign-in-area').classList.add('hidden');
    document.querySelector('.todo-list-area').classList.remove('hidden');
    fetchTodos();
}

function showAccountCreation()
{
    logInForm.style.display = 'none';
    showAccCreateText.style.display = 'none';
    accCreateForm.style.display = 'block';
    showLogInText.style.display = 'block';
}

function showLogIn()
{
    logInForm.style.display = 'block';
    showAccCreateText.style.display = 'block';
    accCreateForm.style.display = 'none';
    showLogInText.style.display = 'none';
}

showAccCreateText.addEventListener('click', showAccountCreation);
showLogInText.addEventListener('click', showLogIn)

document.addEventListener("DOMContentLoaded", () => {
    if (getCookie("authToken"))
    {
        showTodoPage();
    }
})