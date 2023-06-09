let playerAudioElement = document.getElementsByClassName("song-1-playing")[0];
let volumeElement = document.getElementById('volume-slider');

let playingNowLength = playlist0.length;
let playingIndex = 0;
let playingNowOld = playingIndex;
let playingNowSongName;

let counterForStartingSong = 0;

if (volumeElement) {
  volumeElement.addEventListener("input", function () {
    let speakerValue = volumeElement.value;
    playerAudioElement.volume = speakerValue / 100;
  });
}

function nextPage() {
  window.location.href = "https://www.xn--kolanadlanu-fhc.hr/";
}

const playPauseButton = document.getElementsByClassName("play")[0];
playPauseButton.addEventListener("click", playPause);

function playPause() {
  let imageSource = playPauseButton.getAttribute("src");
  checkForExistingSongs();
  if (songsNowDown.length == 0) { }
  else if (imageSource === ("themes/" + preferredTheme + "/icons/play-player.png") && songsNowDown.length > 0 && counterForStartingSong == 0) {
    counterForStartingSong++;
    let music = playlist0[playingIndex].source;
    playerAudioElement.setAttribute("src", music);
    playerAudioElement.play();
    playPauseButton.setAttribute("src", "themes/" + preferredTheme + "/icons/pause-player.png");
  }
  else if (imageSource === ("themes/" + preferredTheme + "/icons/play-player.png") && songsNowDown.length > 0 && counterForStartingSong >= 1) {
    playPauseButton.setAttribute("src", "themes/" + preferredTheme + "/icons/pause-player.png");
    playMusic();
  } else {
    playPauseButton.setAttribute("src", "themes/" + preferredTheme + "/icons/play-player.png");
    stopMusic();
  };

}

function playMusic() {
  playerAudioElement.play();
}

function stopMusic() {
  playerAudioElement.pause();
}




let counterForListenersForSkips = 0;
function activatePreviousAndNextSongButton() {
  let checkForSongsDown = document.querySelectorAll('.song-1');

  if (checkForSongsDown.length > 0) {
    const nextSongButton = document.getElementsByClassName("next")[0];
    nextSongButton.addEventListener("click", nextSong);
    const previousSongButton = document.getElementsByClassName("previous")[0];
    previousSongButton.addEventListener("click", previousSong);
    const shuffleButton = document.getElementsByClassName("shuffle")[0];
    shuffleButton.addEventListener("click", shuffle);
    const repeatButton = document.getElementsByClassName("repeat")[0];
    repeatButton.addEventListener("click", repeat);
    counterForListenersForSkips++;
  } else if (counterForListenersForSkips > 0) {
    const nextSongButton = document.getElementsByClassName("next")[0];
    const previousSongButton = document.getElementsByClassName("previous")[0];
    const shuffleButton = document.getElementsByClassName("shuffle")[0];
    const repeatButton = document.getElementsByClassName("repeat")[0];
    repeatButton.removeEventListener("click", repeat);
    shuffleButton.removeEventListener("click", shuffle);
    nextSongButton.removeEventListener("click", nextSong);
    previousSongButton.removeEventListener("click", previousSong);
    counterForSliderForTimeForFirstTime = 0;
    newConvertSecondsToMinutesForNoneSongs();
  }

}

function nextSong() {
  for (let i = 0; i < playlist0.length; i++) {
    if (playingIndex == i) {
      if (playingIndex == (playlist0.length - 1)) {
        playingIndex = 0;
        break;
      }
      playingIndex++;
      break;
    }
  }
  funcitonForPlayingNextMusic();
}


function previousSong() {
  playingNowLength = playlist0.length;
  for (let i = 0; i < playlist0.length; i++) {
    if (playingIndex == i) {
      if (playingIndex == 0) {
        playingIndex = playingNowLength - 1;
        break;
      }
      playingIndex--;
      break;
    }
  }
  funcitonForPlayingNextMusic();
}

function funcitonForPlayingNextMusic() {
  let music = playlist0[playingIndex].source;
  if (playerAudioElement.duration > 0 && !playerAudioElement.paused) {
    playerAudioElement.pause();
    playerAudioElement.setAttribute("src", music);
    playerAudioElement.load();
    playerAudioElement.play();
  } else if (playerAudioElement.paused) {
    playerAudioElement.pause();
    playerAudioElement.setAttribute("src", music);
    playerAudioElement.load();
  }
  changeTitle();
  checkIfSongEnded();
  playingElementCheck();
}


function repeat() {
  const repeatButton = document.getElementsByClassName("repeat")[0];
  let imageSourceRepeat = repeatButton.getAttribute("src");
  if (imageSourceRepeat === "themes/" + preferredTheme + "/icons/repeat-off.png") {
    repeatButton.setAttribute("src", "themes/" + preferredTheme + "/icons/repeat-on.png");
    if (imageSourceRepeat.setAttribute === "media/pauza.png") {
      playerAudioElement.play();
    }

    playerAudioElement.loop = true;

  } else {
    repeatButton.setAttribute("src", "themes/" + preferredTheme + "/icons/repeat-off.png");
    if (imageSourceRepeat.setAttribute === "media/pauza.png") {
      playerAudioElement.play();
    }
    playerAudioElement.loop = false;

  }
  changeTitle();
}



function shuffle() {
  array = playlist0;
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  let temp = playlist0[playingIndex].nameOfSong;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  secondaryTitles();
  if (temp != playlist0[playingIndex].nameOfSong) {
    for (let i = 0; i < playlist0.length; i++) {
      if (temp == playlist0[i].nameOfSong) {
        playingIndex = i;
      }
    }
  }
  playingElementCheck();
  return playlist0;
}

function getClicksAndPlayMusicFromPlayButtons() {
  let secondaryPlayButtons = document.querySelectorAll('.play-button');
  let oldTemporary;

  secondaryPlayButtons.forEach((element, index) => {
    element.addEventListener('click', () => {
      let temporary = index;
      let temporaryName = document.getElementsByClassName("secondary-song-title")[temporary].textContent;
      counterForClickingOnPlayButton++;

      for (let i = 0; i < playlist0.length; i++) {
        if (playlist0[i].nameOfSong == temporaryName) {
          console.log(playlist0[i].nameOfSong);
          playingIndex = i;
        }
      }

      console.log(counterForClickingOnPlayButton);
      console.log(playingIndex);
      console.log(temporary);
      //playingIndex = temporary;

      const smallPlayPauseButton = document.getElementsByClassName("play-button")[temporary];
      let imageSourceSmall = smallPlayPauseButton.getAttribute("src");
      let music = playlist0[playingIndex].source;
      console.log(music);
      if (/*counterForClickingOnPlayButton == (temporary+1) &&*/ oldTemporary != temporary) {
        playerAudioElement.pause();
        playerAudioElement.setAttribute("src", music);
        playerAudioElement.load();
        playerAudioElement.addEventListener('canplaythrough', () => {
          playerAudioElement.play();
          playPauseButton.setAttribute("src", "themes/" + preferredTheme + "/icons/pause-player.png");
          counterForClickingOnPlayButton = 0;
        }, { once: true });
      }

      changeTitle();
      checkIfSongEnded();
      playingElementCheck();
      oldTemporary = temporary;

    });
  });

}
