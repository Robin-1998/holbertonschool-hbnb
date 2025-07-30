-- Table pour users
CREATE TABLE IF NOT EXISTS users (
	id CHAR(36) PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	is_admin BOOLEAN DEFAULT FALSE
);


-- Table pour places
CREATE TABLE IF NOT EXISTS places (
	id CHAR(36) PRIMARY KEY,
	title VARCHAR(255) NOT NUll,
	description TEXT,
	_price DECIMAL(10, 2) NOT NULL,
	_latitude FLOAT NOT NULL,
	_longitude FLOAT NOT NULL,
	owner_id CHAR(36),
	Foreign Key (owner_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Table pour reviews
CREATE TABLE IF NOT EXISTS reviews (
	id CHAR(36) PRIMARY KEY,
	text TEXT NOT NULL,
	rating INT CHECK (rating BETWEEN 1 AND 5),
	user_id CHAR(36) NOT NULL,
	place_id CHAR(36) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
	UNIQUE (user_id, place_id)
);


-- Table pour Amenities
CREATE TABLE IF NOT EXISTS amenities (
	id CHAR(36) PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL
);


-- Table pour la liaison places Amenitie
CREATE TABLE IF NOT EXISTS place_amenity (
	place_id CHAR(36),
	amenity_id CHAR(36),
	PRIMARY KEY (place_id, amenity_id),
	Foreign Key (place_id) REFERENCES places(id) ON DELETE CASCADE,
	FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- INSERT for places_amenity Table
INSERT INTO place_amenity (place_id, amenity_id)
VALUES 
	('c1a4b9de-7fcb-4df4-89c7-9a7f62c5f3b2', 'ec8cc2a0-a295-4a8f-b13a-b7f6c04a35f1'),
	('461c8021-3920-4ef4-9002-5600a4bf2a9f', 'ec8cc2a0-a295-4a8f-b13a-b7f6c04a35f1'),
	('461c8021-3920-4ef4-9002-5600a4bf2a9f', '9c2b73f1-0de4-4b83-95d5-5f2e6d7fc6e8'),
	('461c8021-3920-4ef4-9002-5600a4bf2a9f', '4fa7b2e6-1db1-4a29-b8a0-7156543cdb69'),
	('461c8021-3920-4ef4-9002-5600a4bf2a9f', 'd81f3429-3c8a-4c31-981e-9a07a1b10d47'),
	('7ee30d8d-33f5-4ac2-b344-1daff39e46fa', 'b6f3d3c2-7125-4f59-a3a6-1b8f6a1e9ef4'),
	('7ee30d8d-33f5-4ac2-b344-1daff39e46fa', 'e2a6c7d4-9f0e-4724-bc80-97b2d28d9050'),
	('7ee30d8d-33f5-4ac2-b344-1daff39e46fa', '5de2fbc1-c02f-43d3-9732-8a90b1f8ec66'),
	('ce3b57ca-fc49-4cec-b21c-f3daf5280b9e', '64adf0cd-0e00-4f53-85b3-26744c8e52e2'),
	('ce3b57ca-fc49-4cec-b21c-f3daf5280b9e', 'ec8cc2a0-a295-4a8f-b13a-b7f6c04a35f1'),
	('ce3b57ca-fc49-4cec-b21c-f3daf5280b9e', '51234158-fb59-476e-b25f-2fdaef4c32a5'),
	('ce3b57ca-fc49-4cec-b21c-f3daf5280b9e', '93e226e6-a1b6-4363-8987-a1061e9ea7e9'),
	('ce3b57ca-fc49-4cec-b21c-f3daf5280b9e', '0a2e54ca-834a-4f8a-8490-86408c5f923f'),
	('a1780f45-7d32-417e-a536-337f37de5424', 'a7c5e81b-3d4e-4c7a-bb71-2d654fd739be'),
	('a1780f45-7d32-417e-a536-337f37de5424', '3f9b2c6d-7a51-4e80-b9d3-2cfd4e7aef15'),
	('a1780f45-7d32-417e-a536-337f37de5424', 'c4e8a9f2-63b7-4d91-9b3c-5a7f0248e2d1'),
	('a1780f45-7d32-417e-a536-337f37de5424', 'b8ed61fd-e9cd-4c33-81e7-19cee06a3337'),
	('17bc2dbc-6b4d-4d2c-a7b3-8cd5ceff774d', 'ec8cc2a0-a295-4a8f-b13a-b7f6c04a35f1'),
	('17bc2dbc-6b4d-4d2c-a7b3-8cd5ceff774d', '3a1b4451-db0d-4e80-a682-c8d462f44a4d'),
	('17bc2dbc-6b4d-4d2c-a7b3-8cd5ceff774d', 'caa00a8e-1536-4629-90d5-0bb86a252cef'),
	('17bc2dbc-6b4d-4d2c-a7b3-8cd5ceff774d', '0a2e54ca-834a-4f8a-8490-86408c5f923f'),
	('15ed065a-a0a6-4335-98ec-828643bb1def', '9d768f24-baba-44eb-947c-7fbce971dc93'),
	('15ed065a-a0a6-4335-98ec-828643bb1def', '02eb5127-91ba-4daf-b2f0-42fd4d50fe0e'),
	('b22e9936-2f7c-4516-9a71-f588acc5c582', '397aede6-977e-4e56-bdc6-f55c072f84b0'),
	('b22e9936-2f7c-4516-9a71-f588acc5c582', '56f6b364-0dea-4b9a-ac5b-d47384a50668'),
	('b22e9936-2f7c-4516-9a71-f588acc5c582', '74bd5cb7-8291-4558-91aa-d0d7543a342c'),
	('b22e9936-2f7c-4516-9a71-f588acc5c582', 'ec8cc2a0-a295-4a8f-b13a-b7f6c04a35f1');


-- INSERT for users Table
-- users de base (Administrateur avec mot de passe hacé génréré avec https://bcrypt-generator.com)
INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at)
VALUES(
	'36c9050e-ddd3-4c3b-9731-9f487208bbc1',
	'Admin',
	'HBnB',
	'admin@hbnb.io',
	'$2a$12$MAEf7iqXk.dg2KediiYNvOHcw4DSpnjWxsOd3Xv8BAJwKrE8AHQ1O',
	TRUE,
	datetime('now')
);

INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at)
VALUES(
	'e9cb3581-7058-4c12-9c73-3d3fe56c06e8',
	'Test-users',
	'A supprimer',
	'test-usersasupprimer@gmail.com',
	'$2a$12$L0n.fHHrJdIydlge4yhzOOJDr9HSz/LvI7GzS.ke4gpn/3uj.kCbG',
	FALSE,
	datetime('now')
);

INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at)
VALUES(
	'3e2a1b40-9d9f-4c6b-a2db-8e4f12e645a1',
	'users-update',
	'holberton',
	'holberton@gmail.com',
	'$2a$12$4pHCLukTh30/W6LAJJn/O.dZosp7.u0DSWqmhX2lKbyQkTWfiSTBO',
	FALSE,
	datetime('now')
);

INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at)
VALUES(
	'a3f82e18-4b94-4ed6-b7c6-8a35f3edbb01',
	'Ronvid',
	'du-petit-marais',
	'ronvid@gmail.com',
	'$2a$12$bKT/4WgcFOWcS8PSBOA1gOvZpphNkCmtMKxgb/lSf6UGDoQjQ0E0y',
	-- mdp : myrtille
	FALSE,
	datetime('now')
);

INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at)
VALUES(
	'f3cba417-98d2-4c29-8eb3-7b8f9cb4e8d1',
	'Rob',
	'Gondor',
	'gondor@gmail.com',
	'$2a$12$sAS.6qE0cKgI8lb2jtvS6u/i5N82pLYQ8ACMUAP9IR/HzxZlqRhIG',
	-- mdp : city
	TRUE,
	datetime('now')
);

INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at)
VALUES(
	'96c6cf13-0f8a-4b7d-a283-d453fe7922a0',
	'Renato',
	'Baldi',
	'moumoune@gmail.com',
	'$2a$12$U63R2HDDqeLZ08lu0RD2m.qruxpZJBTU4lEK2ar9aoJBby47ASwSG',
	-- mdp : minou
	FALSE,
	datetime('now')
);

INSERT INTO users (id, first_name, last_name, email, password, is_admin, created_at)
VALUES(
	'f30c0e51-36a8-4796-a3e7-108a2bd72504',
	'Boromir',
	'Cor',
	'les_trois_moustiquaires@gmail.com<',
	'$2a$12$nSa.UV20esa5XyaPzjCuduxKwSvUfxfxvzyhOYaMMPvZ3HtJyp63S',
	-- mdp : watashiwa
	TRUE,
	datetime('now')
);

-- INSERT for amenities Table
INSERT INTO amenities (id, name, created_at) VALUES 
	('ec8cc2a0-a295-4a8f-b13a-b7f6c04a35f1', 'Wi-Fi', datetime('now')),
	('64adf0cd-0e00-4f53-85b3-26744c8e52e2', 'Swimming pool', datetime('now')),
	('51234158-fb59-476e-b25f-2fdaef4c32a5', 'Climatisation', datetime('now')),
	('2f3b62b8-c01d-4a6e-9fe2-c3c1d6f601d7', 'Vieille Télévision à changer', datetime('now')),
	('8b0a9e13-4de6-41f4-86bb-cde4d68b6e6b', 'Cafetière cassé à supprimer', datetime('now')),
	('9c2b73f1-0de4-4b83-95d5-5f2e6d7fc6e8', 'Fully equipped bathroom', datetime('now')),
	('4fa7b2e6-1db1-4a29-b8a0-7156543cdb69', 'Home cinema', datetime('now')),
	('d81f3429-3c8a-4c31-981e-9a07a1b10d47', 'Jacuzzi on the premises', datetime('now')),
	('b6f3d3c2-7125-4f59-a3a6-1b8f6a1e9ef4', 'Dilapidated barbecue', datetime('now')),
	('e2a6c7d4-9f0e-4724-bc80-97b2d28d9050', 'Chair made from human bones', datetime('now')),
	('5de2fbc1-c02f-43d3-9732-8a90b1f8ec66', 'Natural heating with volcano nearby', datetime('now')),
	('a7c5e81b-3d4e-4c7a-bb71-2d654fd739be', 'Barbecue', datetime('now')),
	('3f9b2c6d-7a51-4e80-b9d3-2cfd4e7aef15', 'Butcher-style kitchen', datetime('now')),
	('c4e8a9f2-63b7-4d91-9b3c-5a7f0248e2d1', 'Free parking (beware of sharp objects)', datetime('now')),
	('b8ed61fd-e9cd-4c33-81e7-19cee06a3337', 'Only dog friendly', datetime('now')),
	('93e226e6-a1b6-4363-8987-a1061e9ea7e9', 'Pet friendly', datetime('now')),
	('0a2e54ca-834a-4f8a-8490-86408c5f923f', 'An arrival organised by Moumoune at the accommodation', datetime('now')),
	('caa00a8e-1536-4629-90d5-0bb86a252cef', 'Paid parking', datetime('now')),
	('3a1b4451-db0d-4e80-a682-c8d462f44a4d', 'Arena for the behior', datetime('now')),
	('9d768f24-baba-44eb-947c-7fbce971dc93', 'Library', datetime('now')),
	('02eb5127-91ba-4daf-b2f0-42fd4d50fe0e', 'golem servant', datetime('now')),
	('397aede6-977e-4e56-bdc6-f55c072f84b0', 'fully equipped shower with three shells', datetime('now')),
	('56f6b364-0dea-4b9a-ac5b-d47384a50668', 'secret room for storing weapons', datetime('now')),
	('74bd5cb7-8291-4558-91aa-d0d7543a342c', 'robot maintenance included', datetime('now'));

-- INSERT for places Table
INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'c1a4b9de-7fcb-4df4-89c7-9a7f62c5f3b2',
	'Minas Tirith',
	'The White City welcomes only the faithful of Gondor.',
	10000,
	-59,
	89,
	'36c9050e-ddd3-4c3b-9731-9f487208bbc1',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'5de9fca1-2e2b-4e32-bc94-1ec4cc6eeb7d',
	'Mordor',
	'Terre stérile à supprimer',
	1,
	-23,
	-45,
	'3e2a1b40-9d9f-4c6b-a2db-8e4f12e645a1',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'1aa301e0-3cc9-4a3a-804c-84cfcd034181',
	'Gouffre de Helm',
	'Besoin de travaux après bataille',
	100,
	-15,
	67,
	'36c9050e-ddd3-4c3b-9731-9f487208bbc1',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'461c8021-3920-4ef4-9002-5600a4bf2a9f',
	'Small villa with character',
	'The villa is located in Nice with a view of the beach',
	300,
	-10,
	123.2,
	'f3cba417-98d2-4c29-8eb3-7b8f9cb4e8d1',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'7ee30d8d-33f5-4ac2-b344-1daff39e46fa',
	'Building with a view of a putrid swamp in Mordor',
	'Apartment with a lovely view of a marsh inhabited by damned elf spirits',
	50,
	100,
	-20,
	'f30c0e51-36a8-4796-a3e7-108a2bd72504',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'ce3b57ca-fc49-4cec-b21c-f3daf5280b9e',
	'The pit to the madwomen',
	'A place where you often have to look behind you',
	125.99,
	0.21,
	6.21,
	'f3cba417-98d2-4c29-8eb3-7b8f9cb4e8d1',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'a1780f45-7d32-417e-a536-337f37de5424',
	'The house with eyes',
	'House with special neighbours',
	15,
	66,
	6.6,
	'96c6cf13-0f8a-4b7d-a283-d453fe7922a0',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'17bc2dbc-6b4d-4d2c-a7b3-8cd5ceff774d',
	'Dungeon of the Three mosquito nets',
	'An ancestral place renovated by three nobles for history lovers and quest seekers',
	69,
	85,
	45,
	'f30c0e51-36a8-4796-a3e7-108a2bd72504',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'15ed065a-a0a6-4335-98ec-828643bb1def',
	'Mage tower',
	'It is said to be cursed and breed monsters',
	6.50,
	-56,
	-41,
	'a3f82e18-4b94-4ed6-b7c6-8a35f3edbb01',
	datetime('now')
);

INSERT INTO places (id, title, description, _price, _latitude, _longitude, owner_id, created_at)
VALUES(
	'b22e9936-2f7c-4516-9a71-f588acc5c582',
	'Appartment in the megabuilding',
	'It is located on the 8th floor of the H10 megabuilding, located in Little China, a sub-district of Watson in Night City.',
	750,
	-10,
	25,
	'f3cba417-98d2-4c29-8eb3-7b8f9cb4e8d1',
	datetime('now')
);

-- INSERT for reviews Table
INSERT INTO reviews (id, text, rating, user_id, place_id, created_at)
VALUES(
	'3c4e2c9d-1b80-4023-9f9b-d7b3d238de70',
	'Splendide arbre blanc en fleur',
	5,
	'e9cb3581-7058-4c12-9c73-3d3fe56c06e8',
	'c1a4b9de-7fcb-4df4-89c7-9a7f62c5f3b2',
	datetime('now')
);

INSERT INTO reviews (id, text, rating, user_id, place_id, created_at)
VALUES(
	'd7bcd4e0-df8f-4f77-9d7e-8a3de99fa624',
	'Très très moche, je suis épiée par un oeil énorme, à fuir !!',
	1,
	'36c9050e-ddd3-4c3b-9731-9f487208bbc1',
	'5de9fca1-2e2b-4e32-bc94-1ec4cc6eeb7d',
	datetime('now')
);

INSERT INTO reviews (id, text, rating, user_id, place_id, created_at)
VALUES(
	'6e329857-52ae-4f6c-ae1a-0ef7b87df181',
	"Beaucoup de poussière et des cadavres un peu partout, ce n'est pas très propre",
	3,
	'3e2a1b40-9d9f-4c6b-a2db-8e4f12e645a1',
	'1aa301e0-3cc9-4a3a-804c-84cfcd034181',
	datetime('now')
);

INSERT INTO reviews (id, text, rating, user_id, place_id, created_at)
VALUES(
	'81f9db75-75b1-437a-b661-4aa50ca9546f',
	"Nice view of Nightcity",
	4,
	'f30c0e51-36a8-4796-a3e7-108a2bd72504',
	'b22e9936-2f7c-4516-9a71-f588acc5c582',
	datetime('now')
);

-- Select for some tables
SELECT * FROM users;
SELECT * FROM places;
SELECT * FROM reviews;
SELECT * FROM amenities;
SELECT * FROM place_amenity;


-- UPDATE for some tables
UPDATE users
SET first_name = 'Isildur',
	updated_at = CURRENT_TIMESTAMP
WHERE last_name = 'holberton';

UPDATE places
SET description = 'The work is complete',
	updated_at = CURRENT_TIMESTAMP
WHERE title = 'Gouffre de Helm';

UPDATE amenities
SET name = 'Télévision nouvelle',
	updated_at = CURRENT_TIMESTAMP
WHERE id = '2f3b62b8-c01d-4a6e-9fe2-c3c1d6f601d7';

UPDATE reviews
SET text = 'à fuir !!',
	updated_at = CURRENT_TIMESTAMP
WHERE rating = 3;


-- Delete for some tables
DELETE FROM reviews WHERE rating = 1;
DELETE FROM amenities WHERE name = 'Cafetière cassé à supprimer';
DELETE FROM places WHERE title = 'Mordor';
DELETE FROM users WHERE last_name = 'A supprimer';
