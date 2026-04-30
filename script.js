
/**************************************************************/
// Script.js is where you will write most of your code.     
/**************************************************************/

let sortedArrayVal = [];
let sortedArrayKey = [];

var highScoreTable = {
  users: {
    Alexis: 100,
    Blake: 20,
    Wilkin: 200,
    Ryan: 30,
    Joe: 45
  }
}

/**************************************************************/
// Simple Message Stuff
/**************************************************************/

function simpleWrite() {
  console.log("Writing Message")
  databaseOutput.innerHTML = "Message Written to DB";
  firebase.database().ref('/messages').set({ message: 'Hello World!' })
}

function simpleRead() {
  console.log("Reading Message")
  databaseOutput.innerHTML = "Reading Message from DB";
  firebase.database().ref('/messages/message').once('value', displayRead, fb_readError) // .on for listen for change, .once for once
}

function readListener() {
  console.log("Reading Message with Listener")
  databaseOutput.innerHTML = "Reading Message with Listener...";
  firebase.database().ref('/messages/message').on('value', displayRead, fb_readError) // .on for listen for change, .once for once
}

function displayRead(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) {
    console.log("There was no record when trying to read from the database!");
    databaseOutput.innerHTML = "There was no record when trying to read from the database!";
  } else {
    console.log("The message is: " + dbData);
    databaseOutput.textContent = dbData;
  }
}
