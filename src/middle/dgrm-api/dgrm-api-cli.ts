import readline from 'readline';
import { commandHelp } from './help.js';

export class DgrmApiCli {
    color: boolean
    constructor(color = true) {
        this.color = color
    }
    start() {

        console.log('Welcome to the DGRM API CLI');
        console.log('Type \'help\' for a list of commands.')
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: this.color
                ? '\x1b[33mdgrm-api-cli>\x1b[0m '
                : 'dgrm-api-cli> '
        });
        rl.prompt();
        rl.on('line', (line) => {
            const parts = line.trim().split(' ')
            const command = parts[0].trim()
            switch (command) {
                case 'features':
                    console.log('Processing feature command')
                    break;
                case 'collections':
                    console.log('Processing collections command')
                    break;
                case 'help':
                    commandHelp(parts)
                    break;
                case 'exit':
                    console.log('exit selected')
                    rl.close();
                    break;
                default:
                    console.log(`Unknown command: '${line.trim()}'`);
                    console.log('Please try again.')
                    break;
            }
            rl.prompt();
        }).on('close', () => {
            console.log('Have a great day!');
            process.exit(0);
        });
    }
}
