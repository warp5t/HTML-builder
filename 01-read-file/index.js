const fs = require('fs');
const path = require('path');
const currentDir = __dirname;
const filePath = path.join(currentDir, 'text.txt');


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});