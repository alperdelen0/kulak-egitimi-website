let notalar = ["si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)"];
// Tek ses başlangıç
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
            List(0, difficulty, noteLengths, tekSesler);
            TekSesButtonManager(0, tekSesler);

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
    List(0, difficulty, noteLength, selectedNotes);
    TekSesButtonManager(0, selectedNotes);
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
// Tek ses bitiş

// Çift ses
var ciftSesAraligi;
function CreateCiftSes(ciftSesLength){
    if(ciftSesLength === null || ciftSesLength === undefined){
        localStorage.setItem("ciftSesLengthValue", 10);
        sesLength = 10;
    }
    let difficulty = "CreateCiftSes(localStorage.getItem('ciftSesLengthValue'))";
    let sesAraliklari = new Array(7);
    
    let sesAraligi = "minor2, major2, minor3, major3, tam4, artmis4, tam5".split(", ");
    sesAraliklari[0] = "do reb, do# re, re mib, re# mi, mi fa, fa solb, fa# sol, sol lab, sol# la, la sib, la# si, si do(ince)".split(", ");
    sesAraliklari[1] = "do re, re mi, mib fa, mi fa#, fa sol, sol la, la si, sib do(ince), si do#(ince)".split(", ");
    sesAraliklari[2] = "do mib, do# mi, re fa, mi sol, fa lab, fa# la, sol sib, sol# si, la do(ince), si re(ince)".split(", ");
    sesAraliklari[3] = "do mi, reb fa, re fa#, mib sol, mi sol#, fa la, sol si, lab do(ince), la do#(ince), sib re(ince), si re#(ince)".split(", ");
    sesAraliklari[4] = "do fa, re sol, mi la, fa sib, fa# si, sol do(ince), la re(ince), si mi(ince)".split(", ");
    sesAraliklari[5] = "do fa#, reb sol, re sol#, mib la, mi la#, fa si, solb do(ince), sol do#(ince), lab re(ince), sib mi(ince)".split(", ");
    sesAraliklari[6] = "do sol, re la, mi si, fa do(ince), sol re(ince), la mi(ince), sib fa, si fa#".split(", ");

    let notalar =
        "fa#(kalın), sol(kalın), sol#(kalın), la(kalın), sib(kalın), si(kalın), do, do#, re, re#, mi, fa, fa#, sol, sol#, la, la#, si, do(ince), do#(ince), re(ince), re#(ince), mi(ince)".split(", ");

    let ayniNotalar = new Array(2);
    ayniNotalar[0] = "do#, re#, fa#, sol#, la#, do#(ince), re#(ince)".split(", ");
    ayniNotalar[1] = "reb, mib, solb, lab, sib, reb(ince), mib(ince)".split(", ");

    let ciftSesler;
    let limit;

    SetSesAraligi();

    // Önce her ses aralıklığının kaç tane olduğunu belirle.
    function SetSesAraligi(){
        ciftSesler = new Array(ciftSesLength);
        ciftSesAraligi = new Array(ciftSesLength);
        limit = new Array(7);

        for (let i = 0; i < limit.length; i++) {
            limit[i] = Math.floor(ciftSesLength / limit.length);
        }

        let fazlalik = ciftSesLength % limit.length;

        while (fazlalik !== 0) {
            let randomLimit = Math.floor(Math.random() * limit.length);
    
            if (limit[randomLimit] === Math.floor(ciftSesLength / limit.length)) {
                limit[randomLimit]++;
                fazlalik--;
            }
        }

        for (let i = 0; i < limit.length; i++) {
            console.log(limit[i]);          
        }

        Assignment();
    }

    function Returner(i){
        let selectedAralik = -1;
        let selectedNote = -1;
        
        // Belirlenmiş olan ses aralıklarından rastgele 1 tane seç
        function SelectAralik(){
            let randomAralik;
            let aralikCheck;
    
            let retryCount = 0;
            const maxRetry = 100;
    
            let pass = true;

            let aralikBucket = new Array(sesAraligi.length);

            for (let j = 0; j < sesAraligi.length; j++) {
                aralikBucket[j] = sesAraligi[j];
            }

            do {
                if(aralikBucket.length === 0){
                    pass = false;
                    break;
                }
                aralikCheck = false;
                randomAralik = Math.floor(Math.random() * aralikBucket.length);
    
                if (limit[randomAralik] <= 0)
                    aralikCheck = true;
                else if (i > 0 && ciftSesAraligi[i - 1] === aralikBucket[randomAralik]/* && i <= Math.floor((gSeslerLength / limit.length) * sesAraligi.length)*/)
                    aralikCheck = true;
                aralikBucket.splice(randomAralik, 1);
            } while (aralikCheck);
    
            if(pass){
                SelectNotaByAralik(randomAralik);
            }
            else{
                console.log("keke")
                SetSesAraligi();
            }
            }

        // Ses aralığından rastgele nota seç
        function SelectNotaByAralik(randomAralik){
            let randomNota;
            let notaCheck;
    
            let retryCount = 0;
            const maxRetry = 100;
    
            pass = true;

            let notalarBucket = new Array(sesAraliklari[randomAralik].length);

            for (let j = 0; j < sesAraliklari[randomAralik].length; j++) {
                notalarBucket[j] = sesAraliklari[randomAralik][j];
            }
            do {
                if(notalarBucket.length === 0){
                    pass = false;
                    break;
                }
                notaCheck = false;
                randomNota = Math.floor(Math.random() * notalarBucket.length);

                for (let k = 0; k < ciftSesler.length; k++) {
                    if (ciftSesler[k] == notalarBucket[randomNota]) {
                        notaCheck = true;
                        break;
                    }
                }
                
                if (i > 0) {
                    let lastNota = ciftSesler[i - 1].toLowerCase().split(" ");
                    let nota = sesAraliklari[randomAralik][randomNota].toLowerCase().split(" ");
                    
                    for (let j = 0; j < 2; j++) {
                        for (let l = 0; l < ayniNotalar[1].length; l++) {
                            if (lastNota[j] == ayniNotalar[1][l]) {
                                lastNota[j] = ayniNotalar[0][l];
                            }
                            if (nota[j] == ayniNotalar[1][l]) {
                                nota[j] = ayniNotalar[0][l];
                            }
                        }
                    }

                    for (let j = 0; j < 2; j++) {
                        for (let k = 0; k < 2; k++) {
                            if (lastNota[j] == nota[k] || nota[j] == lastNota[k]) {
                                notaCheck = true;
                            }
                        }
                    }
    
                    for (let j = 0; j < nota.length; j++) {
                        for (let k = 0; k < notalar.length; k++) {
                            if(nota[j] == notalar[k]){
                                for (let l = 0; l < lastNota.length; l++) {
                                    if (k == 0)
                                    {
                                        if (lastNota[l] == notalar[k + 1])
                                        {
                                            notaCheck = true;
                                        
                                        }
                                    }
                                    else if (k == notalar.Length - 1)
                                    {
                                        if (lastNota[l] == notalar[k - 1])
                                        {
                                            notaCheck = true;
                                        
                                        }
                                    }
                                    else
                                    {
                                        if (lastNota[l] == notalar[k - 1] || lastNota[l] == notalar[k + 1])
                                        {
                                            notaCheck = true;
                                        }
                                    }                              
                                }
                            }
                        }
                        
                    }
                }
                notalarBucket.splice(randomNota, 1);
            } while (notaCheck);
    
            if(pass){
                ciftSesAraligi[i] = sesAraligi[randomAralik];
                limit[randomAralik]--;
                selectedAralik = randomAralik;
                selectedNote = randomNota;
            }
            else{
                SelectAralik();
            }
            }
        SelectAralik();
        if(selectedAralik === -1 || selectedNote === -1){
            return -1;
        }
        else{
            return sesAraliklari[selectedAralik][selectedNote];
        }

    }

    function Assignment(){
        console.clear();

        for (let i = 0; i < ciftSesLength; i++) {
            let returnHolder = Returner(i);

            if(returnHolder === -1){
                break;
            }
            else{
                ciftSesler[i] = returnHolder;
            }

            console.log((i+1) + ". " + ciftSesler[i] + "\t" + ciftSesAraligi[i]);

        }
        List(1, difficulty, ciftSesLength, ciftSesler);
        TekSesButtonManager(1, ciftSesler);
        //CreateHtmlUI(ciftSesLength, ciftSesler);
        //playCiftSesNotesWithRetry(ciftSesler, ciftSesAraligi, true);
    }
}
function generateNotesByValue(value) {
    localStorage.setItem("ciftSesLengthValue", value);
    console.log(localStorage.getItem("ciftSesLengthValue"));
}
// Çift ses bitiş

// Genel
function List(type, difficulty, itemLength, generatedItem) {
    const contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";

    const h1Div = document.createElement("div");
    h1Div.classList.add("container", "p-3");

    // H1 başlığı ekleniyor
    const h1Element = document.createElement("h1");
    h1ElementTextContents = ["Tek Sesler", "Çift Sesler", "Akorlar", "Melodiler"];
    h1Element.textContent = h1ElementTextContents[type];
    h1Div.appendChild(h1Element);

    const rowContainer = document.createElement("div");
    rowContainer.classList.add("container");

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.classList.add("justify-content-md-center");

    switch (type) {
        case 0:
            // 3 Sütunlü bir div oluşturuluyor
            for (let column = 0; column < 3; column++) {
                const noteList = CreateNewUl(column * 10 + 1, (column + 1) * 10, type, generatedItem);
                rowDiv.appendChild(noteList);
            }
            break;
        case 1:
            const noteList = CreateNewUl(1, itemLength, type, generatedItem);
            rowDiv.appendChild(noteList);
            break;

        default:
            break;
    }


    const scoreH1Element = document.createElement("h1");
    scoreH1Element.setAttribute("id","score");
    
    rowContainer.appendChild(rowDiv);
    rowContainer.appendChild(scoreH1Element);

    const imageHTMLClassHolder = ["bi-play-circle", "bi-pause-circle", "bi-eye", "bi-gear-fill", "bi-arrow-clockwise", "bi-arrow-right-square"];
    const butonNames = ["Oynat", "Durdur", "Göster", ["Zorluk Değiştir", "Uzunluk Değiştir"], "Yeniden Oluştur", "Yanıtla"];
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
                if(imageCounter == 3)
                    button.innerHTML += " " + butonNames[imageCounter][type];
                else
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
function CreateNewUl(start, end, type, generatedItem) {
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

        const innerTextValues = ["???", `${generatedItem[i - 1].split(" ")[0]}` + " ??? - ?????"];
        listItem3Paragraph.innerText = innerTextValues[type];

        listItem3.appendChild(listItem3Paragraph);
    
        noteList.appendChild(listItem1);
        noteList.appendChild(listItem2);
        noteList.appendChild(listItem3);

        colDiv.appendChild(noteList);
    }
    return colDiv;
}