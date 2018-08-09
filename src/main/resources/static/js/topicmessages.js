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

function showTitleAndMessagesOnLoad() {
    var topicId = getQueryVariable("id");
    var url = "http://localhost:8080/topics/" + topicId;
    xhr.open('get', url);
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("otsikko haettu");
                var topic = JSON.parse(xhr.responseText);
                console.log("otsikko-olio: " + topic);
                var topicName = topic.head;
                console.log(topicName);
                var pageTitle = document.getElementById("topic-title");
                pageTitle.innerHTML = topicName;

                fetchMessages();
            }
        }
    };
    xhr.send(null);
}

function fetchMessages() {
    var topicId = getQueryVariable("id");
    var url = "http://localhost:8080/messages/topic/" + topicId;
    console.log("rest-osoite: " + url);

    xhr.open('get', url);
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var messages = JSON.parse(xhr.responseText);
                console.dir(messages);
                addMessagesToPage(messages, topicId);
            }
        }
    };
    xhr.send(null);
}

function addMessagesToPage(messages, topicId) {

    var table = document.getElementById("messagetable");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    var tHead = document.createElement("thead");
    var headRow = document.createElement("tr");
    var head1 = document.createElement("th");
    head1.appendChild(document.createTextNode("Viesti"));
    var head2 = document.createElement("th");
    head2.appendChild(document.createTextNode("Kirjoittaja"));
    var head3 = document.createElement("th");
    head3.appendChild(document.createTextNode("Aika"));
    headRow.appendChild(head1);
    headRow.appendChild(head2);
    headRow.appendChild(head3);
    tHead.appendChild(headRow);
    table.appendChild(tHead);

    for (var i = 0; i < messages.length; i++) {
        var user = messages[i].userid.username;
        var timestamp = new Date(messages[i].timestamp);
        var message = messages[i].text;

        var tablerow = document.createElement("tr");
        var userField = document.createElement("td");
        var timeField = document.createElement("td");
        var textField = document.createElement("td");

        userField.appendChild(document.createTextNode(user));
        var options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        timeField.appendChild(document.createTextNode(timestamp.toLocaleDateString('fi', options)));
        textField.appendChild(document.createTextNode(message));

        tablerow.appendChild(textField);
        tablerow.appendChild(userField);
        tablerow.appendChild(timeField);
        table.appendChild(tablerow);
    }
}

function postNewMessage() {
    var url = "http://localhost:8080/messages";
    var textField = document.getElementById("new-message-text");
    var data = {};
    data.text = textField.value;
    textField.value = "";
    data.topicid = parseInt(getQueryVariable("id"));
    data.userid = 1;
    var json = JSON.stringify(data);
    console.log(json);

    xhr.open('post', url);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log("Postattu");
            fetchMessages();
        }
    };

    xhr.send(json);
}