/**
 * Ovdje se nalazi i play gumbovi "sekundarni" jer ovise o Drag&Drop
 */

const draggables = document.querySelectorAll('.song-1');
const containers = document.querySelectorAll(".container-for-song-1");

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('.dragging');
  });
});

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}


function checkForPlayButtons() {
  secondaryPlayButtons = document.querySelectorAll('.play-button');
  //console.log(secondaryPlayButtons);
}

let secondaryPlayButtons = document.querySelectorAll('.play-button');

function getClicksAndPlayMusicFromPlayButtons() {
  if (secondaryPlayButtons.length == 0) {
    setInterval(checkForPlayButtons, 1000);
  } else if (secondaryPlayButtons.length > 0) {
    checkForPlayButtons();
    secondaryPlayButtons.forEach((element) => {
      element.addEventListener('click', () => {
        checkForPlayButtons();
        console.log(secondaryPlayButtons);
        secondaryPlayButtons = document.querySelectorAll('.play-button');
        let temporary = Array.from(secondaryPlayButtons).indexOf(element);
        let temporaryName = document.getElementsByClassName("secondary-song-title")[temporary].textContent;

        for (let i = 0; i < playlist0.length; i++) {
          if (playlist0[i].nameOfSong == temporaryName) {
            playingIndex = i;

          }
        }
        let oldTemporary;
        const smallPlayPauseButton = document.getElementsByClassName("play-button")[temporary];
        let imageSourceSmall = smallPlayPauseButton.getAttribute("src");
        let music = playlist0[playingIndex].source;
        /*if (playerAudioElement.currentTime == 0 && oldTemporary != temporary) {
          playerAudioElement.pause();
          playerAudioElement.setAttribute("src", music);
          playerAudioElement.load();
          playerAudioElement.play();
          playPauseButton.setAttribute("src", "media/icons/pause_player_button.png");

        }*/
        if (oldTemporary != temporary) {
          playerAudioElement.pause();
          playerAudioElement.setAttribute("src", music);
          playerAudioElement.load();
          playerAudioElement.play();
          playPauseButton.setAttribute("src", "themes/default/icons/pause-player-button.png");
        }

        changeTitle();
        checkIfSongEnded();
        playingElementCheck();
        oldTemporary = temporary;

      });
    });
  }
}

setInterval(getClicksAndPlayMusicFromPlayButtons, 1000);


function orderOfSongsInDragAndDrop() {
  playingNowSongName = playlist0[playingIndex].nameOfSong;
  let numberOfDraggableItems = document.querySelectorAll('.song-1');
  for (let i = 0; i < numberOfDraggableItems.length; i++) {
    let spanText = document.getElementsByClassName("secondary-song-title")[i].textContent;

    for (let z = 0; z < numberOfDraggableItems.length; z++) {
      let songsNameOfSongs = playlist0[z].nameOfSong;
      if (spanText == songsNameOfSongs) {
        let temp = playlist0[i];
        playlist0[i] = playlist0[z];
        playlist0[z] = temp;

      }
    }
  }
  for (let i = 0; i < playlist0.length; i++) {
    let spanText = document.getElementsByClassName("secondary-song-title")[i].textContent;
    if (playingNowSongName == spanText) {
      playingIndex = i;
      playingElementCheck();
    }
  }
}
