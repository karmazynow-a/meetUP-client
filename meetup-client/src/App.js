import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './components/dashboard/Dashboard'

import Navbar from './components/layout/Navbar'
import EventDetails from './components/events/EventDetails'
import SignIn from './components/authentication/SignIn'
import SignUp from './components/authentication/SignUp'
import EventManager from './components/dashboard/EventManager';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/event/:id' component={EventDetails} />
            <Route path='/manage' component={EventManager} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
