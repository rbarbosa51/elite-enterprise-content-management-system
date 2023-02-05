import mysql from "mysql2";
import ClearScreen from "./ClearScreen.js";
import inquirer from "inquirer";
import MainPrompt from "./MainPrompt.js";

export default async function AddEmployee() {
  //First get a list of all of the roles and store in roleArrays
  let roleArray = [];
  let managerArray = [];
  let managerNames = [];
  let rawRoleResults;
  //Stores input from inquirer prompts
  let currentFName, currentLName, currentRole, currentManager;

  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "toor",
    database: "eliteEnterpriseCMS",
  });
  //First get all of the roles, store rawresults and rolearray
  await db
    .promise()
    .query("SELECT * FROM role ORDER BY id;")
    .then(([result]) => {
      rawRoleResults = result;
      result.forEach((n) => {
        roleArray.push(n.title);
      });
    });
  //get employees that have null as manager_id (In other words select all managers).
  //managerArray stores both the name of the Manager as well as its id
  await db
    .promise()
    .query(
      "SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL ORDER BY id;"
    )
    .then(([result]) => {
      result.forEach((n) => {
        //Combine first and last name
        const tmpFullName = `${n.first_name} ${n.last_name}`;
        managerNames.push(tmpFullName);
        const fullNameID = JSON.parse(
          `{"id": "${n.id}", "fullName":"${tmpFullName}"}`
        );
        managerArray.push(fullNameID);
      });
      //You still need to compensate in the event the new employee is a manager
      //Therefore the string is pushed below
      managerNames.push("Employee is a Manager");
    });

  ClearScreen();
  await inquirer
    .prompt([
      {
        name: "employeeFName",
        message: "What is the emploee's first name?",
      },
      {
        name: "employeeLName",
        message: "What is the emploee's last name?",
      },
    ])
    .then((answer) => {
      currentFName = answer.employeeFName;
      currentLName = answer.employeeLName;
    });
  ClearScreen();
  //List Employee's Role
  await inquirer
    .prompt([
      {
        type: "list",
        name: "selectedRole",
        message: "What is the employee's Role?",
        choices: roleArray,
      },
    ])
    .then((answer) => {
      currentRole = answer.selectedRole;
    });
  ClearScreen();
  //

  await inquirer
    .prompt([
      {
        type: "list",
        name: "selectedManager",
        message: "Who is the employee's manager?",
        choices: managerNames,
      },
    ])
    .then((answer) => {
      currentManager = answer.selectedManager;
    });

  //Make que query string  Get the role and manager's ids, then create the query
  let qRoleID = rawRoleResults.find((o) => o.title === currentRole).id;
  let queryString;
  if (currentManager === "Employee is a Manager") {
    queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES ("${currentFName}", "${currentLName}",${qRoleID}, NULL);`;
  } //if not manager
  else {
    managerArray.forEach((m) => {
      if (m.fullName === currentManager) {
        queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES ("${currentFName}", "${currentLName}",${qRoleID}, ${m.id});`;
      }
    });
  }

  //Insert the new employee
  await db.promise().query(queryString);

  //Close the database connection
  db.end();
  ClearScreen();
  //back to the main prompt
  console.log(
    `${currentFName} ${currentLName} was added to the employee table\n`
  );
  //Wait 3 seconds
  const initTime = Date.now();
  while (Date.now() - initTime <= 3000) {}
  MainPrompt();
}
