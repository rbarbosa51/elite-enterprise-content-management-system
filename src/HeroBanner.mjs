import chalk from 'chalk';
import figlet from 'figlet';
//This function generates a banner
export default function HeroBanner() {
  //Show Hero Banner Using the Contessa Figlet font
  let figText = figlet.textSync("Elite Enterprise\nContent Management System", {
    font: "contessa",
    horizontalLayout: "full",
  });
  //contessa
  //Figlet only returns a string.  It has to be shown in the screen via console.log
  console.log(chalk.bold.yellowBright(figText));
  //Delay for 5 seconds
  const initTime = Date.now();
  //Get the current time and subtract the initTime once its over 5000ms (then end delay)
  while (Date.now() - initTime < 5000) {
    //Waste clock cycles (5 seconds)
  }
}
//module.exports = HeroBanner;