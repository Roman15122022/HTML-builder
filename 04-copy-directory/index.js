const fs = require('fs');
const path = require('path');

const copyDir = (src, dest) => {
  // создаем папку назначения, если ее нет
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  // получаем список файлов в директории
  const files = fs.readdirSync(src);

  // рекурсивно копируем каждый файл в папку назначения
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    // получаем информацию о файле/папке
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      // если это папка, рекурсивно копируем ее содержимое
      copyDir(srcPath, destPath);
    } else {
      // если это файл, копируем его
      const readStream = fs.createReadStream(srcPath);
      const writeStream = fs.createWriteStream(destPath);
      readStream.pipe(writeStream);
    }
  });
};

const sourceFolder = './04-copy-directory/files';
const destinationFolder = './04-copy-directory/files-copy';

// запускаем копирование директории
copyDir(sourceFolder, destinationFolder);
