import React, { Component } from 'react'

class RecentReviews extends Component {

  matchAlbumById( id ) {
    let albums = this.props.albums
    for ( let i = 0; i < albums.length; i++ ) {
      if ( albums[i].id === id ) {
        return albums[i].title
      }
    }
  }

  matchUserById( id ) {
    let users = this.props.users
    for ( let i = 0; i < users.length; i++ ) {
      if ( users[i].id === id ) {
        return users[i].name
      }
    }
  }

  render() {
    const reviews = this.props.reviews

    const topReviews = reviews.slice(0, 3).map( review =>
      <div className="review-view" key={review.id}>
        <p>{this.matchAlbumById(review.album_id)}</p>
        <p>{review.comments}</p>
        <p>by {this.matchUserById(review.user_id)}</p>
      </div>
    )

    return (
      <div className="recent-reviews">
          {topReviews}
      </div>
    )
  }
}

export default RecentReviews
