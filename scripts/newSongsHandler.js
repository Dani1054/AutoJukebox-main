let nameOfPlaylistOpen;
let numOfGenres;
let counterForOpening = 0;
function checkForFocusElementGenres() {
    numOfGenres = document.querySelectorAll('.playlist-box');
    let inFocusElement = document.querySelector('#focus');
    for (let i = 0; i < numOfGenres.length; i++) {
        if (numOfGenres[i] == inFocusElement) {
            nameOfPlaylistOpen = document.getElementsByClassName("playlist-item")[i].textContent;
        }
    }

}

let boolForCheckingError = false;
let numOfPlaylists;
function checkForNumberOfplaylists() {
    let nodeOfAllPlaylists = document.querySelectorAll('.playlist-box');
    numOfPlaylists = nodeOfAllPlaylists.length;
}

function closeSongsContainerForAdding() {
    document.getElementsByClassName("add-songs-container-shown")[0].className = "add-songs-container";
}

function openSongsContainerForAdding() {
    document.getElementsByClassName("add-songs-container")[0].className = "add-songs-container-shown";
    checkForNumberOfplaylists();
    if (numOfPlaylists > 0 && ((counterForOpening == 0 && boolForCheckingError == false) || (counterForOpening == 1 && boolForCheckingError == true))) {
        createChekers();
        checkButtonForAddingSongs();
        counterForOpening++;

    } else if (counterForOpening == 0) {
        createErrorMessageInSongsAdder();
        counterForOpening++;
        boolForCheckingError = true;
    }

}

//console.log(document.getElementsByClassName("add-songs-container")[0]);


document.getElementsByClassName("button-for-adding-songs")[0].addEventListener("click", function () {
    let elementForAddingSongsForChecking = document.getElementsByClassName("add-songs-container")[0];
    if (typeof elementForAddingSongsForChecking == "undefined") {
        closeSongsContainerForAdding();
    } else {
        openSongsContainerForAdding();
    }
    if ((document.getElementsByClassName("remove-playlists-container-shown")[0])) {
        closeSongsContainerForRemovingPlaylist();
    }
    if ((document.getElementsByClassName("remove-songs-container-shown")[0])) {
        closeSongsContainerForRemovingSongs();
    }


});

document.getElementsByClassName("close-songs")[0].addEventListener("click", closeSongsContainerForAdding);

function createChekers() {
    for (let i = 0; i < songDatabase.length; i++) {
        let newDivElement = document.createElement("div");

        let newSpanElement = document.createElement("span");
        newSpanElement.className = "span-song";
        newSpanElement.textContent = songDatabase[i].nameOfSong;


        let newInputElement = document.createElement("input");
        newInputElement.setAttribute("type", "checkbox");
        newInputElement.className = "check";

        let parentToInput = document.getElementsByClassName("chekcers-box")[0];
        parentToInput.appendChild(newDivElement);
        newDivElement.appendChild(newInputElement);
        newDivElement.appendChild(newSpanElement);
    }
    let spanForRemoval = document.querySelectorAll(".span-for-error");
    if (spanForRemoval.length == 1) {
        removeErrorMessageInSongsAdder();
    }

    let buttonDiv = document.createElement("div");
    buttonDiv.className = "button-checklist";

    let textInButtonDiv = document.createElement("span");
    textInButtonDiv.textContent = "Spremi promjene";

    let parentElementButton = document.getElementsByClassName("add-songs-container-shown")[0];
    parentElementButton.appendChild(buttonDiv);
    buttonDiv.appendChild(textInButtonDiv);
    checkForCreatingButton = true;
}


function createErrorMessageInSongsAdder() {
    let newSpanElementForError = document.createElement("span");
    newSpanElementForError.textContent = "Ne mogu se nadodati pjesme ako nisu u playlisti";
    newSpanElementForError.className = "span-for-error";
    let parentElementToErrorMessage = document.getElementsByClassName("add-songs-container-shown")[0];
    parentElementToErrorMessage.appendChild(newSpanElementForError);
}

function removeErrorMessageInSongsAdder() {
    let spanForRemoval = document.querySelector(".span-for-error");
    spanForRemoval.remove();
}

function checkButtonForAddingSongs() {
    let buttonDiv = document.getElementsByClassName("button-checklist")[0];
    buttonDiv.addEventListener("click", function (e) {
        for (let i = 0; i < songDatabase.length; i++) {
            let checkingCheckCurrentCheck = document.getElementsByClassName("check")[i];

            if (checkingCheckCurrentCheck.checked == true) {

                playlist0.push(songDatabase[i]);
                checkForFocusElementGenres();
                //console.log(nameOfPlaylistOpen);
                songDatabase[i].playlist.push(nameOfPlaylistOpen);
                //console.log(songDatabase[i].playlist);

                playingNow = i;

                createSongsInDragAndDrop(i);
                changeTitle();
                checkIfSongEnded();
                playingElementCheck();
                uncheckCheckers(i);
                activatePreviousAndNextSongButton();
                activateDragAndDrop();
                getClicksAndPlayMusicFromPlayButtons();
            }
        }
    });
}


function uncheckCheckers(i) {
    let checkingCheckCurrentCheck = document.getElementsByClassName("check")[i];
    checkingCheckCurrentCheck.checked = false;
}

function createSongsInDragAndDrop(y) {
    let newDivElementSongs = document.createElement("div");
    newDivElementSongs.className = "song-1";
    newDivElementSongs.setAttribute('draggable', true);

    let newSpanElement = document.createElement("span");
    newSpanElement.className = "secondary-song-title text-font-default";
    newSpanElement.textContent = songDatabase[y].nameOfSong;


    let newArtistSpan = document.createElement("span");
    newArtistSpan.className = "performer text-font-default";
    newArtistSpan.textContent = songDatabase[y].nameOfPerformer;

    let pictureNew = document.createElement("img");
    pictureNew.src = "themes/" + preferredTheme + "/icons/play-button.png";
    pictureNew.className = "play-button";

    let parentToSongs = document.getElementsByClassName("container-for-song-1")[0];
    parentToSongs.appendChild(newDivElementSongs);
    newDivElementSongs.appendChild(newSpanElement);
    newDivElementSongs.appendChild(newArtistSpan);
    newDivElementSongs.appendChild(pictureNew);
    //playingElementCheck()

}


//document.getElementsByClassName("button-checklist")[0].addEventListener("click", checkSongsDown);
//setInterval(checkSongsDown, 1);




// PROGRAM ZA MICANJA PJESAMA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA



let buttonForRemovingSong = document.getElementsByClassName("button-for-removing-songs")[0];


buttonForRemovingSong.addEventListener('click', function () {
    let elementForAddingSongsForChecking = document.getElementsByClassName("remove-songs-container")[0];
    if (typeof elementForAddingSongsForChecking == "undefined") {
        closeSongsContainerForRemovingSongs();
    } else {
        openSongsContainerForRemovingSongs();
    }
});

function closeSongsContainerForRemovingSongs() {
    document.getElementsByClassName("remove-songs-container-shown")[0].className = "remove-songs-container";
}

let checkForOpeningWindowForDeleting = false;

function openSongsContainerForRemovingSongs() {
    if ((document.getElementsByClassName("remove-playlists-container-shown")[0])) {
        closeSongsContainerForRemovingPlaylist();
    }

    if (document.getElementsByClassName("add-songs-container-shown")[0]) {
        closeSongsContainerForAdding();
    }

    document.getElementsByClassName("remove-songs-container")[0].className = "remove-songs-container-shown";
    let checkForCheckersToStopDoubling = document.querySelectorAll('.check-to-delete');
    if (!checkForOpeningWindowForDeleting) {
        createCheckersForDeletingSongs();
        checkForOpeningWindowForDeleting = true;
    } else {
        deleteAllSongsForDeleting();
        createCheckersForDeletingSongs();
    }

}

document.getElementsByClassName("close-songs")[1].addEventListener("click", closeSongsContainerForRemovingSongs);

function createCheckersForDeletingSongs() {
    for (let i = 0; i < playlist0.length; i++) {
        let newDivElement = document.createElement("div");

        let newSpanElement = document.createElement("span");
        newSpanElement.className = "span-song-for-delete";
        newSpanElement.textContent = playlist0[i].nameOfSong;


        let newInputElement = document.createElement("input");
        newInputElement.setAttribute("type", "checkbox");
        newInputElement.className = "check-to-delete";

        let parentToInput = document.getElementsByClassName("chekcers-box-for-deleting-songs")[0];
        parentToInput.appendChild(newDivElement);
        newDivElement.appendChild(newInputElement);
        newDivElement.appendChild(newSpanElement);
    }
    let boolForCheckingToNotSpawnButton = true;
    if (playlist0.length != 0) {
        let spanForRemoval = document.querySelectorAll('.span-for-error-delete-songs');
        if (spanForRemoval.length != 0) {
            removeErrorMessageInSongsForDelete();
        }
        let buttonForDeletingSongs = document.querySelectorAll('.button-checklist-remove');
        if (buttonForDeletingSongs.length == 0 && boolForCheckingToNotSpawnButton) {
            let buttonDiv = document.createElement("div");
            buttonDiv.className = "button-checklist-remove";

            let textInButtonDiv = document.createElement("span");
            textInButtonDiv.textContent = "Spremi promjene";

            let parentElementButton = document.getElementsByClassName("remove-songs-container-shown")[0];
            parentElementButton.appendChild(buttonDiv);
            buttonDiv.appendChild(textInButtonDiv);
            checkButtonForDeletingSongs();
            buttonDiv.addEventListener('click', function () {
                checkButtonForDeletingSongs();
                deleteAllSongsInDragAndDrop();
                activateDragAndDrop();
                callErrorMessageIfYouDeletedAllSongs();
            });
        }

    } else {
        let errorMessageForDeleteing = document.getElementsByClassName("span-for-error-delete-songs");
        if (errorMessageForDeleteing.length == 0) {
            createErrorMessageForNothingToDeleteSongs();
            let buttonDiv = document.querySelectorAll('.button-checklist-remove');
            if (buttonDiv.length != 0) {
                buttonDiv[0].remove();
            }

        }
    }

}

function createErrorMessageForNothingToDeleteSongs() {
    boolForCheckingToNotSpawnButton = false;
    let newSpanElementForError = document.createElement("span");
    newSpanElementForError.textContent = "Nema pjesama za brisanje";
    newSpanElementForError.className = "span-for-error-delete-songs";
    let parentElementToErrorMessage = document.getElementsByClassName("remove-songs-container-shown")[0];
    parentElementToErrorMessage.appendChild(newSpanElementForError);
}

function callErrorMessageIfYouDeletedAllSongs() {
    let songsDown = document.querySelectorAll('.song-1');
    if (songsDown.length === 0) {
        createErrorMessageForNothingToDeleteSongs();
        let buttonForDeleting = document.getElementsByClassName("button-checklist-remove")[0];
        buttonForDeleting.remove();
    }
    makeControlsNone();
}

function removeErrorMessageInSongsForDelete() {
    let spanForRemoval = document.querySelector('.span-for-error-delete-songs');
    spanForRemoval.remove();
    boolForCheckingToNotSpawnButton = true;
}
let nameOfSongForDeleting;

function checkButtonForDeletingSongs() {
    playlist0 = [];
    scraperForSongsToFillPlaylist0();
    for (let i = 0; i < playlist0.length; i++) {
        checkerForSongToDelete = document.getElementsByClassName("check-to-delete")[i];
        if (checkerForSongToDelete.checked === true) {
            nameOfSongForDeleting = playlist0[i].nameOfSong;
            
            checkIfIsSongPlayingAndDeleted();
            playlist0.splice(i, 1);
            
            removePlaylistFromPlaylistArrInDataBase(nameOfSongForDeleting);
            uncheckCheckersForDeletingNow(i);
            playingElementCheck();
            i--;
        }
    }
    counterForCheckedItems = 0;
}

function removePlaylistFromPlaylistArrInDataBase(nameOfSongForDeletingSong) {
    for (let i = 0; i < songDatabase.length; i++) {
        if (songDatabase[i].nameOfSong == nameOfSongForDeletingSong) {
            for (let z = 0; z < songDatabase[i].playlist.length; z++) {
                if (songDatabase[i].playlist[z] == nameOfPlaylist) {
                    songDatabase[i].playlist.splice(z, 1);
                }
            }
        }
    }
}

let buttonForDeletingSongs = document.getElementsByClassName("button-checklist-remove")[0];

function deleteAllSongsInDragAndDrop() {
    console.log(playlist0);
    uncheckCheckersForDeleting();
    let allSongsForRemoving = document.querySelectorAll('.song-1');
    let checkingCheckCurrentCheck = document.querySelectorAll('.check-to-delete');
    let deleteSpanSong = document.querySelectorAll(".span-song-for-delete");
    allSongsForRemoving.forEach(songBox => {
        songBox.remove();
    });
    for (let i = 0; i < playlist0.length; i++) {
        for (let z = 0; z < songDatabase.length; z++) {
            if (songDatabase[z].nameOfSong === playlist0[i].nameOfSong) {
                createSongsInDragAndDrop(z);
                //uncheckCheckersForDeleting();
                console.log(playlist0)
            }
        }
    }
    if (checkingCheckCurrentCheck.length == 1) {
        if (checkingCheckCurrentCheck[0].checked == true) {
            checkingCheckCurrentCheck[0].remove();
            deleteSpanSong[0].remove();
        }
    }
}

function uncheckCheckersForDeleting() {
    let checkingCheckCurrentCheck = document.querySelectorAll('.check-to-delete');
    let deleteSpanSong = document.querySelectorAll(".span-song-for-delete");
    for (let i = 0; i < checkingCheckCurrentCheck.length; i++) {
        if (checkingCheckCurrentCheck[i].checked == true) {
            checkingCheckCurrentCheck[i].remove();
            deleteSpanSong[i].remove();
        }
    }
}

function uncheckCheckersForDeletingNow(y) {
    let checkingCheckCurrentCheck = document.querySelectorAll('.check-to-delete');
    let deleteSpanSong = document.querySelectorAll('.span-song-for-delete');
    if (checkingCheckCurrentCheck.length > y) {
        checkingCheckCurrentCheck[y].remove();
    }

    if (deleteSpanSong.length > y) {
        deleteSpanSong[y].remove();
    }
}

function deleteAllSongsForDeleting() {
    let allSongsForRemoving = document.querySelectorAll('.span-song-for-delete');
    let sllCheckerForDeleting = document.querySelectorAll('.check-to-delete');
    allSongsForRemoving.forEach(songBox => {
        songBox.remove();

    });

    sllCheckerForDeleting.forEach(sllCheckerForDeleting => {
        sllCheckerForDeleting.remove();
    })
}




// PROGRAM ZA MICANJE PLAYLISTA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA




let buttonForRemovingPlaylists = document.getElementsByClassName("button-for-removing-playlists")[0];

buttonForRemovingPlaylists.addEventListener('click', function () {
    let elementForAddingSongsForChecking = document.getElementsByClassName("remove-playlists-container")[0];
    if (typeof elementForAddingSongsForChecking == "undefined") {
        closeSongsContainerForRemovingPlaylist();
    } else {
        deleteAllPlaylistsForDeleting();
        openSongsContainerForRemovingPlaylist();
        createCheckersForRemovingPlaylists();
    }

    if ((document.getElementsByClassName("remove-songs-container-shown")[0])) {
        closeSongsContainerForRemovingSongs();
    }

    if (document.getElementsByClassName("add-songs-container-shown")[0]) {
        closeSongsContainerForAdding();
    }
});

function closeSongsContainerForRemovingPlaylist() {
    document.getElementsByClassName("remove-playlists-container-shown")[0].className = "remove-playlists-container";
}

function openSongsContainerForRemovingPlaylist() {
    document.getElementsByClassName("remove-playlists-container")[0].className = "remove-playlists-container-shown";
}

document.getElementsByClassName("close-songs")[2].addEventListener("click", closeSongsContainerForRemovingPlaylist);


function createCheckersForRemovingPlaylists() {
    let numberOfPlaylistsFromMenu = document.querySelectorAll('.playlist-item');
    for (let i = 0; i < numberOfPlaylistsFromMenu.length; i++) {
        let newDivElement = document.createElement("div");

        let newSpanElement = document.createElement("span");
        newSpanElement.className = "span-playlist-for-delete";
        newSpanElement.textContent = numberOfPlaylistsFromMenu[i].textContent;


        let newInputElement = document.createElement("input");
        newInputElement.setAttribute("type", "checkbox");
        newInputElement.className = "check-to-delete-playlist";

        let parentToInput = document.getElementsByClassName("chekcers-box-for-deleting-playlists")[0];
        parentToInput.appendChild(newDivElement);
        newDivElement.appendChild(newInputElement);
        newDivElement.appendChild(newSpanElement);
    }

    let checkForNumberOfButtonsForSubmitToDeletePlaylist = document.querySelectorAll('.button-checklist-remove-playlst');
    let getNumberOfPlaylists = document.querySelectorAll('.playlist-box');
    let getNumberOfErrorMessagesForNoPlaylists = document.querySelectorAll('.span-for-error-delete-playlists')
    if (checkForNumberOfButtonsForSubmitToDeletePlaylist.length == 0 && (getNumberOfPlaylists.length != 0)) {
        deleteErrorMessageForNoPlaylists();
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "button-checklist-remove-playlst";

        let textInButtonDiv = document.createElement("span");
        textInButtonDiv.textContent = "Spremi promjene";

        let parentElementButton = document.getElementsByClassName("remove-playlists-container-shown")[0];
        parentElementButton.appendChild(buttonDiv);
        buttonDiv.appendChild(textInButtonDiv);
        buttonDiv.addEventListener('click', function forDeletingPlaylistsAfterPressOfButton() {

            uncheckCheckersForDeletingPlaylistAndChangePlaylist();
            deleteAllPlaylists();
            createGenresItems();
            
            let playlistBox = document.getElementsByClassName("playlist-box")[0];
            if (playlistBox) {
                document.getElementsByClassName("playlist-box")[inFocusNow].setAttribute("id", "focus");
            }

            checkForGenresItems();
            let allSongsForRemoving = document.querySelectorAll('.song-1');
            allSongsForRemoving.forEach(songBox => {
                songBox.remove();
            });
            //removePlaylistFromPlaylistArrInDataBase(nameOfSongForDeleting);
            nameOfPlaylist = genresList[inFocusNow];
            generateSongsByPlaylist();
            scraperForSongsToFillPlaylist0NewVersion()
            playingElementCheck();
            playingIndex = 0;
            changeTitleForDeletingPlaylist();
            callErrorMessageIfYouDeletedAllPlaylist();
            
        });
    }
    if (getNumberOfPlaylists.length == 0 && getNumberOfErrorMessagesForNoPlaylists.length == 0) {
        createErrorMessageForNoPlaylists();
    }
}

function callErrorMessageIfYouDeletedAllPlaylist() {
    let playlistsUp = document.querySelectorAll('.playlist-box');
    if (playlistsUp.length === 0) {
        createErrorMessageForNoPlaylists();
        let buttonForDeleting = document.getElementsByClassName("button-checklist-remove-playlst")[0];
        buttonForDeleting.remove();
    }
}

function createErrorMessageForNoPlaylists() {
    let newSpanElementForError = document.createElement("span");
    newSpanElementForError.textContent = "Nema playlista za brisanje";
    newSpanElementForError.className = "span-for-error-delete-playlists";
    let parentElementToErrorMessage = document.getElementsByClassName("remove-playlists-container-shown")[0];
    parentElementToErrorMessage.appendChild(newSpanElementForError);
}

function deleteErrorMessageForNoPlaylists() {
    let spanForRemoval = document.querySelectorAll('.span-for-error-delete-playlists');
    spanForRemoval.forEach(spanToRemove => {
        spanToRemove.remove();
    })
}

function deleteAllPlaylistsForDeleting() {
    let allSongsForRemoving = document.querySelectorAll('.span-playlist-for-delete');
    let sllCheckerForDeleting = document.querySelectorAll('.check-to-delete-playlist');
    allSongsForRemoving.forEach(songBox => {
        songBox.remove();
    });

    sllCheckerForDeleting.forEach(sllCheckerForDeleting => {

        sllCheckerForDeleting.remove();
    });

}

function uncheckCheckersForDeletingPlaylistAndChangePlaylist() {
    let checkingCheckCurrentCheck = document.querySelectorAll('.check-to-delete-playlist');
    let deleteSpanSong = document.querySelectorAll(".span-playlist-for-delete");
    for (let i = 0; i < checkingCheckCurrentCheck.length; i++) {
        if (checkingCheckCurrentCheck[i].checked == true) {
            
            checkingCheckCurrentCheck[i].remove();
            deleteSpanSong[i].remove();
            genresList.splice(i, 1);

            document.getElementsByClassName("playlist-box")[inFocusNow].removeAttribute("id");
            let allSongsForRemoving = document.querySelectorAll('.song-1');
            allSongsForRemoving.forEach(songBox => {
                songBox.remove();
            });
            if (i != (checkingCheckCurrentCheck.length - 1)) {
                inFocusNow = i;
                //console.log(i);
            } else {
                inFocusNow = 0;
            }
            nameOfPlaylist = document.getElementsByClassName("playlist-item")[i].textContent;
            deletePlaylistFromPlaylistArrayFromJsonDataOfSong(nameOfPlaylist);
            generateSongsByPlaylist();
            checkForLaterSong();
            activatePreviousAndNextSongButton();
            if (playlist0.length > 0) {
                activateDragAndDrop();
                getClicksAndPlayMusicFromPlayButtons();
            }
            playPauseButton.setAttribute("src", "themes/" + preferredTheme + "/icons/play-player.png");
            stopMusic();
            
            document.getElementsByClassName("playlist-box")[inFocusNow].setAttribute("id", "focus");
            //changeTitleForDeletingPlaylist();
        }
    }
}

function deletePlaylistFromPlaylistArrayFromJsonDataOfSong(nameOfPlaylistToDelete) {
    for (let i = 0; i < songDatabase.length; i++) {
        for (let z = 0; z < songDatabase[i].playlist.length; z++) {
            if (songDatabase[i].playlist[z] == nameOfPlaylistToDelete) {
                songDatabase[i].playlist.splice(z, 1);
            }
        }
    }
}

function deleteAllPlaylists() {
    let allPlaylistsForRemoving = document.querySelectorAll('.playlist-box');
    allPlaylistsForRemoving.forEach(playlistBox => {
        playlistBox.remove();
    });
}
