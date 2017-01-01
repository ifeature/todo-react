import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import shortid from 'shortid';
import classNames from 'classnames';

import todoStore from './stores/todo';
import todoActions from './actions/todoActions';

import Todo from './Todo';

const getState = () => ({
  todos: todoStore.todos
});

class Todos extends Component {
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
    console.log('tag: ', this.props.params.tagId);
    console.log(this.props);

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
        <ReactCSSTransitionGroup component="ul" transitionName="list" 
                                 transitionEnterTimeout={500} 
                                 transitionLeaveTimeout={300} 
                                 transitionAppear={true}
                                 transitionAppearTimeout={500}
                                 transitionLeave={false}>
          {
            todos
              .filter(todo => {
                if (!filter) {
                  return true;
                }

                return todo.status === true;
              })
              .filter(todo => {
                if (this.props.params.tagId) {
                  return todo.tag === this.props.params.tagId;
                }
                
                return true;
              })
              .map(todo => {
                const todoClass = classNames({complete: todo.status});

                return (
                  <Todo key={shortid.generate()} className={todoClass} onClick={this.handleStatusChange.bind(this, todo)} id="123">{todo.text}</Todo>
                );
             })
          }
        </ReactCSSTransitionGroup>
        {this.props.children}
      </div>
    );
  }
}

export default Todos;