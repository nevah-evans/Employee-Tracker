const inquirer = require("inquirer");
const { Pool } = require("pg");
const { col } = require("sequelize");

const pool = new Pool(
  {
    user: "postgres",
    password: "paradox",
    host: "localhost",
    database: "employees_db",
  },
  console.log("connected to the employees_db database!")
);

function startInquirer() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
          "Veiw All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])

    .then((answer) => {
      if (answer.start === "Veiw All Employees") {
        viewAllEmployees();
      } else if (answer.start === "Add Employee") {
        addEmployee();
      } else if (answer.start === "Update Employee Role") {
        updateEmployee();
      } else if (answer.start === "View All Roles") {
        viewAllRoles();
      } else if (answer.start === "Add Role") {
        addRole();
      } else if (answer.start === "View All Departments") {
        viewAllDepartments();
      } else if (answer.start === "Add Department") {
        addDepartment();
      } else {
        return;
      }
    });
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

    .then((answer) => {
      const query = `INSERT INTO departments (name) VALUES ('${answer.department}')`;
      pool.query(query, (err, res) => {
        if (err) {
          console.error("Error executing query", err);
        } else {
          console.log(`Added department ${answer.department} to the database`);
          startInquirer();
        }
      });
    });
}

function addRole() {
  const query = "SELECT * FROM departments";
  pool.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      const departments = res.rows;
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
            choices: departments.map((department) => department.name),
          },
        ])

        .then((answer) => {
          const selectedDepartment = departments.find(
            (department) => department.name === answer.department
          );
          const query =
            "INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)";
          pool.query(
            query,
            [
              answer.role,
              answer.salary,
              selectedDepartment.id, //or det id to department
            ],
            (err, res) => {
              if (err) {
                console.error("Error executing query", err);
              } else {
                console.log(`Added ${answer.role} to the database`);
                startInquirer();
              }
            }
          );
        });
    }
  });
}

function addEmployee() {
  const jobQuery = "SELECT id, title FROM roles";
  const managerQuery = `SELECT id, CONCAT(employees.first_name, ' ', employees.last_name) AS managers FROM employees`;

  pool.query(jobQuery, (err, res) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      const jobs = res.rows.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      pool.query(managerQuery, (err, res) => {
        if (err) {
          console.error("Error executing query", err);
        } else {
          const managers = res.rows.map(({ id, manager }) => ({
            name: manager,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
              },
              {
                type: "list",
                name: "job",
                message: "What is the employee's role?",
                choices: jobs,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: [{ name: "None", value: null }, ...managers],
              },
            ])
            .then((answer) => {
              const query =
                "INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
              pool.query(
                query,
                [answer.firstName, answer.lastName, answer.job, answer.manager],
                (err, res) => {
                  if (err) {
                    console.error("Error executing query", err);
                  } else {
                    console.log(`Added ${answer.firstName} to the database`);
                    startInquirer();
                  }
                }
              );
            });
        }
      });
    }
  });
}

function updateEmployee() {
  const employeeQuery = `SELECT  employees.id, CONCAT (employees.first_name, ' ' , employees.last_name) AS full_name, roles.id FROM employees LEFT JOIN roles ON employees.role_id = roles.id`;
  pool.query(employeeQuery, (err, res) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      const employees = res.rows.map(({ full_name, id }) => ({
        name: full_name,
        value: id,
      }));

      const departmentQuery = `SELECT * FROM departments`;
      pool.query(departmentQuery, (err, res) => {
        if (err) {
          console.error("Error executing query", err);
        } else {
          const departments = res.rows.map(({ name }) => name);

          inquirer
            .prompt([
              {
                type: "list",
                name: "employees",
                message: "Which employee's role do you want to update?",
                choices: employees,
              },
              {
                type: "list",
                name: "jobUD",
                message: "Which department does this role belong to?",
                choices: departments,
              },
            ])

            .then((answer) => {
              const query = "UPDATE employees SET role_id = $1 WHERE id = $2";
              pool.query(
                query,
                [answer.departmentId, answer.employeeId],
                (err, res) => {
                  if (err) {
                    console.error("Error executing query", err);
                  } else {
                    console.log("Updated employee's role!");
                    startInquirer();
                  }
                }
              );
            });
        }
      });
    }
  });
}
// ==================================================================================================================

function viewAllDepartments() {
  const query = `SELECT * FROM departments;`;

  pool.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      const columnNames = Object.keys(res.rows[0]);
      console.table(res.rows, columnNames);
      startInquirer();
    }
  });
}

function viewAllRoles() {
  const query = `SELECT  roles.id, roles.title, departments.name, roles.salary FROM roles JOIN departments ON roles.department = departments.id;`;

  pool.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      const columnNames = Object.keys(res.rows[0]);
      console.table(res.rows, columnNames);
      startInquirer();
    }
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

  pool.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      const columnNames = Object.keys(res.rows[0]);
      console.table(res.rows, columnNames);
      startInquirer();
    }
  });
}

module.exports = { startInquirer };
