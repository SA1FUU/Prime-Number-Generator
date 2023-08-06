const noti = document.querySelector("#noti")
let para = document.getElementById("para")

let clearBtn = document.getElementById("clear-btn")
let input = document.querySelector("input")


clearBtn.addEventListener("click", () => {
    document.getElementById("downloadButton").style.display = "none"
    document.querySelector("section").style.visibility = "hidden"
    input.value = ""
    para.innerText = ""
    noti.innerText = ""
})



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

function generatePrimes() {
    const userInput = document.getElementById("number").value;
    const inputNumber = Number(userInput);

    if (isNaN(inputNumber)) {
        noti.innerText = "Please enter a valid number"
        para.innerText = ""
        return;
    }

    if (!Number.isInteger(inputNumber) || inputNumber < 0) {
        noti.innerText = "Please enter a positive integer."
        para.innerText = ""
        return;
    }

    if (inputNumber > 9999999999) {
        noti.innerText = "The number should be up to 10 digits."
        para.innerText = ""
        return;
    }

    const primes = [];
    for (let i = 2; i <= inputNumber; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }

    if (primes.length > 0) {
        para.innerText = "Prime Numbers Found Upto  " + userInput + " are  :  " + primes.join(", ")
        document.getElementById("downloadButton").style.display = "block"
        noti.innerText = ""
    } else {
        para.innerText = "No prime number found up to " + inputNumber
        noti.innerText = ""
    }
    document.querySelector("section").style.visibility = "visible"

}

document.getElementById("downloadButton").addEventListener("click", function () {

    var textContent = document.querySelector("#para").innerHTML

    var blob = new Blob([textContent], { type: "text/plain" });

    var blobUrl = URL.createObjectURL(blob);

    var downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = "Prime-number(s).txt";

    document.body.appendChild(downloadLink);
    downloadLink.click();
});


input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("generatePrimes").click();
    }
});
