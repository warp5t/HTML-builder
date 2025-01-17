const fs = require('fs');
const path = require('path');

const currentDir = __dirname;
const filePath = path.join(currentDir, 'text.txt');

const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    console.log(chunk);
});

readStream.on('error', (err) => {
    console.error( 'error: ', err);
});
