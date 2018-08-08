function login() {
    document.getElementById("login").onclick = function() {
        console.log("Klikattu regs");
        window.location.assign("http://localhost:8080/topics.html");
    }
}

function register() {
    document.getElementById("register").onclick = function() {
        console.log("Klikattu regs");
        window.location.assign("http://localhost:8080/registration.html");
    }
}

function continueWithoutRegistering() {
    document.getElementById("continue").onclick = function() {
        console.log("Klikattu regs");
        window.location.assign("http://localhost:8080/topics.html");
    }
}