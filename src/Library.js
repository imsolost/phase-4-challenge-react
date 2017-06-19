import React, { Component } from 'react'
import { Link } from 'react-router'

class Library extends Component {

  render() {

    const albums = this.props.albums

    const albumCovers = albums.map( album =>
      <Link to={{pathname: '/albums/' + album.id, query: album.id}} key={album.id} className="tile">
        <img src={album.cover}  alt="broken" />
        {album.title}
      </Link>
    )

    return (
      <div className="row__inner">
          {albumCovers}
      </div>
    )
  }
}

export default Library
