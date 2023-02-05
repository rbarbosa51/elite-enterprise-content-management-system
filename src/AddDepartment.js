import mysql from "mysql2";
import inquirer from "inquirer";
import ClearScreen from "./ClearScreen.js";
import MainPrompt from "./MainPrompt.js";

export default async function AddDepartment() {
  ClearScreen();
  let departmentName;
  await inquirer
    .prompt([
      {
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      departmentName = answer.departmentName;
    });
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "toor",
    database: "eliteEnterpriseCMS",
  });
  //Insert query
  await db
    .promise()
    .query(`INSERT INTO department (name) VALUES ("${departmentName}");`);
  //Close the database connection
  db.end();
  ClearScreen();
  console.log(`${departmentName} was added to the department table\n`);
  //Wait 3 seconds
  const initTime = Date.now();
  while (Date.now() - initTime <= 3000) {}
  MainPrompt();
}
