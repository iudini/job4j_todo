CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    created TIMESTAMP,
    done BOOLEAN,
    user_id INT NOT NULL REFERENCES t_user(id)
);

CREATE TABLE t_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(2000),
    password VARCHAR(255)
);