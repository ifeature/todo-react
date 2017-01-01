import React from 'react';

const Todo = ({children, ...rest}) => (
    <li {...rest}>{children}</li>
);

Todo.propTypes = {
    id(props, propName, component) {
        if (!(propName in props) || props[propName].length < 4) {
            return new Error(`${propName} length is less than 4!`);
        }
    }
};

export default Todo;