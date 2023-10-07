CREATE DATABASE nexttripkuthe;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password)
VALUES
    ('Anushka', 'anushka@example.com', 'password123'),
    ('Geeta', 'geeta@example.com', 'securepass'),
    ('Vidya', 'vidya@example.com', 'securepass'),
    ('Siddhu mama', 'sidhu@example.com', 'securepass'),
    ('Amogh', 'amogh@example.com', 'password123'),
    ('Anil', 'anil@example.com', 'securepass'),
    ('Pradeep', 'pradeep@example.com', 'mysecret');

CREATE TABLE IF NOT EXISTS expenses (
    expense_id SERIAL PRIMARY KEY,
    reason VARCHAR(255) NOT NULL,
    money_paid DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS creditor_expense (
    expense_id INT REFERENCES expenses(expense_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY (expense_id, user_id)
);

CREATE TABLE IF NOT EXISTS debtor_expense (
    expense_id INT REFERENCES expenses(expense_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    money_paid DECIMAL(10, 2),
    PRIMARY KEY (expense_id, user_id)
);