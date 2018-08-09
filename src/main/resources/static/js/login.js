var cookies = {};
var user;
cookies = document.cookie;
console.log(cookies);

function saveUserToCookies() {
    var username = document.getElementById("username").value;
    console.log(document.getElementById("username").value);
    var expires = new Date(Date.now()+24*60*60*1000).toString();
    console.log("Expiring date added");
    document.cookie = "username=" + username;
    console.log("Cookies saved");
    console.log("cookies: " + document.cookie);
}

function loadUserFromCookies() {
    var lastUser = cookies["_lastUser"];
    return lastUser;
}

function loginAsLastUser() {
    var lastUser = loadUserFromCookies();
}

function login() {
    var inputUsername = document.getElementById("username").value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText.length == 0) {
                alert("Käyttäjätunnusta ei löydy.");
            } else {
                var result = JSON.parse(xhr.responseText);

                console.log(result, inputUsername);
                checkUser(result, inputUsername);

            }
        }
    };
    xhr.open('GET', "http://localhost:8080/users/user/" + inputUsername);
    xhr.send();
}

function checkUser(user, inputUsername) {
    var inputPassword = document.getElementById("password").value;
    if (inputUsername == user.username && inputPassword==user.password) {
        setCookie("username", inputUsername, 1);
        setCookie("userid", user.id, 1);
        console.log(getKeksi("username"));
        window.location.assign("http://localhost:8080/topics.html");
    } else {
        alert("Käyttäjätunnus tai salasana on virheellinen.")
    }
}

function setCookie(keksinNimi, keksinArvo, voimassaolo) {
    var pvm = new Date();
    pvm.setTime(pvm.getTime() + (voimassaolo * 24 * 60 * 60 * 1000));
    var voimassaoloaika = "päättyy=" + pvm.toUTCString();
    var x = document.cookie = keksinNimi + "=" + keksinArvo + ";" + voimassaoloaika + ";path=/";
    // console.dir(x);
}

function getKeksi(name) {
    var check = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
    var result = check.exec(document.cookie);
    return (result === null) ? null : result[1];
}


