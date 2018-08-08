function showWelcome() {
    hideLogin();
    $("#logout").removeClass("hide");
    $("#logout").addClass("logout");
}

function hideLogin() {
    $("#login").addClass("hide");
}
