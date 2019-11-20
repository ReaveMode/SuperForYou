function login() {
    var username = document.getElementById("uname").value
    var password = document.getElementById("psword").value
    if (username == "Sebby" && password == "Jordan") {
        window.location = "MainGeneric.html"
    }
    else {
        alert("Your Username or Password is incorrect!")
    }
}

