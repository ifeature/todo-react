import React, { Component } from 'react';

class Home extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return (
            <div className="app">
                <h1>Home</h1>
                {React.cloneElement(this.props.children, {test: '123'})}
            </div>
        );
    }
}

export default Home;