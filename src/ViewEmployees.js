import mysql from 'mysql2';
import 'console.table';
import ClearScreen from './ClearScreen.js';
import MainPrompt from './MainPrompt.js';

export default async function ViewEmployees() {
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
        //console.log("Connected")
    );
    //View all employees
    //  THANK YOU TORRE !!!!!  --->>>
    await db.promise().query(`SELECT emp1.id, emp1.first_name, emp1.last_name, role.title,department.name AS department ,role.salary, CONCAT(emp2.first_name, ' ', emp2.last_name) as manager
                            FROM employee emp1
                            JOIN role ON emp1.role_id = role.id
                            JOIN department ON role.department_id = department.id
                            LEFT JOIN employee emp2 ON emp1.manager_id = emp2.id
                            ORDER BY emp1.id;`)
    .then( ([result]) => {
        ClearScreen();
        console.log('Viewing all Employees.\n');
        console.table(result);
    })
    
    //closes the connection
    db.end();
    const initTime = Date.now();
    while ((Date.now() - initTime) <= 3000){}
    //Go back to the main prompt
    MainPrompt();
}
