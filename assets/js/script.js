// Initial setup
let tasks = [
  { id: 1, name: "Task 1: Completar prueba", status: "Completed" },
  { id: 2, name: "Task 2: Finalizar modulo JS", status: "In Progress" },
  {
    id: 3,
    name: "Task 3: Estudiar para el siguiente modulo",
    status: "Assigned",
  },
];
let taskIdCounter = tasks.length; // El contador comienza en el número de tareas existentes

// Add event listener for the Add button
document.getElementById("addTaskBtn").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName === "") return; // Ignore empty inputs

  taskIdCounter++;
  const newTask = {
    id: taskIdCounter,
    name: taskName,
    status: "Assigned",
  };

  tasks.push(newTask);
  taskInput.value = ""; // Clear input after adding

  updateTaskList();
});

// Function to update the task list and summary
function updateTaskList() {
  const taskTableBody = document.querySelector("#taskTable tbody");
  taskTableBody.innerHTML = ""; // Clear the table

  tasks.forEach((task) => {
    const row = document.createElement("tr");

    // Task ID
    const idCell = document.createElement("td");
    idCell.textContent = task.id;
    row.appendChild(idCell);

    // Task Name
    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    // Task Status
    const statusCell = document.createElement("td");
    const statusSelect = document.createElement("select");
    statusSelect.innerHTML = `
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        `;
    statusSelect.value = task.status;
    statusSelect.addEventListener("change", function () {
      task.status = statusSelect.value;
      updateSummary();
    });
    statusCell.appendChild(statusSelect);
    row.appendChild(statusCell);

    // Task Actions (Delete Button)
    const actionsCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter((t) => t.id !== task.id);
      updateTaskList();
    });
    actionsCell.appendChild(deleteBtn);
    row.appendChild(actionsCell);

    taskTableBody.appendChild(row);
  });

  updateSummary();
}

// Function to update the task summary
function updateSummary() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  document.getElementById("totalTasks").textContent = totalTasks;
  document.getElementById("completedTasks").textContent = completedTasks;
}

// Initialize the list with predefined tasks
updateTaskList();
