import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import Home from './Home';
import Todos from './Todos';
import './App.css';

class App extends Component {
  constructor(...props) {
    super(...props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}>
          <IndexRoute component={Todos} />
          <Route path="/tags/:tagId" component={Todos} />
        </Route>
        <Redirect from="/:other" to="/" />
      </Router>
    );
  }
}

export default App;
