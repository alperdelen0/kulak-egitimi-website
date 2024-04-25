let buttonsActive = true;

function TekSesButtonManager(generatedItems){

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
            ChangeButtonState(true, 'default', [playButton]);
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
        let buttonTexts = [" Gizle"," Göster"];
        let buttonImage = ["bi-eye-slash", "bi-eye"];

        if(hidden){
            buttonTexts = [" Göster"," Gizle"]
            buttonImage = ["bi-eye", "bi-eye-slash"];
            for (let index = 0; index < generatedItems.length; index++) {
                noteHolders[index].textContent = generatedItems[index];     
            }
        }
        else{
            for (let index = 0; index < generatedItems.length; index++) {
                const radioItem = document.querySelector(`input[name="radioItem${index}"]:checked`);
                let textValue;
                if(radioItem != null){
                    textValue = radioItem.value;         
                }
                else{
                    textValue = "???";         
                }
                noteHolders[index].textContent = textValue;
            }
        }
        showAndHideButton.childNodes.item(0).classList.replace(buttonImage[0], buttonImage[1]);
        showAndHideButton.innerHTML = showAndHideButton.innerHTML.replace(buttonTexts[0], buttonTexts[1]);

        hidden = !hidden;
        
    }
    function submitNotes(){
        let sesArrayHolder = generatedItems;
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
            sesArrayHolder[i] = bemolToDiyez(sesArrayHolder[i]);
            secilenArrayHolder[i] = noteHolders[i].textContent;
        }

        let dogru = 0;
        let yanlis = 0;

        for (let i = 0; i < secilenArrayHolder.length; i++) {
            const diyez = ["do#","re#","fa#","sol#","la#"];
            const bemol = ["reb","mib","solb","lab","sib"];
            const ses = ["(ince)", "(kalın)"];
            let sesHolder = "";

            for (let index = 0; index < bemol.length; index++) {
                if(secilenArrayHolder[i].includes(bemol[index])){
                    for (const modifier of ses) {
                        if(secilenArrayHolder[i].includes(modifier)){
                            sesHolder = modifier;
                            break;
                        }
                    }
                    secilenArrayHolder[i] = secilenArrayHolder[i].replace(secilenArrayHolder[i], (diyez[index] + sesHolder));
                }
            }

            if(secilenArrayHolder[i] == sesArrayHolder[i]){
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
                let buttonText = generatedItems[soundButton.getAttribute("value")];
                value = soundButton.getAttribute("value");

                ChangeButtonState(true, 'default', [playButton, stopButton]);
                document.querySelectorAll(".sound-btn")[value].setAttribute("style", "background-color: #0d6efd");

                buttonText = bemolToDiyez(buttonText);
                
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
        for (let index = 0; index < bemol.length; index++) {
            if(buttonText.includes(bemol[index])){
                buttonText = buttonText.replace(bemol[index], diyez[index]);
            }        
        }
        return buttonText;
    }
    // Ses yolunu döndürüyor
    function getSoundPath(notes){     
        let returnValue;

        if(notes.includes("#")){
            notes = notes.replace("#","_diyez");
        }
        returnValue = `${audioPath}/${notes}.mp3`;

        return returnValue;   
    }
    // Ses yolunu audioHolder'a <audio> ekleyip sesi çalıyor. Ses bittiğinde audioHolder içi temizleniyor.
    function playSoundPath(soundPath, allSounds, noteIndex){
        allSoundBtns[noteIndex].setAttribute("style", "background-color: #0d6efd;");
        allSoundBtns[noteIndex].style.cursor = 'default';

        audioHolder.innerHTML = '';

        let audioElement = document.createElement("audio");
        audioElement.setAttribute("id","audio1");
        let source = document.createElement("source");
        source.setAttribute("src", soundPath);
        audioElement.appendChild(source);
        audioHolder.appendChild(audioElement);
        audioElement.load();
        audioElement.play();

        audioElement.addEventListener("ended", function onEnded() {
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
                ChangeButtonState(false, 'pointer', [playButton, stopButton]);
            }
            audioElement.removeEventListener("ended", onEnded);

        });
    }
    function playNextNote() {
        if(turn < 2){
            if (currentNoteIndex < allSoundBtns.length) {
                var buttonText = generatedItems[currentNoteIndex];
    
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
            noteHolders[itemNumber].textContent = item.value;
        });
    });

    // Butonların durumunu değiştiriyor
    function ChangeButtonState(boolValue, cursorStyle, buttonElement){
        for (let i = 0; i < buttonElement.length; i++) {
            if(buttonElement[i]){
                buttonElement[i].disabled = boolValue;
                buttonElement[i].style.cursor = cursorStyle;
                buttonElement[i].classList.toggle("disabledButton", boolValue);
            }
        }

        allSoundBtns.forEach(element => {
            element.style.cursor = cursorStyle;
        });
        buttonsActive = !boolValue;
    }
}