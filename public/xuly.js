
// ket noi sever

var socket = io("https://chatbyweb.herokuapp.com");

socket.on("Server-send-userfailed", function () {
    alert("TK da dang ky");
});
socket.on("Sever-send-loginSucc", function (data) {
    $("#currUser").html(data);
    $("#login").hide(2);
    $("#chat").show(2);

});
socket.on("Server-send-list", function (data) {
    $("#boxC").html("")

    data.forEach(function (i) {
        $("#boxC").append("<div class='username'>" + i + "</div>");
    });
});
socket.on("server-send-mess", function (data) {
    $("#lag").scrollTop($("#lag")[0].scrollHeight);
    $("#ListMess").append("<div class='ms'>" +"[" + "<span id='color'>" +data.un +"</span>"+ "]" + ": " + data.nd + "</div>");
   
   
});
socket.on("ai-do-dang-go", function (data) {
    $("#thongbao").html("<img width = 30px src='tenor.gif' alt='chatmess'>");
});
socket.on("ai-do-het-go", function (data) {
    $("#thongbao").html("");
});


$(document).ready(function () {
    // alert("heloo jquery");
    $("#login").show();
    $("#chat").hide();

    $("#btnRegister").click(function () {
        if($("#userN").val()!=""){
        socket.emit("client-send-user", $("#userN").val());
        }
    });

    $("#btnLogout").click(function () {
        socket.emit("logout");
        $("#chat").hide(2);
        $("#login").show(1);

    });

    $("#btnSendMess").click(function () {
        if ($("#textMess").val() != "") {
            socket.emit("user-send-mess", $("#textMess").val());
            $("#textMess").val("");
        }

    });
    $("#textMess").keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            if ($("#textMess").val() != "") {
                socket.emit("user-send-mess", $("#textMess").val());

                $("#textMess").val("");
            }

        }

    });
    $("#textMess").focusin(function () {
        socket.emit("dang-go");

    });

    $("#textMess").focusout(function () {
        socket.emit("ngung-go");

    });

    $("#lag").scrollTop($("#lag")[0].scrollHeight);

});
