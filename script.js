
 document.addEventListener("DOMContentLoaded", function() {
  const menubar = document.querySelector(".fa-bars");
  const hidemenu = document.querySelector(".fa-xmark");
  const showmenu = document.querySelector(".sidemenu");

  menubar.addEventListener("click", () => {
    showmenu.style.right = "0";
  });

  hidemenu.addEventListener("click", () => {
    showmenu.style.right = "-250px";
  });

  loadTasks(); // Load tasks when DOM is ready
});

function tasksubmit(event) {
  event.preventDefault(); // Prevent form submission

  const taskname = document.getElementById("taskName").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;
  const status = document.querySelector('input[name="status"]:checked');

  if (taskname && description && status) {
    const task = {
      name: taskname,
      description: description,
      priority: priority,
      dueDate: dueDate,
      status: status.value // Get the value of the checked status radio button
    };

    saveTask(task);
    alert("Your task has been saved"); // Show alert message
    window.location.href = 'tasks.html'; // Redirect to tasks page
    return true;
  } else {
    alert("Please fill all fields");
    return false;
  }
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  addTaskToDOM(task);
}

function loadTasks() {
  const mainTaskContainer = document.getElementById('mainTaskContainer');

  if (!mainTaskContainer) {
    console.error('Main task container not found.');
    return;
  }

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
  const mainTaskContainer = document.getElementById('mainTaskContainer');

  if (!mainTaskContainer) {
    console.error('Main task container not found.');
    return;
  }

  const taskContainer = document.createElement('div');
  taskContainer.className = 'task-container';

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task-div';
  taskDiv.innerHTML = `<h2>Task: ${mainTaskContainer.children.length + 1}</h2>`;
  taskContainer.appendChild(taskDiv);

  const taskNameDiv = document.createElement('div');
  taskNameDiv.className = 'task-name';
  taskNameDiv.innerHTML = `<label for="taskName">Task Name:</label><p>${task.name}</p>`;
  taskContainer.appendChild(taskNameDiv);

  const taskDescriptionDiv = document.createElement('div');
  taskDescriptionDiv.className = 'task-description';
  taskDescriptionDiv.innerHTML = `<label for="description">Description:</label><p>${task.description}</p>`;
  taskContainer.appendChild(taskDescriptionDiv);

  const taskDetailDiv = document.createElement('div');
  taskDetailDiv.className = 'task-detail';
  taskDetailDiv.innerHTML = `<p id="para1">${task.dueDate}</p> <p id="para2">${task.priority}</p> <p id="para3">${task.status}</p>`;
  taskContainer.appendChild(taskDetailDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'button-div';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.id = 'delBtn'; // Add ID for styling
  deleteBtn.addEventListener('click', function() {
    mainTaskContainer.removeChild(taskContainer); // Remove the task container when delete button is clicked
    removeTaskFromLocalStorage(task); // Remove the task from localStorage
  });
  buttonDiv.appendChild(deleteBtn);

  taskContainer.appendChild(buttonDiv);

  mainTaskContainer.appendChild(taskContainer);
}

function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(item => item.name !== task.name); // Assuming task.name is unique
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

