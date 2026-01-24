let users = [["admin","admin"]];
let posts = [["post1", "author", "cooooooooooooooooooontent"], ["post2", "differentauthor", "cooooooooooooooooooontent"]];

function logIn(){
    let usern = prompt("Username:","");
    for(let i = 0; i < users.length; i++){
        if(users[i][0] == usern){
            let passwd = prompt("Password:","");
            if(users[i][1] == passwd){
                alert("Logged in successfully!")
                document.getElementById("user-actions").innerHTML=
                "<button onClick=makePost()>Create post</button><button onClick=logOut()>Log out</button><div id=user>"+users[i][0]+"</div>";
                refresh();
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
    "<button onClick=logIn()>Log in</button><button onClick=register()>Register</button><div id=user style='display: none;'></div>";
    refresh();
}

function removePost(i){
    if(i == 0)
        posts.shift();
    else
        posts.splice(i, i);
    refresh();
}

function makePost(){
    let tit = prompt("Title:","");
    let cont = prompt("Post content:","");
    posts.push([tit, document.getElementById("user").innerHTML, cont]);
    refresh();
}

function refresh(){
    document.getElementById("feed").innerHTML="";
    let hasButton="";
    for(let i = posts.length-1; i >= 0; i--){
        if(posts[i][1] == document.getElementById("user").innerHTML || document.getElementById("user").innerHTML == "admin")
            hasButton="<button onClick=removePost("+i+")>🗑️</button>";
        document.getElementById("feed").innerHTML+=
        "<div class=post><h2>"+posts[i][0]+"</h2>"+hasButton+"<h5>"+posts[i][1]+"</h5><div class=post-content>"+posts[i][2]+"</div></div>";
    }
}


window.addEventListener('load', function () {
    refresh();
})