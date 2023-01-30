const mysql = require('mysql2');
const _ = require('console.table');

async function ViewEmployees() {
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
        console.log("Connected")
    );
    
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title,department.name AS department ,role.salary
              FROM employee 
              JOIN role ON employee.role_id = role.id
              JOIN department ON role.department_id = department.id
              ORDER BY employee.id;`, (err,result) => {
        if (err) {
            console.log(err);
        }
        //Two new line breaks for visual padding
        console.log("\n");
        //console.log(result)
        console.table(result);
    })
    //closes the connection
    db.end();
}
module.exports = ViewEmployees;