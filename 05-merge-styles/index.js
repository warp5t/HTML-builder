const fs = require('fs');
const path = require('path');

const targetDirect = path.join(__dirname, 'project-dist', 'bundle.css');
const sourceDirect = path.join(__dirname, 'styles');

fs.writeFileSync(targetDirect, '', (err) => {
  if (err) throw err;
});

fs.readdir(sourceDirect, (err, files) => {
  if (err) {
    return console.error('error 13: ' + err);
  }

  files.forEach((file) => {
    const filePath = path.join(sourceDirect, file);

    if (path.extname(file) === '.css') {
      const readStream = fs.createReadStream(filePath, 'utf-8');

      readStream.on('data', (chunk) => {
        fs.appendFile(targetDirect, chunk, (err) => {
          if (err) throw err;
        });
      });

      readStream.on('error', (error) => {
        console.error(`Error 29 ${filePath}: `, error);
      });
    }
  });
});
