const fs = require('fs');
const path = require('path');

const sourceFolder = './04-copy-directory/files';
const destinationFolder = './04-copy-directory/files-copy';

// проверяем наличие папки files-copy и создаем ее, если ее нет
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder);
} else {
  console.log(`Folder ${destinationFolder} already exists. Also created.`);
}

fs.readdir(sourceFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const sourcePath = path.join(sourceFolder, file);
    const destinationPath = path.join(destinationFolder, file);

    fs.copyFile(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`${file} copied successfully`);
    });
  });
});
