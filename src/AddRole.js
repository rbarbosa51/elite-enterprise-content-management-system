import mysql from 'mysql2';
import ClearScreen from './ClearScreen.js';
import inquirer from 'inquirer';
import MainPrompt from './MainPrompt.js';


export default async function AddRole() {
    //First get a list of all of the departments and store in departmentArrays
    let departmentArrays = [];
    let rawResults;
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user:'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
    );
    //First get all of the departments
    db.query('SELECT * FROM department ORDER BY id;', (err,result) => {
        if (err) {
            console.log(err);
        }
        rawResults = result;
        result.forEach((n) => {
            departmentArrays.push(n.name);
        });
    })
    //Once I have all of the departments stored, then ask for the rest of the info
    ClearScreen();
    let roleName, roleSalary, selectedDepartment, departmentID;
    await inquirer.prompt([
        {
            name: 'roleName',
            message: 'What is the name of the role?'
        }
    ]).then(answer => {
        roleName = answer.roleName;
    })
    //It looks better if the screen refreshes after every question
    ClearScreen();
    await inquirer.prompt([
        {
            name: 'roleSalary',
            message: 'What is the salary of the role?'
        }
    ]).then(answer => {
        roleSalary = answer.roleSalary;
    })
    ClearScreen();
    //Ask which department (from the list)
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedDepartment',
            message: 'Which department does the role belong to?',
            choices: departmentArrays
        }
    ]).then(answer => {
        /*the role table does not store names but id's therefore I need to get 
        id of whatever department was selected. I use the find() method*/
        selectedDepartment = answer.selectedDepartment;
        let row = rawResults.find(o => o.name === selectedDepartment);
        departmentID = row.id;
        db.query(`INSERT INTO role (title, salary, department_id)
                  VALUES ("${roleName}", "${roleSalary}", "${departmentID}");`)
    }).catch(err => {
        console.log(err);
        return false;
    })
    db.end();
    //Clear the screen and let the user now that the department was written to the table
    ClearScreen()
    console.log(`${selectedDepartment} was added to the role table\n`);
    //Wait 1 second
    const initTime = Date.now();
    while ((Date.now() - initTime) <= 1000){}
    MainPrompt();
    
}