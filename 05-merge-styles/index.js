const fs = require('fs');
const path = require('path');

const { stdout } = process;

const pathFolderOrig = path.join(__dirname, 'styles');
const pathFileEnd = path.join(__dirname, 'project-dist', 'bundle.css');
const pathProjectDist = path.join(__dirname, 'project-dist');

fs.readdir(pathProjectDist, (error, files) => {
  if (error) stdout.write(error);
  files.forEach((fileCp) => {
    if (path.extname(fileCp) === '.css') {
      const fileCopy = path.join(pathProjectDist, fileCp);
      fs.unlink(fileCopy, (errr, reslt) => {
        if (errr) stdout.write(errr);
      });
    }
  });
});

fs.readdir(pathFolderOrig, (err, files) => {
  if (err) stdout.write(err);
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      const filePath = path.join(pathFolderOrig, file);
      fs.readFile(filePath, 'utf8', (errr, fileCont) => {
        if (errr) { stdout.write(errr); }
        fs.appendFile(pathFileEnd, fileCont, (err, data) => {
          if (err) stdout.write(err);
        });
      });
    }
  });
});
