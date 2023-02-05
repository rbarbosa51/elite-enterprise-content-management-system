import inquirer from "inquirer";
import mysql from 'mysql2';
import 'console.table';
import ClearScreen from "./ClearScreen.js";
import MainPrompt from "./MainPrompt.js";

export default async function ViewEmployeeByDepartment() {
    let departmentNames = [];
    let departmentArray = [];
    let currentDepartment;
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user:'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
    );
    await db.promise().query('SELECT * FROM department ORDER BY id')
        .then(([result]) => {
            result.forEach((d) => {
                departmentNames.push(d.name);
                const departmentID = JSON.parse(`{"id":"${d.id}", "fullName": "${d.name}"}`);
                departmentArray.push(departmentID);
            });
        })
    ClearScreen();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedDepartment',
            message: "Select a Department to view its employees:",
            choices: departmentNames
        }
    ]).then( answer => {
        currentDepartment = answer.selectedDepartment;
    })
    
    let qDepID = (departmentArray.find(o => o.fullName === currentDepartment)).id;
    //query and show department
    await db.promise().query(`SELECT employee.first_name, employee.last_name, role.department_id FROM employee JOIN role ON employee.role_id=role.id WHERE role.department_id=${qDepID};`)
        .then( ([result]) => {
            console.table(result);
        })
    
    
    db.end()
    //Wait 3 seconds
    const initTime = Date.now();
    while ((Date.now() - initTime) <= 3000){}
    MainPrompt();
}