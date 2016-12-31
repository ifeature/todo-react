import { EventEmitter } from 'events';
import appDispatcher from './../dispatcher';
import appConstants from './../constants';

let todos = [
    {id: 1, text: 'learn angular 1.6', status: false},
    {id: 2, text: 'learn react', status: true}
];

const addTodo = data => {
    todos = [...todos, {id: todos.length + 1, text: data, status: false}];
};

const changeStatus = id => {
    const idx = todos.findIndex((todo, idx) => todo.id === id);
    todos[idx].status = !todos[idx].status;
    todos = [...todos];
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
            changeStatus(action.payload.id);
            store.emitChange();
            break;
        }
        default: {
            break;
        }
    }
});

export default store;