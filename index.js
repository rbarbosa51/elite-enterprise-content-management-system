import HeroBanner from "./src/HeroBanner.js";
import ClearScreen from "./src/ClearScreen.js";
import MainMenu from "./src/MainMenu.js";
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
        ClearScreen();
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
                    console.log('View all departments');
                    break;
                default: //Quit
                    finished = true;
                    break;
            }
        });
    }
    
    console.log('Outside main loop\n');
}
main();