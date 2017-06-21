const express = require( 'express' )
const app = express()
const cors = require( 'cors' )
const pgp = require( 'pg-promise' )
const bodyParser = require( 'body-parser' )
const { Albums, Reviews, Users } = require( './db.js' )

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( cors() )

app.get( '/albums', ( request, response ) => {
  Albums.getAllAlbums()
  .then( results => response.json( results ) )
  .catch( error => console.log( 'error', error ) )
})

app.get( '/reviews', ( request, response ) => {
  Reviews.getAllReviews()
  .then( results => response.json( results ) )
  .catch( error => console.log( 'error', error ) )
})

app.get( '/users', ( request, response ) => {
  Users.getAllUsers()
  .then( results => response.json( results ) )
  .catch( error => console.log( 'error', error ) )
})

app.get( '/albums/:id', ( request, response ) => {
  const { id } = request.params
  Albums.getAlbumById( id )
    .then( results => response.json( results ) )
    .catch( error => console.log( 'error', error ) )
})

app.get( '/users/:id', ( request, response ) => {
  const { id } = request.params
  Users.getUserById( id )
    .then( results => response.json( results ) )
    .catch( error => console.log( 'error', error ) )
})

app.get( '/reviews/albums/:id', ( request, response ) => {
  const { id } = request.params
  Reviews.getReviewByAlbumId( id )
    .then( results => response.json( results ) )
    .catch( error => console.log( 'error', error ) )
})

app.get( '/reviews/users/:id', ( request, response ) => {
  const { id } = request.params
  Reviews.getReviewByUserId( id )
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

app.post( '/users/new', ( request, response ) => {
  const { user } = request.body
  Users.createUser( user )
    .then( () => response.json({ 1: 'posted' }) )
    .catch( error => console.log( 'error', error ) )
})

app.listen(5000, () => {
  console.log('Database API for vinyl is listening on port 5000!')
})
