import appDispatcher from './../dispatcher';
import appConstants from './../constants';

const todoActions = {
    createTodo(text) {
        appDispatcher.dispatch({
            type: appConstants.ADD_TODO,
            payload: text
        });
    },
    changeTodo(todo) {
        appDispatcher.dispatch({
            type: appConstants.CHANGE_TODO_STATUS,
            payload: todo
        })
    }
};

export default todoActions;