var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var birthdate = document.getElementById("birthdate");
var form = document.getElementById("submit");
var url = "http://localhost:8080/users";
var xhr = new XMLHttpRequest();

// var error;

function addUser() {
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
    saveUserToCookies();

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log("Uusi käyttäjä luotu.");
            // window.location.href="http://localhost:8080/topics.html";
        }
    };
    xhr.send(json);
}


// email.addEventListener("input", function (event) {
//     // Each time the user types something, we check if the
//     // email field is valid.
//     if (email.validity.valid) {
//         // In case there is an error message visible, if the field
//         // is valid, we remove the error message.
//         error.innerHTML = ""; // Reset the content of the message
//         error.className = "error"; // Reset the visual state of the message
//     }
// }, false);
//
// form.addEventListener("submit", function (event) {
//     // Each time the user tries to send the data, we check
//     // if the email field is valid.
//     if (!email.validity.valid) {
//
//         // If the field is not valid, we display a custom
//         // error message.
//         error.innerHTML = "Sähköpostiosoite on väärin.";
//         error.className = "Virhe";
//         // And we prevent the form from being sent by canceling the event
//         event.preventDefault();
//     }
// }, false);


    