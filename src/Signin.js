import React, { Component } from 'react'
import { Link } from 'react-router'

class Signin extends Component {
  render() {

    return (
      <div>
        <h1>Sign In</h1>
        <form>
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

export default Signin
