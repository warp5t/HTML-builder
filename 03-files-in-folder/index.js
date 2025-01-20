const fs = require('fs');
const path = require('path');

const { stdout } = process;

const directoryPath = path.resolve('03-files-in-folder/secret-folder');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    stdout.write(`Error reading directory: ${err.message}\n`);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    fs.stat(filePath, (error, stats) => {
      if (error) {
        stdout.write(`Error reading file stats: ${error.message}\n`);
        return;
      }

      if (stats.isFile()) {
        const fileName = path.parse(file).name;
        const fileExt = path.extname(file).slice(1);
        const fileSize = (stats.size / 1024).toFixed(3);

        stdout.write(`${fileName} - ${fileExt} - ${fileSize}kb\n`);
      }
    });
  });
});
