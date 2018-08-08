var xhr = new XMLHttpRequest();

function fetchMessagesByTopicId(id) {
    var url = "http://localhost:8080/messages/topic/" + id;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var taulukko = JSON.parse(xhr.responseText);
                console.log(taulukko);
            }
        }
    }
}