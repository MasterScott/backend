CREATE TABLE users
(
    id INTEGER PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50)
);
CREATE UNIQUE INDEX users_email_uindex ON users (email);

CREATE TABLE records
(
    user_id INTEGER NOT NULL,
    imageurl VARCHAR(100),
    audiourl VARCHAR(100) NOT NULL,
    daterecorded TIMESTAMP NOT NULL,
    location GEOGRAPHY NOT NULL,
    CONSTRAINT records_pkey PRIMARY KEY (user_id, daterecorded),
    CONSTRAINT records_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE EXTENSION postgis;
