function register() {
    console.log("Klikattu regs");
    window.location.assign("http://localhost:8080/registration.html");
}

function continueWithoutRegistering() {
    console.log("Klikattu Jatka kirjautumatta");
    window.location.assign("http://localhost:8080/contopics.html");
}

function showWelcome() {
    welcomeText();
}

function welcomeText() {
    var h3text = document.getElementById("h3");
    h3text.textContent += "Tervetuloa " + getCookieUsername("username") + "!";
}