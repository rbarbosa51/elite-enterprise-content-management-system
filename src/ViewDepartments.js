import mysql from 'mysql2';
import 'console.table';
import ClearScreen from './ClearScreen.js';
import MainPrompt from './MainPrompt.js';

export default async function ViewDepartment() {
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
    //Select all from department
    db.query('SELECT * FROM department ORDER BY id;', (err,result) => {
        if (err) {
            console.log(err);
        }
        ClearScreen();
        console.log('Viewing All Departments\n');
        console.table(result);
    })
    //close the connection
    db.end();
    //Go back to the main prompt
    MainPrompt();
}
