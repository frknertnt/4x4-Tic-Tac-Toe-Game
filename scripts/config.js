function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid;
    playerConfigOverlay.style.display = "block";
    backDrop.style.display = "block";
}

function closePlayerConfig() {
    playerConfigOverlay.style.display = "none";
    backDrop.style.display = "none";
    form.firstElementChild.classList.remove("error");
    errorsOutput.textContent = "";
    form.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayername = formData.get("playername").trim();

    if (!enteredPlayername) { //enteredPlayername === ''
        event.target.firstElementChild.classList.add("error");
        errorsOutput.textContent = "Please enter a valid name!";
        return;
    }

    const updatedPlayerData = document.getElementById("player-" + editedPlayer + "-data");
    updatedPlayerData.children[1].textContent = enteredPlayername;

    // if(editedPlayer ===1){
    //     players[0].name = enteredPlayername;
    // }else{
    //     players[1].name = enteredPlayername;
    // }
    players[editedPlayer - 1].name = enteredPlayername;

    closePlayerConfig();
}

