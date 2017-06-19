const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const pgp = require( 'pg-promise' )
const bodyParser = require( 'body-parser' )
const Albums = require( './db.js' )

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( cors() )

app.get( '/all', ( request, response ) => {
  Albums.getAll()
  .then( results => response.json( results ) )
  .catch( error => console.log( 'error', error ) )
})

app.get( '/:id', ( request, response ) => {
  const { id } = request.params
  Albums.getOne(id)
    .then( results => response.json( results ) )
    .catch( error => console.log( 'error', error ) )
})

app.get( '/search/:input', ( request, response ) => {
  let { input } = request.params
  Albums.search( input )
    .then( results => response.json( results ) )
    .catch( error => console.log( 'error', error ) )
})

app.delete( '/delete/:id', ( request, response ) => {
  const { id } = request.params
  Albums.deleteOne( id )
    .then( () => response.json({ 1: 'success' }) )
    .catch( error => console.log( 'error', error ) )
})

app.put( '/:id/:field' , ( request, response ) => {
  const id = request.params.id
  const field = request.params.field
  const { input } = request.body
  Albums.updateAlbum( id, field, input )
    .then( () => response.json({ 1: 'updated' }) )
    .catch( error => console.log( 'error', error ) )
})

app.post( '/new', ( request, response ) => {
  const { album } = request.body
  Albums.createAlbum(album)
    .then( () => response.json({ 1: 'posted' }) )
    .catch( error => console.log( 'error', error ) )
})

app.listen(5000, () => {
  console.log('Database API for vinyl is listening on port 5000!')
})
