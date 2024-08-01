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
          const query = "INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)";
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
