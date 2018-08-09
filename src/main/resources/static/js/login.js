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

function checkUser(result, inputUsername) {
    var inputPassword = document.getElementById("pass").value;
    if (inputUsername == result.username && inputPassword==result.password) {
        saveUserToCookies();
        window.location.assign("http://localhost:8080/topics.html");
    } else {
        alert("Käyttäjätunnus tai salasana on virheellinen.")
    }
}

