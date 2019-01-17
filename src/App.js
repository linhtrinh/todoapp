import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={'/'}>Todo App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to={'/'}>Home </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to={'/create'}>Create </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to={'/index'}>Index </Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
            <Route exact path='/create' component={Create}/>
            <Route path='/edit/:id' component={Edit}/>
            <Route path='/index' component={Index}/>
          </Switch>
        </div>
      </Router>
      
    );
  }
}

export default App;
