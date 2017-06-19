DROP DATABASE IF EXISTS vinyl;
CREATE DATABASE vinyl;

\c vinyl

DROP TABLE IF EXISTS albums;
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  cover VARCHAR(1000)
);

INSERT INTO
  albums (title, artist, cover)
VALUES
  ('Malibu', 'Anderson .Paak', 'https://upload.wikimedia.org/wikipedia/en/0/01/Anderson-Park-Malibu-Cover-Billboard-650x650.jpg'),
  ('A Seat at the Table', 'Solange Knowles', 'https://upload.wikimedia.org/wikipedia/en/8/8d/Solange_-_A_Seat_at_the_Table.png'),
  ('Melodrama', 'Lorde', 'https://upload.wikimedia.org/wikipedia/en/e/ef/Lorde_Melodrama_album_cover_2017_03_02.jpg'),
  ('In Rainbows', 'Radiohead', 'https://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg')
;
