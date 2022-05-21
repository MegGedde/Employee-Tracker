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
    })
;}




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
    addRole()  
  } else if (view === 'Add an employee'){
    addEmployee()  
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