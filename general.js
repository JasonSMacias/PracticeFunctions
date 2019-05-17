//   General data structures and algorithms
//  practice implementing generic versions of common ones 

const stringHash = require('string-hash');
const inquirer = require('inquirer');

const cliInput = process.argv;

const typedCommand = cliInput[2];

const arg1 = cliInput[3];

if (!typedCommand){
  console.log("Please enter a function to run from the following list:\n hash\n lookup");
  process.exit(1);
};

if (!arg1) {
  console.log("Please enter a value to pass the function.");
  process.exit(1);
}
// Hashing function

  //function to return array index where input is to be placed, or found (this one only uses the first 100 indexes of the array strings are stored in, so it can be displayed to the screen and interacted with)

function hashData(data) {
  let hashNum = stringHash(data);
  // Array is limited to length of 20 for display purposes, hashNum can be used if not printed out, because array may end up being up to 2 to the 32 power
  let slot = hashNum % 100;
  return [hashNum, slot];
}
//  Setting up empty array to be added to, and read from
let retArr = [];

function inquireHash() {
  
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do",
        choices: [
          "Hash", "Lookup", new inquirer.Separator(), "Quit"
        ]
      },
      {
        type: "input",
        name: "string",
        message: "Enter your string"
      }
    ])
    .then(answers => {
      const toHash = answers.string;
      const hashed = hashData(toHash);
      console.log(`You want to: ${answers.action} ${toHash}`);
      if (answers.action === "Hash") {
        console.log("Hash number" + hashed[0] + "\nTo be placed in array at index " + hashed[1]);
        if (retArr[hashed[1]]) {
        retArr[hashed[1]].push(toHash);
        }
        else {
          retArr[hashed[1]] = [toHash];
        }
        console.log("\n" + JSON.stringify(retArr));
        inquireHash();
      }
      else if (answers.action === "Lookup") {
        console.log("Lookup to be implemented later");
      }
      else {process.exit(1)};
    });
  
};

if (/hash/i.test(typedCommand)) {
  const hashSlot = hashData(arg1);
  console.log("Hash number" + hashSlot[0] + "\nTo be placed in array at index " + hashSlot[1]);
  if (retArr[hashSlot[1]]) {
  retArr[hashSlot[1]].push(arg1);
  }
  else {
    retArr[hashSlot[1]] = [arg1];
  }
  console.log("\n" + JSON.stringify(retArr));
  inquireHash();
}

if (/lookup/i.test(typedCommand)) {
  const hashSlot = hashData(arg1);
  // Put lookup function here after program is switched from arguments to inquirer, to allow lookup in 2d array
  inquireHash();
}

// End hashing function