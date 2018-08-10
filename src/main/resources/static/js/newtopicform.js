function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addNewTopic(event) {
    event.preventDefault();
    var topic = {};
    topic.head = document.getElementById("head").value;
    topic.userid = parseInt(getCookie("userid"));
    console.log(topic);
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

