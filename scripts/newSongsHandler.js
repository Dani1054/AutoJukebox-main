let nameOfPlaylistOpen;
let numOfGenres;
let counterForOpening = 0;
function checkForFocusElementGenres() {

    numOfGenres = document.querySelectorAll('.playlist-box');
    let inFocusElement = document.querySelector('#focus');
    for (let i = 0; i < numOfGenres.length; i++) {
        if (numOfGenres[i] == inFocusElement) {
            //console.log(i);
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
function closeSongsContainer() {
    document.getElementsByClassName("add-songs-container-shown")[0].className = "add-songs-container";
}
function openSongsContainer() {
    document.getElementsByClassName("add-songs-container")[0].className = "add-songs-container-shown";
    checkForNumberOfplaylists();
    if (numOfPlaylists > 0 && ((counterForOpening ==  0 && boolForCheckingError==false) || (counterForOpening ==  1 && boolForCheckingError==true))) {
        createChekers();
        checkButtonForAddingSongs();
        counterForOpening++;

    } else if(counterForOpening==0){
        createErrorMessageInSongsAdder();
        counterForOpening++;
        boolForCheckingError = true;
    }
    
}

console.log(document.getElementsByClassName("add-songs-container")[0]);



document.getElementsByClassName("button-for-adding-songs")[0].addEventListener("click", function(){
    let elementForAddingSongsForChecking = document.getElementsByClassName("add-songs-container")[0];
    console.log(elementForAddingSongsForChecking);
    if(typeof elementForAddingSongsForChecking == "undefined"){
        closeSongsContainer();
    }else{
        openSongsContainer();
    }
});
document.getElementsByClassName("close-songs")[0].addEventListener("click", closeSongsContainer);
if(document.getElementsByClassName(""))

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
    removeErrorMessageInSongsAdder();
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "button-checklist";

    let textInButtonDiv = document.createElement("span");
    textInButtonDiv.textContent = "Spremi promjene";

    let parentElementButton = document.getElementsByClassName("add-songs-container-shown")[0];
    parentElementButton.appendChild(buttonDiv);
    buttonDiv.appendChild(textInButtonDiv);
};




function createErrorMessageInSongsAdder() {
    let newSpanElementForError = document.createElement("span");
    newSpanElementForError.textContent = "Ne mogu se nadodati pjesme ako nisu u playlisti";
    newSpanElementForError.className = "span-for-error";
    let parentElementToErrorMessage = document.getElementsByClassName("add-songs-container-shown")[0];
    parentElementToErrorMessage.appendChild(newSpanElementForError);
}

function removeErrorMessageInSongsAdder() {
    let spanForRemoval = document.getElementsByClassName("span-for-error")[0];
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
            }
        }
    });
}


function uncheckCheckers(i) {
    let checkingCheckCurrentCheck = document.getElementsByClassName("check")[i];
    checkingCheckCurrentCheck.checked = false;
}

function createSongsInDragAndDrop(i) {
    let newDivElementSongs = document.createElement("div");
    newDivElementSongs.className = "song-1";
    newDivElementSongs.setAttribute('draggable', true);

    let newSpanElement = document.createElement("span");
    newSpanElement.className = "secondary-song-title text-font-deafult";
    newSpanElement.textContent = songDatabase[i].nameOfSong;


    let newArtistSpan = document.createElement("span");
    newArtistSpan.className = "performer text-font-deafult";
    newArtistSpan.textContent = songDatabase[i].nameOfPerformer;

    let pictureNew = document.createElement("img");
    pictureNew.src = "themes/default/icons/play_button.png";
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
