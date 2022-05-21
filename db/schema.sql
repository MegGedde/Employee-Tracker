DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    department_id INTEGER,
    department_name VARCHAR(30)
)

CREATE TABLE roles (
    job_title VARCHAR(30),
    role_id INTEGER,
    department VARCHAR(30),
    salary INTEGER
);

CREATE TABLE employees (
    id AUTO_INCREMENT INTEGER NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    job_title 
);