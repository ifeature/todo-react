import React, { Component } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';

import todoStore from './stores/todo';
import todoActions from './actions/todoActions';

import './App.css';

const getState = () => ({
  todos: todoStore.todos
});

class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      ...getState(),
      filter: false
    };
  }

  componentDidMount() {
    todoStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    todoStore.removeChangeListener(this.onStoreChange);
  }

  handleClick = () => {
    const text = this.input.value;
    todoActions.createTodo(text);
    this.input.value = '';
  };

  handleStatusChange = todo => {
    todoActions.changeTodo(todo);
  };

  onStoreChange = () => {
    this.setState(getState());
  };

  getStatus = status => {
    return status ? 'complete' : '';
  };

  viewCompleted = () => {
    this.setState({
      filter: true
    });
  };

    viewAll = () => {
    this.setState({
      filter: false
    });
  };

  render() {
    const { todos, filter } = this.state;

    return (
      <div className="todo-app">
        <div>
          <button type="button" onClick={this.viewCompleted}>View Completed</button>
          <button type="button" onClick={this.viewAll}>View All</button>
        </div>
        <div>
          <input type="text" placeholder="What are you gonna to do?" ref={input => this.input = input}/>
          <button type="button" onClick={this.handleClick}>Add</button>
        </div>
        <ul>
          {
            todos
              .filter(todo => {
                if (!filter) {
                  return true;
                }

                return todo.status === true;
              })
              .map(todo => {
                const todoClass = classNames({complete: todo.status});

                return (
                  <li key={shortid.generate()} onClick={this.handleStatusChange.bind(this, todo)} className={todoClass}>{todo.text}</li>
                );
             })
          }
        </ul>
      </div>
    );
  }
}

export default App;
