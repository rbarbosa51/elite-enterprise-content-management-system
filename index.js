/* Imports
The main file index.js is set to type module (as opposed to commonJS) in the package.json file.
The import treats the file as commonjs if it sees the .cjs extension, and .mjs as module
This was needed to be able to utilize packages that only supported either one or the other
*/
import HeroBanner from './src/HeroBanner.mjs'
import ViewDepartment from './src/ViewDepartments.cjs';
import ViewRoles from './src/ViewRoles.cjs';
import ViewEmployees from './src/ViewEmployees.cjs';
import AddDepartment from './src/AddDepartment.mjs';
import ansi from "ansi-escape-sequences";
import inquirer from 'inquirer';

async function main() {
    //Clear the screen
    //ClearScreen();
    console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
    //Display initial banner
    HeroBanner();
    //ClearScreen();
    console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
    let finished = false;
    while (!finished) {
        //Every Subsequent call will clear the screen
        await inquirer.prompt([
            {
                type: 'list',
                name: 'mainChoice',
                message: `${ansi.erase.display(2)} ${ansi.cursor.position()}Choose from the following options: `,
                choices: ['View all departments', 'View all roles', 
                          'View all employees', 'Add a department', 
                          'Add a role', 'Add an employee', 'Update an employee role', 
                          'Quit']
            }
        ]).then (answer => {
            switch (answer.mainChoice) {
                case 'View all departments':
                    ViewDepartment();
                    break;
                case 'View all roles':
                    ViewRoles();
                    break;
                case 'View all employees':
                    ViewEmployees();
                    break;
                case 'Add a department':
                    inquirer.prompt([
                        {name: 'departmentName',
                        message: `${ansi.erase.display(2)} ${ansi.cursor.position()}What is the name of the department?`}
                    ]).then(answer => {
                        AddDepartment(answer.departmentName);
                    })
                    
                    break;
                default: //Quit
                    finished = true;
                    break;
            }
        });
    }
    
    console.log('Thanks for using me!\n');
}
main();