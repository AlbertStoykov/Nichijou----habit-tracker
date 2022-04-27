DROP TABLE IF EXISTS recurring_habits;

CREATE TYPE schedule_day AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'No Day');

CREATE TABLE recurring_habits (
    id serial PRIMARY KEY,
    userID VARCHAR(50) NOT NULL,
    habitID VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1024),
    day schedule_day, 
    schedule_time TIME NOT NULL
);
