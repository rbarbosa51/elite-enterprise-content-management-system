const mysql = require('mysql2');
require('console.table');
const ansi = require('ansi-escape-sequences');

async function ViewRoles() {
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
        console.log("Connected")
    );
    
   //
    db.query(`SELECT role.id, role.title, department.name as deptartment, role.salary 
              FROM role
              JOIN department ON role.department_id = department.id ORDER BY role.id;`, (err,result) => {
        if (err) {
            console.log(err);
        }
        //Two new line breaks for visual padding
        console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
        console.table(result);
    })
    //closes the connection
    db.end();
}
module.exports = ViewRoles;