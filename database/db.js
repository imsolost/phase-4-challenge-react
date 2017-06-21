const fs = require( 'fs' )
if ( fs.existsSync( '.env' ) ) {
  require( 'dotenv' ).config()
}

const pgp = require( 'pg-promise' )()
const connectionString = `pg://${process.env.USER}@localhost:5432/vinyl`
const db = pgp( connectionString )

const Albums = {
  getAllAlbums: () => db.any("SELECT * FROM albums ORDER BY title ASC", []),

  getAlbumById: ( id ) => db.one("SELECT * FROM albums WHERE id = $1", [id]),

  search: ( input ) => {
    input = `%${input}%`
    return db.any("SELECT * FROM albums WHERE UPPER(title) LIKE UPPER($1) OR UPPER(artist) LIKE UPPER($1) ORDER BY title ASC", [input])
  },

  deleteOne: ( id ) => db.none("DELETE FROM albums WHERE id = $1"),

  updateAlbum: ( id, field, input ) => {
    if (field === 'title') {
      return db.none("UPDATE albums SET title = $2 WHERE id = $1", [id, input])
    }
    else if ( field === 'artist' ) {
      return db.none("UPDATE albums SET artist = $2 WHERE id = $1", [id, input])
    }
  },
}

const Reviews = {
  getAllReviews: () => db.any("SELECT * FROM reviews ORDER BY id DESC"),

  getReviewByAlbumId: ( album_id ) => db.any("SELECT * FROM reviews WHERE album_id = $1 ORDER BY id DESC", [album_id]),

  getReviewByUserId: ( user_id ) => db.any("SELECT * FROM reviews WHERE user_id = $1 ORDER BY id ASC", [user_id])
}

const Users = {
  getAllUsers: () => db.any("SELECT * FROM users ORDER BY id ASC", []),

  getUserById: ( id ) => db.one("SELECT * FROM users WHERE id = $1", [id]),

  createUser: ({ name, email, password }) => db.any("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password])
}

module.exports = { Albums, Reviews, Users }
