
/**                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **/

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/

var highScoreTable = {
  users: {
    Alexis: 100,
    Blake: 20,
    Wilkin: 200
  }
}


function simpleWrite() {
  console.log("Writing Message")
  firebase.database().ref('/messages').set({ message: 'Hello World!' })
}

function simpleRead() {
  console.log("Reading Message")
  firebase.database().ref('/messages/message').once('value', displayRead, fb_readError) // .on for listen for change, .once for once
}

function readListener() {
  console.log("Reading Message with Listener")
  firebase.database().ref('/messages/message').on('value', displayRead, fb_readError) // .on for listen for change, .once for once
}

function complexWrite() {
  console.log("Writing High Score Table")
  firebase.database().ref('/highscoretable').set(highScoreTable)
}

function updateWrite(user, score) {
  console.log("Updating High Score User Alexis")
  firebase.database().ref('/highscoretable/users/'+user).set(score)
}

//Resilient code stuff:

function displayRead(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) {
    console.log("There was no record when trying to read from the database!");
  } else {
    console.log("The message is: " + dbData);
    databaseOutput.textContent = dbData;

  }
}

function fb_readError(error) {
  console.log("There was an error reading this message!")
  console.error(error);
}
