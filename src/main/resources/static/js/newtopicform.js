function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function addNewTopic(event) {
    event.preventDefault();
    var topic = {};
    topic.head = document.getElementById("head").value;
    var username = getCookie("username");
    console.log(username);
    topic.userid = 1;
    var json = JSON.stringify(topic);
    console.log(json);

    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', 'http://localhost:8080/topics', true);
    xhr1.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr1.onload = function () {
        if (xhr1.readyState == 4 && xhr1.status == 201) {
            console.log("Postattu");
            var taulu = xhr1.getResponseHeader("location").split("/");
            var index = taulu[taulu.length-1];
            console.log(index);
            window.location.href="http://localhost:8080/topicmessages.html?id=" + index;
        }
    };
    xhr1.send(json);
}

