//   General data structures and algorithms
//  practice implementing generic versions of common ones 

const stringHash = require('string-hash');
const inquirer = require('inquirer');

const cliInput = process.argv;

const typedCommand = cliInput[2];

const arg1 = cliInput[3];

if (!typedCommand){
  console.log("Please enter a function to run from the following list:\n hash");
  process.exit(1);
};

if (!arg1) {
  console.log("Please enter a value to pass the function.");
  process.exit(1);
}
// Interactive hashing function

  //function to return array index where input is to be placed, or found (this one only uses the first 200 indexes of the array strings are stored in, so it can be displayed to the screen and interacted with)

function hashData(data) {
  let hashNum = stringHash(data);
  // Array is limited to length of 200 for display purposes, hashNum can be used directly if not printed out 
  let slot = hashNum % 200;
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
        if (retArr[hashed[1]]) {
          //  This needs to be put in a loop to check all indexes of the array (could be more than 1)
          if (retArr[hashed[1]] != toHash) {
            retArr[hashed[1]].push(toHash);
            console.log("Hash number" + hashed[0] + "\nTo be placed in array at index " + hashed[1]);
          }
          else {
            console.log("That string already exists in the array.\n");
          }
        }
        else {
          retArr[hashed[1]] = [toHash];
        }
        console.log("\n" + JSON.stringify(retArr));
      }
      else if (answers.action === "Lookup") {
        if (retArr[hashed[1]]) {
          for (let i = 0; i < retArr[hashed[1]].length; i++) {
            if (retArr[hashed[1]][i] === toHash) {
              console.log(retArr[hashed[1]][i] === toHash ? `The string ${toHash} exists in this two-dimentional array at index [${hashed[1]}][${i}]` : "");
            };
          }
        }
        else {
          console.log("That string does not exist in this array.");
        }
      }
      else {process.exit(1)};
      inquireHash();
    });
  
};

if (/hash/i.test(typedCommand)) {
  const hashSlot = hashData(arg1);
  console.log("Hash number" + hashSlot[0] + "\nTo be placed in array at index " + hashSlot[1]);
  if (retArr[hashSlot[1]]) {
    if (hashSlot[1] != arg1) {
    retArr[hashSlot[1]].push(arg1);
    }
    else {
      console.log("That string already exists in the array.");
    }
  }
  else {
    retArr[hashSlot[1]] = [arg1];
  }
  console.log("\n" + JSON.stringify(retArr));
  inquireHash();
}

else {
  console.log("Please enter a valid argument from the following list:\nhash");
  process.exit(1);
};

// End interactive hashing function