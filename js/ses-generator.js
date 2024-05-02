localStorage.setItem("lengthValue", 10);
let notalar = ["fa#(kalın)/solb(kalın)", "sol(kalın)", "sol#(kalın)/lab(kalın)", "la(kalın)", "la#(kalın)/sib(kalın)", "si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)", "fa(ince)", "fa#(ince)/solb(ince)", "sol(ince)"];
let ciftSesAraliklari = "minör2, majör2, minör3, majör3, tam4, artmış4, tam5, minör6, majör6, minör7, majör7".split(", ");

// Tek ses başlangıç
function NormalTekSesGenerator(diff){
    notalar = ["si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)"];
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
            List(0, difficulty, noteLengths, tekSesler, diff);
            ButtonManager(0, tekSesler);

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

function EasyTekSesGenerator(diff){
    console.log(diff);
    notalar = ["si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)"];
    let difficulty = `EasyTekSesGenerator('${diff}')`;
    let tekSesler = new Array;
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
    List(0, difficulty, noteLength, selectedNotes, diff);
    ButtonManager(0, selectedNotes);
    //playTekSesNotesWithRetry(selectedNotes);
}
function CreateTekSesEasy(diff){
    switch (diff) {
        case "Kolay":
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
            break;
        case "veryEasy":
            tekSesler[0] = ("do-re-mi-do-re-fa-mi-re-do-si(kalın)").split("-");
            tekSesler[1] = ("do-re-fa-mi-fa-re-do-re-mi-do-fa-si(kalın)-mi-re").split("-");

            tekSesler[2] = ("do-re-mi-re-do-sol-fa-sol-mi-fa-sol-mi-re-do-si(kalın)").split("-");
            tekSesler[3] = ("do-mi-sol-fa-re-sol-si(kalın)-mi-re-do-sol-fa-sol-mi").split("-");

            tekSesler[4] = ("do-si(kalın)-do-re-mi-fa-sol-la-sol-la-fa-re-mi-sol-la-mi-re").split("-");
            tekSesler[5] = ("do-la-sol-mi-do-si(kalın)-do-mi-re-la-sol-fa-sol-mi").split("-");

            tekSesler[6] = ("do-si(kalın)-do-mi-la-sol-la-sol-fa-sol-la-fa-re-si(kalın)").split("-");
            tekSesler[7] = ("do-la-fa-re-mi-do-re-mi-fa-la-sol-mi-do-si(kalın)-re-mi-sol").split("-");

            tekSesler[8] = ("do-re-mi-fa-sol-la-si-la-si-do(ince)-si-la-si-do(ince)-sol-mi-fa-re-la-sol-do(ince)-re(ince)-si-do(ince)-sol-la-fa-re-si(kalın)-mi-re").split("-");
            
            tekSesler[9] = ("do-mi-do-fa-la-sol-mi-fa-re-do(ince)-re(ince)-si-do(ince)-la-fa-re-mi").split("-");
            tekSesler[10] = ("do-sol-la-fa-si-do(ince)-si(kalın)-do-mi-sol-do(ince)-la-fa-re-mi").split("-");

            tekSesler[11] = ("do-sol-mi-la-si-do(ince)-la-fa-re-sol-si(kalın)-mi-re-mi-sol-do(ince)-la-si-sol-fa-re-mi-re").split("-");
            tekSesler[12] = ("do-si(kalın)-do-re-la-sol-si-re(ince)-do(ince)-la-fa-re-si-do(ince)-mi-fa-re-mi").split("-");

            tekSesler[13] = ("do-si(kalın)-mi-re-sol-si-do(ince)").split("-");
            break;
        default:
            break;
    }


    selectSes();
    
}

CreateTekSesEasy(diff);
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
function CreateCiftSes(ciftSesLength, diff){
    // notalar = ["si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)"];

    let bypass = false;
    if(ciftSesLength === null || ciftSesLength === undefined){
        localStorage.setItem("lengthValue", 10);
    }
    let difficulty = `CreateCiftSes(localStorage.getItem('lengthValue'), '${diff}')`;
    var sesAraliklari = new Array;
    let aralikHolder = new Array;
    let aralikIndexs = new Array;

    aralikHolder[0] = "do reb, do# re, re mib, re# mi, mi fa, fa solb, fa# sol, sol lab, sol# la, la sib, la# si, si do(ince)".split(", "); // minör 2
    aralikHolder[1] = "do re, re mi, mib fa, mi fa#, fa sol, sol la, la si, sib do(ince), si do#(ince)".split(", "); // majör 2
    aralikHolder[2] = "do mib, do# mi, re fa, mi sol, fa lab, fa# la, sol sib, sol# si, la do(ince), si re(ince)".split(", "); // minör 3
    aralikHolder[3] = "do mi, reb fa, re fa#, mib sol, mi sol#, fa la, sol si, lab do(ince), la do#(ince), sib re(ince), si re#(ince)".split(", "); // majör 3
    aralikHolder[4] = "do fa, re sol, mi la, fa sib, fa# si, sol do(ince), la re(ince), si mi(ince)".split(", "); // tam4
    aralikHolder[5] = "do fa#, reb sol, re sol#, mib la, mi la#, fa si, solb do(ince), sol do#(ince), lab re(ince), sib mi(ince)".split(", "); // artmış 4
    aralikHolder[6] = "do sol, re la, mi si, fa do(ince), sol re(ince), la mi(ince), sib(kalın) fa, si(kalın) fa#".split(", "); // tam5
    aralikHolder[7] = "do lab, do# la, re sib, re# si, mi do(ince), fa reb(ince), fa# re(ince), sol mib(ince), sol# mi(ince), la(kalın) fa, si(kalın) sol".split(", "); // minör 6
    aralikHolder[8] = "do la, re si, mib do(ince), mi do#(ince), fa re(ince), sol mi(ince), lab(kalın) fa, la(kalın) fa#, sib(kalın) sol, si(kalın) sol#".split(", "); // majör 6
    aralikHolder[9] = "do sib, do# si, re do(ince), mi re(ince), fa mib(ince), fa# mi(ince), sol(kalın) fa, la(kalın) sol, si(kalın) la, si(kalın) la#".split(", "); // minör 7
    aralikHolder[10] = "do si, reb do(ince), re do#(ince), mib re(ince), mi re#(ince), fa mi(ince), solb(kalın) fa, sol(kalın) fa#, lab(kalın) sol, la(kalın) sol#, sib(kalın) la".split(", "); // majör 7

    let ayniNotalar = new Array(2);
    ayniNotalar[0] = "fa#(kalın), sol#(kalın), la#(kalın), do#, re#, fa#, sol#, la#, do#(ince), re#(ince)".split(", ");
    ayniNotalar[1] = "solb(kalın), lab(kalın), sib(kalın), reb, mib, solb, lab, sib, reb(ince), mib(ince)".split(", ");

    switch (diff) {
        case 'Kolay':
            aralikIndexs = [0, 1, 2, 3, 4, 6];
            // sesAraliklari[0] = "do reb, do# re, re mib, re# mi, mi fa, fa solb, fa# sol, sol lab, sol# la, la sib, la# si, si do(ince)".split(", "); // minör 2
            // sesAraliklari[1] = "do re, re mi, mib fa, mi fa#, fa sol, sol la, la si, sib do(ince), si do#(ince)".split(", "); // majör 2
            // sesAraliklari[2] = "do mib, do# mi, re fa, mi sol, fa lab, fa# la, sol sib, sol# si, la do(ince), si re(ince)".split(", "); // minör 3
            // sesAraliklari[3] = "do mi, reb fa, re fa#, mib sol, mi sol#, fa la, sol si, lab do(ince), la do#(ince), sib re(ince), si re#(ince)".split(", "); // majör 3
            // sesAraliklari[4] = "do fa, re sol, mi la, fa sib, fa# si, sol do(ince), la re(ince), si mi(ince)".split(", "); // tam4
            // sesAraliklari[5] = "do sol, re la, mi si, fa do(ince), sol re(ince), la mi(ince), sib(kalın) fa, si(kalın) fa#".split(", "); // tam5

            ayniNotalar[0] = "la#(kalın), do#, re#, fa#, sol#, la#, do#(ince), re#(ince)".split(", ");
            ayniNotalar[1] = "sib(kalın), reb, mib, solb, lab, sib, reb(ince), mib(ince)".split(", ");

            notalar = ["la#(kalın)/sib(kalın)", "si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)"];
            ciftSesAraliklari = "minör2, majör2, minör3, majör3, tam4, tam5".split(", ");
            break;
        case 'Normal':
            // sesAraliklari[0] = "do reb, do# re, re mib, re# mi, mi fa, fa solb, fa# sol, sol lab, sol# la, la sib, la# si, si do(ince)".split(", "); // minör 2
            // sesAraliklari[1] = "do re, re mi, mib fa, mi fa#, fa sol, sol la, la si, sib do(ince), si do#(ince)".split(", "); // majör 2
            // sesAraliklari[2] = "do mib, do# mi, re fa, mi sol, fa lab, fa# la, sol sib, sol# si, la do(ince), si re(ince)".split(", "); // minör 3
            // sesAraliklari[3] = "do mi, reb fa, re fa#, mib sol, mi sol#, fa la, sol si, lab do(ince), la do#(ince), sib re(ince), si re#(ince)".split(", "); // majör 3
            // sesAraliklari[4] = "do fa, re sol, mi la, fa sib, fa# si, sol do(ince), la re(ince), si mi(ince)".split(", "); // tam4
            // sesAraliklari[5] = "do fa#, reb sol, re sol#, mib la, mi la#, fa si, solb do(ince), sol do#(ince), lab re(ince), sib mi(ince)".split(", "); // artmış 4
            // sesAraliklari[6] = "do sol, re la, mi si, fa do(ince), sol re(ince), la mi(ince), sib(kalın) fa, si(kalın) fa#".split(", "); // tam5

            // ayniNotalar[0] = "la#(kalın), do#, re#, fa#, sol#, la#, do#(ince), re#(ince)".split(", ");
            // ayniNotalar[1] = "sib(kalın), reb, mib, solb, lab, sib, reb(ince), mib(ince)".split(", ");
            aralikIndexs = [0, 1, 2, 3, 4, 5, 6];

            notalar = ["la#(kalın)/sib(kalın)", "si(kalın)", "do", "do#/reb", "re", "re#/mib", "mi", "fa", "fa#/solb", "sol", "sol#/lab", "la", "la#/sib", "si", "do(ince)", "do#(ince)/reb(ince)", "re(ince)", "re#(ince)/mib(ince)", "mi(ince)"];
            ciftSesAraliklari = "minör2, majör2, minör3, majör3, tam4, artmış4, tam5".split(", ");
            break;
        case 'Zor':
            // sesAraliklari[0] = "do reb, do# re, re mib, re# mi, mi fa, fa solb, fa# sol, sol lab, sol# la, la sib, la# si, si do(ince)".split(", ");// minör 2
            // sesAraliklari[1] = "do re, re mi, mib fa, mi fa#, fa sol, sol la, la si, sib do(ince), si do#(ince)".split(", ");// majör 2
            // sesAraliklari[2] = "do mib, do# mi, re fa, mi sol, fa lab, fa# la, sol sib, sol# si, la do(ince), si re(ince)".split(", "); // minör 3
            // sesAraliklari[3] = "do mi, reb fa, re fa#, mib sol, mi sol#, fa la, sol si, lab do(ince), la do#(ince), sib re(ince), si re#(ince)".split(", "); // majör 3
            // sesAraliklari[4] = "do fa, re sol, mi la, fa sib, fa# si, sol do(ince), la re(ince), si mi(ince)".split(", "); // tam 4'lü
            // sesAraliklari[5] = "do fa#, reb sol, re sol#, mib la, mi la#, fa si, solb do(ince), sol do#(ince), lab re(ince), sib mi(ince)".split(", "); // artmış 4'lü
            // sesAraliklari[6] = "do sol, re la, mi si, fa do(ince), sol re(ince), la mi(ince), sib(kalın) fa, si(kalın) fa#".split(", "); // tam 5'li
            // sesAraliklari[7] = "do lab, do# la, re sib, re# si, mi do(ince), fa reb(ince), fa# re(ince), sol mib(ince), sol# mi(ince), la(kalın) fa, si(kalın) sol".split(", "); // minör 6
            // sesAraliklari[8] = "do la, re si, mib do(ince), mi do#(ince), fa re(ince), sol mi(ince), lab(kalın) fa, la(kalın) fa#, sib(kalın) sol, si(kalın) sol#".split(", "); // majör 6
            // sesAraliklari[9] = "do sib, do# si, re do(ince), mi re(ince), fa mib(ince), fa# mi(ince), sol(kalın) fa, la(kalın) sol, si(kalın) la, si(kalın) la#".split(", "); // minör 7
            // sesAraliklari[10] = "do si, reb do(ince), re do#(ince), mib re(ince), mi re#(ince), fa mi(ince), solb(kalın) fa, sol(kalın) fa#, lab(kalın) sol, la(kalın) sol#, sib(kalın) la".split(", "); // majör 7
            aralikIndexs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            
            break;
        case 'özel':
            if(aralikIndexs.length < 3)
                bypass = true;

            aralikIndexs = dArrayIndex;
            break;
        default:
            break;
    }
    console.log(sesAraliklari);

    for (let i = 0; i < aralikIndexs.length; i++) {
        sesAraliklari[i] = aralikHolder[aralikIndexs[i]];
    }
    console.log(sesAraliklari);

    // let notalar =
    //     "fa#(kalın), sol(kalın), sol#(kalın), la(kalın), sib(kalın), si(kalın), do, do#, re, re#, mi, fa, fa#, sol, sol#, la, la#, si, do(ince), do#(ince), re(ince), re#(ince), mi(ince)".split(", ");



    let ciftSesler;
    let limit;

    SetSesAraligi();

    // Önce her ses aralıklığının kaç tane olduğunu belirle.
    function SetSesAraligi(){
        ciftSesler = new Array(ciftSesLength);
        ciftSesAraligi = new Array(ciftSesLength);
        limit = new Array(sesAraliklari.length);

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

            let aralikBucket = new Array(ciftSesAraliklari.length);

            for (let j = 0; j < ciftSesAraliklari.length; j++) {
                aralikBucket[j] = ciftSesAraliklari[j];
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
                else if (i > 0 && ciftSesAraligi[i - 1] === aralikBucket[randomAralik]/* && i <= Math.floor((gSeslerLength / limit.length) * ciftSesAraliklari.length)*/)
                    aralikCheck = true;
                aralikBucket.splice(randomAralik, 1);
                if(bypass)
                    aralikCheck = false;
            } while (aralikCheck);
    
            if(pass){
                SelectNotaByAralik(randomAralik);
            }
            else{
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
                if(bypass)
                    notaCheck = false;
                notalarBucket.splice(randomNota, 1);
            } while (notaCheck);
    
            if(pass){
                ciftSesAraligi[i] = ciftSesAraliklari[randomAralik];
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
        //console.clear();

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
        List(1, difficulty, ciftSesLength, ciftSesler, diff);
        ButtonManager(1, ciftSesler);
    }
}

// Akorlar
function CreateAkor(akorLength, diff){
    if(akorLength === null || akorLength === undefined){
        localStorage.setItem("lengthValue", 10);
    }
    let difficulty = `CreateAkor(localStorage.getItem('lengthValue'), '${diff}')`;
    let akorlar = new Array;
    var selectedAkorlar;
    
    let akorIndexs;
    let fazlalik;

    let bypass = false;
    // Kolay
    // Majör Minör Esaslar

    // Normal
    // Majör Minör Esaslar ve Çevrimler

    // Zor 
    // Üzerinde ne olduğu yazmayanlar

    // akorlar[0] = "do mib sol, do# mi sol#, re fa la, mi sol si, fa lab do(ince), fa# la do#(ince), sol sib re(ince), sol# si re#(ince), la do mi(ince), la(kalın) do mi, si(kalın) re fa#".split(", "); // minör Esas
    // akorlar[1] = "do mi sol, re fa# la, reb fa lab, mi sol# si, mib sol sib, fa la do(ince), sol si re(ince), la do#(ince) mi(ince), lab do(ince) mib(ince), la(kalın) do# mi, lab(kalın) do mib, sib(kalın) re fa, si(kalın) re# fa#".split(", "); // Majör Esas

    // akorlar[2] = "do mi la, re fa# si, reb fa sib, mib sol do(ince), mi sol# do#(ince), fa la re(ince), sol si mi(ince), lab do(ince) fa(ince), la do#(ince) fa#(ince), lab(kalın) do fa, la(kalın) do# fa#, sib(kalın) re sol".split(", "); // minör 1. çevrim
    // akorlar[3] = "do mib lab, do# mi la, re fa sib, re# fa# si, mi sol do(ince), fa# la re(ince), sol sib mib(ince), la do(ince) fa(ince), la(kalın) do fa, si(kalın) re sol".split(", "); // Majör 1. çevrim

    // akorlar[4] = "do fa la, do# fa# la, re sol sib, mi la do, fa# si re, sol do mib, sol# do# mi, la re(ince) fa(ince), la(kalın) re fa, si(kalın) mi sol".split(", "); // minör 2. çevrim
    // akorlar[5] = "re sol si, mi la do#(ince), mib lab do(ince), fa sib re(ince), fa# si re#(ince), sol# si mi(ince), la re(ince) fa#(ince), lab reb(ince) fa(ince), la(kalın) re fa#, lab(kalın) reb fa, si(kalın) mi sol#, sib(kalın) mib sol".split(", "); // majör 2. çevrim do fa la ????

    // akorlar[6] = "do mi sol#, do mib solb, do mib la, do fa# la, do# mi sol, re fa lab, re fa# la#, re fa si, re sol# si, reb sol sib, reb fa la, mi sol sib, mib sol si, fa la do#, fa# la do, fa lab re, sol si re#, sol# si re, sol sib reb, sol do mi".split(", "); // unnamed
    // akorlar[7] = "la do(ince) mib(ince), lab do(ince) mi(ince), lab re(ince) fa(ince), la(kalın) do mib, lab(kalın) do mi, lab(kalın) re fa, si(kalın) re fa, sib(kalın) re fa#, sib(kalın) reb sol, si(kalın) re sol#, sib(kalın) reb sol, sib(kalın) mi sol".split(", "); // unnamed



    switch (diff) {
        case 'Kolay':
            akorlar[0] = "do mib sol, do# mi sol#, re fa la, mi sol si, fa lab do(ince), fa# la do#(ince), sol sib re(ince), sol# si re#(ince), la do mi(ince), la(kalın) do mi, si(kalın) re fa#".split(", "); // minör Esas
            akorlar[1] = "do mi sol, re fa# la, reb fa lab, mi sol# si, mib sol sib, fa la do(ince), sol si re(ince), la do#(ince) mi(ince), lab do(ince) mib(ince), la(kalın) do# mi, lab(kalın) do mib, sib(kalın) re fa, si(kalın) re# fa#".split(", "); // Majör Esas
            bypass = true;
            break;
        case 'Normal':
             
            akorlar[0] = "do mib sol, do# mi sol#, re fa la, mi sol si, fa lab do(ince), fa# la do#(ince), sol sib re(ince), sol# si re#(ince), la do mi(ince), la(kalın) do mi, si(kalın) re fa#".split(", "); // minör Esas
            akorlar[1] = "do mi sol, re fa# la, reb fa lab, mi sol# si, mib sol sib, fa la do(ince), sol si re(ince), la do#(ince) mi(ince), lab do(ince) mib(ince), la(kalın) do# mi, lab(kalın) do mib, sib(kalın) re fa, si(kalın) re# fa#".split(", "); // Majör Esas
    
            akorlar[2] = "do mi la, re fa# si, reb fa sib, mib sol do(ince), mi sol# do#(ince), fa la re(ince), sol si mi(ince), lab do(ince) fa(ince), la do#(ince) fa#(ince), lab(kalın) do fa, la(kalın) do# fa#, sib(kalın) re sol".split(", "); // minör 1. çevrim
            akorlar[3] = "do mib lab, do# mi la, re fa sib, re# fa# si, mi sol do(ince), fa# la re(ince), sol sib mib(ince), la do(ince) fa(ince), la(kalın) do fa, si(kalın) re sol".split(", "); // Majör 1. çevrim
    
            akorlar[4] = "do fa la, do# fa# la, re sol sib, mi la do, fa# si re, sol do mib, sol# do# mi, la re(ince) fa(ince), la(kalın) re fa, si(kalın) mi sol".split(", "); // minör 2. çevrim
            akorlar[5] = "re sol si, mi la do#(ince), mib lab do(ince), fa sib re(ince), fa# si re#(ince), sol# si mi(ince), la re(ince) fa#(ince), lab reb(ince) fa(ince), la(kalın) re fa#, lab(kalın) reb fa, si(kalın) mi sol#, sib(kalın) mib sol".split(", "); // majör 2. çevrim do fa la ????
 
            break;
        case 'Zor':
            akorlar[0] = "do mib sol, do# mi sol#, re fa la, mi sol si, fa lab do(ince), fa# la do#(ince), sol sib re(ince), sol# si re#(ince), la do mi(ince), la(kalın) do mi, si(kalın) re fa#".split(", "); // minör Esas
            akorlar[1] = "do mi sol, re fa# la, reb fa lab, mi sol# si, mib sol sib, fa la do(ince), sol si re(ince), la do#(ince) mi(ince), lab do(ince) mib(ince), la(kalın) do# mi, lab(kalın) do mib, sib(kalın) re fa, si(kalın) re# fa#".split(", "); // Majör Esas
        
            akorlar[2] = "do mi la, re fa# si, reb fa sib, mib sol do(ince), mi sol# do#(ince), fa la re(ince), sol si mi(ince), lab do(ince) fa(ince), la do#(ince) fa#(ince), lab(kalın) do fa, la(kalın) do# fa#, sib(kalın) re sol".split(", "); // minör 1. çevrim
            akorlar[3] = "do mib lab, do# mi la, re fa sib, re# fa# si, mi sol do(ince), fa# la re(ince), sol sib mib(ince), la do(ince) fa(ince), la(kalın) do fa, si(kalın) re sol".split(", "); // Majör 1. çevrim
        
            akorlar[4] = "do fa la, do# fa# la, re sol sib, mi la do, fa# si re, sol do mib, sol# do# mi, la re(ince) fa(ince), la(kalın) re fa, si(kalın) mi sol".split(", "); // minör 2. çevrim
            akorlar[5] = "re sol si, mi la do#(ince), mib lab do(ince), fa sib re(ince), fa# si re#(ince), sol# si mi(ince), la re(ince) fa#(ince), lab reb(ince) fa(ince), la(kalın) re fa#, lab(kalın) reb fa, si(kalın) mi sol#, sib(kalın) mib sol".split(", "); // majör 2. çevrim do fa la ????
        
            akorlar[6] = "do mi sol#, do mib solb, do mib la, do fa# la, do# mi sol, re fa lab, re fa# la#, re fa si, re sol# si, reb sol sib, reb fa la, mi sol sib, mib sol si, fa la do#, fa# la do, fa lab re, sol si re#, sol# si re, sol sib reb, sol do mi".split(", "); // unnamed
            akorlar[7] = "la do(ince) mib(ince), lab do(ince) mi(ince), lab re(ince) fa(ince), la(kalın) do mib, lab(kalın) do mi, lab(kalın) re fa, si(kalın) re fa, sib(kalın) re fa#, sib(kalın) reb sol, si(kalın) re sol#, sib(kalın) reb sol, sib(kalın) mi sol".split(", "); // unnamed
        
            break;
        default:
            break;
    }
    // akorlar[0] = "do mi sol, do mib sol, do mi sol#, do mib solb, do mi la, do mib la, do mib lab, do# mi sol#, do# mi la, do fa la, do fa# la, do fa la#, do# fa# la, do# mi sol".split(", ");
    // akorlar[1] = "re fa la, re fa# la, re fa lab, re fa# la#, re fa si, re fa sib, re fa# si, re# fa# si, re sol si, re sol si, re sol sib, re sol# si, reb fa lab, reb fa sib, reb sol sib, reb fa la".split(", ");
    // akorlar[2] = "mi sol si, mi sol# si, mi sol sib, mib sol sib, mi sol sib, mi sol do(ince), mib sol do(ince), mib sol si, mi sol# do#(ince), mi la do(ince), mi la do#(ince), mib lab do(ince)".split(", ");
    // akorlar[3] = "fa la do(ince), fa lab do(ince), fa la do#(ince), fa# la do#(ince), fa# la do(ince), fa si re(ince), fa# si re(ince), fa sib re(ince), fa# si re#(ince), fa# la re, fa la re(ince), fa lab re(ince)".split(", ");
    // akorlar[4] = "sol si re(ince), sol sib re(ince), sol si re#(ince), sol# si re(ince), sol# si re#(ince), sol sib mib(ince), sol sib reb(ince), sol do(ince) mi(ince), sol do(ince) mib(ince), sol# do#(ince) mi(ince), sol si mi(ince), sol# si mi(ince)".split(", ");
    // akorlar[5] = "la do(ince) mi(ince), la do(ince) mi(ince), la do#(ince) mi(ince), lab do(ince) mib(ince), lab do(ince) mi(ince), la do(ince) fa(ince), lab do(ince) fa(ince), la do#(ince) fa#(ince), la re(ince) fa(ince), la re(ince) fa#(ince), lab re(ince) fa(ince)".split(", ");
    // akorlar[6] = "la(kalın) do mi, la(kalın) do mi, la(kalın) do# mi, lab(kalın) do mib, lab(kalın) do mi, la(kalın) do fa, lab(kalın) do fa, la(kalın) do# fa#, la(kalın) re fa, la(kalın) re fa#, lab(kalın) re fa".split(", ");
    // akorlar[7] = "si(kalın) re fa, si(kalın) re fa#, sib(kalın) re fa, sib(kalın) re fa#, sib(kalın) reb sol, sib(kalın) re sol, si(kalın) re sol, si(kalın) re sol#, sib(kalın) reb sol, si(kalın) mi sol, si(kalın) mi sol#, sib(kalın) mib sol, sib(kalın) mi sol, si(kalın) re# fa#".split(", ");
    
    GenerateAkor(akorLength);

    function GenerateAkor(akorLength){
        SetVariables(akorLength);
        console.log("stage 2");
        for (let i = 0; i < akorLength; i++) {
            let rndIndex;
            let pass1;
            do {
                pass1 = false;
                rndIndex = Math.floor(Math.random() * akorlar.length);
                if(akorIndexs[rndIndex] === 0){
                    pass1 = true;
                }
            } while (pass1);
    
            let stuckCount = 0;
            let rndAkor;
            let pass2;
            do {
                pass2 = false;
                rndAkor = Math.floor(Math.random() * akorlar[rndIndex].length);
                for (let j = 0; j < selectedAkorlar.length; j++) {
                    if(selectedAkorlar[j] === akorlar[rndIndex][rndAkor]){
                        pass2 = true;
                        break;
                    }
                }
                if(i > 0){
                    const filter = [0, 2];
                    const pastAkor = selectedAkorlar[i - 1].split(" ");
                    const currentAkor = akorlar[rndIndex][rndAkor].split(" ");
    
                    for (let j = 0; j < filter.length; j++) {
                        for (let k = 0; k < filter.length; k++) {
                            if(pastAkor[filter[j]] == currentAkor[filter[k]]){
                                pass2 = true;
                            }
                        }
                        
                    }
                }
                stuckCount++;
                if(stuckCount > 100)
                    break;
            } while (pass2);
            
            selectedAkorlar[i] = akorlar[rndIndex][rndAkor];
    
            console.log((i + 1) + ". " + selectedAkorlar[i]);
        }
        List(2, difficulty, akorLength, selectedAkorlar);
        ButtonManager(2, selectedAkorlar);
    
    }
    function SetVariables(akorLength)
    {
        //console.clear();
        selectedAkorlar = new Array(akorLength);
        akorIndexs = new Array(akorlar.length);
        fazlalik = akorLength % akorlar.length;
        for (let i = 0; i < akorIndexs.length; i++) {
            akorIndexs[i] = Math.floor(akorLength / akorlar.length);

        }
        do 
        {

            let rndIndex = Math.floor(Math.random() * akorlar.length);
            if(akorIndexs[rndIndex] === Math.floor(akorLength / akorlar.length) || bypass){
                akorIndexs[rndIndex]++;
                fazlalik--;
            }
        } while (fazlalik >= 0);        
    }    
}

// Melodiler
function CreateMelody(melodiLength, diff) {
    if(melodiLength === null || melodiLength === undefined){
        localStorage.setItem("lengthValue", 10);
    }
    let difficulty = `CreateMelody(localStorage.getItem('lengthValue'), '${diff}')`;
    let melodiString = "";
    switch (diff) {
        case 'Kolay':
            melodiString = "do mi sol fa re, sol fa# sol do(ince) si, la sol# la mi fa, "+
            "mi sol do(ince) la sol, sol fa# sol re si(kalın), do mi la sol# la, "+
            "si(kalın) do re si(kalın) sol, sol fa# sol la fa, la sol# la re(ince) do(ince), "+
            "do(ince) sol mi do re, do mi la sol fa#, re fa la sol# la, "+
            "fa mi re la sol, sol fa# sol re mi, re fa si la sol#, "+
            "do mi sol do(ince) si, la sol fa# sol mi, la si do(ince) la sol#, "+
            "do(ince) sol mi la sol, sol fa# sol si(kalın) do, la sol# la fa mi, "+
            "fa mi re si do(ince), si(kalın) re sol fa# sol, la sol# la si mi, "+
            "fa la sol si do(ince), do mi sol fa# sol, la sol# la mi do(ince), "+
            "sol mi fa re si(kalın), sol fa# sol si re(ince), la sol# la fa re, "+
            "do mi la fa re, sol fa# sol si(kalın) re, si(kalın) re la sol# la, "+
            "do mi re si(kalın) do, sol fa# sol do(ince) la, fa re la sol# la";
            break;
        case 'Normal':
            melodiString = 
            "Do Mi Sol La Sol Fa# La Sol Mi, Do Si(Kalın) Do Mi Sol Lab Sib Do(ince), Do Mi Re La Fa# Sol Mi Do Si(Kalın) Do, " +
            "Fa Mi Fa Re# Sol Sib La Fa, Do Si(Kalın) Do La Sol# Si La Re# Mi, Sol Fa# Sol Mi Do Re Mib Sol, " +
            "Sol Lab Sol Fa# Sol Si(Kalın) Do Fa# La Sol, La Sol# La Mi Do(ince) La Fa Re# Mi, Re Mi Fa Re Si(Kalın) Mi Re# Si Do, " +
            "Si(Kalın) Do Re Mi La Sol# Sib La, Fa Re Si(Kalın) Mi Re Do Mi Sol Lab Sol, Sol La Sol Fa# Si Re(ince) Do#(ince) La Fa#, " +
            "Do Re Mi Do Sol, Fa Mi Re La Sol, Do Mi Sol Si Do(ince), Do(ince) Si Do(ince) La Sol, " +
            "Mi Fa Sol Si(Kalın) Do, Fa Mi Fa La Sol, Mi Fa Sol Do(ince) Si, Do Mi Sol Fa Re, Sol Mi Fa Re Do, Do Si(Kalın) Do Re Mi, " +
            "Mi Re Mi Fa Sol, Mi Re Mi Do Sol, Mi Re Do Mi Sol, Fa La Sol Si(Kalın) Do, Re Fa La Si(Kalın) Do, Mi Fa Mi La Sol, " +
            "Sol La Sol Si Do(ince), Sol Fa Re Si(Kalın) Do, Sol La Sol Si(Kalın) Re, Fa Mi Re La Sol# La, Do Mi Sol (Fa#/La#) Sol, " +
            "Do Si(Kalın) Do Mi La Sol#, Fa Mi Re# Mi Do Si(Kalın) Do, Do La Sol# La Fa Mi Re, Do Fa Mi Re# Mi Do Sol, Re Mi Fa La (Sib/Sol#) La, " +
            "Fa Mi Re Si(Kalın) Do, Mi Fa Sol La Sol, Do Mi Re Si(Kalın) Do, Do Mi Sol Do(ince) Si, La Si(Kalın) Do La Sol, Do Si(Kalın) Do Mi Sol, Mi Sol Do Si(Kalın) La Sol, " +
            "Sol La Sol Mi Do, Re Mi Fa Si(Kalın) Do, " + 
            "Do Re Mib Do Sol La Fa# Sol, Sol Mi Fa Re La Sib La Fa Sol Mi, Do Sol Re Mi La Si Do(ince), La Fa# La Sib La Fa Mi Re# Mi, Do(ince) Si La# Si Do(ince) Sol Mi Fa Re, " +
            "Sol Fa# Sol Si Re(ince) Do#(ince) Mi(ince) Re(ince), Do(ince) Sol Fa# Sol La Sol, La Sib La Fa Mi Re# Mi Do La(Kalın), Re(ince) Do#(ince) Re(ince) Si La Sib La Sol# La Fa Re, " +
            "Do Mi Sol La Sib La Fa# Sol Mi Do";
            break;

        case 'Zor':
            melodiString = 
            "Do Re Mib Do Sol La Fa# Sol, Sol Mi Fa Re La Sib La Fa Sol Mi, Do Sol Re Mi La Si Do(ince), La Fa# La Sib La Fa Mi Re# Mi, Do(ince) Si La# Si Do(ince) Sol Mi Fa Re, " +
            "Sol Fa# Sol Si Re(ince) Do#(ince) Mi(ince) Re(ince), Do(ince) Sol Fa# Sol La Sol, La Sib La Fa Mi Re# Mi Do La(Kalın), Re(ince) Do#(ince) Re(ince) Si La Sib La Sol# La Fa Re, " +
            "Do Mi Sol La Sib La Fa# Sol Mi Do, " + 
            /* Yeni melodiler geldi */
            "La Sib La Sol# La Fa Re, Re Do# Re Mi Fa La Sol#, Do(ince) Si Do(ince) Sol Mi Re Do, Sol Do(ince) Sol Mi Re# Si Do(ince), Do(ince) Sol Mi Fa Re La Sol#, La Fa Re Mib Do# Re Si(kalın), " +
            "Sol Do(ince) Sol La Fa Re# Mi, Do(ince) Si Do(ince) La Sol Fa# La Sib, Sol Mi Fa La Sol Si(kalın) Mi Re Do, Sol Mi Sol Do(ince) La Fa# Sol Si(kalın), Si(kalın) Do Re Mi Fa La Sol#, La Sib Sol# La Fa Re# Mi La, " +
            "La Sol# Re(ince) Do(ince) La Mi La, Fa Re# Mi Do La Sib La, Sol Mi Fa La Sol Si(kalın) Do(ince), Re Sol Fa# Sol Sib La Fa Re, Fa Re Sol Do(ince) Sol Mi Fa, Sol Mi Sol Do(ince) La Fa Re# Mi Do La(kalın), " + 
            "Mi Do(ince) La Fa Re# Mi Do(ince) Sol# La, Fa Mi Fa Do(ince) Si La Re# Mi, Sol Mi Sol Fa Re Fa Sol Do(ince) La Fa, Do(ince) La Fa Re# Mi Do(ince) La, Mi Sol Si Do(ince) La Fa# Sol Mi Re# Mi, La Fa Sol Do(ince) Si La Sol#, " +
            "Fa Re# Mi Do Do(ince) Si Do(ince), La Sib Sol# La Fa Mi Re(ince) Do#(ince), La Fa# Sol Mi Re# Mi Do(ince) Si, Mi Sol Do(ince) Sib La Fa Re, Fa La Sib La Sol# Do(ince) Si, La Do(ince) La Re(ince) Si Sol# Mi La, " + 
            "Fa Sol Lab Fa Re Do# Mib Re, Sol La Sib Re(ince) Do#(ince) Mi(ince) Sol, Re Fa Mi La Sol# Re(ince) Do(ince), Mi Do(ince) Si La Sol# Re Si(kalın), Sol La Fa# Sol Re(ince) Do(ince) La Fa Mi, Mi La Do(ince) La Fa Re Si(kalın) La";

            break;
        default:
            break;
    }
    // var melodiString = 
    //     "Do Mi Sol La Sol Fa# La Sol Mi, Do Si(Kalın) Do Mi Sol Lab Sib Do(ince), Do Mi Re La Fa# Sol Mi Do Si(Kalın) Do, " +
    //     "Fa Mi Fa Re# Sol Sib La Fa, Do Si(Kalın) Do La Sol# Si La Re# Mi, Sol Fa# Sol Mi Do Re Mib Sol, " +
    //     "Sol Lab Sol Fa# Sol Si(Kalın) Do Fa# La Sol, La Sol# La Mi Do(ince) La Fa Re# Mi, Re Mi Fa Re Si(Kalın) Mi Re# Si Do, " +
    //     "Si(Kalın) Do Re Mi La Sol# Sib La, Fa Re Si(Kalın) Mi Re Do Mi Sol Lab Sol, Sol La Sol Fa# Si Re(ince) Do#(ince) La Fa#, " +
    //     "Do Re Mi Do Sol, Fa Mi Re La Sol, Do Mi Sol Si Do(ince), Do(ince) Si Do(ince) La Sol, " +
    //     "Mi Fa Sol Si(Kalın) Do, Fa Mi Fa La Sol, Mi Fa Sol Do(ince) Si, Do Mi Sol Fa Re, Sol Mi Fa Re Do, Do Si(Kalın) Do Re Mi, " +
    //     "Mi Re Mi Fa Sol, Mi Re Mi Do Sol, Mi Re Do Mi Sol, Fa La Sol Si(Kalın) Do, Re Fa La Si(Kalın) Do, Mi Fa Mi La Sol, " +
    //     "Sol La Sol Si Do(ince), Sol Fa Re Si(Kalın) Do, Sol La Sol Si(Kalın) Re, Fa Mi Re La Sol# La, Do Mi Sol (Fa#/La#) Sol, " +
    //     "Do Si(Kalın) Do Mi La Sol#, Fa Mi Re# Mi Do Si(Kalın) Do, Do La Sol# La Fa Mi Re, Do Fa Mi Re# Mi Do Sol, Re Mi Fa La (Sib/Sol#) La, " +
    //     "Fa Mi Re Si(Kalın) Do, Mi Fa Sol La Sol, Do Mi Re Si(Kalın) Do, Do Mi Sol Do(ince) Si, La Si(Kalın) Do La Sol, Do Si(Kalın) Do Mi Sol, Mi Sol Do Si(Kalın) La Sol, " +
    //     "Sol La Sol Mi Do, Re Mi Fa Si(Kalın) Do, " + 
    //     "Do Re Mib Do Sol La Fa# Sol, Sol Mi Fa Re La Sib La Fa Sol Mi, Do Sol Re Mi La Si Do(ince), La Fa# La Sib La Fa Mi Re# Mi, Do(ince) Si La# Si Do(ince) Sol Mi Fa Re, " +
    //     "Sol Fa# Sol Si Re(ince) Do#(ince) Mi(ince) Re(ince), Do(ince) Sol Fa# Sol La Sol, La Sib La Fa Mi Re# Mi Do La(Kalın), Re(ince) Do#(ince) Re(ince) Si La Sib La Sol# La Fa Re, " +
    //     "Do Mi Sol La Sib La Fa# Sol Mi Do, " + 
    //     /* Yeni melodiler geldi */
    //     "La Sib La Sol# La Fa Re, Re Do# Re Mi Fa La Sol#, Do(ince) Si Do(ince) Sol Mi Re Do, Sol Do(ince) Sol Mi Re# Si Do(ince), Do(ince) Sol Mi Fa Re La Sol#, La Fa Re Mib Do# Re Si(kalın), " +
    //     "Sol Do(ince) Sol La Fa Re# Mi, Do(ince) Si Do(ince) La Sol Fa# La Sib, Sol Mi Fa La Sol Si(kalın) Mi Re Do, Sol Mi Sol Do(ince) La Fa# Sol Si(kalın), Si(kalın) Do Re Mi Fa La Sol#, La Sib Sol# La Fa Re# Mi La, " +
    //     "La Sol# Re(ince) Do(ince) La Mi La, Fa Re# Mi Do La Sib La, Sol Mi Fa La Sol Si(kalın) Do(ince), Re Sol Fa# Sol Sib La Fa Re, Fa Re Sol Do(ince) Sol Mi Fa, Sol Mi Sol Do(ince) La Fa Re# Mi Do La(kalın), " + 
    //     "Mi Do(ince) La Fa Re# Mi Do(ince) Sol# La, Fa Mi Fa Do(ince) Si La Re# Mi, Sol Mi Sol Fa Re Fa Sol Do(ince) La Fa, Do(ince) La Fa Re# Mi Do(ince) La, Mi Sol Si Do(ince) La Fa# Sol Mi Re# Mi, La Fa Sol Do(ince) Si La Sol#, " +
    //     "Fa Re# Mi Do Do(ince) Si Do(ince), La Sib Sol# La Fa Mi Re(ince) Do#(ince), La Fa# Sol Mi Re# Mi Do(ince) Si, Mi Sol Do(ince) Sib La Fa Re, Fa La Sib La Sol# Do(ince) Si, La Do(ince) La Re(ince) Si Sol# Mi La, " + 
    //     "Fa Sol Lab Fa Re Do# Mib Re, Sol La Sib Re(ince) Do#(ince) Mi(ince) Sol, Re Fa Mi La Sol# Re(ince) Do(ince), Mi Do(ince) Si La Sol# Re Si(kalın), Sol La Fa# Sol Re(ince) Do(ince) La Fa Mi, Mi La Do(ince) La Fa Re Si(kalın) La";

    var melodiler = melodiString.toLowerCase().split(", ");

    var generatedSesler = new Set();


    while (generatedSesler.size < melodiLength) {
        var randomNumber = Math.floor(Math.random() * melodiler.length);
        
        let splitMelodi = melodiler[randomNumber].split(" ");
        for (let i = 0; i < splitMelodi.length; i++) {
            if(splitMelodi[i].includes("/")){
                splitMelodi[i] = splitMelodi[i].replace(splitMelodi[i], splitMelodi[i].split("(")[1].split(")")[0].split("/")[Math.floor(Math.random() * 2)].trim());
                splitMelodi = splitMelodi.toString();
                splitMelodi = splitMelodi.replaceAll(","," ");
                melodiler[randomNumber] = splitMelodi;
            }
        }

        generatedSesler.add(melodiler[randomNumber]);
    }

    let melodyArray = Array.from(generatedSesler);
    generatedMelodies = melodyArray;

    for (let i = 0; i < generatedSesler.length; i++) {
        generatedMelodies[i] = generatedSesler;
    }

    List(3, difficulty, melodiLength, generatedMelodies, diff);
    ButtonManager(3, generatedMelodies);
    // CreateHtmlUI(generatedMelodies, generatedSesler);
    // playAllMelodiesWithRetry(generatedMelodies);
}

function generateNotesByValue(value) {
    localStorage.setItem("lengthValue", value);
}
let selectedDiffs = new Set();
let sDiffIndex = 0;
function SetSpecialAralik(value){
    value = value.toLowerCase();
    console.log(selectedDiffs.size);

    for (let i = 0; i <= selectedDiffs.size; i++) {
        if(selectedDiffs.has(value)){
            console.log(selectedDiffs.delete(value));
            selectedDiffs.delete(value);
            break;
        }
        else{
            selectedDiffs.add(value);
            break;
        }
    }
    const createBtn = document.getElementById("createBtn");
    createBtn.disabled = true;
    if(selectedDiffs.size > 0)
        createBtn.disabled = false;
    

    console.log(selectedDiffs);

}
let dArrayIndex;
function SetSesAraliklari(){
    let diffArray = Array.from(selectedDiffs);
    dArrayIndex = new Set();
    for (let i = 0; i < diffArray.length; i++) {
        for (let j = 0; j < ciftSesAraliklari.length; j++) {
            if(diffArray[i] == ciftSesAraliklari[j]){
                dArrayIndex.add(j);
            }
        }
    }
    dArrayIndex = Array.from(dArrayIndex);
    let temp = 0;

    for (let i = 0; i <= dArrayIndex.length; i++) {
        for (let j = i + 1; j < dArrayIndex.length; j++) {
            if(dArrayIndex[i] > dArrayIndex[j]){
                temp = dArrayIndex[i];
                dArrayIndex[i] = dArrayIndex[j];
                dArrayIndex[j] = temp;
            }
        } 
    }
    ciftSesAraliklari = diffArray.toString().split(",");
    CreateCiftSes(localStorage.getItem('lengthValue'), 'özel');
}
// Çift ses bitiş

// Genel
function List(type, difficulty, itemLength, generatedItem, diff) {
    const contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";

    const h1Div = document.createElement("div");
    h1Div.classList.add("container", "p-3");

    // H1 başlığı ekleniyor
    const h1Element = document.createElement("h1");
    h1ElementTextContents = ["Tek Sesler", "Çift Sesler", "Akorlar", "Melodiler"];
    h1Element.textContent = h1ElementTextContents[type];
    h1Div.appendChild(h1Element);

    if(!(diff === undefined || diff === null))
    {
        if(diff == 'veryEasy')
            diff = 'Başlangıç';
        const h3Element = document.createElement("h3");
        h3Element.textContent = `- ${diff} -`;
        h1Div.appendChild(h3Element);
    }

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
        default:
            const noteList2 = CreateNewUl(1, itemLength, type, generatedItem);
            rowDiv.appendChild(noteList2);
            break;
    }


    const scoreH1Element = document.createElement("h1");
    scoreH1Element.setAttribute("id","score");
    
    rowContainer.appendChild(rowDiv);
    rowContainer.appendChild(scoreH1Element);

    const imageHTMLClassHolder = ["bi-play-circle", "bi-pause-circle", "bi-eye", "bi-gear-fill", "bi-arrow-clockwise", "bi-arrow-right-square"];
    const butonNames = ["Oynat", "Durdur", "Göster", "Ayarları Değiştir", "Notaları Yenile ", "Yanıtla"];
    const butonIDs = ["playButton", "stopButton", "showAndHideButton", "changeDiffButton", "createAgainButton", "answerButton"];
    const colBreakPoint = ["12", "6", "4"];
    const colMdBreakPoint = ["2", "3", "2"];

    let imageCounter = 0;
    for (let i = 3; i > 0; i--) {
        const buttonGroupDiv = document.createElement("div");
        buttonGroupDiv.classList.add("row", "justify-content-md-center", "py-2");
        for (let j = 0; j < i; j++) {
            const buttonColDiv = document.createElement("div");
            // buttonColDiv.classList.add("col", ("col-" + colBreakPoint[i - 1]), "col-md-auto");
            buttonColDiv.classList.add("col", ("col-md-" + colMdBreakPoint[i - 1]),"col-md-auto");
            
            const buttonColRowDiv = document.createElement("div"); // ColRowDiv ???
            buttonColRowDiv.classList.add("row", "px-1");

            const button = document.createElement("button");
            button.classList.add("col", "btn", "btn-primary", "rounded-pill", "border");
            button.setAttribute("type", "button");
            button.setAttribute("id", butonIDs[imageCounter]);
            button.setAttribute("style", "background-color: #525CEB;");

            const buttonIcon = document.createElement("i");
            buttonIcon.classList.add("col", "bi", imageHTMLClassHolder[imageCounter]);
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

            buttonColRowDiv.appendChild(button);
            buttonColDiv.appendChild(buttonColRowDiv);
            buttonGroupDiv.appendChild(buttonColDiv);
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
        
        let noteListLength;
        let noteListContent = [notalar];
        let ddBtnTitle = ["Nota-Seçimi"];
        let ddBtnIcon = ["bi-music-note-list", "bi-list"];
        switch (type) {
            case 1:
                noteListLength = 2;
                noteListContent = [notalar, ciftSesAraliklari];
                ddBtnTitle = ["Nota-Seçimi", "Aralık-Seçimi"];
                ddBtnIcon = ["bi-music-note-list", "bi-list"];
                break;
            case 2:
                noteListLength = 2;
                noteListContent = [notalar, notalar];
                ddBtnTitle = ["Nota-Seçimi", "Nota-Seçimi"];
                ddBtnIcon = ["bi-music-note-list", "bi-music-note-list"];
                break;
            case 3:
                noteListLength = 0;
                break;      
            default:
                noteListLength = 1;
                break;
        }
        
        for (let k = 0; k < noteListLength; k++) {

            const listItem2DropdownButton = document.createElement("button");
            listItem2DropdownButton.classList.add("btn", "btn-secondary", "dropdown-toggle", "btn-sm", "rounded-pill", "me-1");
            listItem2DropdownButton.setAttribute("type", "button");
            listItem2DropdownButton.setAttribute("title", ddBtnTitle[k]);
            listItem2DropdownButton.setAttribute("data-bs-toggle", "dropdown");
            listItem2DropdownButton.setAttribute("aria-expanded", "false");
            listItem2DropdownButton.setAttribute("style", "background-color: #3D3B40;");
        
            const listItem2DropdownButtonIcon = document.createElement("i");
            listItem2DropdownButtonIcon.classList.add("bi", ddBtnIcon[k]);
            
            const listItem2DropdownMenu = document.createElement("ul");
            listItem2DropdownMenu.classList.add("dropdown-menu", "dropdown-menu-dark");
            listItem2DropdownMenu.setAttribute("style", "width: 200px;");
        
            listItem2DropdownButton.appendChild(listItem2DropdownButtonIcon);
            listItem2Dropdown.appendChild(listItem2DropdownButton);
        
            for (let j = 0; j < noteListContent[k].length; j++) {
                const dropdownMenuItem = document.createElement("li");
                dropdownMenuItem.classList.add("form-check", "mx-2");
        
                const itemInput = document.createElement("input");
                itemInput.classList.add("form-check-input", ("dropdownMenu-item" + k));
                itemInput.setAttribute("type", "radio");
                itemInput.setAttribute("placeholder", "none");
                itemInput.setAttribute("name", ("radioItem" + (k + "-" + (i - 1))));
                itemInput.setAttribute("id", "radioItem" + k + "-" + (i - 1) + "-" + j);
                itemInput.setAttribute("value", noteListContent[k][j]);
        
                const itemLabel = document.createElement("label");
                itemLabel.classList.add("form-check-label");
                itemLabel.setAttribute("for", ("radioItem" + (k + "-" + (i - 1))));
                itemLabel.innerText = noteListContent[k][j];
        
                dropdownMenuItem.appendChild(itemInput);
                dropdownMenuItem.appendChild(itemLabel);
                listItem2DropdownMenu.appendChild(dropdownMenuItem);
            }
        
            listItem2Dropdown.appendChild(listItem2DropdownMenu);
            listItem2.appendChild(listItem2Dropdown);
            
        }

    
        const listItem3 = document.createElement("li");
        listItem3.classList.add("list-inline-item");
    
        const listItem3Paragraph = document.createElement("p");
        listItem3Paragraph.classList.add("noteHolder");

        let hiddenItemText = "";
        const hiddenItemCount = generatedItem[i - 1].split(" ").length - 1;
        let index = 0;
        do {
            hiddenItemText += " ???";
            index++;
        } while (index < hiddenItemCount);

        if(type == 1)
            hiddenItemText += " - ?????";

        let innerTextValue = "???";
        if(generatedItem[i - 1].split(" ").length != 1){
            innerTextValue = generatedItem[i - 1].split(" ")[0] + hiddenItemText;
        }

        listItem3Paragraph.innerText = innerTextValue
        // const innerTextValues = ["???", `${generatedItem[i - 1].split(" ")[0]}` + " ??? - ?????", `${generatedItem[i - 1].split(" ")[0]}` + " ??? ???"];
        // listItem3Paragraph.innerText = innerTextValues[type];

        listItem3.appendChild(listItem3Paragraph);
    
        noteList.appendChild(listItem1);
        noteList.appendChild(listItem2);
        noteList.appendChild(listItem3);

        colDiv.appendChild(noteList);
    }
    return colDiv;
}