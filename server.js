const inquirer = require('inquirer');
const { displayDepartments, displayRoles, displayEmployees, addDepartment, addRole, addEmployee, updateEmployee, getEmployees, getRoles, getDepartments, getManagers } = require('./routes');

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
      initializeProgram();
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
                        getDepartments()
                         .then(function(res) {
                          const departmentsArray = [];
                          for (let i=0; i<res.length; i++) {
                          departmentsArray.push(res[i].name);
                          }
                                inquirer.prompt( {
                                        type: 'list',
                                        name: 'department',
                                        message: "What department does this role belong to?",
                                        choices: departmentsArray
                                        })
                                .then(({ department }) => {
                                  const deptID = res[departmentsArray.indexOf(department)].id;
                                   console.log('Added '+ role +' to the database');
                                    const data = "'" + role + "', " + "'" + salary + "', " + deptID;
                                    addRole(data);
                                    initializeProgram();
                                    });
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
                          getRoles()
                          .then(function(response) {
                              const roleArray = [];
                              for (let i=0; i<response.length; i++) {
                                  roleArray.push(response[i].title);
                              }
                                    inquirer.prompt( {
                                            type: 'list',
                                            name: 'role',
                                            message: "What is the employee's role?",
                                            choices: roleArray
                                    })
                                    .then(({ role }) => {
                                      getManagers()
                                        .then(function(res) {
                                            const employeesArray = [];
                                            for (let i=0; i<res.length; i++) {
                                                employeesArray.push(res[i].name);
                                            }
                                                    inquirer.prompt( {
                                                        type: 'list',
                                                        name: 'manager',
                                                        message: "Who is the employee's manager?",
                                                        choices: employeesArray
                                                      })
                                                .then(({ manager }) => {
                                                  const manID = res[employeesArray.indexOf(manager)].id;
                                                    console.log('Added '+ first_name +' to the database');
                                                    addEmployee(first_name, last_name, manID, role);
                                                    initializeProgram();
                                                    });
                                                    });
                                                });
                                    });
                                  });
                                });
                                    };


const updateData = () => {
    getEmployees()
    .then(function(res) {
        const employeesArray = [];
        for (let i=0; i<res.length; i++) {
            employeesArray.push(res[i].name);
        }
        getRoles()
        .then(function(response) {
            const roleArray = [];
            for (let i=0; i<response.length; i++) {
                roleArray.push(response[i].title);
            }
    inquirer.prompt([{
        type: 'list',
        name: 'employee',
        message: "Which employee's role do you want to update?",
        choices: employeesArray
    }, {
        type: 'list',
        name: 'role',
        message: "What is this employee's current role?",
        choices: roleArray
     }]).then(function({employee, role}) {
            const empID = res[employeesArray.indexOf(employee)].id;
            updateEmployee(empID, role);
            console.log('Updated ' + employee + "'s role to " + role);
            initializeProgram();
            });
        });
                  
    });
};



const initializeProgram = () => {
inquirer.prompt( {
    type: 'list',
    name: 'view',
    message: 'What would you like to do?',
    choices: ['View all departments','View all roles','View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
  })
  .then(function({ view }) {
    if (view === 'View all departments') {
      displayDepartments();
        console.log('\n');
        initializeProgram();
        console.log('\n');
  } else if (view === 'View all roles'){
    displayRoles()
    initializeProgram();
    console.log('\n');
  } else if (view === 'View all employees'){
    displayEmployees()
    initializeProgram();
    console.log('\n');
  } else if (view === 'Add a department'){
    addDept()  
  } else if (view === 'Add a role'){
    roleData()  
  } else if (view === 'Add an employee'){
    employeeData()  
  } else if (view === 'Update an employee role'){
    updateData()  
  }
});
};


initializeProgram();

