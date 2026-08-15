CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (title, completed)
SELECT 'Learn Git', TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM tasks WHERE title = 'Learn Git'
);

INSERT INTO tasks (title, completed)
SELECT 'Learn Docker', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM tasks WHERE title = 'Learn Docker'
);