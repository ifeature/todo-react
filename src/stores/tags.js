import immutable from 'immutable';
import { EventEmitter } from 'events';

import appConstants from './../constants';
import appDispatcher from './../dispatcher';

const tags = immutable.List(['work', 'home', 'education', 'holiday']);

class TagsStore extends EventEmitter {
    get tags() {
        return tags;
    }
    emitChange() {
        this.emit(appConstants.CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(appConstants.CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(callback);
    }
}

const store = new TagsStore();

export default store;