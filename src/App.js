import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home'
import AlbumDetails from './AlbumDetails'
import Profile from './Profile'
import FourOhFour from './FourOhFour'
import Signin from './Signin'
import Signup from './Signup'


class App extends Component {

  render() {
    return (
        <Router history={browserHistory}>
          <Route path='/' component={Home} />
          <Route path='/albums/:id' component={AlbumDetails} />
          <Route path='/users/:id' component={Profile} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='*' component={FourOhFour} />
        </Router>
    )
  }
}

export default App;
