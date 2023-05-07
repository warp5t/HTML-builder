const fs = require('fs');
const path = require('path');

const { stdout } = process;

const directoryPath = path.resolve('03-files-in-folder/secret-folder');

fs.readdir(directoryPath, (err, files) => {
  if (err) stdout.write(err);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    fs.stat(filePath, (error, stats) => {
      if (error) stdout.write(error);
      if (stats.isFile()) {
        const fileName = path.basename(filePath);
        const fileExt = path.extname(filePath);
        const fileSize = stats.size;
        stdout.write(`fileName: ${fileName}, fileExt: ${fileExt}, fileSize: ${fileSize}\n`);
      }
    });
  });
});
