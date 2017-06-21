DROP DATABASE IF EXISTS vinyl;
CREATE DATABASE vinyl;

\c vinyl

DROP TABLE IF EXISTS albums CASCADE;
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  cover VARCHAR(1000)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  signupdate date NOT NULL DEFAULT CURRENT_DATE
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id int,
  album_id int,
  comments VARCHAR(3000),
  reviewdate date NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (album_id) REFERENCES albums(id)
);

INSERT INTO
  albums (title, artist, cover)
VALUES
  ('Malibu', 'Anderson .Paak', 'https://upload.wikimedia.org/wikipedia/en/0/01/Anderson-Park-Malibu-Cover-Billboard-650x650.jpg'),
  ('A Seat at the Table', 'Solange Knowles', 'https://upload.wikimedia.org/wikipedia/en/8/8d/Solange_-_A_Seat_at_the_Table.png'),
  ('Melodrama', 'Lorde', 'https://upload.wikimedia.org/wikipedia/en/e/ef/Lorde_Melodrama_album_cover_2017_03_02.jpg'),
  ('In Rainbows', 'Radiohead', 'https://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg');

INSERT INTO
  users (name, email, password)
VALUES
('first user', 'email@gmail.com', 'password'),
('second user', 'second@gmail.com', '12345');

INSERT INTO
  reviews (user_id, album_id, comments)
VALUES
  (1, 1, 'this is a good album'),
  (2, 2, 'this is a great album'),
  (1, 4, 'this is album made me cry'),
  (2, 3, 'this album is cray cray'),
  (2, 2, 'I am a potato');
