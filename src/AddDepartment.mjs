import mysql from 'mysql2';

export default async function AddDepartment(departmentName) {
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user:'root',
            password: 'toor',
            database: 'eliteEnterpriseCMS'
        },
        console.log("Connected")
    );
    db.query(`INSERT INTO department (name)
              VALUES ("${departmentName}");`)
    db.end();
    console.log(`${departmentName} was added to the department table\n`);
    
}