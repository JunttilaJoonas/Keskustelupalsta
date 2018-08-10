var user;
cookies = document.cookie;
console.log(cookies);

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
        console.log(getCookieUsername("username"));
        window.location.assign("http://localhost:8080/topics.html");
    } else {
        alert("Käyttäjätunnus tai salasana on virheellinen.")
    }
}

function setCookie(name, value, expire) {
    var date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    var expiration = "päättyy=" + date.toUTCString();
    var x = document.cookie = name + "=" + value + ";" + expiration + ";path=/";
}

function getCookieUsername(name) {
    var check = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
    var result = check.exec(document.cookie);
    return (result === null) ? null : result[1];
}


