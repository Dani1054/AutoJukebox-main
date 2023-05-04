//Array genresList sadrži listu datoteka u folderu media/genres. Praznina u imenu žanra dobit će (_ underscore znak) zbog problema oko putanja na Widnows i Linux računalima. Ako je datoteka žanra napisana velikim slovima, tako treba biti prikazana i u aplikaciji
const genresList = ["Rock&Roll", "Disco", "YU Rock", "Otvoreni radio playlista"];
const defaultGenre = "Otvoreni radio playlista";

function createGenresItems() {

    var i = 0;
    for (i; genresList.length > i; i++) {
        var el = document.createElement("DIV");
        el.className = "playlist-box";
        var parentEl = document.getElementsByClassName("playlist-menu")[0];
        parentEl.appendChild(el);

        var el1 = document.createElement("DIV");
        el1.className = "playlist-item";
        el1.textContent = genresList[i];
        
        var text = genresList[i];
        var result = text.replace(" ", "_"); //Zamjena praznine s (_ underescor znakom)

        el1.setAttribute("data-putanja", "media/genres/" + result); //Dodao sam putanju do pjesama određenog žanra
        var parentEl1 = document.getElementsByClassName("playlist-box")[i]; //Dodao sam item na maločas stvorenom elementu. Zato i ima (i) inkrement.
        parentEl1.appendChild(el1);

    }
/*** Ovaj kod uspoređuje stavke iz varijabli db ako postoje i te dodjeljuje ime db-a stavkama koje se poklapaju s nazivom ***/
    var playList = genresList;
    var z = 0;
    for (z; playList.length > z; z++) {
        
        //ovim arrayom window['db' + i] možemo provjeriti je li neka varijabla definirana u našem JS-u. 
        if(typeof window['db' + z]  == "undefined") {
            //pass
            
        } else {
            var db = window['db' + z];
            dbToTest = db[z]['playlist'];
           var t = 0;
           for(t; document.getElementsByClassName("playlist-item").length > t; t++) {
            if (document.getElementsByClassName("playlist-item")[t].textContent == dbToTest) {
                document.getElementsByClassName("playlist-item")[t].setAttribute("data-js-db-name", "db" + z);
            }
           }
                
        } 
    }

    /*** Kraj koda ***/

}

function setDefaultGenre() {
    
    var i = 0;
    var items = document.getElementsByClassName("playlist-box");
    for (i; items.length > i; i++ ) { 
    var itemWithText = document.getElementsByClassName("playlist-box")[i].getElementsByClassName("playlist-item")[0];
        if (itemWithText.textContent == defaultGenre) {
            document.getElementsByClassName("playlist-box")[i].classList.add("playlist-box-clicked");
        }
    }
}

function addColorToClickedGenres() {
    var i = 0;
    var items = document.getElementsByClassName("playlist-box");
    for (i; items.length > i; i++ ) {
        document.getElementsByClassName("playlist-box")[i].onclick = function(signal_klika) {
            //Svojstvo target pripada objektu Event koji je u ovom slučaju pod varijablom signal_klika, može biti bilo koji naziv. Važno je znati da Eventi mogu uvijek proslijediti svoja svojstva funkcijama. 
            var sig = signal_klika.target.classList.length; //Gleda koliko ima imena klasa
            if(sig == 1 ) {
                var z = 0;
                for(z; document.getElementsByClassName("playlist-box-clicked").length > z; z++) {
                    document.getElementsByClassName("playlist-box-clicked")[z].classList.remove("playlist-box-clicked");
                }

                //Ako ima samo jednu klasu dodaju još jednu metodom toggle()
                //Ovaj korak ide zadnji jer iznad njega stoji petlja koja miče sve klase playlist-box-clicked. U protivnom bismo ubrzo imali sve zelene žanrove kako bismo klikali po njima
                this.classList.toggle("playlist-box-clicked");
            }
        }
    }
}
function setDBName() {

}
createGenresItems();
setDefaultGenre();
addColorToClickedGenres();
//setDBName();
