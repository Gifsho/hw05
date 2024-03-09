CREATE TABLE movies (
    mid INT PRIMARY KEY,
    title VARCHAR(255),
    plot TEXT,
    genre VARCHAR(255)
);

CREATE TABLE persons (
    pid INT PRIMARY KEY,
    name VARCHAR(255),
    birthday DATE,
    type ENUM('Director', 'Actor'),
    bio TEXT
);

CREATE TABLE creators (
    movieName INT,
    personName INT,
    FOREIGN KEY (movieName) REFERENCES movies(mid),
    FOREIGN KEY (personName) REFERENCES persons(pid)
);

CREATE TABLE stars (
    movieName INT,
    personName INT,
    FOREIGN KEY (movieName) REFERENCES movies(mid),
    FOREIGN KEY (personName) REFERENCES persons(pid)
);


INSERT INTO movies (mid, title, plot, genre)
VALUES 
    (1, 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'Drama'),
    (2, 'The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'Crime, Drama'),
    (3, 'The Dark Knight', 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', 'Action, Crime, Drama'),
    (4, 'Schindler''s List', 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 'Biography, Drama, History'),
    (5, 'Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'Crime, Drama'),
    (6, 'The Lord of the Rings: The Return of the King', 'Gandalf and Aragorn lead the World of Men against Sauron''s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 'Adventure, Drama, Fantasy'),
    (7, 'Fight Club', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', 'Drama'),
    (8, 'Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', 'Drama, Romance'),
    (9, 'Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'Action, Adventure, Sci-Fi'),
    (10, 'The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'Action, Sci-Fi');

INSERT INTO persons (pid, name, birthday, type, bio)
VALUES 
    (1, 'Frank Darabont', '1959-01-28', 'Director', 'Frank Darabont is a Hungarian-American film director, screenwriter, and producer. He is best known for directing The Shawshank Redemption, The Green Mile, and The Mist.'),
    (2, 'Tim Robbins', '1958-10-16', 'Actor', 'Timothy Francis Robbins is an American actor, director, and screenwriter. He is known for his portrayal of Andy Dufresne in The Shawshank Redemption.'),
    (3, 'Morgan Freeman', '1937-06-01', 'Actor', 'Morgan Freeman is an American actor, director, and narrator. He is best known for his roles in The Shawshank Redemption, Se7en, and Million Dollar Baby.');

INSERT INTO creators (movieName, personName)
VALUES 
    (1, 1),
    (2, 1), 
    (3, 1), 
    (4, 1), 
    (5, 1), 
    (6, 1), 
    (7, 1), 
    (8, 1), 
    (9, 1), 
    (10, 1); 

INSERT INTO stars (movieName, personName)
VALUES 
    (1, 2), 
    (1, 3),
    (2, 3), 
    (3, 3), 
    (4, 3),
    (5, 3), 
    (6, 3), 
    (7, 3), 
    (8, 3), 
    (9, 3);
