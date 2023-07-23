const todoForm = document.querySelector("form");
const todoList = document.querySelector(".todo-list");

const createTodoElement = (todo,id) => {
  console.log(todo);
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todo.completed) {
    todoDiv.classList.add("complete");
  }

  const newTodo = document.createElement("h3");
  newTodo.textContent = todo.title;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);
  //category 
  const catVal=document.getElementById("category").value;
  const category=document.createElement("p");
  category.innerText=todo.cat;
  todoDiv.appendChild(category);
  //tags 
  const tagVal=document.getElementById("tags").value;
  const tag=document.createElement("p");
  tag.innerText=todo.tag;
  todoDiv.appendChild(tag);
  //priority 
  const prtVal=document.getElementById("prt").value;
  const priority=document.createElement("p");
  priority.innerText=todo.priority;
  todoDiv.appendChild(priority);
  //due date
  const dueVal=document.getElementById("DueDate").value;
  const dueDate=document.createElement("p");
  dueDate.innerText=todo.date;
  todoDiv.appendChild(dueDate);

  // Complete Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Edit Button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  editButton.classList.add("edit-btn");
  editButton.setAttribute("onclick",id);
  todoDiv.appendChild(editButton);

  return todoDiv;
};

let todoListArr = [];

// {
//     title: 'jntjg'
      //  category:' '
      //  tag
      //  priority
      //  date
// }

document.addEventListener("DOMContentLoaded", (e) => {
  console.log(localStorage.getItem("todo"));
  if (localStorage.getItem("todo")) {
    todoListArr = JSON.parse(localStorage.getItem("todo"));
  } else {
    localStorage.setItem("todo", JSON.stringify(todoListArr));
  }
  let i=0;
  todoListArr.forEach((todo) => {
    //create todo
    const todoDiv = createTodoElement(todo,i);
    todoList.appendChild(todoDiv);
    i++;
  });
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const title = todoForm.todo.value;
  const cat=document.getElementById("category").value;
  const tag=document.getElementById("tags").value;
  const date=document.getElementById("DueDate").value;
  const priority=document.getElementById("prt").value;

  const todoDiv = createTodoElement({ title: title, cat:cat , tag:tag , date:date , priority:priority,completed: false },todoListArr.length);
  todoListArr.push({ title: title, cat:cat , tag:tag , date:date , priority:priority,completed: false});
  localStorage.setItem("todo", JSON.stringify(todoListArr));
  todoList.appendChild(todoDiv);
  todoForm.todo.value = "";

  //console.log(todoListArr);
});

todoList.addEventListener("click", (e) => {
  const item = e.target;

  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    if (!todo.classList.contains("complete")) {
      todoListArr = todoListArr.map((todoElement) => {
        if (todoElement.title !== todo.textContent) {
          return todoElement;
        } else {
          return {
            title: todoElement.title,
            completed: true
          };
        }
      });

      localStorage.setItem("todo", JSON.stringify(todoListArr));
      todo.classList.add("complete");
    } else {
      todoListArr = todoListArr.map((todoElement) => {
        if (todoElement.title !== todo.textContent) {
          return todoElement;
        } else {
          return {
            title: todoElement.title,
            completed: false
          };
        }
      });

      localStorage.setItem("todo", JSON.stringify(todoListArr));
      todo.classList.remove("complete");
    }
  }

  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", (e) => {
      todoListArr = todoListArr.filter((td) => {
        return td.title !== todo.textContent;
      });

      localStorage.setItem("todo", JSON.stringify(todoListArr));

      todo.remove();
    });
  }

  if(item.classList.contains("edit-btn")){
    const todo = item.parentElement;
    //todo.
    //console.log(todo);
  }
});

// localStorage

// localStorage.setItem("name", "Aditya");

// console.log(localStorage.getItem("friend"));

// localStorage.setItem("friend", "Bob");
// localStorage.setItem

// let arr = [122, 23, 32];
// console.log(arr);
// localStorage.setItem("arr", JSON.stringify(arr));

// console.log(JSON.parse(localStorage.getItem("arr"))[1]);

// const completeFilterBtn = document.querySelector(".complete-filter");

// completeFilterBtn.addEventListener("click", (e) => {
//   const todos = todoList.children;
//   // console.log(todos);
//   for (let i = 0; i < todos.length; i++) {
//     if (!todos[i].classList.contains("complete")) {
//       todos[i].style.display = "none";
//     }
//   }
// });

// filter functionality
const Filter=document.getElementById("ciFilter");
const incompletedFilter=document.getElementById("incmplt");
const duedateFilter=document.getElementById("dd");
const categoryFilter=document.getElementById("catFilter");
const priorityFilter=document.getElementById("prtFilter");
const tagFilter=document.getElementById("tg");

Filter.addEventListener("change",(e)=>{
    const el=e.target.value;
    if(el=="Completed"){
        console.log("complete");
        completeFilter();
    }
    else if(el=="Incomplete"){
        IncompleteFilter();
    }
    
});
//complete incomplete filter
function completeFilter(){
    const todos = todoList.children;
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].classList.contains("complete")) {
      todos[i].style.display = "none";
    }
    else{
        todos[i].style.display = "grid"; 
    }
  }
}
function IncompleteFilter(){
    const todos = todoList.children;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].classList.contains("complete")) {
      todos[i].style.display = "none";
    }
    else{
        todos[i].style.display = "grid"; 
    }
  }
}
//category filter
categoryFilter.addEventListener("change",(e)=>{
  const el=e.target.value;
  console.log(el);
  if(el=="Grocery"){
      categoryFilterFunc("Grocery");
  }
  else if(el=="Diary"){
    categoryFilterFunc("Diary");
  }
  else if(el=="Stationary"){
    categoryFilterFunc("Stationary");
  }
  else if(el=="Electronic"){
    categoryFilterFunc("Electronic");
  }
  
});
function categoryFilterFunc(categoryVal){
    const todos = todoList.children;
    console.log(todos);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].cat!==(categoryVal)) {
      todos[i].style.display = "none";
    }
    else{
        todos[i].style.display = "grid"; 
    }
  }
}
//priority filter
priorityFilter.addEventListener("change",(e)=>{
  const el=e.target.value;
  console.log(el);
  if(el=="Low Priority"){
    priorityFilterFunc("Low Priority");
  }
  else if(el=="Medium Priority"){
    priorityFilterFunc("Medium Priority");
  }
  else if(el=="High Priority"){
    priorityFilterFunc("High Priority");
  }
  
});
function priorityFilterFunc(priorityVal){
    const todos = todoList.children;
    console.log(todos);
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].classList.contains(priorityVal)) {
      todos[i].style.display = "none";
    }
    else{
        todos[i].style.display = "grid"; 
    }
  }
}

//edit
// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // check if task is empty
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  // task already exist
  todoListArr.forEach(task => {
    if (todoListArr.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  todoListArr.forEach(task => {
    if (todoListArr.task === currentTask) {
      todoListArr.task = event.value;
    }
  });
  // update local storage
  localStorage.setItem("tasks", JSON.stringify(todoListArr));
}

//search function
function Search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }





