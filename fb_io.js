/**************************************************************/
//fb_io.js: common firebase functions used throughout your code. 
/**************************************************************/


/**************************************************************/
//Functions called by Buttons; Writes/Reads
/**************************************************************/

function complexWrite() {
    console.log("Writing High Score Table")
    databaseOutput.innerHTML = "Written High Score Table";
    firebase.database().ref('/highscoretable').set(highScoreTable)
}

function updateWrite(user, score) {
    console.log("Updating High Score: User Alexis")
    databaseOutput.innerHTML = "Updating Alexis' Highscore";
    firebase.database().ref('/highscoretable/users/' + user).set(score)
}

function complexRead() {
    console.log("Reading High Scores")
    databaseOutput.innerHTML = "Reading Highscores";
    firebase.database().ref('/highscoretable/users').once('value', displayHighScores, fb_readError)
}

function sortedRead() {
    console.log("Reading Sorted High Scores")
    databaseOutput.innerHTML = "Reading sorted highscores";
    firebase.database().ref('/highscoretable/users').orderByValue().limitToLast(3).once('value', displayHighScoresSorted, fb_readError)
    //orderByValue orders it, limitToLast gives top (3) values, limitToFirst exists
}

/**************************************************************/
//Displaying Info 
/**************************************************************/

function displayHighScores(snapshot) {
    databaseOutput.innerHTML = "";
    var highScores = snapshot.val();
    if (highScores == null) {
        console.log("There was no record when trying to read from the database!");
        databaseOutput.innerHTML = "There was no record when trying to read from the database!";
    } else {
        let names = Object.keys(highScores);
        for (i = 0; i < names.length; i++) {
            console.log("Score " + i + " is for " + names[i] + ", with " + highScores[names[i]] + " points. ");
            databaseOutput.innerHTML += "Score " + i + " is for " + names[i] + ", with " + highScores[names[i]] + " points. " + "<br>";
        }
    }
}

function displayHighScoresSorted(snapshot) {
    databaseOutput.innerHTML = "";
    sortedArrayKey = [];
    sortedArrayVal = [];
    //snapshot.forEach(showOneScore);
    snapshot.forEach(addToArray);
    sortedArrayVal.reverse();
    sortedArrayKey.reverse();
    for (i = 0; i < sortedArrayKey.length; i++) {
        console.log((i + 1) + ". " + sortedArrayKey[i] + " got " + sortedArrayVal[i] + " points")
        databaseOutput.innerHTML += (i + 1) + ". " + sortedArrayKey[i] + " got " + sortedArrayVal[i] + " points" + "<br>";
    }
}

function addToArray(child) {
    sortedArrayVal.push(child.val())
    sortedArrayKey.push(child.key)
}

/*
function showOneScore(child) {
    console.log(child.key + " got " + child.val() + " points");
    databaseOutput.innerHTML += child.key + " got " + child.val() + " points" + "<br>";
}
*/


function fb_readError(error) {
    console.log("There was an error reading this message!")
    console.error(error);
    databaseOutput.innerHTML = "There was an error reading the message!";
}


/**************************************************************/
//Login With Google + User Info
/**************************************************************/

function fb_login() {
    let user;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("Logged In")
            databaseOutput.innerHTML = "Logged In";
            var uid = user.uid;
            user = firebase.auth().currentUser;
            if (user !== null) {
                const userDisplayName = user.displayName;
                const userEmail = user.email;
                const userPhotoURL = user.photoURL;
                const userID = user.uid;
                userInfo.innerHTML = userDisplayName + "<br>" + userEmail + "<br>" + "<img src=" + userPhotoURL + " alt='Girl in a jacket' width='100' height='100'>";
            }
        } else {
            console.log("Not Logged In")
            databaseOutput.innerHTML = "Not Logged In";
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
            });
        }
    });
}