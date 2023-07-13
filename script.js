// Array to store the to-do items
let tasks = [];

// Function to add a new task to the list
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Generate a unique ID for the task
    const taskId = new Date().getTime();

    // Create a new task object
    const newTask = {
      id: taskId,
      text: taskText,
      completed: false
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Clear the input field
    taskInput.value = '';

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Render the updated task list
    renderTasks();
  }
}

// Function to remove a task from the list
function removeTask(taskId) {
  // Find the index of the task in the tasks array
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    // Remove the task from the tasks array
    tasks.splice(taskIndex, 1);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Render the updated task list
    renderTasks();
  }
}

// Function to render the task list
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      removeTask(task.id);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Add event listener for the "Add Task" button
const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', addTask);

// Load tasks from local storage when the page loads
window.addEventListener('load', loadTasksFromLocalStorage);
