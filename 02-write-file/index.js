const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter your text: ',
});

console.log('Hi! Start typing your text. Type "exit" or press Ctrl+C to quit.');
rl.prompt();

rl.on('line', (input) => {
    if (input === 'exit') {
        console.log("You've finished!");
        rl.close();
    } else {
        writeStream.write(input + '\n', (err) => {
            if (err) console.error('Error writing to file:', err);
        });
        rl.prompt();
    }
});

rl.on('SIGINT', () => {
    console.log("\n You've pushed ctrl+c, and stoped the writing");
    rl.close();
});

rl.on('close', () => {
    writeStream.end();
    process.exit(0);
});
