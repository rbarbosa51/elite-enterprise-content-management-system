import inquirer from "inquirer";
import mysql from 'mysql2';
import ClearScreen from "./ClearScreen.js";
import MainPrompt from "./MainPrompt.js";


export default async function DeleteEmployee() {
    let employeeNames = [];
    let employeeArray = [];
    let currentEmployee;
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user:'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
    );
    await db.promise().query('SELECT * FROM employee ORDER BY id')
        .then(([result]) => {
            result.forEach((e) => {
                const tmpFullName = `${e.first_name} ${e.last_name}`;
                employeeNames.push(tmpFullName);
                const employeeID = JSON.parse(`{"id":"${e.id}", "fullName": "${tmpFullName}"}`);
                employeeArray.push(employeeID);
            });
        })
    ClearScreen();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedEmployee',
            message: "Select a Employee you wish to delete:",
            choices: employeeNames
        }
    ]).then( answer => {
        currentEmployee = answer.selectedEmployee;
    })
    
    let qDepID = (employeeArray.find(o => o.fullName === currentEmployee)).id;
    console.log(qDepID);
    db.promise().query(`DELETE FROM employee WHERE id=${qDepID}`);
    ClearScreen();
    console.log(`${currentEmployee} was deleted!`);
    db.end();
    //Wait 3 seconds
    const initTime = Date.now();
    while((Date.now() - initTime) <= 3000){}
    MainPrompt();
}