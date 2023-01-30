import HeroBanner from "./src/HeroBanner.js";
import ClearScreen from "./src/ClearScreen.js";
import ViewDepartment from "./src/ViewDepartments.js";
import inquirer from "inquirer";

async function main() {
    //Clear the screen
    ClearScreen();
    //Display initial banner
    HeroBanner();
    ClearScreen();
    let finished = false;
    while (!finished) {
        //Every Subsequent call will clear the screen
        await inquirer.prompt([
            {
                type: 'list',
                name: 'mainChoice',
                message: 'Choose from the following options: ',
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
                    
                default: //Quit
                    finished = true;
                    break;
            }
        });
    }
    
    console.log('Outside main loop\n');
}
main();