function register() {
    console.log("Klikattu regs");
    window.location.assign("http://localhost:8080/registration.html");
}

function continueWithoutRegistering() {
    console.log("Klikattu Jatka kirjautumatta");
    window.location.assign("http://localhost:8080/contopics.html");
}

function showHidden() {
    loadUserFromCookies();
    document.getElementById("newtopic").removeAttribute("class");
    document.getElementById("newtopic").setAttribute("class", "welcome");
}

function showWelcome() {
    showHidden();
    welcomeText();
    document.getElementById("welcome").removeAttribute("class");
    document.getElementById("welcome").setAttribute("class", "welcome");
}

function welcomeText() {
    var h3text = document.getElementById("h3");
    h3text.textContent += "Tervetuloa " + getCookie("username") + "!";
}