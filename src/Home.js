import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return (
            <div className="app">
                <ul>
                    <li><Link to="/">Main page</Link></li>
                    <li><Link to="/tags/home">Tags: home</Link></li>
                    <li><Link to="/tags/work">Tags: work</Link></li>
                </ul>
                {React.cloneElement(this.props.children, {test: '123'})}
            </div>
        );
    }
}

export default Home;