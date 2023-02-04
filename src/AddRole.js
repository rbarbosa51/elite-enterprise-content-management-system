import mysql from 'mysql2';
import ansi from "ansi-escape-sequences";
import inquirer from 'inquirer';


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
    db.query('SELECT * FROM department ORDER BY id;', (err,result) => {
        if (err) {
            console.log(err);
        }
        rawResults = result;
        result.forEach((n) => {
            departmentArrays.push(n.name);
        });
    })
    
    let roleName, roleSalary, selectedDepartment, departmentID;
    await inquirer.prompt([
        {
            name: 'roleName',
            message: `${ansi.erase.display(2)} ${ansi.cursor.position()}What is the name of the role?`
        }
    ]).then(answer => {
        roleName = answer.roleName;
    })
    await inquirer.prompt([
        {
            name: 'roleSalary',
            message: `${ansi.erase.display(2)} ${ansi.cursor.position()}What is the salary of the role?`
        }
    ]).then(answer => {
        roleSalary = answer.roleSalary;
    })
    await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedDepartment',
            message: `${ansi.erase.display(2)} ${ansi.cursor.position()}Which department does the role belong to?`,
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
    console.log(`${selectedDepartment} was added to the role table\n`);
    return true;
    
}