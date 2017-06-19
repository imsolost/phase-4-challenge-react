import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home'
import FourOhFour from './FourOhFour'


class App extends Component {

  render() {
    return (
        // <Router history={browserHistory}>
        //   <Route path='/' component={Home} />
        //   <Route path='*' component={FourOhFour} />
        // </Router>
        <Home />
    )
  }
}

export default App;
