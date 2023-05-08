const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const pathTemplate = path.join(__dirname, 'template.html');

const pathCompHead = path.join(__dirname, 'components', 'header.html');
const pathCompArt = path.join(__dirname, 'components', 'articles.html');
const pathCompFoot = path.join(__dirname, 'components', 'footer.html');
const fileIndexHtml = path.join(__dirname, 'project-dist', 'index.html');

const pathCSS = path.join(__dirname, 'styles');
const pathCopyCSS = path.join(__dirname, 'project-dist', 'style.css');

const pathFonts = path.join(__dirname, 'assets', 'fonts');
const pathImg = path.join(__dirname, 'assets', 'img');
const pathSVG = path.join(__dirname, 'assets', 'svg');

const pathNewAssets = path.join(__dirname, 'project-dist', 'assets');

const pathFontsCopy = path.join(pathNewAssets, 'fonts');
const pathImgCopy = path.join(pathNewAssets, 'img');
const pathSvgCopy = path.join(pathNewAssets, 'svg');

function filesEnumerating(pathFolderInit, pathFileEnd) {
  fs.readdir(pathFolderInit, (err, files) => {
    if (err) stdout.write(err);
    files.forEach((file) => {
      const pathFile = path.join(pathFolderInit, file);
      const pathFileCopy = path.join(pathFileEnd, file); // construct new path for each file
      fs.copyFile(pathFile, pathFileCopy, (err31) => {
        if (err31) stdout.write(err31);
      });
    });
  });
}

function headerReplacing() {
  fs.readFile(pathCompHead, 'utf8', (err0, dataHeader) => {
    if (err0) stdout.write(err0);
    fs.readFile(fileIndexHtml, 'utf8', (err1, dataTemplate) => {
      if (err1) stdout.write(err1);
      const fragment = dataTemplate.replace(/{{header}}/, dataHeader);
      fs.writeFile(fileIndexHtml, fragment, (err2) => {
        if (err2) stdout.write(err2);
      });
    });
  });
}
function artReplacing() {
  fs.readFile(pathCompArt, 'utf8', (err0, dataArt) => {
    if (err0) stdout.write(err0);
    fs.readFile(fileIndexHtml, 'utf8', (err1, dataTemplate) => {
      if (err1) stdout.write(err1);
      const fragment = dataTemplate.replace(/{{articles}}/, dataArt);
      fs.writeFile(fileIndexHtml, fragment, (err2) => {
        if (err2) stdout.write(err2);
        headerReplacing();
      });
    });
  });
}
function footReplacing() {
  fs.readFile(pathCompFoot, 'utf8', (err0, dataFooter) => {
    if (err0) stdout.write(err0);
    fs.readFile(fileIndexHtml, 'utf8', (err1, dataTemplate) => {
      if (err1) stdout.write(err1);
      const fragment = dataTemplate.replace(/{{footer}}/, dataFooter);
      fs.writeFile(fileIndexHtml, fragment, (err2) => {
        if (err2) stdout.write(err2);
        artReplacing();
      });
    });
  });
}

function cssCopying() {
  fs.readdir(pathCSS, (err, files) => {
    if (err) stdout.write(err);
    files.forEach((file) => {
      if (path.extname(file) === '.css') {
        const filePath = path.join(pathCSS, file);
        fs.readFile(filePath, 'utf8', (errr, fileCont) => {
          if (errr) { stdout.write(errr); }
          fs.appendFile(pathCopyCSS, fileCont, (err85, data) => {
            if (err85) stdout.write(err85);
          });
        });
      }
    });
  });
}

function assetsFoldersCreating() {
  fs.mkdir(pathNewAssets, (err87) => {
    if (err87) stdout.write(err87);
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), (err88) => {
      if (err88) stdout.write(err88);
      filesEnumerating(pathFonts, pathFontsCopy);
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), (err91) => {
      if (err91) stdout.write(err91);
      filesEnumerating(pathImg, pathImgCopy);
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), (err94) => {
      if (err94) stdout.write(err94);
      filesEnumerating(pathSVG, pathSvgCopy);
    });
  });
}

function fileFolderCreating() {
  fs.mkdir(path.join(__dirname, 'project-dist'), () => {
    assetsFoldersCreating();
    fs.readFile(pathTemplate, 'utf8', (err13, dataHtml) => {
      if (err13) stdout.write(err13);
      fs.writeFile(fileIndexHtml, dataHtml, (err17) => {
        if (err17) stdout.write(err17);
        footReplacing();
        cssCopying();
      });
    });
  });
}

const pathArr = [pathFontsCopy, pathImgCopy, pathSvgCopy];

function clearing() {
  let permCSS = false;
  let permHtml = false;
  pathArr.forEach((element) => {
    fs.readdir(element, (err127, files) => {
      if (err127) stdout.write(err127);
      files.forEach((file) => {
        const pathFile = path.join(element, file);
        fs.unlink(pathFile, (err133, data) => {
          if (err133) stdout.write(err133);
        });
      });
      fs.rmdir(element, (err138, data) => {
        if (err138) stdout.write(err138);
      });
    });
  });
  fs.unlink(fileIndexHtml, (err144, data) => {
    if (err144) stdout.write(err144);
    fs.unlink(pathCopyCSS, (err146, data) => {
      if (err146) stdout.write(err146);
      fs.rmdir(pathNewAssets, (err149) => {
        if (err149) stdout.write(err149);
      });
      fs.rmdir(path.join(__dirname, 'project-dist'), (err152) => {
        if (err152) stdout.write(err152);
      });
    });
  });
}

clearing();

setTimeout(() => {
  fileFolderCreating();
}, 1800);
