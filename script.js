let users = [];
let posts = [];

function logIn(){ //change to proper input fields?
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

function register(){ //change to proper input fields?
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
    refresh();
}

function logOut(){
    document.getElementById("user-actions").innerHTML=
    "<button onClick=logIn()>Log in</button><button onClick=register()>Register</button><div id=user style='display: none;'></div>";
    refresh();
}

function removePost(i){
    posts.splice(i, 1);
    refresh();
}

function makePost(){ //change to proper input fields?
    let tit = prompt("Title:","");
    let cont = prompt("Post content:","");
    let d = new Date();
    posts.push([tit, document.getElementById("user").innerHTML, cont, 
        d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear()+", "+d.getHours()+":"+d.getMinutes()]);
    refresh();
}

function refresh(){ //refreshes the post feed + saves everything in the local storage
    document.getElementById("feed").innerHTML="";
    let hasButton="";
    for(let i = posts.length-1; i >= 0; i--){
        if(posts[i][1] == document.getElementById("user").innerHTML || document.getElementById("user").innerHTML == "admin")
            hasButton="<button onClick=removePost("+i+")>🗑️</button>";
        document.getElementById("feed").innerHTML+=
        "<div class=post><h2 class=post-title>"+posts[i][0]+"</h2>"+hasButton+
        "<h5>"+posts[i][1]+": "+posts[i][3]+"</h5><div class=post-content>"+posts[i][2]+"</div></div>";
    }
    localStorage.postsStorage = JSON.stringify(posts);
    localStorage.usersStorage = JSON.stringify(users);
}


window.addEventListener('load', function () { //creates default post + admin account on initial use / pulls data out of local storage then loads it
    console.log(localStorage.usersStorage);
    if(localStorage.postsStorage == undefined)
        localStorage.postsStorage = JSON.stringify([["test", "test", "test", "test "]]);
    if(localStorage.usersStorage == undefined)
        localStorage.usersStorage = JSON.stringify([["admin", "admin"]]);
    posts = JSON.parse(localStorage.postsStorage);
    users = JSON.parse(localStorage.usersStorage);
    refresh();
})