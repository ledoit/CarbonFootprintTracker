// Create an empty array to store the todo items
let todoList = [];

// Function to add a new todo item
function addTodoItem(item) {
  todoList.push(item);
}

// Function to remove a todo item
function removeTodoItem(index) {
  if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
  }
}

// Function to edit a todo item
function editTodoItem(index, newItem) {
  if (index >= 0 && index < todoList.length) {
    todoList[index] = newItem;
  }
}

// Example usage
addTodoItem("Buy groceries");
addTodoItem("Do laundry");
addTodoItem("Walk the dog");

console.log(todoList); // Output: ["Buy groceries", "Do laundry", "Walk the dog"]

removeTodoItem(1);

console.log(todoList); // Output: ["Buy groceries", "Walk the dog"]

editTodoItem(0, "Buy new shoes");

console.log(todoList); // Output: ["Buy new shoes", "Walk the dog"]
