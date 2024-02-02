CREATE DATABASE company;

CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) UNIQUE NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(64) UNIQUE NOT NULL,
    password text NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    company_id int DEFAULT NULL,
    role text not null,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    company_id int not null,
    parent_id int DEFAULT NULL,
    day int NOT NULL,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE user_tasks(
    id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    task_id int NOT NULL,
    start_at date NOT NULL,
    end_at date NOT NULL,
    started_date date DEFAULT NULL,
    ended_date date DEFAULT NULL,
    status text DEFAULT 'took',
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES tasks(id)
);