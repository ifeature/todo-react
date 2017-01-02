import immutable from 'immutable';
import { EventEmitter } from 'events';

import appConstants from './../constants';
import appDispatcher from './../dispatcher';

let todos = immutable.List([
    {id: 1, text: 'learn angular 1.6', status: false, tag: 'home'},
    {id: 2, text: 'learn react', status: true, tag: 'work'}
]);

const addTodo = data => {
    const todo = {id: todos.length + 1, text: data, status: false};
    todos = todos.push(todo);
};

const changeStatus = data => {
    const idx = todos.findKey((todo, idx) => todo.id === data.id);
    const todo = {id: idx, text: data.text, status: !data.status, tag: data.tag};
    todos = todos.splice(idx, 1, todo);
};

class TodoStore extends EventEmitter {
    get todos() {
        return todos;
    }
    emitChange() {
        this.emit(appConstants.CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(appConstants.CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeChangeListener(callback);
    }
}

const store = new TodoStore();

appDispatcher.register(action => {
    switch(action.type) {
        case appConstants.ADD_TODO: {
            addTodo(action.payload);
            store.emitChange();
            break;
        }
        case appConstants.CHANGE_TODO_STATUS: {
            changeStatus(action.payload);
            store.emitChange();
            break;
        }
        default: {
            break;
        }
    }
});

export default store;