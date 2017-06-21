import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class Signin extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      users: [],
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers() {
    fetch( 'http://localhost:5000/users', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { users: results } ) )
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  checkInfo = (event) => {
    event.preventDefault()
    let users = this.state.users

    for ( let i = 0; i < users.length; i++ ) {

      if ( users[i].email === this.state.email ) {
        if (users[i].password === this.state.password) {
          return browserHistory.push( `users/${users[i].id}` )
        }
      }
    }
  }

  render() {

    return (
      <div>
        <h1>Sign In</h1>

        <form onSubmit={this.checkInfo}>
          <label className="label">
            Email:
            <input className="createImput" type="text" name="email" onChange={this.handleInputChange}/>
            Password:
            <input className="createImput" name="password" onChange={this.handleInputChange}/>
          </label>
          <button type="submit" value="Submit">Submit</button>
        </form>

      </div>
    )
  }
}

export default Signin
