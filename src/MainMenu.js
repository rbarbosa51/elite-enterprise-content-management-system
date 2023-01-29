import inquirer from "inquirer";


/*
WHEN I start the application
THEN I am presented with the following options: 
view all departments, 
view all roles, 
view all employees, 
add a department, 
add a role, 
add an employee, 
and update an employee role
quit
*/
export default function MainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainChoice',
            message: 'Choose from the following options: ',
            choices: ['View all departments', 'View all roles', 
                      'View all employees', 'Add a department', 
                      'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }
    ]).then(answer => {
        switch (answer.mainChoice) {
            case 'Quit':
                return 'quit';
                break;
            default:
                return 'quit';
                break;
        }
        //return answer.mainChoice;
    });
}