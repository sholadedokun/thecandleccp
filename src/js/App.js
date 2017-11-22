
import React, { Component } from 'react';
import Header from './components/header';
import {BrowserRouter as Router,  Route } from 'react-router-dom';
import {Grid, Row} from 'react-bootstrap'


import Home from './components/home'
import Profile from './components/profile'
import Howitworks from './components/howitworks'
import Login from './components/login'
import Help from './components/help'
import requireAuth from './components/auth/require_auth';
class App extends Component {
  render() {
    return (

        <Router>
            <Grid fluid className="App">
                <Header className="App-header"></Header>
                <Route  exact path="/"  component={Home} />
                <Route  exact path="/Howitworks"  component={Howitworks} />
                <Route  exact path="/login"  component={Login} />
                <Route  exact path="/help"  component={Help} />
            </Grid>
        </Router>

    );

  }
}

export default App;
