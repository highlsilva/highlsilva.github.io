

const results = document.getElementById("results");
let hasDot = false;
let hasNum = false;
let openParentesis = 0;

function setFontSize() {
    if (results.innerText.length >= 7) results.style.fontSize = "2.5rem";
}

function dokey(key, isOperator = false) {
    var value = results.innerText;

    if (
        value === "0" &&
        ((key !== "." && !isOperator) || key == "(" || key == ")")
    )
        value = "";
    if (key == "." && hasDot) {
        key = "";
    }
    if (isOperator) {
        hasDot = false;
    } else {
        hasNum = true;
    }
    results.innerHTML = value + key;
    setFontSize();
}
// estudar daqui para baixo
function clearResults() {
    results.innerHTML = 0;
    setFontSize();
    hasDot = false;
    hasNum = false;
    openParentesis = 0;
}
function parentesis() {
    if (hasNum && openParentesis > 0) {
        dokey(")", true);
        openParentesis--;
    }
    else {
        dokey("(", true);
        openParentesis++;
        hasNum = false;
    }
}

function calculate() {
    //pegar a equação e subistituir operadores especiais 
    let eq = results.innerText
        .replaceAll("÷", "/")
        .replaceAll("x", "*")
        .replaceAll("%", "/100");

    // calcular resultado 
    results.innerHTML = eval(eq);

    hasDot = false;
    hasNum = false;
    openParentesis = 0;
    setFontSize();
}

// descobre a tecla digitada 
function gatChat(event) {
    if (event.which == null) {
        return String.fromCharCode(event.keyCode);
    }
    else if (event.which != 0 && event.charCode != 0) {
        return String.fromCharCode(event.which);
    } else {
        return null;
    }
}
// pega a tecla digitada no teclado, descobre qual e a letra 
//e passa para results
function handlekeypress(event) {
    var ch = getchar(event);

    switch (ch) {
        case "(":
            doKey("(", true);
            openParentesis++;
            break;
        case ")":
            doKey(")", true);
            openParentesis--;
            break;
        case "%":
            doKey("%", true);
            break;
        case "/":
            doKey("÷", true);
            break;
        case "*":
            doKey("×", true);
            break;
        case "-":
            doKey(ch, true);
            break;
        case "+":
            doKey(ch, true);
            break;
        case ".":
            doKey(ch);
            break;
        case ",":
            doKey(".");
            break;
        case "=":
            hasDot = false;
            calculate();
            break;
        default:
            if (!isNaN(ch)) doKey(ch);
            break;
    }
}

// acesso window (documento global) e mudo a função onkeypress
// a função onkeypress decide o qeu acontece quando digita uma
// tecla
window.onkeypress = handleKeyPress;




