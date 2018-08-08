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

function fetchMessagesByTopicId() {
    var id = getQueryVariable("id");
    var url = "http://localhost:8080/messages/topic/" + id;
    console.log(url);

    var taulukko;

    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("url=" + url);
                taulukko = JSON.parse(xhr.responseText);
                console.dir(taulukko);
            }
        }
    };

    xhr.open('get', url);
    xhr.send(taulukko);
}