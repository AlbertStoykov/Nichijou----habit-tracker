
DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    user_id int,
    body varchar(140) NOT NULL
);

