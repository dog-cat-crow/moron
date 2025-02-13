function fetchFile() {
    fetch("https://raw.githubusercontent.com/dog-cat-crow/moron/main/image.txt")
        .then(response => response.text())
        .then(encryptedText => {
            window.encryptedImage = encryptedText;
            document.getElementById("status").style.display = "none";
            document.querySelector(".input-container").classList.remove("hidden");
        })
        .catch(() => {
            document.getElementById("status").innerText = "Unable to fetch";
        });
}

function decryptImage() {
    let password = document.getElementById("password").value;
    let decryptStatus = document.getElementById("decryptStatus");
    decryptStatus.innerText = "Decrypting...";

    try {
        let decryptedBytes = CryptoJS.AES.decrypt(window.encryptedImage, password);
        let decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedBase64) throw new Error();

        document.querySelector(".input-container").classList.add("hidden");
        document.querySelector(".decrypt-container").classList.remove("hidden");
        document.getElementById("dogImageContainer").classList.remove("hidden");

        window.decryptedImageSrc = "data:image/png;base64," + decryptedBase64;
        decryptStatus.innerText = "";
    } catch {
        decryptStatus.innerText = "Invalid Key Entered!";
    }
}

function revealImage() {
    document.getElementById("dogImageContainer").classList.add("hidden");
    let img = document.getElementById("outputImage");
    img.src = window.decryptedImageSrc;
    img.classList.remove("hidden");
}

fetchFile();
