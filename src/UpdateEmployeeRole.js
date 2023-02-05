import inquirer from "inquirer";
import mysql from 'mysql2';
import ClearScreen from "./ClearScreen.js";
import MainPrompt from "./MainPrompt.js";

export default async function UpdateEmployeeRole() {
    let currentEmployee, currentRole;
    let employeesArray = [];
    let employeeNames = [];
    let rolesArray = [];
    let roleNames = [];
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
    //Get the roles
    await db.promise().query('SELECT id, title FROM role ORDER BY id;')
    .then( ([result]) => {
        result.forEach((r) => {
            roleNames.push(r.title);
            const roleID = JSON.parse(`{"id":"${r.id}", "title": "${r.title}"}`);
            rolesArray.push(roleID);
        });
    })
    .catch(console.log);
    //Clear the screen
    ClearScreen();
    //Select which employee 
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedEmployee',
            message: "Which employee's role do you want to update?",
            choices: employeeNames
        }
    ]).then(answer => {
        currentEmployee = answer.selectedEmployee;
    });
    ClearScreen();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedRole',
            message: "Which role do you wish to assign to the selected employee?",
            choices: roleNames
        }
    ]).then(answer => {
        currentRole =answer.selectedRole;
    });
    //Create the query string
    let qEmpID = (employeesArray.find(o => o.fullName === currentEmployee)).id;
    let qRoleID = (rolesArray.find(o => o.title === currentRole)).id;
    //Update the database
    await db.promise().query(`UPDATE employee SET role_id=${qRoleID} WHERE id=${qEmpID}`)
    .catch(console.log);
    //Close the connection
    db.end();

    console.log(`${currentEmployee} role was changed to ${currentRole}\n`);
    //Wait 3 second the go back to main prompt
    const initTime = Date.now();
    while ((Date.now() - initTime) <= 3000){}
    MainPrompt();
}