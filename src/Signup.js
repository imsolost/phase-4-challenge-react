import React, { Component } from 'react'
import icon from '../public/vinyl.png'
import { Link, browserHistory } from 'react-router'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      currentUserId: ''
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  newUser = (event) => {
    event.preventDefault()

    fetch('http://localhost:5000/users/new', {
      method: 'post',
      body:  JSON.stringify({ user: this.state }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })

    fetch( 'http://localhost:5000/users', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState({ currentUserId: results.slice(-1)[0].id + 1 }) )
    .then( setTimeout( () => { this.reroute() }, 300 ) )
  }

  reroute = () => {
    browserHistory.push(`users/${this.state.currentUserId}`)
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h3>VINYL</h3>
          <p>A community for record enthusiasts to review their favorite albums.</p>
          <Link to='/'><button>Home</button></Link>
        </div>
        <div>
          <h1>Sign up for Vinyl</h1>
          <form className="new-user-form" onSubmit={this.newUser}>
            <label className="label">
              Name:
              <input className="createImput" type="text" name="name" onChange={this.handleInputChange}/>
              Email:
              <input className="createImput" type="text" name="email" onChange={this.handleInputChange}/>
              Password:
              <input className="createImput" name="password" onChange={this.handleInputChange}/>
            </label>
            <button type="submit" value="Submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup
