DROP TABLE IF EXISTS habit_confirmation;

CREATE TABLE habit_confirmation (
    id serial PRIMARY KEY,
    userHabitID VARCHAR(50) NOT NULL,
    completion_date DATE,
    confirmation BOOLEAN DEFAULT FALSE,
    -- confirmation NUMBER(1), CONSTRAINT booleanCheck CHECK (confirmation IN(1, 0)),
    total_time INT
);
