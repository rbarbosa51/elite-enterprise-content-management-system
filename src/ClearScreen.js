import ansi from 'ansi-escape-sequences';

export default function ClearScreen() {
    console.log(`${ansi.erase.display(2)} ${ansi.cursor.position()}`);
}