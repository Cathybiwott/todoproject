
fetch('https://dummyjson.com/todos')
.then(res => res.json())
.then(console.log);
const tasks = [];

function fetchTodos(userId) {
  fetch(`https://dummyjson.com/todos`)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(todo => {
          tasks.push({
            heading: todo.title,
            date: todo.date,
            time: todo.time,
            category: todo.category,
            status: todo.completed ? 'Complete' : 'Incomplete'
          });
        });
        displayTasks();
        console.log(tasks); 
      } 
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function addTask(heading, date, time, category) {
  if (heading === '' || date === '' || time === '' || category === '') {
    alert('Please fill in all fields');
    return;
  }
  tasks.push({
    heading: heading,
    date: date,
    time: time,
    category: category,
    status: 'Incomplete'
  });
  displayTasks();
}

function completeTask(index) {
  tasks[index].status = 'Complete';
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function displayTasks() {
  const tableBody = document.getElementById('tasks');
  tableBody.innerHTML = '';
  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    const headingCell = document.createElement('td');
    headingCell.textContent = task.heading;
    row.appendChild(headingCell);
    const dateCell = document.createElement('td');
    dateCell.textContent = task.date;
    row.appendChild(dateCell);
    const timeCell = document.createElement('td');
    timeCell.textContent = task.time;
    row.appendChild(timeCell);
    const categoryCell = document.createElement('td');
    categoryCell.textContent = task.category;
    row.appendChild(categoryCell);
    const statusCell = document.createElement('td');
    statusCell.textContent = task.status;
    row.appendChild(statusCell);
    const actionsCell = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => updateTask(index));
    actionsCell.appendChild(updateButton);
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => completeTask(index));
    actionsCell.appendChild(completeButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const heading = document.getElementById('heading').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const category = document.getElementById('category').value;
  addTask(heading, date, time, category);
});

fetchTodos(1);


  
  
