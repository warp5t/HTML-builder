const fs = require('fs');
const path = require('path');

const { stdout } = process;

(function copyDir() {
  const pathNewFolder = path.join('04-copy-directory', 'files-copy');

  fs.mkdir(pathNewFolder, (err) => {
    if (err) {
      stdout.write('folder already exist\n');
    } else {
      stdout.write('Directory created successfully!\n');
    }
  });

  const folderOrigPath = path.join(__dirname, 'files');

  const copyFolder = path.join(__dirname, 'files-copy');

  fs.readdir(copyFolder, (err, files) => {
    if (err) stdout.write(err);
    files.forEach((file) => {
      const fileCopy = path.join(copyFolder, file);
      fs.unlink(fileCopy, (errr, reslt) => {
        if (errr) stdout.write(errr);
      });
    });
  });

  fs.readdir(folderOrigPath, (err, files) => {
    if (err) stdout.write(err);
    files.forEach((file) => {
      const pathJoin = path.join(__dirname, 'files-copy', file);
      const srcPath = path.join(folderOrigPath, file);
      fs.copyFile(srcPath, pathJoin, (error, result) => {
        if (error) stdout.write(error, ' - error line 25');
      });
    });
  });
}());
