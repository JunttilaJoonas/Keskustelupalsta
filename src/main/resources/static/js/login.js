var cookies = {};
var user;
cookies = document.cookie;
console.log(cookies);

function saveUserToCookies() {
    cookies["_lastUser"] = document.getElementById("username").value;
    console.log(document.getElementById("username").value);
    var expires = new Date(Date.now()+24*60*60*1000).toString();
    console.log("Expiring date added");
    var cookieString = "";
    for (var key in cookies) {
        cookieString = key + "=" + cookies[key] + ";" + expires + ";";
        document.cookie = cookieString;
        console.log(cookieString);
    }
    console.log("Cookies saved");
}

function loadUserFromCookies() {
    var lastUser = cookies["_lastUser"];
    return lastUser;
}

function loginAsLastUser() {
    var lastUser = loadUserFromCookies();
}

function login() {
    var inputUsername = document.getElementById("user").value;

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

function checkUser(result, inputUsername) {
    var inputPassword = document.getElementById("pass").value;
    if (inputUsername == result.username && inputPassword==result.password) {
        // console.log(loadUserFromCookies());
        asetaKeksi("username", inputUsername, 1);
        console.log(getKeksi("username"));
        window.location.assign("http://localhost:8080/topics.html");
    } else {
        alert("Käyttäjätunnus tai salasana on virheellinen.")
    }
}

function asetaKeksi(keksinNimi, keksinArvo, voimassaolo) {
    var pvm = new Date();
    pvm.setTime(pvm.getTime() + (voimassaolo * 24 * 60 * 60 * 1000));  // Millisekunnit päiviksi
    var voimassaoloaika = "päättyy=" + pvm.toUTCString();
    var x = document.cookie = keksinNimi + "=" + keksinArvo + ";" + voimassaoloaika + ";path=/";
    // console.dir(x);
}

function getKeksi(nimi) {
    var tarkistus = new RegExp("(?:^" + nimi + "|;\s*" + nimi + ")=(.*?)(?:;|$)", "g"); // kaikki osumat. saa olla whitespacea jne.
    var tulos = tarkistus.exec(document.cookie);
    return (tulos === null) ? null : tulos[1];
}

