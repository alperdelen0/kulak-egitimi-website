let buttonsActive = true;

function ButtonManager(type, generatedItems){
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
    let submited = true;
    let melodiIndex = 0;

    switch (type) {
        case 2:
            guessCount = 2;
            break;
        case 1:
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
                if(!(noteHolders[index].classList.contains("bg-success"))){
                    switch (type) {
                        case 1:
                            noteHolders[index].textContent = generatedItems[index] + " - " + ciftSesAraligi[index];
                            break;
                        default:
                            noteHolders[index].textContent = generatedItems[index];
                            break;
                    }
                }
            }
            ChangeButtonState(true, 'default', [answerButton], true, true);
        }
        else{
            for (let index = 0; index < generatedItems.length; index++) {
                if(type === 3)
                    guessCount = generatedItems[index].split(" ").length - 1;

                if(!(noteHolders[index].classList.contains("bg-success"))){
                    let radioItem = new Array(guessCount);
                    for (let index2 = 0; index2 < guessCount; index2++) {
                        if(document.querySelector(`input[name="radioItem${index2}-${index}"]:checked`) != null){
                            radioItem[index2] = document.querySelector(`input[name="radioItem${index2}-${index}"]:checked`).value;
                        }
                        else
                        {
                            radioItem[index2] = "???";
                            if(type === 1 && index2 === 1){
                                radioItem[index2] = "?????";
                            }
                        }
                        console.log(noteHolders[index].textContent);

                        /*
                        let hiddenItemText = "";
                        const hiddenItemCount = generatedItems[index].split(" ").length - 1;

                        let index3 = 0;
                        do {
                            hiddenItemText += " ???";
                            index3++;
                        } while (index3 < hiddenItemCount);

                        if(type == 1)
                            hiddenItemText += " - ?????";

                        let innerTextValue = "???";
                        if(generatedItems[index].split(" ").length != 1){
                            innerTextValue = generatedItems[index].split(" ")[0] + hiddenItemText;
                        }

                        let textValue;
                        if(radioItem[index2] != null){
                            const radioItemValue = [radioItem[index2].value, `${generatedItems[index].split(" ")[0]}` + " " +  radioItem[index].value + " - ?????", noteHolders[index].textContent.replace(noteHolders[index].textContent.split(" ")[index2 + 1], radioItem[index2].value)];
                            textValue = radioItemValue[type];
                            console.log("1-" + textValue + " / " + noteHolders[index].textContent);
                        }
                        else{
                            let index4Pass = false;
                            for (let index4 = 0; index4 < radioItem.length; index4++) {
                                if(radioItem[index4] != null){
                                    index4Pass = true;
                                    break;
                                }
                            }
                            if(!index4Pass)
                                textValue = innerTextValue;
                            else
                                textValue = noteHolders[index].textContent;
                            console.log("2-" + textValue + " / " + noteHolders[index].textContent);
                        }                    
                        noteHolders[index].textContent = textValue;*/
                    }
                    let textValues = [radioItem[0], `${generatedItems[index].split(" ")[0]}` + " " +  radioItem[0] + " - " + radioItem[1], `${generatedItems[index].split(" ")[0]}` + " " +  radioItem[0] + " " + radioItem[1]];
                    textValues[0] = radioItem[0];
                    textValues[1] = `${generatedItems[index].split(" ")[0]}` + " " +  radioItem[0] + " - " + radioItem[1];
                    textValues[2] = `${generatedItems[index].split(" ")[0]}` + " " +  radioItem[0] + " " + radioItem[1];
                    textValues[3] = `${generatedItems[index].split(" ")[0]}`;
                    if(type === 3){
                        for (let index2 = 0; index2 < guessCount; index2++) {
                            textValues[3] += " " + radioItem[index2];
                        }
                    }

                    noteHolders[index].textContent = textValues[type];

                    console.log(radioItem);
                }
            }
            ChangeButtonState(false, 'pointer', [answerButton], true, false);
        }
        showAndHideButton.childNodes.item(0).classList.replace(buttonImage[0], buttonImage[1]);
        showAndHideButton.innerHTML = showAndHideButton.innerHTML.replace(buttonTexts[0], buttonTexts[1]);

        hidden = !hidden;
        
    }
    function submitNotes(){
        if(submited){
            submited = false;
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
                const arrayHolderValue = [generatedItems[i], generatedItems[i].split(" "), generatedItems[i].split(" ")];
                const secilenArrayHolderValue = [noteHolders[i].textContent, noteHolders[i].textContent.split(" -")[0].split(" "), noteHolders[i].textContent.split(" ")];
                
                // console.log(arrayHolderValue[type]);
                // console.log(noteHolders[i].textContent.split(" - ")[0].split(" "));
                // console.log("1- " + arrayHolderValue[type]);
                // console.log("2- " + secilenArrayHolderValue[type]);

                if(type == 0){
                    sesArrayHolder[i] = bemolToDiyez(arrayHolderValue[type]);
                    secilenArrayHolder[i] = bemolToDiyez(secilenArrayHolderValue[type]);
                }
                else
                {
                    sesArrayHolder[i] = (arrayHolderValue[type]);
                    secilenArrayHolder[i] = (secilenArrayHolderValue[type]);
                }

                // console.log("1- " + sesArrayHolder[i]);
                // console.log("2- " + secilenArrayHolder[i]);

            }

    
            let dogru = 0;
            let yanlis = 0;
    
            for (let i = 0; i < secilenArrayHolder.length; i++) {
                let j = 1;
                do {
                    const holder1Values = [secilenArrayHolder[i], secilenArrayHolder[i][j], secilenArrayHolder[i][j]];
                    const holder2Values = [sesArrayHolder[i], sesArrayHolder[i][j], sesArrayHolder[i][j]];
    
                    noteHolders[i].parentElement.parentElement.childNodes[1].innerHTML = "";
        
                    if(holder1Values[type] === holder2Values[type]){
                        for (const modifier of succesClass) {
                            noteHolders[i].classList.add(modifier);   
                        }
                        dogru++;
                    }
                    else{
                        for (const modifier of failClass) {
                            noteHolders[i].classList.add(modifier); 
                        }        
                        yanlis++;
                    }
                    j++;
                } while (j < (type + 1));
                for (let j = 1; j < type + 1; j++) {

                }
                if(noteHolders[i].classList.contains("bg-danger")){
                    const listItem4 = document.createElement("li");
                    listItem4.classList.add("list-inline-item");
                    const listItem4Paragraph = document.createElement("p");
                    switch (type) {
                        case 1:
                            listItem4Paragraph.textContent = generatedItems[i] + " - " + ciftSesAraligi[i];
                            break;
                        default:
                            listItem4Paragraph.textContent = generatedItems[i];
                            break;
                    }
    
                    for (const modifier of succesClass) {
                        listItem4Paragraph.classList.add(modifier);
                    }
                    listItem4Paragraph.classList.replace("bg-success", "bg-info");
                    listItem4Paragraph.classList.replace("text-white", "text-black");
                    listItem4.appendChild(listItem4Paragraph);
                    const ulItem = document.querySelectorAll(".item");
                    ulItem[i].appendChild(listItem4);
                }            
            }
            
            document.getElementById("score").innerHTML = "Doğru: " + dogru + " / " + "Yanlış: " + yanlis;
            ChangeButtonState(true, 'default', [answerButton]);
        }
    }

    // Notaların yanındaki dinleme butonuna click event listener ekliyor
    allSoundBtns.forEach(function (soundButton) {
        soundButton.addEventListener("click", function () {
            if(buttonsActive || allSoundBtnsActive){
                audioHolder.innerHTML = '';
                value = soundButton.getAttribute("value");
                const buttonTextValues = [[generatedItems[value]], generatedItems[value].split(" "), generatedItems[value].split(" "), generatedItems[value].split(" ")];
                let buttonText = buttonTextValues[type];

                allSoundBtns.forEach(element => {
                    element.setAttribute("style", "background-color: #3D3B40;");
                });

                ChangeButtonState(true, 'default', [playButton, stopButton, showAndHideButton], false, false);
                document.querySelectorAll(".sound-btn")[value].setAttribute("style", "background-color: #0d6efd");
                console.log(buttonText);
                buttonText = bemolToDiyez(buttonText);
                const soundPath = getSoundPath(buttonText);
                console.log(soundPath);
                if (soundPath) {
                    switch (type) {
                        case 3:
                            melodiIndex = 0;
                            playMelodieSoundPath(soundPath, false, value);
                            break;
                        default:
                            playSoundPath(soundPath, false, value);
                            break;
                    }
                } else {
                    console.log("Ses dosyası bulunamadı.");
                }
            }
            
        });
    });
    // Ses aralıkları diyez şeklinde kayıt edildiği için bemolden diyeze çeviriyoruz
    // Buna gerek olmayabilir aslında neyse sonra bakarsın (25.04.24)
    function bemolToDiyez(buttonText){
        //console.log("in: " + buttonText);
        const diyez = ["do#","re#","fa#","sol#","la#"];
        const bemol = ["reb","mib","solb","lab","sib"];
        const ses = ["(ince)", "(kalın)"];
        let sesHolder = "";

        for (let index = 0; index < bemol.length; index++) {
            for (let j = 0; j < type + 1; j++) {
                const btnTextValue = [buttonText, buttonText[j], buttonText[j], buttonText[j]];

                if(btnTextValue[type].includes(bemol[index])){
                    for (const modifier of ses) {
                        if(btnTextValue[type].includes(modifier)){
                            sesHolder = modifier;
                            break;
                        }
                    }
                    switch (type) {
                        case 0:
                            buttonText = btnTextValue[type].replace(btnTextValue[type], (diyez[index] + sesHolder));         
                            break;
                    
                        default:
                            buttonText[j] = btnTextValue[type].replace(btnTextValue[type], (diyez[index] + sesHolder));        
                            break;
                    }
                }           
            }
        }
        //console.log("out: " + buttonText);
        return buttonText;
    }
    // Ses yolunu döndürüyor
    function getSoundPath(notes){
        let returnValue = new Array(notes.length);

        for (let index = 0; index < notes.length; index++) {
            // const notesValue = [notes[index], notes[index], notes[index], notes[index]];
            if(notes[index].includes("#")){
                notes[index] = notes[index].replace("#","_diyez");
            }
            returnValue[index] = `${audioPath}/${notes[index]}.mp3`; 
        }
        return returnValue;   
    }
    // Ses yolunu audioHolder'a <audio> ekleyip sesi çalıyor. Ses bittiğinde audioHolder içi temizleniyor.
    function playSoundPath(soundPath, allSounds, noteIndex){
        allSoundBtns[noteIndex].setAttribute("style", "background-color: #0d6efd;");
        allSoundBtns[noteIndex].style.cursor = 'default';

        audioHolder.innerHTML = '';
        let audioElement = new Array(soundPath.length);

        for (let i = 0; i < soundPath.length; i++) {
            // const soundPathValues = [soundPath[i], soundPath[i], soundPath[i], soundPath[i]];
            audioElement[i] = document.createElement("audio");
            audioElement[i].setAttribute("id", "audio" + (i + 1));
            let source = document.createElement("source");
            source.setAttribute("src", soundPath[i]);
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
    function playMelodieSoundPath(soundPath, allSounds, noteIndex)
    {
        if(melodiIndex < soundPath.length){
            console.log(soundPath[melodiIndex]);
            audioHolder.innerHTML = '';

            let audioElement = document.createElement("audio");
            
            let source = document.createElement("source");
            source.setAttribute("src", soundPath[melodiIndex]);
    
            audioElement.appendChild(source);
            audioHolder.appendChild(audioElement);
            audioElement.load();
            audioElement.play();
            
            audioElement.addEventListener("ended", function onEnded() {
                melodiIndex++;
                
                if(melodiIndex == soundPath.length && allSounds){
                    let waitAudio = document.createElement("audio");
                    let waitSource = document.createElement("source");
                    waitSource.setAttribute("src", wait4SecAuidoPath);
                    waitAudio.appendChild(waitSource);
                    audioHolder.appendChild(waitAudio);
                    waitAudio.load();
                    waitAudio.play();

                    waitAudio.addEventListener("ended", function onEnded() {
                        currentNoteIndex++;
                        console.log("thank you next");
                        playNotes();

                        waitAudio.removeEventListener("ended", onEnded);
                    });
                }
                else{
                    playMelodieSoundPath(soundPath, allSounds, noteIndex);
                }
                audioElement.removeEventListener("ended", onEnded);
            });
        }
        else{
            ChangeButtonState(false, 'pointer', [playButton, stopButton]);;

        }
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
            let ciftSesTextContent = "?????";
            for (const element of ciftSesAraliklari) {
                if(element == item.value){
                    ciftSesTextContent = element;
                    break;
                }
            }
            const noteHolderTextContent = [[item.value], [generatedItems[itemNumber].split(" ")[0] + " " + item.value + " - " + noteHolders[itemNumber].textContent.split(" - ")[1], noteHolders[itemNumber].textContent.split(" - ")[0] + " - " + item.value], [generatedItems[itemNumber].split(" ")[0] + " " + item.value + " " + noteHolders[itemNumber].textContent.split(" ")[2], generatedItems[itemNumber].split(" ")[0] + " " + noteHolders[itemNumber].textContent.split(" ")[1] + " " + item.value]];

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