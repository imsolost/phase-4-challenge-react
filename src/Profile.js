import React, { Component } from 'react'
import { Link } from 'react-router'

class Profile extends Component {

  render() {

    const albums = this.props.albums

    const albumCovers = albums.map( album =>
      <div key={album.id}>
        <Link to={{pathname: '/albums/' + album.id, query: album.id}} className="tile">
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

export default Profile
