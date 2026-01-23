const users = [["admin","admin"]];

function logIn(){
    let usern = prompt("Username:","");
    for(let i = 0; i < users.length; i++){
        if(users[i][0] == usern){
            let passwd = prompt("Password:","");
            if(users[i][1] == passwd){
                alert("Logged in successfully!")
                document.getElementById("user-actions").innerHTML=
                "<button onClick=logOut()>Log out</button><div id=user>"+users[i][0]+"</div>";
                return;
            }
            else{
                alert("Incorrect password!")
                return;
            }
        }
    }
    alert("User does not exist!")
}

function register(){
    let usern = prompt("Username:","");
    for(let i = 0; i < users.length; i++){
        if(users[i][0] == usern){
            alert("User already exists!");
            return;
        }
    }
    let passwd = prompt("Password:","");
    users.push([usern, passwd]);
    alert("User created successfully!");
}

function logOut(){
    document.getElementById("user-actions").innerHTML=
    "<button onClick=logIn()>Log in</button><button onClick=register()>Register</button>";
}

//window.addEventListener('load', function () {
//    document.getElementById("user-actions").innerHTML=
//        ""; //convert to form?
//
//    fetch('users.txt').then(response => response.text()).then(text => console.log(text))
//})