const mysql = require('mysql2');
require('console.table');
const ansi = require('ansi-escape-sequences');

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
    //  THANK YOU TORRE  --->>>
    db.query(`SELECT emp1.id, emp1.first_name, emp1.last_name, role.title,department.name AS department ,role.salary, CONCAT(emp2.first_name, ' ', emp2.last_name) as manager
              FROM employee emp1
              JOIN role ON emp1.role_id = role.id
              JOIN department ON role.department_id = department.id
              LEFT JOIN employee emp2 ON emp1.manager_id = emp2.id
              ORDER BY emp1.id;`, (err,result) => {
        if (err) {
            console.log(err);
        }
        //padding
        //console.log('\n');
        console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
        console.table(result);
    })
    //closes the connection
    db.end();
}
module.exports = ViewEmployees;