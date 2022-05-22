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

const getEmployees = function() {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT * FROM employees";
        db.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            }
            const employeesArray = [];
            for (let i=0; i<result.length; i++) {
                const empObj = {
                    id: result[i].id,
                    name: result[i].first_name + " " + result[i].last_name
                };
                employeesArray.push(empObj);
            }
            return resolve(employeesArray);
        });
    });
};

const getRoles = function() {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT * FROM roles";
        db.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            }
            const rolesArray = [];
            for (let i=0; i<result.length; i++) {
                const roleObj = {
                    id: result[i].id,
                    title: result[i].job_title
                };
                rolesArray.push(roleObj);
            }
            return resolve(rolesArray);
        });
    });
};

const updateEmployee = function(emp, newRole) {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT id FROM roles WHERE job_title = ?";
        db.query(queryString, newRole, function(err, result) {
            if (err) {
                return reject(err);
            }
            const newRoleId = result[0].id;
            const queryString = "UPDATE employees SET ? WHERE ?";
            db.query(queryString,[{role_id: newRoleId},{id: emp}],function(err, result) {
                    if (err) {
                        console.log('error with update')
                        return; 
                    }
                    console.log("Employee's role successfully updated!");
                    return resolve();
                });
        });
    });
    
}

module.exports = {
    displayDepartments, 
    displayRoles, 
    displayEmployees,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee,
    getEmployees,
    getRoles
};