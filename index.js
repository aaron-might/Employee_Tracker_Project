const mysql = require('mysql');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const table = require('console.table');


// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'employee_db',
});

const startScreen = ['View all Employees', 'View all Employees by Department', 'View all Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role','Update Employees by manager', 'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department','View Department Total Budget', 'Exit']
const allEmployeeQuery = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
FROM employees e
LEFT JOIN roles r 
ON r.id = e.role_id 

LEFT JOIN departments d 
ON d.id = r.department_id
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id;`
const removeEmployeeQuestions = ['What is the first name?', 'What is the last name?', 'What is their role?', 'Who is their manager?']
//const byDepQuery = 'SELECT CONCAT (e.first_name," " e.last_name) AS full_name, d.deparment_name FROM employees e '
const mgrQuery = 'SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management"'


const startApp = () => {
    inquirer
    .prompt({
        name: 'menuChoice',
        type: 'list',
        message: 'Select an option',
        choices: startScreen

    }).then((answer) => {
        switch (answer.menuChoice) {
            case 'View all Employees':
                showAll();
                break;
            case 'View all Emplyees by Department':
                showByDept();
                break;
            case 'View all Employees by Manager':
                showByManager();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'Update Employee by Manager':
                updateRole();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'View all Departments':
                viewDept();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'View total budget for a Department':
                ViewDeptBudget();
                break;
            case 'Remove Department':
                removeDept();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}

const showAll = () => {
    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log('results');
        console.table(('All Employees'), results)
        startApp();
    })

}


const showByDept = () => {
    const byDepQuery = 'SELECT CONCAT (e.first_name," " e.last_name) AS full_name, d.deparment_name FROM employees e'
    connection.query(byDepQuery, (err, results) => {
        if (err) throw err;
        
        inquirer.prompt([
            {
                name: 'byDep_choice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select a Department to view:'
            }
        ]).then((answer) => {
            const byDepQuery = `SELECT CONCAT (e.first_name," " e.last_name) AS full_name, d.deparment_name FROM employees e`
            connection.query(byDepQuery, [answer.byDep_choice], (err, results) => {
                if (err) throw err;
                console.log(' ');
                console.table(('Employees by deparment'), results);
                startApp();
            })
        })
    })
}

const showByManager = () => {
    connection.query(mgrQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'mgr_choice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select a Manager:'
            }
        ]).then((answer) => {
            const mgrQuery2 = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", IFNULL(r.title, "No Data") AS "Title", IFNULL(d.department_name, "No Data") AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
                FROM employees e
                LEFT JOIN roles r 
                ON r.id = e.role_id 
                LEFT JOIN departments d 
                ON d.id = r.department_id
                LEFT JOIN employees m ON m.id = e.manager_id
                WHERE CONCAT(m.first_name," ",m.last_name) = ?
                ORDER BY e.id;`
            connection.query(mgrQuery2, [answer.mgr_choice], (err, results) => {
                if (err) throw err;
                console.log(' ');
                console.table(('Employees by Manager'), results);
                startApp();
            })
        })
    })
}


const addEmployee = () => {
    const roleQuery = 'SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employees e'
    connection.query(roleQuery, (err, results) => {
        if (err) throw err;
        console.log(' ');
        console.table(('list of current employees'), results);

        inquirer.prompt([
            {
                name: 'fName',
                type: 'input',
                message: removeEmployeeQuestions[0]

            },
            {
                name: 'lName',
                type: 'input',
                message: removeEmployeeQuestions[1]
            },
            {
                name: 'role',
                type: 'input',
           
                message: removeEmployeeQuestions[2]
                },
            {
                name: 'manager',
                type: 'input',
                
                message: removeEmployeeQuestions[3]

            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
                (SELECT id FROM roles WHERE title = ? ), 
                (SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ? ) AS temptable))`, [answer.fName, answer.lName, answer.role, answer.manager]
            )
            startApp();
        })
    })
 }
 const removeEmployee = () => {
    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(' ');
        console.table(('All Employees'), results)
            inquirer.prompt([
            {
                name: 'IDtoRemove',
                type: 'input',
                message: 'Enter the Employee ID of the person to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM employees WHERE ?`, { id: answer.IDtoRemove })
            startApp();
        })
    })
}
const updateRole = () => {
    const query = `SELECT CONCAT (first_name," ",last_name) AS full_name FROM employees; SELECT title FROM roles`
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'empl',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'newRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(`UPDATE employees 
            SET role_id = (SELECT id FROM roles WHERE title = ? ) 
            WHERE id = (SELECT id FROM(SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ?) AS temptable)`, [answer.newRole, answer.empl], (err, results) => {
                    if (err) throw err;
                    startApp();
                })
        })

    })
}

const viewRoles = () => {
    let query = `SELECT title AS "Title" FROM roles`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log(' ');
        console.table(('All Roles'), results);
        startApp();
    })
}

const addRole = () => {
    const addRoleQuery = `SELECT title AS "title" FROM roles;`
    connection.query(addRoleQuery, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(('List of current titles:'), results);
        inquirer.prompt([
            {
                name: 'newTitle',
                type: 'input',
                message: 'Enter the new Title:'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'Enter the salary for the new Title:'
            },
            {
                name: 'dept',
                type: 'input',
               
                    message: 'Select the Department for this new Title:'
                },
        ]).then((answer) => {
            connection.query(
                `INSERT INTO roles(title, salary, department_id) 
                VALUES
                ("${answer.newTitle}", "${answer.newSalary}", 
                (SELECT id FROM departments WHERE department_name = "${answer.dept}"));`
            )
            startApp();

        })
    })

}
const removeRole = () => {
    const addRoleQuery = `SELECT title AS "title" FROM roles;`
    connection.query(addRoleQuery, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(('List of current titles:'), results);
        inquirer.prompt([
            {
                name: 'Title',
                type: 'input',
                message: 'Enter the Title to remove:'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'Enter the salary for the Title :'
            },
            {
                name: 'dept',
                type: 'input',
               
                    message: 'Select the Department to remove this Title:'
                },
        ]).then((answer) => {
            connection.query(
                `DELETE FROM roles WHERE ? (title, salary, department_id), ("${answer.newTitle}", "${answer.newSalary}", 
                (SELECT id FROM departments WHERE department_name = "${answer.dept}"));`
            )
            startApp();
        })
    })
}
const viewDept = () => {
    query = `SELECT department_name AS "Departments" FROM departments`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(('All Departments'), results)
        startApp();
    })
}

const addDept = () => {
    query = `SELECT department_name AS "Departments" FROM departments`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(('List of current Departments'), results);

        inquirer.prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'Enter the name of the Department to add:'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO departments(department_name) VALUES( ? )`, answer.newDept)
            startApp();
        })
    })
}

const removeDept = () => {
    query = `SELECT * FROM departments`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'dept',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the department to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM departments WHERE ? `, { department_name: answer.dept })
            startApp();
        })
    })

}

startApp();