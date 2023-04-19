/**
 * Maknuo dio od Daniela
 * -Vito
 */

const settingsElement = document.querySelector(".settings");
const exitSettings = document.querySelector(".exit-settings");
const uploadThemeButton = document.querySelector(".upload-theme");
const userInputThemeName = document.querySelector("#theme-name");
let themeIdGenerator = 0;

// radio button dio
let themeFileList = ["default-theme.css"];
let themeNamesList = ["Zadana tema"];
let themePicker = document.getElementsByName("application-theme");
const setThemeButton = document.querySelector(".set-theme");

function changeSecondaryPlayIconsToDarkMode(darkThemeChecker) {
    const secondaryPlayIcons = document.querySelectorAll(".play-button");
    for (let index = 0; index < secondaryPlayIcons.length; index++) {
        const playIcon = secondaryPlayIcons[index];
        if (playIcon.getAttribute("src") == "themes/" + preferredTheme + "/icons/play-button.png" && darkThemeChecker) {
            playIcon.setAttribute("src", "themes/dark/icons/play-button.png");
        }
        else if (!darkThemeChecker) {
            playIcon.setAttribute("src", "themes/" + preferredTheme + "/icons/play-button.png");
        }
    }
}

function openSettings() {
    document.querySelector(".settings-menu-hidden").setAttribute("class", "settings-menu");
    settingsElement.removeEventListener("click", openSettings);
    settingsElement.addEventListener("click", closeSettings);
}

function closeSettings() {
    document.querySelector(".settings-menu").setAttribute("class", "settings-menu-hidden");
    settingsElement.removeEventListener("click", closeSettings);
    settingsElement.addEventListener("click", openSettings);
}

function uploadTheme() {
    let cssFile = document.querySelector("#upload-css");
    const formElement = document.querySelector("#change-theme");
    const uploadStatus = document.querySelector(".status-theme-upload");

    if (cssFile.value) {

        let cssThemeFileName = (cssFile.value).replace('C:\\fakepath\\', '');

        if (themeFileList.includes(cssThemeFileName)) {
            uploadStatus.textContent = "Tema već postoji";
            uploadStatus.style.color = "red";
            return;
        }
        if (userInputThemeName.value === '') {
            uploadStatus.textContent = "Izaberi ime";
            uploadStatus.style.color = "red";
            return;
        }
        else if (themeNamesList.includes(userInputThemeName.value)) {
            uploadStatus.textContent = "Ime već postoji";
            uploadStatus.style.color = "red";
            return;
        }
        themeIdGenerator++;

        themeNamesList.push(userInputThemeName.value);
        themeFileList.push(cssThemeFileName);

        //span
        let spanElement = document.createElement("span");
        spanElement.setAttribute("class", "down-margin-theme");

        //label
        let labelElement = document.createElement("label");
        labelElement.setAttribute("class", "text-font-default");
        labelElement.setAttribute("for", "standard-theme" + themeIdGenerator.toString());
        labelElement.textContent = userInputThemeName.value;

        //gumb
        let buttonThemeElement = document.createElement("input");
        buttonThemeElement.setAttribute("type", "radio");
        buttonThemeElement.setAttribute("id", "standard-theme" + themeIdGenerator.toString());
        buttonThemeElement.setAttribute("name", "application-theme");
        buttonThemeElement.setAttribute("value", cssThemeFileName);

        spanElement.appendChild(labelElement);
        spanElement.appendChild(buttonThemeElement);
        formElement.appendChild(spanElement);

        uploadStatus.textContent = "Tema dodana";
        uploadStatus.style.color = "lime";
    }

    else {
        uploadStatus.textContent = "Nijedna tema nije izabrana";
        uploadStatus.style.color = "black";
    }
}

function setTheme() {
    let selectedTheme;
    for (let i = 0; i < themePicker.length; i++) {
        if (themePicker[i].checked) {
            selectedTheme = themePicker[i].value;
        }
    }

    let styleLink = document.getElementById("css-theme-file");

    if (selectedTheme === undefined) {
        return;
    }

    let darkTheme = false;

    if (selectedTheme == "dark-theme.css") {
        darkTheme = true;
        styleLink.setAttribute("href", ("themes/dark/" + selectedTheme));
    }
    else {
        styleLink.setAttribute("href", ("themes/" + preferredTheme + "/" + selectedTheme));
    }

    changeSecondaryPlayIconsToDarkMode(darkTheme);
}

setThemeButton.addEventListener("click", setTheme);
settingsElement.addEventListener("click", openSettings);
exitSettings.addEventListener("click", closeSettings);
uploadThemeButton.addEventListener("click", uploadTheme);
