/**
 * Ovdje se nalazi i play gumbovi "sekundarni" jer ovise o Drag&Drop
 */

let counterForClickingOnPlayButton = 0;

function activateDragAndDrop() {
  const draggables = document.querySelectorAll('.song-1');
  const containers = document.querySelectorAll('.container-for-song-1');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      getClicksAndPlayMusicFromPlayButtons();

    });
  });

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  });

  function getDragAfterElement(container, y) {                                                      //Ne razumijem ovaj dio koda
    const draggableElements = [...container.querySelectorAll('.song-1:not(.dragging)')];
    orderOfSongsInDragAndDrop();
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
}

function getClicksAndPlayMusicFromPlayButtons() {
  let secondaryPlayButtons = document.querySelectorAll('.play-button');
  let oldTemporary;

  secondaryPlayButtons.forEach((element, index) => {
    element.addEventListener('click', () => {
      console.log("HALO");
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
