import { EventEmitter } from 'events';
import appDispatcher from './../dispatcher';
import appConstants from './../constants';

let todos = [
    {id: 1, text: 'learn angular 1.6', status: false},
    {id: 2, text: 'learn react', status: true}
];

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
            todos = [...todos, {id: todos.length + 1, text: action.payload, status: false}];
            store.emitChange();
            break;
        }
        case appConstants.CHANGE_TODO_STATUS: {
            const idx = todos.findIndex((todo, idx) => todo.id === action.payload.id);
            todos[idx].status = !todos[idx].status;
            todos = [...todos];
            store.emitChange();
            break;
        }
        default: {
            break;
        }
    }
});

export default store;