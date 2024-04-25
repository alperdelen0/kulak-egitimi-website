let notalar = ["si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)"];

function NormalTekSesGenerator(){
    let difficulty = "NormalTekSesGenerator()";
    let noteLengths = 30;

    let tekSesler;
    let tekSeslerIndex;

    let notalarIndex;

    function CreateNotaIndexs(){
        tekSesler = null;
        tekSeslerIndex = null;

        notalarIndex = null;

        tekSesler = new Array(noteLengths);
        tekSeslerIndex = new Array(noteLengths);

        notalarIndex = new Array(notalar.length);

        let notSayiHolder = noteLengths;

        for (let i = 0; i < notalarIndex.length; i++) {
            notalarIndex[i] = 1;
            notSayiHolder -= 1;
        }

        do {
            let randomHolder = Math.floor(Math.random() * notalar.length);
            if (notalarIndex[randomHolder] < 2) {
    
                notalarIndex[randomHolder]++;
                notSayiHolder--;
            }
        } while (notSayiHolder !== 0);

        for (let i = 0; i < notalarIndex.length; i++) {
            console.log([i] + ".-" + notalarIndex[i] + "-");         
        }
        let isAllOk = CreateNota();
        if(isAllOk){
            QuickFix(tekSesler);
            List(difficulty);
            TekSesButtonManager(tekSesler);

            //playTekSesNotesWithRetry(tekSesler);
        }
        else{
            CreateNotaIndexs();
        }

    }

    function CreateNota(){
        let pass = true;

        let randomNota = Math.floor(Math.random() * notalar.length);
        tekSesler[0] = notalar[randomNota];
        tekSeslerIndex[0] = randomNota;
        notalarIndex[randomNota]--;

        console.log("1. " + tekSesler[0]);

        for (let i = 1; i < tekSesler.length; i++) {
            let lastNota = tekSesler[i - 1];
            let lastNotaIndex = notalar.indexOf(lastNota);
    
            let check = true;
            const maxRetry = 100;
            let retryCount = 0;
            do {
                if(retryCount === maxRetry){
                    pass = false;
                    break;
                }
                retryCount++;
                randomNota = Math.floor(Math.random() * notalar.length);
                check = false;
    
                if (notalarIndex[randomNota] === 0) {
                    check = true;
                } else if (notalar[randomNota] === lastNota) {
                    check = true;
                }

                  if (Math.abs(randomNota - lastNotaIndex) === 1 || Math.abs(randomNota - lastNotaIndex) === 2) {
                    check = true;
                } else if (i > 3 && (tekSesler[i - 4] === notalar[randomNota] || tekSesler[i - 3] === notalar[randomNota] || tekSesler[i - 2] === notalar[randomNota])) {
                    check = true;
                }

            } while (check);

            tekSesler[i] = notalar[randomNota];
            tekSeslerIndex[i] = randomNota;
            notalarIndex[randomNota]--;
            console.log((i + 1) + ". " + tekSesler[i]);

        }
        return pass;
    }


    CreateNotaIndexs();

}

function EasyTekSesGenerator(){
    let difficulty = "EasyTekSesGenerator()";
    let tekSesler = new Array(29);
    let noteLength = 30;

    let selectedNotes = [];
    let selectedIndex = [];
    let currentIndex = 0;

function selectSes() {
    let randomIndex;
    let randomPass1;
    if(currentIndex < noteLength){
        do {
            randomPass1 = false;
            randomIndex = Math.floor(Math.random() * tekSesler.length);
            for (let item of selectedIndex) {
                if(randomIndex === item){
                    randomPass1 = true;
                }
            }
            
        } while(randomPass1);
        selectedIndex[currentIndex] = randomIndex;

        console.log("----" + randomIndex + "---")
        for (let i = 0; i < tekSesler[randomIndex].length - 1; i++) {
            if(currentIndex < noteLength){
                selectedNotes[currentIndex] = tekSesler[randomIndex][i];
                console.log((currentIndex + 1) + ". " + selectedNotes[currentIndex]);
                currentIndex++;
            }
            
        }
        selectSes();
    }
    List(difficulty);
    TekSesButtonManager(selectedNotes);
    //playTekSesNotesWithRetry(selectedNotes);
}
function CreateTekSesEasy(){
    tekSesler[0] = ("do-mi-sol-la").split("-");
    tekSesler[1] = ("la-fa-re-si(kalın)-si").split("-");
    tekSesler[2] = ("do(ince)-re(ince)-la").split("-");
    tekSesler[3] = ("la-fa-re-si(kalın)-do").split("-");
    tekSesler[4] = ("do-sol-la").split("-");
    tekSesler[5] = ("la-mi-re-la").split("-");
    tekSesler[6] = ("la-sol#-si-re-do").split("-");
    tekSesler[7] = ("do-mi-sol-fa#-la").split("-");
    tekSesler[8] = ("la-re-do").split("-");
    tekSesler[9] = ("do-fa-sol-mi-re#-mi-la").split("-");
    tekSesler[10] = ("la-fa#-sol-do(ince)").split("-");
    tekSesler[11] = ("la-sol#-si-la").split("-");
    tekSesler[12] = ("la-fa#-sol-re-si-mi-re#-mi-la").split("-");
    tekSesler[13] = ("la-sib-la").split("-");
    tekSesler[14] = ("la-fa-re-do#-mi-re-sol-do(ince)").split("-");
    tekSesler[15] = ("do(ince)-si-mi-re#-si(kalın)-do").split("-");
    tekSesler[16] = ("do-re-mib-re-la").split("-");
    tekSesler[17] = ("la-sol#-la").split("-");
    tekSesler[18] = ("la-mi-do").split("-");
    tekSesler[19] = ("do-fa-la").split("-");
    tekSesler[20] = ("la-sib-sol#-la").split("-");
    tekSesler[21] = ("la-do(ince)").split("-");
    tekSesler[22] = ("do(ince)-si-re(ince)-re-do").split("-");
    tekSesler[23] = ("do-mib-re-la").split("-");
    tekSesler[24] = ("la-fa#-si-mi-re#-mi-do").split("-");
    tekSesler[25] = ("do-re-mi-re-do#-re-la").split("-");
    tekSesler[26] = ("la-fa-si(kalın)-do").split("-");
    tekSesler[27] = ("do-mi-re-do#-mi-re-sol-fa#-sol-mi-do(ince)").split("-");
    tekSesler[28] = ("do(ince)-si-la#-si(kalın)").split("-");

    selectSes();
    
}

CreateTekSesEasy();
}

function QuickFix(tekSesler){
    for (let i = 0; i < tekSesler.length; i++) {
        if(tekSesler[i].includes("/")){
            tekSesler[i] = tekSesler[i].split("/")[Math.floor(Math.random() * 2)];
        }
    }
}

function List(difficulty) {
    const contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";

    const h1Div = document.createElement("div");
    h1Div.classList.add("container", "p-3");

    // H1 başlığı ekleniyor
    const h1Element = document.createElement("h1");
    h1Element.textContent = "Tek Sesler";
    h1Div.appendChild(h1Element);

    const rowContainer = document.createElement("div");
    rowContainer.classList.add("container");

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.classList.add("justify-content-md-center");

    // 3 Sütunlü bir div oluşturuluyor
    for (let column = 0; column < 3; column++) {
        const noteList = CreateNewUl(column * 10 + 1, (column + 1) * 10);
        rowDiv.appendChild(noteList);
    }
    const scoreH1Element = document.createElement("h1");
    scoreH1Element.setAttribute("id","score");
    
    rowContainer.appendChild(rowDiv);
    rowContainer.appendChild(scoreH1Element);

    const imageHTMLClassHolder = ["bi-play-circle", "bi-pause-circle", "bi-eye", "bi-gear-fill", "bi-arrow-clockwise", "bi-arrow-right-square"];
    const butonNames = ["Oynat", "Durdur", "Göster", "Zorluğu Değiştir", "Yeniden Oluştur", "Yanıtla"];
    const butonIDs = ["playButton", "stopButton", "showAndHideButton", "changeDiffButton", "createAgainButton", "answerButton"];
    const colBreakPoint = ["12", "6", "4"];
    let imageCounter = 0;
    for (let i = 3; i > 0; i--) {
        const buttonGroupDiv = document.createElement("div");
        buttonGroupDiv.classList.add("row", "justify-content-md-center", "py-2");

        for (let j = 0; j < i; j++) {
            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("col", ("col-" + colBreakPoint[i - 1]), "col-md-auto");
            
            const button = document.createElement("button");
            button.classList.add("btn", "btn-primary", "rounded-pill", "border");
            button.setAttribute("type", "button");
            button.setAttribute("id", butonIDs[imageCounter]);
            button.setAttribute("style", "background-color: #525CEB;");

            const buttonIcon = document.createElement("i");
            buttonIcon.classList.add("bi", imageHTMLClassHolder[imageCounter]);
            if(imageCounter == 4){
                button.setAttribute("onclick", difficulty);
            }
            if(imageCounter == 5){
                button.innerHTML += butonNames[imageCounter] + " ";
                button.appendChild(buttonIcon);
            }
            else{
                button.appendChild(buttonIcon);
                button.innerHTML += " " + butonNames[imageCounter];
            }
            imageCounter++;

            buttonDiv.appendChild(button);
            buttonGroupDiv.appendChild(buttonDiv);
        }
        rowContainer.appendChild(buttonGroupDiv);
    }

    contentContainer.appendChild(h1Div);
    contentContainer.appendChild(rowContainer);


}

// Belirli bir başlangıç ve bitiş numarasına sahip yeni bir ul oluşturan yardımcı fonksiyon
function CreateNewUl(start, end) {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col", "col-12", "col-md-auto", "text-start");
    
    for (let i = start; i <= end; i++) {
        const noteList = document.createElement("ul");
        noteList.classList.add("item");
        noteList.classList.add("list-inline");
    
        const listItem1 = document.createElement("li");
        listItem1.classList.add("list-inline-item", "me-1");
    
        const listItem1Button = document.createElement("button");
        listItem1Button.classList.add("btn", "btn-secondary", "btn-sm", "rounded-circle", "sound-btn");
        listItem1Button.setAttribute("value", i - 1);
        listItem1Button.setAttribute("type", "button");
        listItem1Button.setAttribute("title", "Dinle");
        listItem1Button.setAttribute("style", "background-color: #3D3B40;");
    
        const listItem1ButtonIcon = document.createElement("i");
        listItem1ButtonIcon.classList.add("bi", "bi-volume-up-fill");
    
        listItem1Button.appendChild(listItem1ButtonIcon);
        listItem1.appendChild(listItem1Button);
    
        const listItem2 = document.createElement("li");
        listItem2.classList.add("list-inline-item", "me-1");
    
        const listItem2Dropdown = document.createElement("div");
        listItem2Dropdown.classList.add("dropdown");
    
        const listItem2DropdownButton = document.createElement("button");
        listItem2DropdownButton.classList.add("btn", "btn-secondary", "dropdown-toggle", "btn-sm", "rounded-pill");
        listItem2DropdownButton.setAttribute("type", "button");
        listItem2DropdownButton.setAttribute("title", "Nota-Seçimi");
        listItem2DropdownButton.setAttribute("data-bs-toggle", "dropdown");
        listItem2DropdownButton.setAttribute("aria-expanded", "false");
        listItem2DropdownButton.setAttribute("style", "background-color: #3D3B40;");
    
        const listItem2DropdownButtonIcon = document.createElement("i");
        listItem2DropdownButtonIcon.classList.add("bi", "bi-music-note-list");
    
        const listItem2DropdownMenu = document.createElement("ul");
        listItem2DropdownMenu.classList.add("dropdown-menu", "dropdown-menu-dark");
        listItem2DropdownMenu.setAttribute("style", "width: 200px;");
    
        listItem2DropdownButton.appendChild(listItem2DropdownButtonIcon);
        listItem2Dropdown.appendChild(listItem2DropdownButton);
    
        for (let j = 0; j < notalar.length; j++) {
            const dropdownMenuItem = document.createElement("li");
            dropdownMenuItem.classList.add("form-check", "mx-2");
    
            const itemInput = document.createElement("input");
            itemInput.classList.add("form-check-input", "dropdownMenu-item");
            itemInput.setAttribute("type", "radio");
            itemInput.setAttribute("placeholder", "none");
            itemInput.setAttribute("name", ("radioItem" + (i - 1)));
            itemInput.setAttribute("id", "radioItem" + (i - 1) + "-" + j);
            itemInput.setAttribute("value", notalar[j]);
    
            const itemLabel = document.createElement("label");
            itemLabel.classList.add("form-check-label");
            itemLabel.setAttribute("for", ("radioItem" + (i - 1)));
            itemLabel.innerText = notalar[j];
    
            dropdownMenuItem.appendChild(itemInput);
            dropdownMenuItem.appendChild(itemLabel);
            listItem2DropdownMenu.appendChild(dropdownMenuItem);
        }
    
        listItem2Dropdown.appendChild(listItem2DropdownMenu);
        listItem2.appendChild(listItem2Dropdown);
    
    
        const listItem3 = document.createElement("li");
        listItem3.classList.add("list-inline-item");
    
        const listItem3Paragraph = document.createElement("p");
        listItem3Paragraph.classList.add("noteHolder");
        listItem3Paragraph.innerText = "???";
    
        listItem3.appendChild(listItem3Paragraph);
    
        noteList.appendChild(listItem1);
        noteList.appendChild(listItem2);
        noteList.appendChild(listItem3);

        colDiv.appendChild(noteList);
    }
    return colDiv;
}