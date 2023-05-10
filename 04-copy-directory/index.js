const fs = require('fs/promises');
const path = require('path');

const copyDir = async (src, dest) => {
  // создаем папку назначения, если ее нет
  try {
    await fs.mkdir(dest);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  // получаем список файлов в директории
  const files = await fs.readdir(src);

  // рекурсивно копируем каждый файл в папку назначения
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    // получаем информацию о файле/папке
    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      // если это папка, рекурсивно копируем ее содержимое
      await copyDir(srcPath, destPath);
    } else {
      // если это файл, копируем его
      const fileData = await fs.readFile(srcPath);
      await fs.writeFile(destPath, fileData);
    }
  }
};

const sourceFolder = './04-copy-directory/files';
const destinationFolder = './04-copy-directory/files-copy';

// запускаем копирование директории
copyDir(sourceFolder, destinationFolder)
  .then(() => {
    console.log('Directory copied successfully!');
  })
  .catch((err) => {
    console.error('Error copying directory:', err);
  });
