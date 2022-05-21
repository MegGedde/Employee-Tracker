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
    const sql = `SELECT * FROM roles
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
    const sql = `SELECT * FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id`;
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

const addDepartment

const addEmployee

const addRole

const updateEmployee

module.exports = {
    displayDepartments, 
    displayRoles, 
    displayEmployees,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee
};