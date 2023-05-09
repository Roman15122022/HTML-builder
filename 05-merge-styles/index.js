const fs = require('fs');
const path = require('path');

const stylesFolderPath = '05-merge-styles/styles';
const bundleFilePath = './project-dist/bundle.css';

// Создаем папку project-dist, если ее не существует
if (!fs.existsSync('./project-dist')) {
  fs.mkdir('./project-dist', (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

// Читаем содержимое папки styles
fs.readdir(stylesFolderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const styles = [];

  files.forEach((file) => {
    const filePath = path.join(stylesFolderPath, file);

    if (path.extname(file) === '.css') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        styles.push(data);

        if (styles.length === files.filter(f => path.extname(f) === '.css').length) {
          fs.writeFile(bundleFilePath, styles.join('\n'), (err) => {
            if (err) {
              console.error(err);
              return;
            }

            console.log('Styles have been successfully bundled!');
          });
        }
      });
    }
  });
});
