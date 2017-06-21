import React, { Component } from 'react'
import icon from '../public/vinyl.png'
import { Link } from 'react-router'

class Profile extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      currentUser: {},
      reviews: [],
      albums: []
    }
  }

  componentDidMount() {
    this.getCurrentUser()
    this.getReviews(this.props.params.id)
    this.getAllAlbums()
  }

  getCurrentUser() {
    fetch(`http://localhost:5000/users/${this.props.params.id}`, {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { currentUser: results } ) )
  }

  getReviews = (input) => {
    fetch(`http://localhost:5000/reviews/users/${input}`, {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { reviews: results } ) )
  }

  getAllAlbums() {
    fetch( 'http://localhost:5000/albums', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { albums: results } ) )
  }

  matchAlbumById( id ) {
    let albums = this.state.albums
    for ( let i = 0; i < albums.length; i++ ) {
      if ( albums[i].id === id ) {
        return albums[i].title
      }
    }
  }

  render() {
    const reviews = this.state.reviews

    const albumReviews = reviews.map( review =>
      <div className="review-view" key={review.id}>
        <p>{this.matchAlbumById(review.album_id)}</p>
        <p>{review.comments}</p>
        <p>by {this.state.currentUser.name}</p>
      </div>
    )

    return (
      <div className="App">
        <div className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h3>VINYL</h3>
          <p>A community for record enthusiasts to review their favorite albums.</p>
          <Link to='/'><button>Home</button></Link>
          <Link to='/'><button>Sign Out</button></Link>
        </div>

        <div className="records-reviews-wrapper">
          <div className="profile-info">
            <h1> User Info </h1>
            <div>Name: {this.state.currentUser.name}</div>
            <div>Email: {this.state.currentUser.email}</div>
            <div> Join Date: {this.state.currentUser.signupdate}</div>
          </div>

          <div className="recent-reviews">
            <h1> Reviews </h1>
            {albumReviews}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
