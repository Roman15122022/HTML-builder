const fs = require('fs');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKb = fileSizeInBytes / 1024;
        const fileExtension = path.extname(file).substring(1);

        console.log(`${file}-${fileExtension}-${fileSizeInKb.toFixed(3)}kb`);
      }
    });
  });
});
