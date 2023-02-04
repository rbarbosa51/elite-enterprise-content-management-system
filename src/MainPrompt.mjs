import inquirer from "inquirer";
import ViewDepartment from './ViewDepartments.js';
import ansi from 'ansi-escape-sequences';

export default function MainPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainChoice',
            message: `Choose from the following options: `,
            choices: ['View all departments', 'View all roles', 
                      'View all employees', 'Add a department', 
                      'Add a role', 'Add an employee', 'Update an employee role', 
                      'Quit']
        }
    ]).then (answer => {
        switch (answer.mainChoice) {
            case 'View all departments':
                console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
                ViewDepartment();
                break;
            case 'View all roles':
                //
                break;
            case 'View all employees':
                //
                break;
            case 'Add a department':
                //
                break;
            case 'Add a role':
                //
                break;
            default: //Quit
                process.exit(0);
                break;
        }
    });
}