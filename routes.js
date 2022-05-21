const db = require('./db/connection');
const cTable = require('console.table');
const mysql = require('mysql2');

const displayDepartments = function() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('No departments');
            return;
        } else {
            console.table(results);
            return;
        };
    });
};

const displayRoles = () => {
    const sql = `SELECT departments.name, roles.id, roles.job_title, roles.salary FROM roles
                 LEFT JOIN departments ON roles.department_id = departments.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('There are no roles');
            return;
        } else {
            console.table(results);
            return;
        };
    });
};

const displayEmployees = function() {
    const sql = `SELECT departments.name, roles.job_title, roles.salary, employees.id, employees.first_name, employees.last_name, employees.manager_id
                 FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN departments ON roles.department_id = departments.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('No employees');
            return;
        } else {
            console.table(results);
            return;
        };
    });
};

const addDepartment = function(deptValue) {
    const sql = `INSERT INTO departments (name)
                 VALUES ('${deptValue}');`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error with adding department')
            return;
        } else {
            return;
        };
    });
};

const addEmployee = function(empData) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (${empData})`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error with adding employee')
            return;
        } else {
            return;
        };
    });
};

const addRole = function(roleData) {
    const sql = `INSERT INTO roles (job_title, salary, department_id)
    VALUES (${roleData})`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error with adding role')
            return;
        } else {
            return;
        };
    });
};

const updateEmployee = () => {
    const sql = `SELECT`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error with updating employee')
            return;
        } else {
            console.table(results);
            return;
        };
    });
};

module.exports = {
    displayDepartments, 
    displayRoles, 
    displayEmployees,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee
};