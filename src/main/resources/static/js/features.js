function login() {
    document.getElementById("login").onclick = function() {
        console.log("Klikattu regs");
        window.location.assign("http://localhost:8080/topics.html");
        document.getElementById("welcome").removeClass("hide");
        welcome(username);
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

function welcome(username) {
    $("<h3></h3>").text("Tervetuloa " + username + "!").appendTo("#welcome");
}
