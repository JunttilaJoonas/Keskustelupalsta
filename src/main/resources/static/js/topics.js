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
    var list = document.getElementById("tulos");
    var table = document.createElement("table");
    var tBody = document.createElement("tbody");
    var tHead = document.createElement("thead");
    var headRow = document.createElement("tr");
    var head1 = document.createElement("th");
    head1.appendChild(document.createTextNode("Viestiketju"));
    var head2 = document.createElement("th");
    head2.appendChild(document.createTextNode("Aika"));
    var head3 = document.createElement("th");
    head3.appendChild(document.createTextNode("Aloittaja"));
    var head4 = document.createElement("th");
    head4.appendChild(document.createTextNode("ID"));
    headRow.appendChild(head1);
    headRow.appendChild(head2);
    headRow.appendChild(head3);
    headRow.appendChild(head4);
    tHead.appendChild(headRow);
    table.appendChild(tHead);
    // table.appendChild(tBody);

    for (var i = 0; i < result.length; i++) {
        var topic = result[i];
        var userid = topic.userid;
        var username = userid.username;
        var topicRow = document.createElement("tr");
        var topicHead = document.createElement("td");
        var head = topic.head;
        var link = document.createElement("a");
        link.setAttribute("href", "http://localhost:8080/topicmessages.html?id=" + topic.id);
        link.innerHTML = head;
        topicHead.appendChild(link);
        var topicTimestamp = document.createElement("td");
        topicTimestamp.appendChild(document.createTextNode(topic.timestamp));
        var topicUser = document.createElement("td");
        topicUser.appendChild(document.createTextNode(username));
        topicRow.appendChild(topicHead);
        topicRow.appendChild(topicTimestamp);
        topicRow.appendChild(topicUser);
        tBody.appendChild(topicRow);
    }
    console.log(tBody);
    table.appendChild(tBody);
    console.log(table);
    list.appendChild(table);
}