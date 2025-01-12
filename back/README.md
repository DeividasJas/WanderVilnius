-- Create the `users` table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    password VARCHAR(255) NOT NULL
);

-- Create the `guides` table with `description` column
CREATE TABLE guides (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the `tours` table with participant constraints
CREATE TABLE tours (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_group BOOLEAN,
    location VARCHAR(255),
    maximum_participants INT NOT NULL,
    registered_participants INT DEFAULT 0 CHECK (registered_participants <= maximum_participants)
);

-- Create the `tour_times` table
CREATE TABLE tour_times (
    id SERIAL PRIMARY KEY,
    tour_id INT REFERENCES tours(id),
    tour_date_time TIMESTAMP
);

-- Create the `tour_guides` table
CREATE TABLE tour_guides (
    id SERIAL PRIMARY KEY,
    tour_id INT REFERENCES tours(id),
    guide_id INT REFERENCES guides(id),
    tour_date_time TIMESTAMP
);

-- Create the `registrations` table
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    tour_id INT REFERENCES tours(id),
    tour_time_id INT REFERENCES tour_times(id),
    creation_date_time TIMESTAMP
);

-- Create the `comments_ratings` table
CREATE TABLE comments_ratings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    tour_id INT REFERENCES tours(id),
    comment TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    creation_date_time TIMESTAMP
);
