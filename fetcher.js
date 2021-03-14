const fs = require('fs');
const readline = require('readline');
const request = require('request');
const args = process.argv[2];
const url = args[0];
const file = args[1];

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {
  if (error) {
    console.log("URL does not exist!");
    r1.close();
  } else if (fs.existsSync(file)) {
    r1.question('File already exists! Overwrite? "y/n"', (answer) => {
      if (answer === 'y') {
        fs.writeFile(file, body, (err) => {
          if (err) {
            console.log('File cannot be created');
            r1.close();
          }
        });
      } else if (answer === 'n') {
        console.log('Exited application');
        r1.close();
      }
    });
  } else {
    fs.writeFile(file, body, (err) => {
      if (err) {
        console.log('File cannot be created');
        r1.close();
      } else {
        console.log(`Downloaded and saved ${fs.statSync(file).size} bytes to ${file}`);
        r1.close();
      }
    })
  }
  });