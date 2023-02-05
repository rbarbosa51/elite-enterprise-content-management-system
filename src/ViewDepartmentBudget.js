import inquirer from "inquirer";
import mysql from "mysql2";
import "console.table";
import ClearScreen from "./ClearScreen.js";
import MainPrompt from "./MainPrompt.js";

export default async function ViewDepartmentBudget() {
  let departmentNames = [];
  let departmentArray = [];
  let currentDepartment;
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "toor",
    database: "eliteEnterpriseCMS",
  });
  //Get all of the departments
  await db
    .promise()
    .query("SELECT * FROM department ORDER BY id")
    .then(([result]) => {
      result.forEach((d) => {
        departmentNames.push(d.name);
        const departmentID = JSON.parse(
          `{"id":"${d.id}", "fullName": "${d.name}"}`
        );
        departmentArray.push(departmentID);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  ClearScreen();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "selectedDepartment",
        message: "Select a Department to view its employees:",
        choices: departmentNames,
      },
    ])
    .then((answer) => {
      currentDepartment = answer.selectedDepartment;
    });
  let qDepID = departmentArray.find((o) => o.fullName === currentDepartment).id;
  //Query sums all of the salary from the subquery
  await db
    .promise()
    .query(
      `SELECT SUM(sub1.salary) AS department_salary FROM (SELECT salary FROM employee JOIN role ON employee.role_id=role.id WHERE role.department_id=${qDepID})AS sub1;`
    )
    .then(([result]) => {
      ClearScreen();
      console.log(`Salary for ${currentDepartment} department\n`);
      console.table(result);
    });

  db.end();
  //Wait 3 seconds
  const initTime = Date.now();
  while (Date.now() - initTime <= 3000) {}
  MainPrompt();
}
