// app.js

import React from 'react';
import ReactDOM from 'react-dom';
import Activity from './Activity';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoName: '',
      newTodoFrequency: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ newTodoName: event.target.value });
  };

  handleFrequencyChange = (event) => {
    this.setState({ newTodoFrequency: event.target.value });
  };

  addTodo = () => {
    const { newTodoName, newTodoFrequency, todos } = this.state;
    if (newTodoName.trim() !== '' && newTodoFrequency.trim() !== '') {
      const newActivity = new Activity(newTodoName, '', '', '', newTodoFrequency);
      this.setState({
        todos: [...todos, newActivity],
        newTodoName: '',
        newTodoFrequency: '',
      });
    }
  };

  removeTodo = (index) => {
    const { todos } = this.state;
    todos.splice(index, 1);
    this.setState({ todos });
  };

  render() {
    const { todos, newTodoName, newTodoFrequency } = this.state;

    return (
      <div className="todo-container">
        <h1>React Todo List</h1>
        {todos.map((activity, index) => (
          <div className="todo-item" key={index}>
            <span>Name: {activity.name}</span>
            <span>Frequency: {activity.frequency}</span>
            <button onClick={() => this.removeTodo(index)}>Remove</button>
          </div>
        ))}
        <div>
          <input
            type="text"
            value={newTodoName}
            onChange={this.handleNameChange}
            placeholder="Enter activity name"
          />
          <input
            type="text"
            value={newTodoFrequency}
            onChange={this.handleFrequencyChange}
            placeholder="Enter activity frequency"
          />
          <button onClick={this.addTodo}>Add</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
