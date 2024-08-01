const inquirer = require("inquirer");
const { Pool } = require("pg");

function startInquirer() {
  inquirer.prompt([
    {
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        "Veiw All Employees",
        "Add Emploee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    },
  ]);
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])

    .then((answer)=>{
      console.log(answer.name);
      const query = `INSERT INTO departments (name) VALUES ("${answer.name}")`
      Pool.query(query, (err, res) =>{
        if (err) throw err;
        console.log(`Added department ${answer.name} to the database`);

        startInquirer();
      })
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does this role belong to?",
        choices: ["Engineering", "Finance", "Legal", "Sales"],
      },
    ])

    .then(console.log(`Added ${data.role} to the database`));
}

function addEmployee() {
  const query= `SELECT  CONCAT(employees.first_name, ' ', employees.last_name) AS employees FROM employees`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "fistName",
        message: "What is the employee's first name of the role?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name of the role?",
      },
      {
        type: "list",
        name: "job",
        message: "Which department does this role belong to?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Enineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
          "Customer Service",
        ],
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: ["None", query],
      },
    ])

    .then(console.log(`Added ${data.firstName} to the database`));
}

function updateEmployee() {
const query = `SELECT  CONCAT(employees.first_name, ' ', employees.last_name) AS employees FROM employees`;

  inquirer
    .prompt([
      {
        type: "list",
        name: "employees",
        message: "Which employee's role do you want to update?",
        choices: [ query ],
      },
      {
        type: "list",
        name: "jobUD",
        message: "Which department does this role belong to?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Enineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Leagal Team Lead",
          "Lawyer",
          "Custmer Service",
        ],
      },
    ])

    .then(console.log("Updated employee's role"));
}

function viewAllDepartments() {
  const query = `SELECT * FROM departments;`;

  Pool.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startInquirer();
  });
}

function viewAllRoles() {
    const query = `SELECT  roles.id, roles.title, departments.name, roles.salary FROM roles JOIN departments ON roles.department = departments.id;`;

    Pool.query (query, (err,res) =>{
        if (err) throw err;
        console.table(res);
        startInquirer();
    });
}

function viewAllEmployees() {
    const query = `
    SELECT  e.id, e.first_name, e.last_name, departments.name, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
    FROM employees e
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN departments ON roles.department = departments.id 
    LEFT JOIN employees m ON e.manager_id= m.id;
    `;

    Pool.query (query, (err,res) =>{
        if (err) throw err;
        console.table(res);
        startInquirer();
    });
};



module.exports = {startInquirer, addDepartment, addRole, addEmployee, updateEmployee, viewAllDepartments, viewAllRoles, viewAllEmployees}