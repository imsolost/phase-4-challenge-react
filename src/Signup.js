import React, { Component } from 'react'
import { Link } from 'react-router'

class Signup extends Component {
  render() {

    return (
      <div>
        <h1>Sign up for Vinyl</h1>
        <form>
          <label>Name</label>
          <input type="text" name="name"/>
          <label>Email</label>
          <input type="text" name="email"/>
          <label>Password</label>
          <input type="text" name="password"/>
          <Link to="/"><button type="submit" value="Submit">Submit</button></Link>
        </form>
      </div>
    )
  }
}

export default Signup
