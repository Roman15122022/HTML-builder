const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const mkdirPromise = promisify(fs.mkdir);
const writeFilePromise = promisify(fs.writeFile);

const filePath = './02-write-file/text.txt';

(async () => {
  try {
    await mkdirPromise('./02-write-file');
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(err);
      process.exit(1);
    }
  }
})();

rl.setPrompt('Введите текст для записи в файл: ');
rl.prompt();

rl.on('line', async (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Завершение программы...');
    rl.close();
    return;
  }
  try {
    await writeFilePromise(filePath, `${input}\n`, { flag: 'a' });
    console.log(`Текст "${input}" записан в файл.`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  rl.prompt();
});

rl.on('close', () => {
  console.log('Программа завершена.');
});
