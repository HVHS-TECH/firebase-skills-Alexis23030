/**************************************************************/
//fb_io.js: common firebase functions used throughout your code. 
/**************************************************************/
let userDisplayName;
let userEmail;
let userPhotoURL;
let uid;

/**************************************************************/
//Functions called by Buttons; Writes/Reads
/**************************************************************/

function complexWrite() {
    console.log("This Function Does Nothing Now")
    databaseOutput.innerHTML = " This Function Does Nothing Now"
    /*console.log("Writing High Score Table")
    databaseOutput.innerHTML = "Written High Score Table";
    firebase.database().ref('/highscoretable').set(highScoreTable)*/
}

function updateWrite(score) {
    console.log("Updating High Score User")
    databaseOutput.innerHTML = "Updating Alexis' Highscore";
    firebase.database().ref('/highscoretable/users/' + uid + "/Score").set(score)
}

function complexRead() {
    console.log("This Function Does Nothing Now")
    databaseOutput.innerHTML = "This Function Does Nothing Now";
}

async function sortedRead() {
    console.log("Reading Sorted High Scores")
    databaseOutput.innerHTML = "Reading sorted highscores";
    var snapshot = await firebase.database().ref('/highscoretable/users').orderByValue().limitToLast(3).once('value')
    //orderByValue orders it, limitToLast gives top (3) values, limitToFirst exists
    databaseOutput.innerHTML = "";
    let highScores = snapshot.val();

    if (highScores == null) {
        console.log("There was no record when trying to read from the database!");
        databaseOutput.innerHTML = "There was no record when trying to read from the database!";
    } else {
        let highScoreInfo = Object.values(highScores);
        highScoreInfo.reverse(); //This line reverses the order so that when sorted it is biggest to smallest
        console.log("biggie is " + highScoreInfo[0].Name)
        for (i = 0; i < highScoreInfo.length; i++) {
            let currentName = highScoreInfo[i].Name;
            let currentScore = highScoreInfo[i].Score;
            console.log(i+1 + " place: "+ currentName + ", with " + currentScore + " points. ");
            databaseOutput.innerHTML += i+1 + " place: " + currentName + ", with " + currentScore + " points. <br>";
        }
    }
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
            user = firebase.auth().currentUser;
            if (user !== null) {
                userDisplayName = user.displayName;
                userEmail = user.email;
                userPhotoURL = user.photoURL;
                uid = user.uid;
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