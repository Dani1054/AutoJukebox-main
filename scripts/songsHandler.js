function checkForExistingSongs() {
    songsNowDown = document.querySelectorAll('.song-1');
}

let songsNowDown;
let counter1 = 0;
checkIfSongEnded();
function checkSongsDown() { };

function checkIfSongEnded() {
    playerAudioElement.onended = function () {
        if (isAutopilotActive === false) {
            for (let i = 0; i < playlist0.length; i++) {
                if (i === playingIndex) {
                    if (playingIndex === (playingNowLength - 1)) {
                        playingIndex = 0;
                        break;
                    }
                    playingIndex++;
                    break;
                }
            }
            checkForExistingSongs();
            if (songsNowDown.length == 1) {
                playingIndex = 0;
            }
            let music = playlist0[playingIndex].source;
            playerAudioElement.pause();
            playerAudioElement.setAttribute("src", music);
            playerAudioElement.load();
            playerAudioElement.play();
            changeTitle();
            playingElementCheck();
        }
    };

}

let counterForSongs;
function checkSongsDown() {
    let songsDown = document.querySelectorAll(".song-1");
    counterForSongs = songsDown.length;
}

function changeTitle() {
    checkForExistingSongs();
    if (songsNowDown.length == 0 || songsNowDown.length == 1) {
        playingIndex = 0;
    }
    let playingNowSongName = playlist0[playingIndex].nameOfSong;
    document.getElementsByClassName("performer-playing")[0].textContent = playingNowSongName;
    let performerNameTitle = playlist0[playingIndex].nameOfPerformer;
    document.getElementsByClassName("performer-name-title")[0].textContent = performerNameTitle;
}

function changeTitleForDeletingPlaylist() {
    if (playlist0.length == 0) {
        makeControlsNoneAlways();
    } else {
        console.log("NOT OK");
        console.log(songDatabase);
        let playingNowSongName = playlist0[playingIndex].nameOfSong;
        document.getElementsByClassName("performer-playing")[0].textContent = playingNowSongName;
        let performerNameTitle = playlist0[playingIndex].nameOfPerformer;
        document.getElementsByClassName("performer-name-title")[0].textContent = performerNameTitle;
        
    }
}

makeControlsNone();
function makeControlsNone() {
    checkSongsDown();
    if (counterForSongs == 0) {
        document.getElementsByClassName("performer-playing")[0].textContent = 'None';
        document.getElementsByClassName("performer-name-title")[0].textContent = "None";
    } else {
        changeTitle();
    }
}

function makeControlsNoneAlways() {
    //console.log("HALO");
    document.getElementsByClassName("performer-playing")[0].textContent = 'None';
    document.getElementsByClassName("performer-name-title")[0].textContent = "None";
    document.getElementsByClassName("song-duration")[0].textContent = "0:00";
    document.getElementsByClassName("current-time")[0].textContent = "0:00";
}

function setLengthSlider() {
    let actualSliderLength = ((playerAudioElement.currentTime / playerAudioElement.duration) * 100).toString();
    document.getElementById("duration-slider").value = actualSliderLength;
};
let checkForCreatingButton = false;
setInterval(checkToStartUsingSliderForDuration, 1);

function checkToStartUsingSliderForDuration() {
    if (checkForCreatingButton == true) {
        let buttonForAddingSongs = document.getElementsByClassName("button-checklist")[0];
        buttonForAddingSongs.addEventListener("click", function () {
            checkForExistingSongs();
            //console.log(songsNowDown.length);
            if (songsNowDown.length > 0) {
                setInterval(setLengthSlider, 1);
                document.getElementById("duration-slider").addEventListener("input", setTimeAudio);
            }
        });
    }

}



function setTimeAudio() {
    let sliderValue = document.getElementById("duration-slider").value;
    let actualTime = (sliderValue / 100) * playerAudioElement.duration;
    playerAudioElement.currentTime = actualTime;
};




secondaryTitles();
function secondaryTitles() {
    for (let i = 0; i < playlist0.length; i++) {
        document.getElementsByClassName("secondary-song-title")[i].textContent = playlist0[i].nameOfSong;
        document.getElementsByClassName("performer")[i].textContent = playlist0[i].nameOfPerformer;
    }
}

let duration = playerAudioElement.duration;
let curentTimeOfSong = playerAudioElement.currentTime;

function newConvertSecondsToMinutesForNoneSongs() {
    if (playerAudioElement && playlist0.length != 0) {
        convertSecondsToMinutes();
    } else {
        document.getElementsByClassName("song-duration")[0].textContent = "0:00";
        document.getElementsByClassName("current-time")[0].textContent = "0:00";
    }
}

setInterval(newConvertSecondsToMinutesForNoneSongs, 1);
let counterForSliderForTimeForFirstTime = 0;

function convertSecondsToMinutes(duration, curentTimeOfSong) {
    if (counterForSliderForTimeForFirstTime == 0) {
        let music = playlist0[playingIndex].source;
        playerAudioElement.setAttribute("src", music);
        counterForSliderForTimeForFirstTime++;
    }

    var x = Number.isNaN(duration);

    if (x == true && playlist0.length == 0) {
        document.getElementsByClassName("song-duration")[0].textContent = "0:00";
    } else {

        var duration = playerAudioElement.duration;
        var minutes = Math.floor(duration / 60);
        var seconds = Math.floor(duration % 60).toString();
        //console.log(playerAudioElement);
        document.getElementsByClassName("song-duration")[0].textContent = minutes + ":" + seconds.padStart(2, "0");
    }
    var curentTimeOfSong = curentTimeOfSong;
    var minutes = Math.floor(playerAudioElement.currentTime / 60);
    var seconds = Math.floor(playerAudioElement.currentTime % 60).toString();
    document.getElementsByClassName("current-time")[0].textContent = minutes + ":" + seconds.padStart(2, "0");
}

playingElementCheck();
setInterval(playingElementCheck, 100);

function playingElementCheck() {
    checkForExistingSongs();
    checkSongsDown();
    if (counter1 == 0 && counterForSongs != 0 && songsNowDown.length > 0) {
        document.getElementsByClassName("song-1")[playingIndex].setAttribute("id", "song-1-focus");
        playingNowOld = playingIndex;
        counter1++;
    } else if (songsNowDown.length == 1) {
        playingIndex = 0;
        document.getElementsByClassName("song-1")[playingIndex].setAttribute("id", "song-1-focus");
    } else if (counterForSongs != 0 && songsNowDown.length > 0) {
        document.getElementsByClassName("song-1")[playingNowOld].removeAttribute("id");
        document.getElementsByClassName("song-1")[playingIndex].setAttribute("id", "song-1-focus");
        playingNowOld = playingIndex;
    }

}
