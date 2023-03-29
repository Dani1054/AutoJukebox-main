function getCurrentTime() {
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return hours + ":" + minutes;
}

function autopilotSwitchSong() {
    let music = playlist0[playingIndex].source;
    playerAudioElement.pause();
    playerAudioElement.setAttribute("src", music);
    playerAudioElement.load();
    changeTitle();
    playingElementCheck();
}

let isAutopilotActive = false;
const scheduleSchoolHours = {
    "schedule": [
        {
            "time": "18:32",
            "playMusic": true,
        },
        {
            "time": "18:33",
            "playMusic": false,
        },
        {
            "time": "18:46",
            "playMusic": true,
        },
    ]
};

function disableButtonsAutopilot() {
    document.getElementById("duration-slider").disabled = true;
    const buttonsToDisable = document.querySelectorAll(".enabled-button");
    for (let i = 0; i < buttonsToDisable.length; i++) {
        let disableButton = buttonsToDisable[i];
        disableButton.classList.remove("enabled-button");
        disableButton.classList.add("disabled-button");
    }
    repeatButton.removeEventListener("click", repeat);
    shuffleButton.removeEventListener("click", shuffle);
    previousSongButton.removeEventListener("click", previousSong);
    playPauseButton.removeEventListener("click", playPause);
    nextSongButton.removeEventListener("click", nextSong);
}

function enableButtonsAutopilot() {
    document.getElementById("duration-slider").disabled = false;
    const buttonsToDisable = document.querySelectorAll(".disabled-button");
    for (let i = 0; i < buttonsToDisable.length; i++) {
        let disableButton = buttonsToDisable[i];
        disableButton.classList.remove("disabled-button");
        disableButton.classList.add("enabled-button");
    }
    repeatButton.addEventListener("click", repeat);
    shuffleButton.addEventListener("click", shuffle);
    previousSongButton.addEventListener("click", previousSong);
    playPauseButton.addEventListener("click", playPause);
    nextSongButton.addEventListener("click", nextSong);
}

document.getElementsByClassName("autopilot")[0].addEventListener("click", autopilotActivation);

function autopilotActivation() {
    let intervalAutopilot;
    let autopilotElement = document.getElementsByClassName("autopilot")[0] || document.getElementsByClassName("autopilot-pressed")[0];
    console.log(autopilotElement);

    if (isAutopilotActive === false) {
        disableButtonsAutopilot();
        isAutopilotActive = true;

        // potrebna za tkv. "kratki spoj"
        let shortCurcuit = 0;
        autopilotElement.className = 'autopilot-pressed';

        function autopilot() {
            for (let index = 0; index < scheduleSchoolHours.schedule.length; index++) {
                if (getCurrentTime() === scheduleSchoolHours.schedule[index].time) {

                    if (scheduleSchoolHours.schedule[index].playMusic && shortCurcuit === 0) {
                        playMusic();

                        if (playingIndex === playingNowLength - 1) {
                            playingIndex = 0;

                        } else if (playingIndex < playingNowLength - 1) {
                            playingIndex++;
                        }
                        shortCurcuit = 1;

                    }
                    else if (scheduleSchoolHours.schedule[index].playMusic === false && shortCurcuit === 1) {
                        autopilotSwitchSong();
                        shortCurcuit = 0;
                    }
                }

            }
        }

        intervalAutopilot = setInterval(autopilot, 1000);

    } else if (isAutopilotActive === true) {
        isAutopilotActive = false;
        clearInterval(intervalAutopilot);
        enableButtonsAutopilot();
        if (playerAudioElement.paused === false) {
            playPauseButton.click();
        }
        autopilotElement.className = 'autopilot';
    }

}
