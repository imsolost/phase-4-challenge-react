import React, { Component } from 'react'
import { Link } from 'react-router'

class Library extends Component {

  render() {
    const albums = this.props.albums

    const albumCovers = albums.map( album =>
      <div key={album.id}>
        <Link to={{pathname: '/albums/' + album.id, query: { album_id: album.id, user_id: this.props.currentUser} }} className="tile">
          <img src={album.cover}  alt="broken" />
        </Link>
        <p>{album.title}</p>
        <p>{album.artist}</p>
      </div>
    )

    return (
      <div className="albums-column">
          {albumCovers}
      </div>
    )
  }
}

export default Library
