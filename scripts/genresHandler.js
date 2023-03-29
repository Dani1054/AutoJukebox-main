let genresList = [];
createGenresItems();

function createGenresItems() {
    //console.log(genresList.length);
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

        genresList.push(valueTextInput);
        createGenresItems();
        counter = true;
        console.log(genresList);
    }

});

let nameOfPlaylist;
let inFocusNow = 0;

function checkForGenresItems() {
    
    let numOfGenres = document.querySelectorAll('.playlist-box');
    for(let i = 0; i<numOfGenres.length; i++){
        numOfGenres[i].addEventListener("click", () =>{
            
            if(i!=inFocusNow){
                document.getElementsByClassName("playlist-box")[inFocusNow].removeAttribute("id");
                removeAllSongs();
                inFocusNow = i;
                nameOfPlaylist = document.getElementsByClassName("playlist-item")[i].textContent;
                generateSongsByPlaylist();
                console.log(playlist0);
            }
            
            document.getElementsByClassName("playlist-box")[inFocusNow].setAttribute("id", "focus");
        });
        document.getElementsByClassName("playlist-box")[inFocusNow].setAttribute("id", "focus");
        
    }

}
buttonForAdding = document.getElementsByClassName("button-to-add text-font-deafult")[0];
buttonForAdding.addEventListener("click", checkForGenresItems);   

function generateSongsByPlaylist(){
    for(let i = 0; i<songDatabase.length;i++){
        for(let z = 0; z<songDatabase[i].playlist.length;z++){
            
            if(songDatabase[i].playlist[z]==nameOfPlaylist){
                createSongsInDragAndDrop(i);
                
            }
        }
    }
    scraperForSongsToFillPlaylist0();
}

function removeAllSongs(){
    let allSongsForRemoving = document.querySelectorAll('.song-1');
    allSongsForRemoving.forEach(songBox => {
        songBox.remove();
    });
    playlist0 = [];
}

function scraperForSongsToFillPlaylist0(){
    let songsNowDownList = document.querySelectorAll('.song-1');
    for(let i = 0; i < songsNowDownList.length ; i++){
        for(let z = 0 ; z<songDatabase.length; z++){
            if(document.getElementsByClassName("secondary-song-title")[i].textContent == songDatabase[z].nameOfSong){
                playlist0.push(songDatabase[z]);
                console.log(playlist0);
            }
        }
        
    }
}