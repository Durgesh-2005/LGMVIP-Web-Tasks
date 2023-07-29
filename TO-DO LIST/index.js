// JavaScript code (index.js)
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const completedTasksList = document.getElementById('completedTasks');

// Code for Enter key
todoInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        addBtn.click();
    }
});

// Load tasks from Local Storage when the page loads
window.addEventListener('load', loadTasks);

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox">
      <input type="text" class="taskInput" value="${taskText}">
      <button class="deleteBtn"><span class="deleteIcon"><i class='fas fa-trash' style=color:white;></span></i>
  </button>
  `;

    todoList.appendChild(listItem);
    todoInput.value = '';

    const deleteBtn = listItem.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', deleteTask);

    const taskInput = listItem.querySelector('.taskInput');
    taskInput.addEventListener('click', enableEdit);

    // Save the tasks to Local Storage
    saveTasksToLocalStorage();
}

function enableEdit(event) {
    const taskInput = event.target;
    taskInput.readOnly = false;
    taskInput.focus();

    // Add an event listener to handle the edit completion when the user presses Enter key
    taskInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            taskInput.blur();
        }
    });

    // Add an event listener to handle the edit completion when the user clicks outside the input field
    taskInput.addEventListener('blur', function () {
        taskInput.readOnly = true;
        // Save the tasks to Local Storage when the edit is completed
        saveTasksToLocalStorage();
    });
}

function deleteTask(event) {
    const listItem = event.target.closest('li');
    const listContainer = listItem.parentElement;

    listContainer.removeChild(listItem);

    // Save the tasks to Local Storage after deleting a task
    saveTasksToLocalStorage();
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const listItem = checkbox.parentElement;

    if (checkbox.checked) {
        // Move the task to "Completed Tasks" list
        completedTasksList.appendChild(listItem);
    } else {
        // Move the task back to the main list
        todoList.appendChild(listItem);
    }

    // Save the tasks to Local Storage when the checkbox status changes
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#todoList li');
    const CompletedtaskItems = document.querySelectorAll('#completedTasks li');

    taskItems.forEach(item => {
        const taskText = item.querySelector('.taskInput').value;
        const isCompleted = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });

    CompletedtaskItems.forEach(item => {
        const taskText = item.querySelector('.taskInput').value;
        const isCompleted = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });

    // Save the tasks array as a JSON string in Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasksJSON = localStorage.getItem('tasks');

    if (tasksJSON) {
        const tasks = JSON.parse(tasksJSON);

        // Clear the lists before re-populating
        todoList.innerHTML = '';
        completedTasksList.innerHTML = '';

        tasks.forEach((task) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <input type="text" class="taskInput" value="${task.text}">
                <button class="deleteBtn"><i class='fas fa-trash' style=color:white;></i></button>
            `;

            if (task.completed) {
                // Append completed tasks under "Completed Tasks" heading
                listItem.classList.add('completed-task');
                completedTasksList.appendChild(listItem);
            } else {
                // Append pending tasks under main list
                listItem.classList.add('pending-task');
                todoList.appendChild(listItem);
            }

            const deleteBtn = listItem.querySelector('.deleteBtn');
            deleteBtn.addEventListener('click', deleteTask);

            const taskInput = listItem.querySelector('.taskInput');
            taskInput.addEventListener('click', enableEdit);
        });
    }
}

// Add event listener to checkboxes
todoList.addEventListener('change', handleCheckboxChange);
completedTasksList.addEventListener('change', handleCheckboxChange);