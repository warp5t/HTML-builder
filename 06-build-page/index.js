const fs = require('fs');
const path = require('path');

const distFolder = path.join(__dirname, 'project-dist');

fs.mkdir(distFolder, { recursive: true }, (err) => {
  if (err) throw err;

  const templatePath = path.join(__dirname, 'template.html');
  const componentsFolder = path.join(__dirname, 'components');
  const outputHTML = path.join(distFolder, 'index.html');

  // html
  fs.readFile(templatePath, 'utf-8', (err, template) => {
    if (err) throw err;

    fs.readdir(componentsFolder, (err, components) => {
      if (err) throw err;

      let pending = components.length;

      components.forEach((component) => {
        const componentName = path.basename(component, '.html');
        const componentPath = path.join(componentsFolder, component);

        fs.readFile(componentPath, 'utf-8', (err, componentContent) => {
          if (err) throw err;

          template = template.replace(`{{${componentName}}}`, componentContent);
          pending -= 1;

          if (pending === 0) {
            fs.writeFile(outputHTML, template, (err) => {
              if (err) throw err;
              console.log('HTML is finished');
            });
          }
        });
      });
    });
  });
// styles css
  const stylesFolder = path.join(__dirname, 'styles');
  const outputCSS = path.join(distFolder, 'style.css');

  fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    let cssContent = '';
    let pending = cssFiles.length;

    files.forEach((file) => {
      const filePath = path.join(stylesFolder, file.name);

      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;

        cssContent += data + '\n';

        pending -= 1;

        if (pending === 0) {
          fs.writeFile(outputCSS, cssContent, (err) => {
            if (err) throw err;
            console.log('Styles are finished');
          });
        }
      });
    });
  });

  const assetsFolder = path.join(__dirname, 'assets');
  const outputAssets = path.join(distFolder, 'assets');

  const copyFolder = (src, dest) => { fs.mkdir(dest, { recursive: true }, (err) => {
      if (err) throw err;

      fs.readdir(src, {
        withFileTypes: true
      }, (err, entries) => {
        if (err) throw err;

        let pending = entries.length;

        if (pending === 0) return;

        entries.forEach((entry) => {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);

          if (entry.isDirectory()) {
            copyFolder(srcPath, destPath);
            pending -= 1;
            if (pending === 0) console.log('Assets copied');
          } else {
            fs.copyFile(srcPath, destPath, (err) => {
              if (err) throw err;

              pending -= 1;
              if (pending === 0) console.log('Assets copied!');
            });
          }
        });
      });
    });
  };

  copyFolder(assetsFolder, outputAssets);
});