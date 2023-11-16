let noti = document.querySelector("#noti")
let para = document.getElementById("para")
let paraPrimes = document.getElementById("para-primes")

let clearBtn = document.getElementById("clear-btn")
let downloadBtn = document.getElementById("downloadButton")
let copyBtn = document.getElementById("copyButton")
let input1 = document.querySelector("#number1")
let input2 = document.querySelector("#number2")

let sourceCode = document.querySelector('section')
let body = document.querySelector('body')

// Defining Prime Number

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}


// For Validating the Input and Generating the Prime Number for the Value Provided
// Also for Adding and Removing Few Elements or Their Contents Accordingly 

const startInput = document.getElementById('number1');
const endInput = document.getElementById('number2');


function generatePrimes() {
    const errorMessage = document.getElementById('noti');
    const primeOutput = document.getElementById('para');

    const start = parseInt(startInput.value);
    const end = parseInt(endInput.value);


    if (isNaN(start) || isNaN(end)) {
        errorMessage.innerText = "Enter a Valid Number"
        // Custom
        sourceCode.style.visibility = "hidden"
        downloadBtn.style.display = "none"
        copyBtn.style.display = "none"
        paraPrimes.innerText = ""
        primeOutput.innerText = ""
        return
    }

    if (start > end) {
        errorMessage.innerText = "FIrst Number Should be Less than Second Number"
        // Custom
        sourceCode.style.visibility = "hidden"
        downloadBtn.style.display = "none"
        copyBtn.style.display = "none"
        paraPrimes.innerText = ""
        primeOutput.innerText = ""
        return
    }

    if (!Number.isInteger(start) || start < 0) {
        errorMessage.innerText = "Please enter a positive integer."
        // Custom
        sourceCode.style.visibility = "hidden"
        downloadBtn.style.display = "none"
        copyBtn.style.display = "none"
        paraPrimes.innerText = ""
        primeOutput.innerText = ""
        return;
    }

    if (!Number.isInteger(end) || end < 0) {
        errorMessage.innerText = "Please enter a positive integer."
        // Custom
        sourceCode.style.visibility = "hidden"
        downloadBtn.style.display = "none"
        copyBtn.style.display = "none"
        paraPrimes.innerText = ""
        primeOutput.innerText = ""
        return;
    }

    if (start > 9999999999 || end > 9999999999) {
        errorMessage.innerText = "Number should be up to 10 digits."
        // Custom
        document.querySelector("section").style.visibility = "hidden"
        downloadBtn.style.display = "none"
        copyBtn.style.display = "none"
        paraPrimes.innerText = ""
        primeOutput.innerText = ""
        return;
    }

    else {
        const primes = [];
        for (let num = start; num <= end; num++) {

            if (isPrime(num)) {
                primes.push(num);
            }

            if (primes.length > 0) {
                paraPrimes.innerText = "Prime Numbers Found Between  " + start + " and " + end + " Are  "
                primeOutput.innerText = primes.join("  ")
                errorMessage.innerText = ""
            }
            else {
                paraPrimes.innerText = "No prime number found between " + start + " and " + end
                errorMessage.innerText = ""
            }
        }
    }
    // For Copying the Prime Numbers to the Clipboard

    copyBtn.addEventListener("click", copyToClipboard)

    function copyToClipboard() {
        var copyPrimes = primeOutput.innerText;
        navigator.clipboard.writeText(copyPrimes)
        copyBtn.disabled  = true
        copyBtn.textContent = "Copied"
    }

    document.querySelector("section").style.visibility = "visible"
    copyBtn.textContent = "Copy to Clipboard"
    copyBtn.disabled = false
    downloadBtn.style.display = "block"
    copyBtn.style.display = "block"
}


// For Clear Button 

clearBtn.addEventListener("click", () => {
    document.getElementById("downloadButton").style.display = "none"
    document.getElementById("copyButton").style.display = "none"
    document.querySelector("section").style.visibility = "hidden"
    copyBtn.disabled  = false
    copyBtn.textContent = "Copy to Clipboard"
    paraPrimes.innerText = ""
    para.innerText = ""
    noti.innerText = ""
    input1.value = ""
    input2.value = ""
})


// For Downloading the Conetent in Text Format on Clicking Save Button

document.getElementById("downloadButton").addEventListener("click", function () {

    var textContent = document.querySelector("#para").innerText

    var blob = new Blob([textContent], { type: "text/plain" });

    var blobUrl = URL.createObjectURL(blob);

    var downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = `Primes Between ${startInput.value} and ${endInput.value}.txt`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
});


// / Key Code for First Input Button to Shift Focus on Second Input

input1.addEventListener("keydown", function (event) {
    if (event.keyCode === 40) {
        input2.focus()
    }
});

// Key Code for Second Input Button to Target Generate Button

input2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("generatePrimes").click();
    }
});


