const fs = require( 'fs' )
if ( fs.existsSync( '.env' ) ) {
  require( 'dotenv' ).config()
}

const pgp = require( 'pg-promise' )()
const connectionString = `pg://${process.env.USER}@localhost:5432/vinyl`
const db = pgp( connectionString )

const Albums = {
  getAll: () => db.any("SELECT * FROM albums ORDER BY title ASC", []),

  getOne: ( id ) => db.one("SELECT * FROM albums WHERE id = $1", [id]),

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

  createAlbum: ({ title, artist, cover }) => db.any("INSERT INTO albums (title, artist, cover) VALUES ($1, $2, $3)", [title, artist, cover])
}

module.exports = Albums
