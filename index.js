/* Imports
The main file index.js is set to type module (as opposed to commonJS) in the package.json file.
The import treats the file as commonjs if it sees the .cjs extension, and .mjs as module
This was needed to be able to utilize packages that only supported either one or the other
*/
import HeroBanner from './src/HeroBanner.mjs'
import MainPrompt from './src/MainPrompt.mjs';
import ClearScreen from './src/ClearScreen.js';

async function main() {
    //Clear the screen
    ClearScreen();
    //Display initial banner
    HeroBanner();
    //CLear the screen to remove the hero banner
    ClearScreen();
    //Initiate the app (main prompt)
    await MainPrompt();
    //Once the app finishes say thanks for using me
    console.log('Thanks for using me!\n');
}
main();