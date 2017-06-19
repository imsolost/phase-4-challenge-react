import React, { Component } from 'react'
import InlineEdit from 'react-edit-inline'
import { Link } from 'react-router'

class AlbumDetails extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      album: {}
    }
  }

  componentDidMount() {
    this.getAlbum( this.props.params.id )
  }

  getAlbum = ( input ) => {
    fetch(`http://localhost:5000/${input}`, {
      method: 'get',
    })
    .then( response => response.json() )
    .then( results => this.setState( { album: results } ) )
  }

  editAlbum = ( data, field ) => {
    let album = this.state.album
    // console.log( 'album details data =====>', data )
    // check this code
    album.author = data.message

    fetch( `http://localhost:5000/${album.id}/${field}`, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({ input: data.message })
    })
      .then( response => response.json() )
      .then( results => {
        console.log('results', results)
        //should not be author, should be field variable
         this.setState({ author: results })
       })
  }

  removeAlbum = () => {
    let album = this.state.album
    fetch(`http://localhost:5000/delete/${album.id}`, {
      method: 'delete',
    })
  }

  render() {
    const album = this.state.album
    const fieldsList = Object.keys(album).slice(1)
    const inlineEdits = fieldsList.map( fieldName => {
      return (
        <InlineEdit
          activeClassName="editing"
          text={album[fieldName]}
          paramName="message"
          change={ data => this.editAlbum(data, fieldName) }
          key={fieldName}/>
      )
    })

    return (
      <div>
        <img src={album.cover}  alt="broken" />
        <p>{inlineEdits[0]}</p>
        <p>{inlineEdits[1]}</p>
        <Link to='/'><button>Home</button></Link>
        <Link to='/' onClick={this.removeAlbum}><button>Delete</button></Link>
      </div>
    )
  }
}

export default AlbumDetails
