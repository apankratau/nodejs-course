const { pipeline, Transform } = require('stream');
const fs = require('fs');
const csv = require('csvtojson');

const PATH_TO_CSV = './module-1/task-2/csv/sample.csv';
const PATH_TO_TXT = './module-1/task-2/txt/sample.txt';

const transformFn = (rawObj) => {
  const keysToOmit = ['amount'];
  const keysToConvertToNumber = ['price'];
  const rawObjCopy = { ...rawObj };

  return Object.keys(rawObjCopy)
    .filter((key) => !keysToOmit.includes(key.toLowerCase()))
    .reduce((newObj, key) => {
      newObj[key.toLowerCase()] = keysToConvertToNumber.includes(key.toLowerCase())
        ? parseFloat(rawObjCopy[key])
        : rawObjCopy[key];

      return newObj;
    }, {});
};

const main = () => {
  pipeline(
    fs.createReadStream(PATH_TO_CSV),
    csv(),
    new Transform({
      transform(chunk, encoding, callback) {
        const transformedObj = transformFn(JSON.parse(chunk));
        callback(null, Buffer.from(JSON.stringify(transformedObj) + '\n'));
      },
    }),
    fs.createWriteStream(PATH_TO_TXT),
    (err) => {
      if (err) {
        console.error('Pipeline failed', err);
      } else {
        console.log('Pipeline succeeded');
      }
    }
  );
};

main();
