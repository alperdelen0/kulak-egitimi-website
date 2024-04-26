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
    const allDropdownItems = document.querySelectorAll(".dropdownMenu-item");
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

    // Button Click functions
    playButton.addEventListener("click", function() {
        if(buttonsActive){
            currentNoteIndex = 0
            playNextNote();
            ChangeButtonState(true, 'default', [playButton], false);
        }
    });
    stopButton.addEventListener("click", function() {
        audioHolder.innerHTML = '';
        allSoundBtns[currentNoteIndex].setAttribute("style", "background-color: #3D3B40;");
        ChangeButtonState(false, 'pointer', [playButton]);
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
        console.log(generatedItems[0]);

        let buttonTexts = [" Gizle"," Göster"];
        let buttonImage = ["bi-eye-slash", "bi-eye"];

        if(hidden){
            buttonTexts = [" Göster"," Gizle"]
            buttonImage = ["bi-eye", "bi-eye-slash"];
            for (let index = 0; index < generatedItems.length; index++) {
                if(type === 0)
                    noteHolders[index].textContent = generatedItems[index];
                else if(type === 1)
                    noteHolders[index].textContent = generatedItems[index] + " - " + ciftSesAraligi[index];
            }
            ChangeButtonState(true, 'default', [answerButton], true);
        }
        else{
            for (let index = 0; index < generatedItems.length; index++) {
                const radioItem = document.querySelector(`input[name="radioItem${index}"]:checked`);
                const noteHolderTextContent = ["???", `${generatedItems[index].split(" ")[0]}` + " ??? - ?????"];

                let textValue;
                if(radioItem != null){
                    const radioItemValue = [radioItem.value, `${generatedItems[index].split(" ")[0]}` + " " +  radioItem.value + " - ?????"];
                    textValue = radioItemValue[type];     
                }
                else{
                    textValue = noteHolderTextContent[type];
                }
                noteHolders[index].textContent = textValue;
            }
            ChangeButtonState(false, 'pointer', [answerButton], true);
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
            const secilenArrayHolderValue = [noteHolders[i].textContent, noteHolders[i].textContent.split(" ")];

            console.log(generatedItems[i]);

            sesArrayHolder[i] = bemolToDiyez(arrayHolderValue[type]);
            secilenArrayHolder[i] = bemolToDiyez(secilenArrayHolderValue[type]);

        }

        let dogru = 0;
        let yanlis = 0;

        for (let i = 0; i < secilenArrayHolder.length; i++) {
            const holder1Values = [secilenArrayHolder[i], secilenArrayHolder[i][type]];
            const holder2Values = [sesArrayHolder[i], sesArrayHolder[i][type]];

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
        }
        document.getElementById("score").innerHTML = "Doğru: " + dogru + " / " + "Yanlış: " + yanlis;
    }

    // Notaların yanındaki dinleme butonuna click event listener ekliyor
    allSoundBtns.forEach(function (soundButton) {
        soundButton.addEventListener("click", function () {
            if(buttonsActive){
                value = soundButton.getAttribute("value");
                const buttonTextValues = [generatedItems[value], generatedItems[value].split(" ")];
                let buttonText = buttonTextValues[type];

                ChangeButtonState(true, 'default', [playButton, stopButton], false);
                document.querySelectorAll(".sound-btn")[value].setAttribute("style", "background-color: #0d6efd");
                buttonText = bemolToDiyez(buttonText);
                // console.log(buttonText);
                const soundPath = getSoundPath(buttonText);
                // console.log(soundPath);
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
                const btnTextValue = [buttonText, buttonText[j]];

                if(btnTextValue[type].includes(bemol[index])){
                    for (const modifier of ses) {
                        if(btnTextValue[type].includes(modifier)){
                            sesHolder = modifier;
                            break;
                        }
                    }
                    if(type == 0)
                        buttonText = btnTextValue[type].replace(btnTextValue[type], (diyez[index] + sesHolder));
                    else
                        buttonText[j] = btnTextValue[type].replace(btnTextValue[type], (diyez[index] + sesHolder));
                }           
            }
        }
        return buttonText;
    }
    // Ses yolunu döndürüyor
    function getSoundPath(notes){
        let returnValue = new Array(notes.length);

        for (let index = 0; index < type + 1; index++) {
            const notesValue = [notes, notes[index]];
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
            const soundPathValues = [soundPath, soundPath[i]];
            audioElement[i] = document.createElement("audio");
            audioElement[i].setAttribute("id", "audio" + (i + 1));
            let source = document.createElement("source");
            source.setAttribute("src", soundPathValues[type]);
            audioElement[i].appendChild(source);
            audioHolder.appendChild(audioElement[i]);
            audioElement[i].load();
            audioElement[i].play();
        }
        // let audioElement = document.createElement("audio");
        // audioElement.setAttribute("id","audio1");
        // let source = document.createElement("source");
        // source.setAttribute("src", soundPath);
        // audioElement.appendChild(source);
        // audioHolder.appendChild(audioElement);
        // audioElement.load();
        // audioElement.play();

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
                ChangeButtonState(false, 'pointer', [playButton, stopButton], false);
            }
            audioElement[0].removeEventListener("ended", onEnded);

        });
    }
    function playNextNote() {
        if(turn < 2){
            if (currentNoteIndex < allSoundBtns.length) {
                const buttonTextValues = [generatedItems[currentNoteIndex], generatedItems[currentNoteIndex].split(" ")];

                var buttonText = buttonTextValues[type];
    
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
            ChangeButtonState(false, 'pointer', [playButton]);;
        }
    }
    // Dropdown menüsünden bir seçim yapıldığında '???' ifadesi yerine seçilen nota gelecek.
    allDropdownItems.forEach(function (item) {
        item.addEventListener("click", function () {
            let itemNumber = parseInt(item.id.split("-")[0].split("radioItem")[1]);
            const noteHolderTextContent = [item.value, generatedItems[itemNumber].split(" ")[0] + " " + item.value + " - ?????"]

            noteHolders[itemNumber].textContent = noteHolderTextContent[type];
        });
    });

    // Butonların durumunu değiştiriyor
    function ChangeButtonState(boolValue, cursorStyle, buttonElement, changeSelecting){
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

        allSoundBtns.forEach(element => {
            element.style.cursor = cursorStyle;
        });
        buttonsActive = !boolValue;
    }
}