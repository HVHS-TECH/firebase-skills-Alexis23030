/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/

var highScoreTable = {
    users: {
        Alexis: 100,
        Blake: 20,
        Wilkin: 200,
        Ryan: 30,
        Joe: 45
    }
}

function complexWrite() {
    console.log("Writing High Score Table")
    firebase.database().ref('/highscoretable').set(highScoreTable)
}

function updateWrite(user, score) {
    console.log("Updating High Score User Alexis")
    firebase.database().ref('/highscoretable/users/' + user).set(score)
}

function complexRead() {
    console.log("Reading High Scores")
    firebase.database().ref('/highscoretable/users').once('value', displayHighScores, fb_readError)
}

function sortedRead() {
    console.log("Reading Sorted High Scores")
    firebase.database().ref('/highscoretable/users').orderByValue().limitToLast(3).once('value', displayHighScoresSorted, fb_readError)
    //orderByValue orders it, limitToLast gives top (3) values, limitToFirst exists
}

//Display Data:
const sortedArrayVal = [];
const sortedArrayKey = [];

function displayHighScoresSorted(snapshot) {
    databaseOutput.innerHTML = "";
    //snapshot.forEach(showOneScore);
    snapshot.forEach(addToArray);
    sortedArrayVal.reverse();
    sortedArrayKey.reverse();
    for (i = 0; i < sortedArrayKey.length; i++) {
        console.log(sortedArrayKey[i] + " got " + sortedArrayVal[i] + " points")
        databaseOutput.innerHTML += sortedArrayKey[i] + " got " + sortedArrayVal[i] + " points" + "<br>";
    }
}

/*
function showOneScore(child) {
    console.log(child.key + " got " + child.val() + " points");
    databaseOutput.innerHTML += child.key + " got " + child.val() + " points" + "<br>";
}*/


function addToArray(child) {
    sortedArrayVal.push(child.val())
    sortedArrayKey.push(child.key)
}











function displayHighScores(snapshot) {
    var highScores = snapshot.val();
    if (highScores == null) {
        console.log("There was no record when trying to read from the database!");
    } else {
        let names = Object.keys(highScores);
        for (i = 0; i < names.length; i++) {
            console.log("Score " + i + " is for " + names[i] + ", with " + highScores[names[i]] + " points. ");
            databaseOutput.innerHTML = "Score " + i + " is for " + names[i] + ", with " + highScores[names[i]] + " points. ";
        }
    }
}

function fb_readError(error) {
    console.log("There was an error reading this message!")
    console.error(error);
}