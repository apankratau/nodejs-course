const readline = require('readline');

const processLineByLine = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  rl.on('line', (line) => {
    const reversedLine = line.split('').reverse().join('');
    readline.moveCursor(process.stdout, 0, -1);
    console.log(reversedLine + '\n');
  }).on('close', () => {
    process.exit(0);
  });
}

processLineByLine();
