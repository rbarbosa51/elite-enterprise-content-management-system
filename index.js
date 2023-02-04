import HeroBanner from './src/HeroBanner.js'
import MainPrompt from './src/MainPrompt.js';
import ClearScreen from './src/ClearScreen.js';

async function main() {
    //Clear the screen
    ClearScreen();
    //Display initial banner
    //HeroBanner();
    //CLear the screen to remove the hero banner
    ClearScreen();
    //Initiate the app (main prompt)
    await MainPrompt();
    //Once the app finishes say thanks for using me
    console.log('Thanks for using me!\n');
}
main();