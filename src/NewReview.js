import React, { Component } from 'react'
import { Link } from 'react-router'

class NewReview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      album_id: this.props.location.query.album_id || '',
      user_id: this.props.location.query.user_id || '',
      comments: ''
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

  newReview = (event) => {
    event.preventDefault()

    fetch('http://localhost:5000/reviews/new', {
      method: 'post',
      body:  JSON.stringify({ review: this.state }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
  }

  render() {

    return (
      <div >
        <form className="form" onSubmit={this.newReview}>
          <label className="label">
            New Review for: {this.state.title}
            <textarea className="createImput" rows='7' name="comments" onChange={this.handleInputChange} value={this.state.value}/>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <Link to={{pathname: '/', query: { user_id: this.state.user_id} }} >
          <button>Home</button>
        </Link>

      </div>
    )
  }
}

export default NewReview
