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
        let currentSelection;
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
                    currentSelection = 1;
                    break;
                case 'View all roles':
                    currentSelection = 2;
                    break;
                case 'View all employees':
                    currentSelection = 3;
                    break;
                case 'Add a department':
                    currentSelection = 4;
                    break;
                case 'Add a role':
                    let tmpRoleName, tmpRoleSalary, tmpRoleDepartment;
                    inquirer.prompt([
                        {name: 'roleName',
                        message: `What is the name of the role?`
                        }
                    ]).then(answer => {
                        tmpRoleName = answer.roleName;
                    });
                    console.log(`The answer was ${tmpRoleName}`);
                    break;
                default: //Quit
                    finished = true;
                    break;
            }
        });
        /*I moved the function calls outside of the then loop because it created a timing problem of a promise then 
        waiting on another promise*/
        switch (currentSelection) {
            case 1:
                console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
                ViewDepartment();
                break;
            case 2:
                console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
                ViewRoles();
                break;
            case 3:
                console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
                ViewEmployees();
                break;
            case 4:
                console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
                AddDepartment();
                break;
            default: //Quit
                finished = true;
                break;
            
        }
    }
    
    console.log('Thanks for using me!\n');
}
main();