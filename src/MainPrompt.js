import inquirer from "inquirer";
import ClearScreen from "./ClearScreen.js";
import ViewDepartment from './ViewDepartments.js';
import ViewRoles from "./ViewRoles.js";
import ViewEmployees from "./ViewEmployees.js";

export default function MainPrompt() {
    //Clear Screen
    ClearScreen();
    //Main Prompt
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
                ViewDepartment();
                break;
            case 'View all roles':
                ViewRoles();
                break;
            case 'View all employees':
                ViewEmployees();
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