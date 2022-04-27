TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users (first_name, last_name, username, user_password, email) 
VALUES
('Test User 1',
 'Test User 1',
 'user1',
 'hashed',
 'user1@gmail.com'
 ),
('Test User 2',
 'Test User 2',
 'user2',
 'hashed',
 'user1@gmail.com');

INSERT INTO habits (habit_name, habit_category) 
VALUES
(
    'testHabit1', 'testHabitCat1'
),
(
    'testHabit2', 'testHabitCat2'
),
(
    'testHabit3', 'testHabitCat3'
);
