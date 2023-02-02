import mysql from 'mysql2';
import ansi from "ansi-escape-sequences";
import inquirer from 'inquirer';

/*
inquirer.prompt([
                        {name: 'departmentName',
                        message: `${ansi.erase.display(2)} ${ansi.cursor.position()}What is the name of the department?`}
                    ]).then(answer => {
                        AddDepartment(answer.departmentName);
                    });
*/
export default async function AddDepartment() {
    let departmentName;
    await inquirer.prompt([
        {
            name: 'departmentName',
            message: `${ansi.erase.display(2)} ${ansi.cursor.position()}What is the name of the department?`
        }
    ]).then(answer => {
        departmentName = answer.departmentName;
    })
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user:'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
    );
    db.query(`INSERT INTO department (name)
              VALUES ("${departmentName}");`)
    db.end();
    console.log(`${departmentName} was added to the department table\n`);
    
}