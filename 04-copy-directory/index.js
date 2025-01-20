const fs = require('fs');
const path = require('path');

const { stdout } = process;

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

function clearDirectory(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        if (err.code === 'ENOENT') return resolve();
        return reject(err);
      }

      const deletePromises = files.map((file) => {
        const filePath = path.join(directory, file);
        return new Promise((res, rej) => {
          fs.unlink(filePath, (error) => {
            if (error) return rej(error);
            res();
          });
        });
      });

      Promise.all(deletePromises)
        .then(resolve)
        .catch(reject);
    });
  });
}

function copyFiles(srcDir, destDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(srcDir, (err, files) => {
      if (err) return reject(err);

      const copyPromises = files.map((file) => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);

        return new Promise((res, rej) => {
          fs.copyFile(srcPath, destPath, (error) => {
            if (error) return rej(error);
            res();
          });
        });
      });

      Promise.all(copyPromises)
        .then(resolve)
        .catch(reject);
    });
  });
}


function copyDir() {

  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err) return console.error(`Error creating directory: ${err.message}`);

    clearDirectory(targetDir)
      .then(() => copyFiles(sourceDir, targetDir))
      .then(() => stdout.write('Files copied successfully!\n'))
      .catch((error) => console.error(`Error: ${error.message}`));
  });
}


copyDir();
