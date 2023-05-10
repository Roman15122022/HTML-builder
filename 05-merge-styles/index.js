const fs = require('fs/promises');
const path = require('path');

const stylesFolderPath = '05-merge-styles/styles';
const bundleFilePath = './project-dist/bundle.css';

// Создаем папку project-dist, если ее не существует
async function createProjectDistFolder() {
  try {
    await fs.mkdir('./project-dist');
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// Читаем содержимое папки styles
async function readStylesFolder() {
  try {
    const files = await fs.readdir(stylesFolderPath);

    const styles = [];

    for (const file of files) {
      const filePath = path.join(stylesFolderPath, file);

      if (path.extname(file) === '.css') {
        const data = await fs.readFile(filePath, 'utf8');
        styles.push(data);
      }
    }

    return styles;
  } catch (err) {
    throw err;
  }
}

// Записываем объединенные стили в файл bundle.css
async function writeBundleFile(styles) {
  try {
    await fs.writeFile(bundleFilePath, styles.join('\n'));
    console.log('Styles have been successfully bundled!');
  } catch (err) {
    throw err;
  }
}

// Выполняем все операции последовательно
async function mergeStyles() {
  try {
    await createProjectDistFolder();
    const styles = await readStylesFolder();
    await writeBundleFile(styles);
  } catch (err) {
    console.error(err);
  }
}

// Запускаем процесс объединения стилей
mergeStyles();
