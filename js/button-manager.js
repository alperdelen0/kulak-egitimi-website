let buttonsActive = true;

function TekSesButtonManager(type, generatedItems){

    // Buttons
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");
    const showAndHideButton = document.getElementById("showAndHideButton");
    const changeDiffButton = document.getElementById("changeDiffButton");
    const createAgainButton = document.getElementById("createAgainButton");
    const answerButton = document.getElementById("answerButton");

    // Elements 
    const allSoundBtns = document.querySelectorAll(".sound-btn");
    const audioHolder = document.getElementById("audioHolder");
    const noteHolders = document.getElementsByClassName("noteHolder");
    const allSelectNotesBtns = document.getElementsByClassName("dropdown-toggle");
    
    audioHolder.innerHTML = '';

    // Audio paths
    const audioPath = ".\\audios";
    const waitAuidoPath = audioPath + "/wait4sec.mp3";

    // Variables
    let hidden = true;
    let currentNoteIndex = 0;
    let value = null;
    let turn = 1;
    let guessCount;
    let allSoundBtnsActive = true;

    switch (type) {
        case 2:
            guessCount = 2;
            break;
        default:
            guessCount = 1;
            break;
    }

    // Button Click functions
    playButton.addEventListener("click", function() {
        if(buttonsActive){
            currentNoteIndex = 0
            playNextNote();
            ChangeButtonState(true, 'default', [playButton, showAndHideButton], false, true);
        }
    });
    stopButton.addEventListener("click", function() {
        audioHolder.innerHTML = '';
        allSoundBtns[currentNoteIndex].setAttribute("style", "background-color: #3D3B40;");
        ChangeButtonState(false, 'pointer', [playButton, showAndHideButton], false, false);
    });
    showAndHideButton.addEventListener("click", function() {
        showAndHideNotes();
    });
    changeDiffButton.addEventListener("click", function() {
        location.reload();
    });
    answerButton.addEventListener("click", function() {
        submitNotes();
    });

    // Functions For Buttons
    function showAndHideNotes(){
        let buttonTexts = [" Gizle"," Göster"];
        let buttonImage = ["bi-eye-slash", "bi-eye"];

        if(hidden){
            buttonTexts = [" Göster"," Gizle"]
            buttonImage = ["bi-eye", "bi-eye-slash"];
            for (let index = 0; index < generatedItems.length; index++) {
                switch (type) {
                    case 1:
                        noteHolders[index].textContent = generatedItems[index] + " - " + ciftSesAraligi[index];
                        break;
                    default:
                        noteHolders[index].textContent = generatedItems[index];
                        break;
                }
            }
            ChangeButtonState(true, 'default', [answerButton], true, true);
        }
        else{
            for (let index = 0; index < generatedItems.length; index++) {
                let radioItem = new Array(guessCount);
                for (let index2 = 0; index2 < guessCount; index2++) {
                    radioItem[index2] = document.querySelector(`input[name="radioItem${index2}-${index}"]:checked`);
                    const noteHolderTextContent = ["???", `${generatedItems[index].split(" ")[0]}` + " ??? - ?????", noteHolders[index].textContent.replace(noteHolders[index].textContent.split(" ")[index2 + 1], "???")];
    
                    let textValue;
                    if(radioItem[index2] != null){
                        const radioItemValue = [radioItem[index2].value, `${generatedItems[index].split(" ")[0]}` + " " +  radioItem[index2].value + " - ?????", noteHolders[index].textContent.replace(noteHolders[index].textContent.split(" ")[index2 + 1], radioItem[index2].value)];
                        textValue = radioItemValue[type];     
                    }
                    else{
                        textValue = noteHolderTextContent[type];
                    }                    
                    noteHolders[index].textContent = textValue;
                }
            }
            ChangeButtonState(false, 'pointer', [answerButton], true, false);
        }
        showAndHideButton.childNodes.item(0).classList.replace(buttonImage[0], buttonImage[1]);
        showAndHideButton.innerHTML = showAndHideButton.innerHTML.replace(buttonTexts[0], buttonTexts[1]);

        hidden = !hidden;
        
    }
    function submitNotes(){
        let sesArrayHolder = new Array(generatedItems);
        let secilenArrayHolder = new Array(noteHolders.length);
        const succesClass = ["px-3", "py-1", "shadow", "rounded-2", "bg-success", "text-white"];
        const failClass = ["px-3", "py-1", "shadow", "rounded-2", "bg-danger", "text-white"];


        for (let i = 0; i < allSoundBtns.length; i++) {
            if(noteHolders[i].classList.value.includes("true")){
                noteHolders[i].classList.remove("true");
            }
            else if(noteHolders[i].classList.value.includes("false")){
                noteHolders[i].classList.remove("false");
            }
            const arrayHolderValue = [generatedItems[i], generatedItems[i].split(" ")];
            const secilenArrayHolderValue = [noteHolders[i].textContent, noteHolders[i].textContent.split(" -")[0], noteHolders[i].textContent.split(" ")];


            sesArrayHolder[i] = bemolToDiyez(arrayHolderValue[guessCount - 1]);
            secilenArrayHolder[i] = bemolToDiyez(secilenArrayHolderValue[type]);
        }

        let dogru = 0;
        let yanlis = 0;

        for (let i = 0; i < secilenArrayHolder.length; i++) {
            const holder1Values = [secilenArrayHolder[i], secilenArrayHolder[i][type]];
            const holder2Values = [sesArrayHolder[i], sesArrayHolder[i][type]];

            noteHolders[i].parentElement.parentElement.childNodes[1].innerHTML = "";

            if(holder1Values[guessCount - 1] === holder2Values[guessCount - 1]){
                for (const modifier of succesClass) {
                    noteHolders[i].classList.add(modifier);   
                }
                dogru++;
            }
            else{
                for (const modifier of failClass) {
                    noteHolders[i].classList.add(modifier); 
                }
                //console.log(noteHolders[i]);
                const listItem4 = document.createElement("li");
                listItem4.classList.add("list-inline-item");
                const listItem4Paragraph = document.createElement("p");
                listItem4Paragraph.textContent = generatedItems[i];
                for (const modifier of succesClass) {
                    listItem4Paragraph.classList.add(modifier);
                }
                listItem4Paragraph.classList.replace("bg-success", "bg-info");
                listItem4Paragraph.classList.replace("text-white", "text-black");
                listItem4.appendChild(listItem4Paragraph);
                const ulItem = document.querySelectorAll(".item");
                ulItem[i].appendChild(listItem4);

                yanlis++;
            }
        }
        document.getElementById("score").innerHTML = "Doğru: " + dogru + " / " + "Yanlış: " + yanlis;
    }

    // Notaların yanındaki dinleme butonuna click event listener ekliyor
    allSoundBtns.forEach(function (soundButton) {
        soundButton.addEventListener("click", function () {
            if(buttonsActive || allSoundBtnsActive){
                audioHolder.innerHTML = '';
                value = soundButton.getAttribute("value");
                const buttonTextValues = [generatedItems[value], generatedItems[value].split(" "), generatedItems[value].split(" ")];
                let buttonText = buttonTextValues[type];

                allSoundBtns.forEach(element => {
                    element.setAttribute("style", "background-color: #3D3B40;");
                });

                ChangeButtonState(true, 'default', [playButton, stopButton, showAndHideButton], false, false);
                document.querySelectorAll(".sound-btn")[value].setAttribute("style", "background-color: #0d6efd");
                buttonText = bemolToDiyez(buttonText);
                const soundPath = getSoundPath(buttonText);
                //console.log(soundPath);
                if (soundPath) {
                    playSoundPath(soundPath, false, value);
                } else {
                    console.log("Ses dosyası bulunamadı.");
                }
            }
            
        });
    });
    // Ses aralıkları diyez şeklinde kayıt edildiği için bemolden diyeze çeviriyoruz
    // Buna gerek olmayabilir aslında neyse sonra bakarsın (25.04.24)
    function bemolToDiyez(buttonText){
        const diyez = ["do#","re#","fa#","sol#","la#"];
        const bemol = ["reb","mib","solb","lab","sib"];
        const ses = ["(ince)", "(kalın)"];
        let sesHolder = "";

        for (let index = 0; index < bemol.length; index++) {
            for (let j = 0; j < type + 1; j++) {
                const btnTextValue = [buttonText, buttonText, buttonText[j]];

                if(btnTextValue[type].includes(bemol[index])){
                    for (const modifier of ses) {
                        if(btnTextValue[type].includes(modifier)){
                            sesHolder = modifier;
                            break;
                        }
                    }
                    switch (type) {
                        case 2:
                            buttonText[j] = btnTextValue[type].replace(btnTextValue[type], (diyez[index] + sesHolder));        
                            break; 
                        default:
                            buttonText = btnTextValue[type].replace(btnTextValue[type], (diyez[index] + sesHolder));
                            break;
                    }
                }           
            }
        }
        return buttonText;
    }
    // Ses yolunu döndürüyor
    function getSoundPath(notes){
        let returnValue = new Array(notes.length);
        for (let index = 0; index < type + 1; index++) {
            const notesValue = [notes, notes[index], notes[index]];
            if(notesValue[type].includes("#")){
                notesValue[type] = notesValue[type].replace("#","_diyez");
            }
            if(type == 0)
                returnValue = `${audioPath}/${notesValue[type]}.mp3`; 
            else
                returnValue[index] = `${audioPath}/${notesValue[type]}.mp3`;
        }
        return returnValue;   
    }
    // Ses yolunu audioHolder'a <audio> ekleyip sesi çalıyor. Ses bittiğinde audioHolder içi temizleniyor.
    function playSoundPath(soundPath, allSounds, noteIndex){
        allSoundBtns[noteIndex].setAttribute("style", "background-color: #0d6efd;");
        allSoundBtns[noteIndex].style.cursor = 'default';

        audioHolder.innerHTML = '';
        let audioElement = new Array(type + 1);

        for (let i = 0; i < type + 1; i++) {
            const soundPathValues = [soundPath, soundPath[i], soundPath[i]];
            audioElement[i] = document.createElement("audio");
            audioElement[i].setAttribute("id", "audio" + (i + 1));
            let source = document.createElement("source");
            source.setAttribute("src", soundPathValues[type]);
            audioElement[i].appendChild(source);
            audioHolder.appendChild(audioElement[i]);
            audioElement[i].load();
            audioElement[i].play();
        }

        audioElement[0].addEventListener("ended", function onEnded() {
            allSoundBtns[noteIndex].setAttribute("style", "background-color: #3D3B40;");
            allSoundBtns[noteIndex].style.cursor = 'default';

            if(allSounds){
                let waitAudio = document.createElement("audio");
                let waitSource = document.createElement("source");

                waitSource.setAttribute("src", waitAuidoPath);
                waitAudio.appendChild(waitSource);
                audioHolder.appendChild(waitAudio);
                waitAudio.load();
                waitAudio.play();

                waitAudio.addEventListener("ended", function onEnded() {
                    currentNoteIndex++;
                    playNextNote();
                    waitAudio.removeEventListener("ended", onEnded);
                });
            }
            else{
                ChangeButtonState(false, 'pointer', [playButton, stopButton, showAndHideButton], false, false);
            }
            audioElement[0].removeEventListener("ended", onEnded);

        });
    }
    function playNextNote() {
        if(turn < 2){
            if (currentNoteIndex < allSoundBtns.length) {
                const buttonTextValues = [generatedItems[currentNoteIndex], generatedItems[currentNoteIndex].split(" ")];

                var buttonText = buttonTextValues[guessCount - 1];
    
                buttonText = bemolToDiyez(buttonText);
    
                const soundPath = getSoundPath(buttonText);
    
                if (soundPath) {
                    playSoundPath(soundPath, true, currentNoteIndex);
                } else {
                    console.log("Ses dosyası bulunamadı.");
                }
            } else {
                console.log("Notaların sonu.");
                currentNoteIndex = 0;
                turn++;
                playNextNote();
            }
        }
        else{
            console.log("Tur sonu.");
            audio.pause();
            audio.currentTime = 0;
            ChangeButtonState(false, 'pointer', [playButton], false, false);;
        }
    }
    // Dropdown menüsünden bir seçim yapıldığında '???' ifadesi yerine seçilen nota gelecek.
    let allDropdownItems = new Array(guessCount);
    for (let index = 0; index < allDropdownItems.length; index++) {
        allDropdownItems[index] = document.querySelectorAll(`.dropdownMenu-item${index}`);
    }
    //console.log(allDropdownItems);
    //const allDropdownItems = document.querySelectorAll(".dropdownMenu-item");

for (let index = 0; index < allDropdownItems.length; index++) {
    allDropdownItems[index].forEach(function (item) {
        item.addEventListener("click", function () {
            // let itemNumber = parseInt(item.id.split("-")[0].split("radioItem")[1]);
            let itemNumber = parseInt(item.id.split("radioItem")[1].split("-")[1]);

            const noteHolderTextContent = [[item.value], [generatedItems[itemNumber].split(" ")[0] + " " + item.value + " - ?????"], [generatedItems[itemNumber].split(" ")[0] + " " + item.value + " " + noteHolders[itemNumber].textContent.split(" ")[2], generatedItems[itemNumber].split(" ")[0] + " " + noteHolders[itemNumber].textContent.split(" ")[1] + " " + item.value]];

            noteHolders[itemNumber].textContent = noteHolderTextContent[type][index];
        });
    });
    
}

    // Butonların durumunu değiştiriyor
    function ChangeButtonState(boolValue, cursorStyle, buttonElement, changeSelecting, changeSoundBtns){
        buttonElement.forEach(element => {
            if(element){
                element.disabled = boolValue;
                element.style.cursor = cursorStyle;
                element.classList.toggle("disabledButton", boolValue);
            }
        });

        if(changeSelecting){
            for (let i = 0; i < allSelectNotesBtns.length; i++) {
                allSelectNotesBtns[i].disabled = boolValue;
            }
        }

        if(changeSoundBtns){
            allSoundBtns.forEach(element => {
                element.style.cursor = cursorStyle;
            });
        }
        allSoundBtnsActive = !changeSoundBtns;
        buttonsActive = !boolValue;
    }
}