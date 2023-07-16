// Array to store the to-do tasks
let tasks = [];

// Function to check if api is called before in order to call the api only once at the start of loading the page
function checkapicalled(){
  const value = localStorage.getItem("isapicalled");
  if(value){
    return true;
  }
  else{
    localStorage.setItem("isapicalled",1);
    return false;
  }
}

// Fetch tasks from the API and save to local storage
function fetchTasks() {
  fetch('https://jsonplaceholder.typicode.com/todos') 
    .then(response => response.json())
    .then(data => {
      // Assuming the API response contains an array of tasks
      tasks = data;
      saveTasks();
      renderTaskList();

      console.log('Tasks fetched successfully:', data);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
  
}

// Fetch tasks from api only if it had not been called before.
  if(!checkapicalled()){
    fetchTasks();
  }


// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
  
// Function to add a new task to the array and render the list
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = {
      title: taskText,
      id: Date.now(), // Generate a unique ID for the task
      completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTaskList();
    saveTasks(); // Save tasks to local storage
  }
}

// Function to delete a task from the array and render the updated list
function deleteTask(taskIndex) {
  tasks.splice(taskIndex, 1);
  renderTaskList();
  saveTasks(); // Save tasks to local storage
}

// Function to toggle editing mode for a task
function toggleEditing(taskIndex) {
  const listItem = document.getElementById(`task_${taskIndex}`);
  const taskTextElement = listItem.querySelector("span");
  const editButton = listItem.querySelector(".edit-button");

  if (listItem.classList.contains("editing")) {
    const editInput = listItem.querySelector("input");
    const newTaskText = editInput.value.trim();
    taskTextElement.textContent = newTaskText;
    editButton.textContent = "Edit";
    listItem.classList.remove("editing");
    editTask(taskIndex, newTaskText);
    saveTasks(); // Save tasks to local storage
  } else {
    const taskText = taskTextElement.textContent;
    taskTextElement.innerHTML = `<input type="text" class="edit-input" value="${taskText}">`;
    editButton.textContent = "Save";
    listItem.classList.add("editing");
  }
}

// Function to edit a task in the array and render the updated list
function editTask(taskIndex, newTaskText) {
  tasks[taskIndex].title = newTaskText;
  renderTaskList();
  saveTasks(); // Save tasks to local storage
}

// Function to render the task list in the UI
function renderTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.id = `task_${index}`;

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.title;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => toggleEditing(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteTask(index));

    listItem.appendChild(taskTextElement);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// Event listener for the add button
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", addTask);

// Function to load the tasks from the local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTaskList();
  }
}

// Fetch tasks and retrieve from local storage on page load
window.addEventListener('load', loadTasksFromLocalStorage);


