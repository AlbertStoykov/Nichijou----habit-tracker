INSERT INTO users (first_name, last_name, username, user_password, email) 
VALUES
('Al', 'Capone', 'alCapone', 'hashed password here', 'capone@gmail.com'),
('Bob', 'Stones', 'Bobby', 'hashed password here', 'stones@gmail.com'),
('Kev', 'Smith', 'kevin', 'hashed password here', 'kev@gmail.com');

INSERT INTO habits (habit_name, habit_category) 
VALUES

(
    'Running', 'Health' 
),

(
    'Sleep', 'Health' 
),

(
    'Sport', 'Health' 
),

(
    'Reading', 'Hobbies' 
),

(
    'Painting', 'Hobbies' 
)

INSERT INTO recurring_habits;
VALUES (userID, habitID, title, description, schedule_day, schedule_time)

(
    'Bobby', 
    1,
    "Reading", 
    "Read for 1 hour",
    "Monday",
    21:30
),

(
    'kevin', 
    2,
    "Running", 
    "Ran for 1 hour",
    "Wednesday",
    16:30
),

(
    'alCapone', 
    3,
    "Painting", 
    "Painted for 2 hours",
    "Sunday",
    14:30
)

INSERT INTO habit_confirmation;
VALUES (userHabitID, completion_date, confirmation, total_time)

(
    1,
    25/04/2022, 
    1,
    1
),

(
    2,
    25/04/2022, 
    1,
    1
),

(
    3,
    24/04/2022, 
    1,
    2
)
