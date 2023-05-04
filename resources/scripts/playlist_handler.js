function createTableList(db) {
  function createTableEntry(db) {
    var i = 0;
    for (i; db.length > i; i++) {
      var newElementTR = document.createElement("TR");
      var newElementTD0 = document.createElement("TD");
      var newElementTD1 = document.createElement("TD");
      var newElementTD2 = document.createElement("TD");

      var newElementPlayButton = document.createElement("TD");
      newElementPlayButton.className = "play-column";
      var newElementSpanPlayButton = document.createElement("SPAN");
      newElementSpanPlayButton.className = "playlist-column-button";
      newElementSpanPlayButton.setAttribute("data-source", db[i].source);
      newElementSpanPlayButton.setAttribute("data-item", i);
      newElementPlayButton.appendChild(newElementSpanPlayButton);

      newElementTD0.textContent = db[i].song_name;
      //console.log(db[i].song_name);
      newElementTD1.textContent = db[i].author;
      newElementTD2.textContent = db[i].duration;
      newElementTR.appendChild(newElementTD0);
      newElementTR.appendChild(newElementTD1);
      newElementTR.appendChild(newElementTD2);
      newElementTR.appendChild(newElementPlayButton);
      var tableSongs = document.getElementsByClassName("list-of-songs")[0];
      tableSongs.appendChild(newElementTR);
    }
    addEventsToTableOfSongs();
  }

  if (typeof db == "string") {
    db = window[db]; // Mora se proslijediti objekt a ne string
    createTableEntry(db);
  } else {
    createTableEntry(db);
  }
}
function checkDBUsingPlayList() {
  var playList = genresList;
  var i = 0;
  for (i; playList.length > i; i++) {
    //ovim arrayom window['db' + i] možemo provjeriti je li neka varijabla definirana u našem JS-u.
    if (typeof window["db" + i] == "undefined") {
      //pass
    } else {
      var db = window["db" + i];
      if (db[0]["playlist"] == defaultGenre) {
        // Ovako db[0]["playlist"] ili db[0].playlist. Uzeo sam prvi primjer čisto da me imena ne zbunjuju
        createTableList(db);
      } else {
        //createTableList(db, i);
      }
    }
  }
}

function checkDB() {
  var dbName =
    this.getElementsByClassName("playlist-item")[0].getAttribute(
      "data-js-db-name"
    );
  function removeTR() {
    var z = 1;
    for (
      z;
      document
        .getElementsByClassName("list-of-songs")[0]
        .getElementsByTagName("TR").length > z;
      z++
    ) {
      document
        .getElementsByClassName("list-of-songs")[0]
        .getElementsByTagName("TR")
        [z].remove();
      removeTR();
    }
  }
  if (dbName != null) {
    removeTR();
    createTableList(dbName);
  } else {
    removeTR();
  }
}

function addEventsToPlayListItems() {
  var i = 0;

  for (i; document.getElementsByClassName("playlist-box").length > i; i++) {
    document
      .getElementsByClassName("playlist-box")
      [i].addEventListener("click", checkDB);
  }
}
function playMusic() {
  //Pokupi source, putanju pjesme i stavi je u pravi player 

  var sourceOfSong = this.getElementsByClassName("playlist-column-button")[0].getAttribute("data-source");
  var songName = this.parentElement.getElementsByTagName("TD")[0].textContent;
  var composerName = this.parentElement.getElementsByTagName("TD")[1].textContent;
  var listNumber = this.getElementsByClassName("playlist-column-button")[0].getAttribute("data-item");
  document.getElementById("track-number").textContent = parseInt(listNumber) + 1;
  document.getElementById("track-number").setAttribute("data-item", listNumber);
  document.getElementsByClassName("song-name")[0].textContent = songName;
  document.getElementsByClassName("author")[0].textContent = composerName;
  document.getElementById("hidden-player").pause();
  document.getElementById("hidden-player").src = sourceOfSong;
  document.getElementById("hidden-player").load();
  document.getElementById("hidden-player").play();

  if(document.getElementById("play-and-pause").className == "play-song") {
    document.getElementsByClassName("play-song")[0].className = "pause-song";
    
} 
}
function addEventsToTableOfSongs() {
  function selectRow() {
    var i = 0;

    for(i; document.getElementsByClassName("selected-song").length > i; i++) {
      document.getElementsByClassName("selected-song")[i].classList.remove("selected-song");
    }
    this.parentElement.classList = "selected-song";
  }

  var playButtonInTable = document.getElementsByClassName("play-column");
  var i = 0;
  for (i; playButtonInTable.length > i; i++) {
    document
      .getElementsByClassName("play-column")
      [i].addEventListener("click", selectRow);

      document
      .getElementsByClassName("play-column")
      [i].addEventListener("click", playMusic);
  }
}
function goNextSong() {
  document.getElementsByClassName("next-song")[0].click();
}
document.getElementById("hidden-player").addEventListener("ended", goNextSong);
checkDBUsingPlayList();
addEventsToPlayListItems();
addEventsToTableOfSongs();
