const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

stdout.write('hello, to check my app !!!\n');
const filePath = (path.resolve('02-write-file/textFile.txt'));

fs.writeFile(filePath, '', () => {
  stdin.on('data', (data) => {
    const data47 = data;
    fs.appendFile(filePath, `${data47}`, (err) => {
      if (err) {
        stdout.write(err);
      }
    });
  });
});

process.on('SIGINT', () => {
  stdout.write('\nso, your notes have writen !\n');
  process.exit();
});
