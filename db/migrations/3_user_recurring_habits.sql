DROP TABLE IF EXISTS recurring_habits;

CREATE TABLE recurring_habits (
    id serial PRIMARY KEY,
    userID VARCHAR(50) NOT NULL, --??
    habitID VARCHAR(50) NOT NULL, --??
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1024),
    schedule_day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'No Day'),
    schedule_time TIME NOT NULL
);
