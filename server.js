const inquirer = require('inquirer');
// const express = require('express');
const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table');
const { displayDepartments, displayRoles, displayEmployees, addDepartment, addRole, addEmployee, updateEmployee } = require('./routes');

const addDept = () => {
    inquirer.prompt( {
        type: 'input',
        name: 'department',
        message: "What is the department name?",
        validate: departmentInput => {
            if (departmentInput) {
            return true;
            } else {
            console.log('Please enter the department title')
            return false;
            }
  }})
  .then(({ department }) => {
      addDepartment(department);
      console.log('Added '+ department +' to the database');
      askQuestion();
    });
};

const roleData = () => {
    inquirer.prompt( {
        type: 'input',
        name: 'role',
        message: "What is the name of the role?",
        validate: roleInput => {
            if (roleInput) {
            return true;
            } else {
            console.log('Please enter the role name')
            return false;
            }
  }})
  .then(({ role }) => {
                inquirer.prompt( {
                        type: 'input',
                        name: 'salary',
                        message: "What is the salary for this role?",
                        validate: salaryInput => {
                            if (salaryInput) {
                            return true;
                            } else {
                            console.log('Please enter the role salary')
                            return false;
                            }
                }})
                .then(({ salary }) => {
                                inquirer.prompt( {
                                        type: 'input',
                                        name: 'department',
                                        message: "What department does this role belong to?",
                                        validate: departmentInput => {
                                            if (departmentInput) {
                                            return true;
                                            } else {
                                            console.log('Please enter the department')
                                            return false;
                                            }
                                }})
                                .then(({ department }) => {
                                   console.log('Added '+ role +' to the database');
                                    const data = "'" + role + "', " + "'" + salary + "', " + department;
                                    addRole(data);
                                    askQuestion();
                                    });
                                    });
                                });
                                };

const employeeData = () => {
        inquirer.prompt( {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: first_nameInput => {
                if (first_nameInput) {
                return true;
                } else {
                console.log('Please enter the first name')
                return false;
                }
      }})
      .then(({ first_name }) => {
                    inquirer.prompt( {
                            type: 'input',
                            name: 'last_name',
                            message: "What is the employee's last name?",
                            validate: last_nameInput => {
                                if (last_nameInput) {
                                return true;
                                } else {
                                console.log("Please enter the employee's last name")
                                return false;
                                }
                    }})
                    .then(({ last_name }) => {
                                    inquirer.prompt( {
                                            type: 'input',
                                            name: 'role',
                                            message: "What is the employee's role?",
                                            validate: roleInput => {
                                                if (roleInput) {
                                                return true;
                                                } else {
                                                console.log("Please enter the employee's role")
                                                return false;
                                                }
                                    }})
                                    .then(({ role }) => {
                                                    inquirer.prompt( {
                                                        type: 'input',
                                                        name: 'manager',
                                                        message: "Who is the employee's manager?",
                                                        validate: managerInput => {
                                                            if (managerInput) {
                                                            return true;
                                                            } else {
                                                            console.log("Please enter the employee's manager")
                                                            return false;
                                                            }
                                                }})
                                                .then(({ manager }) => {
                                                    console.log('Added '+ first_name +' to the database');
                                                    const data = "'" + first_name + "', " + "'" + last_name + "', " + role + ", " + manager;
                                                    addEmployee(data);
                                                    askQuestion();
                                                    });
                                                    });
                                                });
                                    });
                                    };


const initializePogram = () => {
inquirer.prompt( {
    type: 'list',
    name: 'view',
    message: 'What would you like to do?',
    choices: ['View all departments','View all roles','View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
  })
  .then(({ view }) => {
    if (view === 'View all departments') {
    displayDepartments()
    // askQuestion();
  } else if (view === 'View all roles'){
    console.log('view roles')
    displayRoles()
  } else if (view === 'View all employees'){
    displayEmployees()
  } else if (view === 'Add a department'){
    addDept()  
  } else if (view === 'Add a role'){
    roleData()  
  } else if (view === 'Add an employee'){
    employeeData()  
  } else if (view === 'Update an employee role'){
    updateEmployee()  
  }
});
};

const askQuestion = () => {
    initializePogram();
}


initializePogram();

// const PORT = process.env.PORT || 3001;
// const app = express();
// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//   // Default response for any other request (Not Found)
//   app.use((req, res) => {
//     res.status(404).end();
//   });


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });