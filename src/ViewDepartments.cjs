const mysql = require('mysql2');
const _ = require('console.table');

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
        //Two new line breaks for visual padding
        console.log("\n");
        console.table(result);
    })
    //close the connection
    db.end();
}
module.exports = ViewDepartment;