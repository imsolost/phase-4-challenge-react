import React, { Component } from 'react'
import { Link } from 'react-router'

class NewReview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      comments: '',
      user: ''
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    console.log('state', this.state);
  }

  newReview = (event) => {
    event.preventDefault()

    console.log('state?', this.state);

    fetch('http://localhost:5000/new', {
      method: 'post',
      body:  JSON.stringify({ book: this.state }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
  }

  render() {

    return (
      <div >
        <form className="form" onSubmit={this.newBook}>
          <label className="label">
            Title:
            <input className="createImput" type="text" name="album_id" onChange={this.handleInputChange}/>
            User:
            <input className="createImput" name="user_id" onChange={this.handleInputChange}/>
            Comments:
            <textarea className="createImput" rows='5' name="comments" onChange={this.handleInputChange} value={this.state.value}/>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <Link to='/'><button>Home</button></Link>

      </div>
    )
  }
}

export default NewReview
