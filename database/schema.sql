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
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id int,
  album_id int,
  comments VARCHAR(3000),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (album_id) REFERENCES albums(id)
);

-- DROP TABLE IF EXISTS reviews;
-- CREATE TABLE reviews (
--   id SERIAL PRIMARY KEY,
--   user_name VARCHAR(255),
--   album_title VARCHAR(255),
--   comments VARCHAR(3000),
--   FOREIGN KEY (user_name) REFERENCES users(name),
--   FOREIGN KEY (album_title) REFERENCES albums(title)
-- );

INSERT INTO
  albums (title, artist, cover)
VALUES
  ('Malibu', 'Anderson .Paak', 'https://upload.wikimedia.org/wikipedia/en/0/01/Anderson-Park-Malibu-Cover-Billboard-650x650.jpg'),
  ('A Seat at the Table', 'Solange Knowles', 'https://upload.wikimedia.org/wikipedia/en/8/8d/Solange_-_A_Seat_at_the_Table.png'),
  ('Melodrama', 'Lorde', 'https://upload.wikimedia.org/wikipedia/en/e/ef/Lorde_Melodrama_album_cover_2017_03_02.jpg'),
  ('In Rainbows', 'Radiohead', 'https://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg');

INSERT INTO
  users
VALUES
(1, 'first user', 'email@gmail.com', 'password'),
(2, 'second user', 'second@gmail.com', '12345');

INSERT INTO
  reviews
VALUES
  (1, 1, 1, 'this is a good album'),
  (2, 1, 3, 'this is a great album'),
  (3, 2, 4, 'this is album made me cry');

-- INSERT INTO
--   reviews
-- VALUES
--   (1, 'first user', 'Malibu', 'this is a good album'),
--   (2, 'first user', 'Melodrama', 'this is a great album'),
--   (3, 'second user', 'In Rainbows', 'this is album made me cry');
