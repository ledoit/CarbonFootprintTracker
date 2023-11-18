// app.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Activity from './Activity';

Modal.setAppElement('#root'); // Set the root element for accessibility

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      modalIsOpen: false,
      newActivity: {
        name: '',
        start: '',
        end: '',
        mode: '',
        frequency: '',
      },
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleInputChange = (event, field) => {
    const { newActivity } = this.state;
    this.setState({
      newActivity: {
        ...newActivity,
        [field]: event.target.value,
      },
    });
  };

  addTodo = () => {
    const { todos, newActivity } = this.state;
    const { name, start, end, mode, frequency } = newActivity;
    if (name.trim() !== '' && frequency.trim() !== '') {
      const newActivityInstance = new Activity(name, start, end, mode, frequency);
      this.setState({
        todos: [...todos, newActivityInstance],
        modalIsOpen: false,
        newActivity: {
          name: '',
          start: '',
          end: '',
          mode: '',
          frequency: '',
        },
      });
    }
  };

  removeTodo = (index) => {
    const { todos } = this.state;
    todos.splice(index, 1);
    this.setState({ todos });
  };

  render() {
    const { todos, modalIsOpen, newActivity } = this.state;

    return (
      <div className="todo-container">
        <h1>React Todo List</h1>
        {todos.map((activity, index) => (
          <div className="todo-item" key={index}>
            <span>Name: {activity.name}</span>
            <span>Frequency: {activity.frequency}</span>
            <button onClick={() => this.removeTodo(index)}>x</button>
          </div>
        ))}
        <button onClick={this.openModal}>+</button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Todo Modal"
        >
          <h2>Add Todo</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={newActivity.name}
                onChange={(e) => this.handleInputChange(e, 'name')}
              />
            </label>
            <label>
              Mode:
              <input
                type="text"
                value={newActivity.mode}
                onChange={(e) => this.handleInputChange(e, 'mode')}
              />
            </label>
            <label>
              Start:
              <input
                type="text"
                value={newActivity.start}
                onChange={(e) => this.handleInputChange(e, 'start')}
              />
            </label>
            <label>
              End:
              <input
                type="text"
                value={newActivity.end}
                onChange={(e) => this.handleInputChange(e, 'end')}
              />
            </label>
            <label>
              Frequency:
              <input
                type="text"
                value={newActivity.frequency}
                onChange={(e) => this.handleInputChange(e, 'frequency')}
              />
            </label>
            {/* Add similar fields for other attributes if needed */}
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
            <button type="button" onClick={this.closeModal}>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
