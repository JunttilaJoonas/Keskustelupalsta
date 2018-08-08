var xhr = new XMLHttpRequest();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return(false);
}

function fetchMessages() {
    var id = getQueryVariable("id");
    var url = "http://localhost:8080/messages/topic/" + id;
    console.log("rest-osoite: " + url);

    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var messages = JSON.parse(xhr.responseText);
                console.dir(messages);
                addMessagesToPage(messages, id);
            }
        }
    };

    xhr.open('get', url);
    xhr.send(null);
}

function addMessagesToPage(messages, topicId) {
    var pageTitle = document.getElementById("topic-title");
    var table = document.getElementById("messagetable");
    var topicName = messages[0].topicid.head;
    console.log(topicName);
    pageTitle.innerHTML = topicName;

    for (var i = 0; i < messages.length; i++) {
        var user = messages[i].userid.username;
        var timestamp = messages[i].timestamp;
        var message = messages[i].text;

        var tablerow = document.createElement("tr");
        var userField = document.createElement("td");
        var timeField = document.createElement("td");
        var textField = document.createElement("td");

        userField.appendChild(document.createTextNode(user));
        timeField.appendChild(document.createTextNode(timestamp));
        textField.appendChild(document.createTextNode(message));

        tablerow.appendChild(textField);
        tablerow.appendChild(userField);
        tablerow.appendChild(timeField);
        table.appendChild(tablerow);
    }
}

function postNewMessage() {
    var url = "http://localhost:8080/messages";
    var data = {};
    data.text = document.getElementById("new-message-text").value;
    data.topicid = getQueryVariable("id");
    data.userid = 1;
    var json = JSON.stringify(data);
    console.log(json);

    xhr.open('post', url);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === "201") {
            console.table(users);
        } else {
            console.error(users);
        }
    }

    xhr.send(json);
    // location.reload();
}