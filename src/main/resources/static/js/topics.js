function getTable() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);

            console.log(result);
            getTopics(result);
        }
    };
    xhr.open('GET', "http://localhost:8080/topics");
    xhr.send();
}

function getTopics(result) {
    if(result.length > 0) {
        console.log("heipä hei");
        console.log("cookies: " + document.cookie);
        var list = document.getElementById("tulos");
        var table = document.createElement("table");
        var tBody = document.createElement("tbody");
        var tHead = document.createElement("thead");
        var headRow = document.createElement("tr");
        var head1 = document.createElement("th");
        head1.appendChild(document.createTextNode("Viestiketju"));
        var head2 = document.createElement("th");
        head2.appendChild(document.createTextNode("Aloittaja"));
        var head3 = document.createElement("th");
        head3.appendChild(document.createTextNode("Aika"));
        headRow.appendChild(head1);
        headRow.appendChild(head2);
        headRow.appendChild(head3);
        tHead.appendChild(headRow);
        table.appendChild(tHead);
    }


    var location = window.location.href;
    console.log("location: " + location);

    for (var i = 0; i < result.length; i++) {
        var topic = result[i];
        var userid = topic.userid;
        var username = userid.username;

        var topicRow = document.createElement("tr");
        var topicHead = document.createElement("td");
        var head = topic.head;
        var link = document.createElement("a");
        var url;
        if (location.includes("con")) {
            url = "http://localhost:8080/contopicmessages.html?id=";
        } else {
            url = "http://localhost:8080/topicmessages.html?id=";
        }
        link.setAttribute("href", url + topic.id);
        link.innerHTML = head;
        topicHead.appendChild(link);
        var topicUser = document.createElement("td");
        topicUser.appendChild(document.createTextNode(username));
        console.log(topic.timestamp);
        var dateToTable = new Date(topic.timestamp);
        var topicTimestamp = document.createElement("td");
        var options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        topicTimestamp.appendChild(document.createTextNode(dateToTable.toLocaleDateString('fi', options)));
        var topicId = document.createElement("td");
        topicRow.appendChild(topicHead);
        topicRow.appendChild(topicUser);
        topicRow.appendChild(topicTimestamp);

        tBody.appendChild(topicRow);
    }
    console.log(tBody);
    table.appendChild(tBody);
    console.log(table);
    list.appendChild(table);
}