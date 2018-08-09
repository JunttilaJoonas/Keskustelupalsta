function checkIfUsernameExists() {
    var username1 = document.getElementById("username").value;
    console.log("höö");
    console.log(username1);
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function () {
        console.log("pööö");
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            console.log(xhr1.responseText.length);
            if (xhr1.responseText.length>0) {
                alert("Käyttäjätunnus on jo olemassa");
            } else if (! /^[a-zA-Z0-9]+$/.test(username1)) {
                alert("Käyttäjätunnus saa sisältää vain kirjaimet a-z ja numerot 0-9.");
            } else {
                addUser();
            }
        }
    };
    xhr1.open('GET', "http://localhost:8080/users/user/" + username1);
    xhr1.send();
}

function addUser() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var email = document.getElementById("email");
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var birthdate = document.getElementById("birthdate");
    var data = {};
    data.username = username.value;
    data.password = password.value;
    data.email = email.value;
    data.firstname = firstname.value;
    data.lastname = lastname.value;
    var birthday = birthdate.value;
    data.birthdate = new Date(birthday);
    console.log(new Date(birthday));
    var json = JSON.stringify(data);
    console.log(json);

    var url = "http://localhost:8080/users";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            // var newId = xhr.responseText;
            console.log("Uusi käyttäjä luotu.");
            setCookie("username", username.value, 1);
            // setCookie("userid", parseInt(newId), 1);
            console.log("Nyt siirrytään");
            window.location.href = "http://localhost:8080/topics.html";
        }
    };
    xhr.send(json);
}


    