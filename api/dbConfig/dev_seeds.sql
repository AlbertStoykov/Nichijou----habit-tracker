INSERT INTO users (first_name, last_name, username,email,user_password) 
VALUES
('Al', 'Capone', 'alCapone', 'capone@gmail.com','hashed password'),
('Bob', 'Stones', 'Bobby', 'stones@gmail.com','hashed password'),
('Kev', 'Smith', 'kevin', 'kev@gmail.com','hashed password');

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
);

INSERT INTO recurring_habits (userID, habitID, title, description, day, schedule_time)
VALUES

(
    'Bobby', 
    1,
    'Reading', 
    'Read for 1 hour',
    'Monday',
    '21:30'
),

(
    'kevin', 
    2,
    'Running', 
    'Ran for 1 hour',
    'Wednesday',
    '16:30'
),

(
    'alCapone', 
    3,
    'Painting', 
    'Painted for 2 hours',
    'Sunday',
    '14:30'
);

INSERT INTO habit_confirmation (userHabitID, completion_date, confirmation, total_time)
VALUES 

(
    1,
    TO_DATE('25/04/2022', 'DD/MM/YYYY'), 
    FALSE,
    1
),

(
    2,
    TO_DATE('25/04/2022', 'DD/MM/YYYY'), 
    TRUE,
    1
),

(
    3,
    TO_DATE('24/04/2022', 'DD/MM/YYYY'), 
    TRUE,
    2
);
