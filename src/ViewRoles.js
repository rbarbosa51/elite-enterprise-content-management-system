import mysql from 'mysql2';
import 'console.table';
import ClearScreen from './ClearScreen.js';
import MainPrompt from './MainPrompt.js';

export default async function ViewRoles() {
    //Create the database connection
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
        console.log("Connected")
    );
   //View Roles query
    db.query(`SELECT role.id, role.title, department.name as deptartment, role.salary 
              FROM role
              JOIN department ON role.department_id = department.id ORDER BY role.id;`, (err,result) => {
        if (err) {
            console.log(err);
        }
        //Clears the screen and then shows the table
        ClearScreen();
        console.log('Viewing all Roles.\n');
        console.table(result);
    });
    //closes the connection
    db.end();
    //Go back to Main Propmt
    MainPrompt();
}
