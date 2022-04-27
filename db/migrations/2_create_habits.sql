DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    habit_name VARCHAR(100) NOT NULL,
    habit_category VARCHAR(100) NOT NULL
);
