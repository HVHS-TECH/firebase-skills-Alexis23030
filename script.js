
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

function fb_login() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Logged In")
      console.log(user)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      var uid = user.uid;
      // ...
    } else {
      console.log("Not Logged In")
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      });
    }
  });
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