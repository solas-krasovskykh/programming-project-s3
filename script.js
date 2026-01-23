function log_placeholder(){ //replace with proper login subpage
    usern = prompt("Username:","");
    passwd = prompt("Password:","");
}

window.addEventListener('load', function () {
    if(1==1){ //no user cookie
        document.getElementById("user-actions").innerHTML="<button onClick=log_placeholder()>Log in/Register</button>"; //convert to form?
    }
    else{
        document.getElementById("user-actions").innerHTML="Post/Log out/Username";
    }
})