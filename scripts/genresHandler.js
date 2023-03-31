let genresList = [];
let counterForErrorMessageBelowaddingGenres = 0;
let boolForChecking = false;
let controlVariableForPopingGenres = 0;
let controlVariableForDeletingErrorForSameName = false;
let banDeletingMesseges = true;

function createGenresItems() {
    for (let i = 0; i < genresList.length; i++) {
        let newElement = document.createElement("div");
        newElement.className = "playlist-box";

        let parentNewElement = document.getElementsByClassName("genre-list-items")[0];      //dodajemu menuu nove diviće tako da su oni unutar njega
        parentNewElement.appendChild(newElement);

        let nameDiv = document.createElement("span");
        nameDiv.className = "playlist-item text-font-deafult";
        nameDiv.textContent = genresList[i];

        let parentNameDiv = document.getElementsByClassName("playlist-box")[i];
        parentNameDiv.appendChild(nameDiv);
    }

}

let parentNewElement = document.getElementsByClassName("genre-list-items")[0];
let buttonForAdding = document.getElementsByClassName('button-to-add')[0];
let counter = true;

buttonForAdding.addEventListener("click", function () {
    if (counter == true) {
        let inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.className = "text-input";
        parentNewElement.appendChild(inputElement);
        counter = false;
    } else {
        let inputElementClass = document.getElementsByClassName("text-input")[0];
        let valueTextInput = inputElementClass.value;
        inputElementClass.value = "";
        while (parentNewElement.firstChild) {
            parentNewElement.removeChild(parentNewElement.firstChild);
        }

        for (let i = 0; i <= valueTextInput.length; i++) {
            if (valueTextInput.charAt(i) == " ") {
                valueTextInput = valueTextInput.replace(" ", "");
                i--;
                if (!boolForChecking) {
                    createErrorMessafeInGenreCreator();
                }

            }
        }

        if (valueTextInput === "" && counterForErrorMessageBelowaddingGenres == 0) {
            createErrorMessafeInGenreCreator();
        }

        if (valueTextInput !== "" && valueTextInput !== " ") {
            genresList.push(valueTextInput);
            checkForDuplicates();
            if(controlVariableForPopingGenres == 1){
                console.log("TUPSON");
                genresList.pop();
                controlVariableForPopingGenres = 3;
                createErrorMessafeInGenreCreatorForSameName();
            }
            else if(controlVariableForPopingGenres == 3){
                
                deleteErrorMessage();
                controlVariableForPopingGenres = 0;
            }
            if (counterForErrorMessageBelowaddingGenres != 0 ) {
                deleteErrorMessage();
            }

            console.log(genresList);
        }
        createGenresItems();
        counter = true;
        //checkForDuplicates();
    }

});

function checkForDuplicates() {
    if (genresList.length != 1) {
        for (let i = 0; i < genresList.length; i++) {
            for (let z = 0; z < genresList.length; z++) {
                if (genresList[i] === genresList[z] && i!=z) {
                    controlVariableForPopingGenres = 1;
                }
            }
        }
    }
}

let nameOfPlaylist;
let inFocusNow = 0;

function checkForGenresItems() {
    let numOfGenres = document.querySelectorAll('.playlist-box');
    for (let i = 0; i < numOfGenres.length; i++) {
        numOfGenres[i].addEventListener("click", () => {

            if (i != inFocusNow) {
                document.getElementsByClassName("playlist-box")[inFocusNow].removeAttribute("id");
                removeAllSongs();
                inFocusNow = i;
                nameOfPlaylist = document.getElementsByClassName("playlist-item")[i].textContent;
                generateSongsByPlaylist();
                checkForLaterSong();
            }

            document.getElementsByClassName("playlist-box")[inFocusNow].setAttribute("id", "focus");
        });

        document.getElementsByClassName("playlist-box")[inFocusNow].setAttribute("id", "focus");

    }

}
buttonForAdding = document.getElementsByClassName("button-to-add text-font-deafult")[0];
buttonForAdding.addEventListener("click", checkForGenresItems);

function generateSongsByPlaylist() {
    for (let i = 0; i < songDatabase.length; i++) {
        for (let z = 0; z < songDatabase[i].playlist.length; z++) {

            if (songDatabase[i].playlist[z] == nameOfPlaylist) {
                createSongsInDragAndDrop(i);

            }
        }
    }
    scraperForSongsToFillPlaylist0();
}

function removeAllSongs() {
    let allSongsForRemoving = document.querySelectorAll('.song-1');
    allSongsForRemoving.forEach(songBox => {
        songBox.remove();
    });
    playlist0 = [];
    makeControlsNone();
}

function scraperForSongsToFillPlaylist0() {
    let songsNowDownList = document.querySelectorAll('.song-1');
    for (let i = 0; i < songsNowDownList.length; i++) {
        for (let z = 0; z < songDatabase.length; z++) {
            if (document.getElementsByClassName("secondary-song-title")[i].textContent == songDatabase[z].nameOfSong) {
                playlist0.push(songDatabase[z]);
            }
        }

    }
}

function checkForLaterSong() {
    let numberOfSongsDown = document.querySelectorAll('.song-1');
    if (numberOfSongsDown.length > 0) {
        let textContentOfSpanInSongs = document.querySelector('.secondary-song-title').textContent;
        playingIndex = 0;
        counter1 = 0;
        changeTitle();
        playingElementCheck();
    }
}

function createErrorMessafeInGenreCreator() {
    counterForErrorMessageBelowaddingGenres++;
    boolForChecking = true;
    let newSpanElementForError = document.createElement("span");
    newSpanElementForError.textContent = "Oprostite ali morate upisati ime playliste";
    newSpanElementForError.className = "span-for-error";
    let parentElementToErrorMessage = document.getElementsByClassName("menu")[0];
    parentElementToErrorMessage.appendChild(newSpanElementForError);
}

function createErrorMessafeInGenreCreatorForSameName() {
    counterForErrorMessageBelowaddingGenres++;
    boolForChecking = true;
    let newSpanElementForError = document.createElement("span");
    newSpanElementForError.textContent = "Oprostite ali ne smijete upisivati ista imena";
    newSpanElementForError.className = "span-for-error";
    let parentElementToErrorMessage = document.getElementsByClassName("menu")[0];
    parentElementToErrorMessage.appendChild(newSpanElementForError);
}

function deleteErrorMessage() {
    boolForChecking = false;
    counterForErrorMessageBelowaddingGenres = 0;
    let newSpanElementForError = document.getElementsByClassName("span-for-error")[0];
    newSpanElementForError.remove();
}