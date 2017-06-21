import React, { Component } from 'react'
import icon from '../public/vinyl.png'
import { Link, browserHistory } from 'react-router'

class AlbumDetails extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      album: {},
      reviews: [],
      users: [],
      currentUser: this.props.location.query.user_id || ''
    }
  }

  componentDidMount() {
    this.getAlbum( this.props.params.id )
    this.getReviews( this.props.params.id )
    this.getAllUsers()
  }

  getAlbum = ( input ) => {
    fetch(`http://localhost:5000/albums/${input}`, {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { album: results } ) )
  }

  getReviews = (input) => {
    fetch(`http://localhost:5000/reviews/albums/${input}`, {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { reviews: results } ) )
  }

  getAllUsers() {
    fetch( 'http://localhost:5000/users', {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { users: results } ) )
  }

  matchUserById( id ) {
    let users = this.state.users
    for ( let i = 0; i < users.length; i++ ) {
      if ( users[i].id === id ) {
        return users[i].name
      }
    }
  }

  signinOrSignout() {
    if (this.state.currentUser === '') {
      return <Link to='/signin'><button>Sign In</button></Link>
    }
    return <Link to='/' onClick={this.logout}><button>Sign Out</button></Link>
  }

  newReviewOrNah() {
    if (this.state.currentUser === '') {
      return
    }
    return <Link to={{pathname: '/new', query: { album_id: this.state.album.id, user_id: this.props.location.query.user_id} }} >
      <button>New Review</button>
    </Link>
  }

  logout() {
    this.setState( { currentUser: '' })
  }

  render() {
    // console.log(this.state.currentUser);
    const album = this.state.album
    const reviews = this.state.reviews

    const albumReviews = reviews.map( review =>
      <div className="review-view" key={review.id}>
        <p>{album.title}</p>
        <p>{review.comments}</p>
        <p>by {this.matchUserById(review.user_id)}</p>
      </div>
    )

    return (
      <div className="App">
        <div className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h3>VINYL</h3>
          <p>A community for record enthusiasts to review their favorite albums.</p>
          <Link to={{pathname: '/', query: { user_id: this.props.location.query.user_id } }}><button>Home</button></Link>

          {this.signinOrSignout()}
          {this.newReviewOrNah()}

          {/* <Link to={{pathname: '/new', query: { album_id: this.state.album.id, user_id: this.props.location.query.user_id} }} >
            <button>New Review</button>
          </Link> */}

        </div>

        <div className="records-reviews-wrapper">
          <div>
            <img src={album.cover}  alt="broken" />
            <p>{album.title}</p>
            <p>{album.artist}</p>
          </div>

          <div className="recent-reviews">
            {albumReviews}
          </div>
        </div>

      </div>
    )
  }
}

export default AlbumDetails
