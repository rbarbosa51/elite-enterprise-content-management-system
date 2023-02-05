import inquirer from "inquirer";
import mysql from 'mysql2';
import ClearScreen from "./ClearScreen.js";
import MainPrompt from "./MainPrompt.js";

export default async function UpdateEmployeeManager() {
    let currentEmployee, currentManager;
    let employeesArray = [];
    let employeeNames = [];
    let managerArray = [];
    let managerNames = [];
    //Create a connection, get employees and roles
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user:'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
    );
    //Get the names of all of the employees
    await db.promise().query("SELECT * from employee;")
    .then( ([result]) => {
      result.forEach(e => {
        const tmpFullName = `${e.first_name} ${e.last_name}`;
        employeeNames.push(tmpFullName);
        const fullNameID = JSON.parse(`{"id": "${e.id}", "fullName":"${tmpFullName}"}`);
        employeesArray.push(fullNameID);
      })
    })
    .catch(console.log)

    //Get the Managers
    await db.promise().query('SELECT * FROM employee WHERE manager_id IS NULL;')
    .then( ([result]) => {
        result.forEach((m) => {
            const tmpFullName = `${m.first_name} ${m.last_name}`;
            managerNames.push(tmpFullName);
            const managerID = JSON.parse(`{"id":"${m.id}", "fullName": "${tmpFullName}"}`);
            managerArray.push(managerID);
        });
        console.log(managerNames);
    })
    .catch(console.log);
    //Clear the screen
    ClearScreen();
    //Select which employee 
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedEmployee',
            message: "Which employee do you want to update?",
            choices: employeeNames
        }
    ]).then(answer => {
        currentEmployee = answer.selectedEmployee;
    });
    ClearScreen();
    //
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedManager',
            message: "Who will be assigned as the employee's new Manager?",
            choices: managerNames
        }
    ]).then(answer => {
        currentManager = answer.selectedManager;
    });
    //Create the query string
    let qEmpID = (employeesArray.find(o => o.fullName === currentEmployee)).id;
    let qManID = (managerArray.find(o => o.fullName === currentManager)).id;
    //Update the database
    await db.promise().query(`UPDATE employee SET manager_id=${qManID} WHERE id=${qEmpID}`)
    .catch(console.log);
    //Close the connection
    db.end();

    console.log(`${currentEmployee} manager was changed to ${currentManager}\n`);
    //Wait 1 second the go back to main prompt
    const initTime = Date.now();
    while ((Date.now() - initTime) <= 1000){}
    MainPrompt();
}