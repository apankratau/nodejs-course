import { pipeline } from 'stream';
import fs from 'fs';
import csv from 'csvtojson';

const PATH_TO_CSV = './module-1/task-3/task-2/csv/sample.csv';
const PATH_TO_TXT = './module-1/task-3/task-2/txt/sample.txt';

pipeline(
  fs.createReadStream(PATH_TO_CSV),
  csv(),
  fs.createWriteStream(PATH_TO_TXT),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
