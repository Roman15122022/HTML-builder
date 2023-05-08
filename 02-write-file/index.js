const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = './02-write-file/text.txt';

if (!fs.existsSync('./02-write-file')) {
  fs.mkdirSync('./02-write-file');
}

rl.setPrompt('Введите текст для записи в файл: ');
rl.prompt();

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Завершение программы...');
    rl.close();
  } else {
    const streamOptions = { flags: 'a', encoding: 'utf8' };
    const writeStream = fs.createWriteStream(filePath, streamOptions);
    writeStream.write(`${input}\n`);
    console.log(`Текст "${input}" записан в файл.`);
    rl.prompt();
  }
});

rl.on('close', () => {
  console.log('Программа завершена.');
});
