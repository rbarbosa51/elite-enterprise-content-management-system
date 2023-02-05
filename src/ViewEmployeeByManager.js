import inquirer from "inquirer";
import mysql from 'mysql2';
import 'console.table';
import ClearScreen from "./ClearScreen.js";
import MainPrompt from "./MainPrompt.js";

export default async function ViewEmployeeByManager() {
    let managerNames = [];
    let managerArray = [];
    let currentManager;
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user:'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
    );
    await db.promise().query('SELECT * FROM employee WHERE manager_id IS NULL;')
    .then( ([result]) => {
        result.forEach((m) => {
            const tmpFullName = `${m.first_name} ${m.last_name}`;
            managerNames.push(tmpFullName);
            const managerID = JSON.parse(`{"id":"${m.id}", "fullName": "${tmpFullName}"}`);
            managerArray.push(managerID);
        });
        //console.log(managerNames);
    })
    .catch(console.log);
    ClearScreen();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedManager',
            message: 'Choose a Manager to view its employees?',
            choices: managerNames
        }
    ]).then(answer => {
        currentManager = answer.selectedManager;
    })
    //Create the query sting
    let qManID = (managerArray.find(o => o.fullName === currentManager)).id;
    await db.promise().query(`SELECT id, first_name, last_name FROM employee WHERE manager_id=${qManID};`)
    .then(([result]) => {
        ClearScreen();
        console.log(`${currentManager} employees:\n`);
        console.table(result);
    })
    //Close connection
    db.end();
    //Wait 5 seconds
    const initTime = Date.now();
    while ((Date.now() - initTime) <= 5000){}
    MainPrompt();
}