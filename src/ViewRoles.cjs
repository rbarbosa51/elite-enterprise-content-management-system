const mysql = require('mysql2');
const _ = require('console.table');

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
    /*
    SELECT favorite_books.book_name AS name, book_prices.price AS price
FROM favorite_books
JOIN book_prices ON favorite_books.book_price = book_prices.id;
    */
    db.query("SELECT role.id, role.title, department.name as deptartment, role.salary FROM role JOIN department ON role.department_id = department.id GROUP BY role.id;", (err,result) => {
        if (err) {
            console.log(err);
        }
        //Two new line breaks for visual padding
        console.log("\n\n");
        console.table(result);
    })
    //closes the connection
    db.end();
}
module.exports = ViewRoles;