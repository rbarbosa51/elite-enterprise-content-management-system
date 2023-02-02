const mysql = require('mysql2');
require('console.table');
const ansi = require('ansi-escape-sequences');

async function ViewDepartment() {
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
        console.log("Connected")
    );
    db.query('SELECT * FROM department ORDER BY id;', (err,result) => {
        if (err) {
            console.log(err);
        }
        console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
        console.table(result);
    })
    //close the connection
    db.end();
}
module.exports = ViewDepartment;