function closeVolumeContainer() {
    document.getElementsByClassName("volume-container-shown")[0].className =
        "volume-container";
}
function openVolumeContainer() {
    document.getElementsByClassName("volume-container")[0].className =
        "volume-container-shown";
}

function pauseOrPlay() {
    var el = this.className;
    var songName = document.getElementsByClassName("selected-song")[0].getElementsByTagName("TD")[1].textContent;
    var composerName = document.getElementsByClassName("selected-song")[0].getElementsByTagName("TD")[0].textContent;
    
    document.getElementsByClassName("song-name")[0].textContent = songName;
    document.getElementsByClassName("author")[0].textContent = composerName;
    if (el == "pause-song") {
        console.log(this.className);
        document.getElementById("hidden-player").pause();

        document.getElementsByClassName("pause-song")[0].className = "play-song";
    } else if (el == "play-song") {
        document.getElementById("hidden-player").play();
        document.getElementsByClassName("play-song")[0].className = "pause-song";
    }
}

function setFirstSongInListAsDefaultAndPlay() {
    if (
        document
            .getElementsByClassName("list-of-songs")[0]
            .getElementsByTagName("TR").length > 1
    ) {
        document
            .getElementsByClassName("list-of-songs")[0]
            .getElementsByTagName("TR")[1]
            .classList.toggle("selected-song");

        var autoSelectDefaultSong = document
            .getElementsByClassName("list-of-songs")[0]
            .getElementsByTagName("TR")[1]
            .getElementsByClassName("playlist-column-button")[0]
            .getAttribute("data-source");
        document.getElementById("hidden-player").src = autoSelectDefaultSong;

        //Load i play ali tek kada korisnik ima interakciju
        /* 
                document.getElementById("hidden-player").load();
                document.getElementById("hidden-player").play();
                */
    }
}
function settingVolume() {
    var defaultVolume = 2;
    document.getElementById("slider-volume").value = parseInt(defaultVolume);
    document.getElementById("hidden-player").volume =
        parseInt(defaultVolume) / 100;
}

function changeVolume() {
    var el1 = document.getElementById("slider-volume").value;
    var trueValue = parseInt(el1) / 100;

    document.getElementById("hidden-player").volume = trueValue;
}

function convertSecondsToMinutes(duration, curentTimeOfSong) {
    var x = Number.isNaN(duration);

    if (x == true) {
        document.getElementById("song-duration").textContent = "0:00";
    } else {
        var duration = document.getElementById("hidden-player").duration;
        var minutes = Math.floor(duration / 60);
        var seconds = Math.floor(duration % 60).toString();
        document.getElementById("song-duration").textContent =
            minutes + ":" + seconds.padStart(2, "0");
    }

    var curentTimeOfSong = curentTimeOfSong;
    var minutes = Math.floor(curentTimeOfSong / 60);
    var seconds = Math.floor(curentTimeOfSong % 60).toString();
    document.getElementById("curent-duration").textContent =
        minutes + ":" + seconds.padStart(2, "0");
}

function changeAudioTime() {
    var realDuration = document.getElementById("hidden-player").duration;
    document
        .getElementById("tracker-slider")
        .setAttribute("max", realDuration.toFixed(2));
    document.getElementById("hidden-player").currentTime =
        document.getElementById("tracker-slider").value;
    var curentTimeOfSong = document.getElementById("hidden-player").currentTime;
    convertSecondsToMinutes(realDuration, curentTimeOfSong);
}
function trackAudioTime() {
    var realDuration = document.getElementById("hidden-player").duration;
    document
        .getElementById("tracker-slider")
        .setAttribute("max", realDuration.toFixed(2));
    document.getElementById("tracker-slider").value =
        document.getElementById("hidden-player").currentTime;
    var curentTimeOfSong = document.getElementById("hidden-player").currentTime;

    convertSecondsToMinutes(realDuration, curentTimeOfSong);

    if (document.getElementById("hidden-player").ended == true) {
        document.getElementById("play-and-pause").click();
    }
}

function shuffleSongs() {
    var rowsOfSongs = document.getElementsByClassName("list-of-songs")[0];
    var numOfRows = rowsOfSongs.getElementsByTagName("TR").length - 1;
    if (numOfRows == 1) {
    } else {
        var t = Math.floor(Math.random() * numOfRows) + 1;
        rowsOfSongs
            .getElementsByTagName("TR")
        [t].getElementsByClassName("playlist-column-button")[0]
            .click();

    }
}
function nextSong() {
    document.getElementById("hidden-player").pause();
    var itemNum = document.getElementById("track-number").getAttribute("data-item");
    if (itemNum == "-1") {

    } else {
        itemNum = parseInt(itemNum);
        var x = (itemNum + 1)
        if (document.getElementsByClassName("playlist-column-button").length > x) {
            console.log(itemNum);
            document.getElementsByClassName("playlist-column-button")[x].click();
        } else {
            document.getElementsByClassName("playlist-column-button")[0].click();
        }

    }
}

function previousSong() {
    document.getElementById("hidden-player").pause();
    var itemNum = document.getElementById("track-number").getAttribute("data-item");
    if (itemNum == "Nil") {
    } else {
        itemNum = parseInt(itemNum);
        var x = (itemNum - 1)
        if (x >= 0) {
            document.getElementsByClassName("playlist-column-button")[x].click();
        } else {
            document.getElementById("play-and-pause").click();
            alert("Došli ste na vrh liste!");
            document.getElementById("play-and-pause").click();
        }

    }
}
document
    .getElementsByClassName("volume-control")[0]
    .addEventListener("click", openVolumeContainer);
document
    .getElementById("close-volume")
    .addEventListener("click", closeVolumeContainer);
document
    .getElementById("play-and-pause")
    .addEventListener("click", pauseOrPlay);
document
    .getElementById("slider-volume")
    .addEventListener("input", changeVolume);

document
    .getElementById("tracker-slider")
    .addEventListener("input", changeAudioTime);

//document.getElementById("hidden-player").addEventListener("input", trackAudioTime);
document
    .getElementById("hidden-player")
    .addEventListener("timeupdate", trackAudioTime);
document
    .getElementsByClassName("shuffle-song")[0]
    .addEventListener("click", shuffleSongs);

document.getElementsByClassName("next-song")[0].addEventListener("click", nextSong);
document.getElementsByClassName("previous-song")[0].addEventListener("click", previousSong);
document.getElementById("track-number").setAttribute("data-item", "0");
trackAudioTime();
setFirstSongInListAsDefaultAndPlay();
settingVolume();
