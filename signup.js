
document.getElementById("btn").addEventListener("click", function(){
    const email = document.getElementById("email");
    const emailValue = email.value;

    const password = document.getElementById("password");
    const passwordValue = password.value;

    if(emailValue == "admin" && passwordValue == "admin123"){
        alert("Login Success");
        window.location.assign("home.html");
    }else{
        alert("Login Failed");
        return;
    }

})
