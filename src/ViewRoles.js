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
        //console.log("Connected")
    );
   //View Roles query
   await db.promise().query(`SELECT role.id, role.title, department.name as deptartment, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;`)
   .then( ([result]) => {
    ClearScreen();
    console.log('Viewing all Roles.\n');
    console.table(result);
   })
    //closes the connection
    db.end();
    //Wait 3 seconds
    const initTime = Date.now();
    while ((Date.now() - initTime) <= 3000){}
    //Go back to the main prompt
    MainPrompt();
}
