// // Create an empty array to store the todo items
// let todoList = [];

// // Function to add a new todo item
// function addTodoItem(item) {
//   todoList.push(item);
// }

// // Function to remove a todo item
// function removeTodoItem(index) {
//   if (index >= 0 && index < todoList.length) {
//     todoList.splice(index, 1);
//   }
// }

// // Function to edit a todo item
// function editTodoItem(index, newItem) {
//   if (index >= 0 && index < todoList.length) {
//     todoList[index] = newItem;
//   }
// }

// // Example usage
// addTodoItem("Buy groceries");
// addTodoItem("Do laundry");
// addTodoItem("Walk the dog");

// console.log(todoList); // Output: ["Buy groceries", "Do laundry", "Walk the dog"]

// removeTodoItem(1);

// console.log(todoList); // Output: ["Buy groceries", "Walk the dog"]

// editTodoItem(0, "Buy new shoes");

// console.log(todoList); // Output: ["Buy new shoes", "Walk the dog"]
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}