var cookies = {};
var user;
cookies = document.cookie;
console.log(cookies);

function saveUserToCookies() {
    cookies["_lastUser"] = document.getElementById("username").value;
    console.log(document.getElementById("username").value);
    var expires = new Date(Date.now()+24*60*60*1000).toString();
    console.log("Expiring date added")
    var cookieString = "";
    for (var key in cookies) {
        cookieString = key + "=" + cookies[key] + ";" + expires + ";";
        document.cookie = cookieString;
        console.log(cookieString);
    }
    console.log("Cookies saved");
}

function loadUserFromCookies() {
    var lastUser = cookies["_lastUser"];
    return lastUser;
}

function loginAsLastUser() {
    var lastUser = loadUserFromCookies();
}

