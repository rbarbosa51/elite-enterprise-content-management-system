import HeroBanner from "./src/HeroBanner.js";
import MainPrompt from "./src/MainPrompt.js";
import ClearScreen from "./src/ClearScreen.js";

async function main() {
  //Clear the screen
  ClearScreen();
  //Display initial banner
  HeroBanner();
  //Clear the screen to remove the hero banner
  ClearScreen();
  //Initiate the app (main prompt)
  await MainPrompt();
}
main();
