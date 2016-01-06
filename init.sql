CREATE EXTENSION postgis;
CREATE TABLE users
(
    id INTEGER PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50)
);
CREATE UNIQUE INDEX users_email_uindex ON users (email);
CREATE SEQUENCE public.users_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq');
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

CREATE TABLE records
(
    user_id INTEGER NOT NULL,
    imageurl VARCHAR(100),
    audiourl VARCHAR(100),
    daterecorded TIMESTAMP NOT NULL,
    location GEOGRAPHY NOT NULL,
    CONSTRAINT records_pkey PRIMARY KEY (user_id, daterecorded),
    CONSTRAINT records_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);
