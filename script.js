let currentUser = "";
let users = [];
let posts = [];

function logIn(){ //change to proper input fields?
    let usern = prompt("Username:","");
    for(let i = 0; i < users.length; i++){
        if(users[i][0] == usern){
            let passwd = prompt("Password:","");
            if(users[i][1] == passwd){
                alert("Logged in successfully!")
                currentUser = usern;
                refreshUserfield();
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
    if(usern.length >=1 && usern.length <= 20){
        for(let i = 0; i < users.length; i++){
            if(users[i][0] == usern){
                alert("User already exists!");
                return;
            }
        }
    }
    else{
        alert("Username has to be between 1-20 characters long!");
        return;
    }
    let passwd = prompt("Password:","");
    if(passwd.length >= 4 && passwd.length <= 30){ //add more requirements - capital letter, number and such
        users.push([usern, passwd]);
        alert("User created successfully!");
        currentUser = usern;
        refreshUserfield();
    }
    else alert("Password has to be between 4-30 characters long!");
}

function logOut(){
    currentUser = "";
    refreshUserfield();
}

function removePost(i){
    posts.splice(i, 1);
    refreshFeed();
}

function makePost(){ //change to proper input fields?
    let tit = prompt("Title:","");
    if(tit.length <=0 || tit.length >= 50){
        alert("The title must be between 1-50 characters long!");
        return
    }
    let cont = prompt("Post content:","");
    let d = new Date();
    posts.push([tit, document.getElementById("user").innerHTML, cont, 
        d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear()+", "+d.getHours()+":"+d.getMinutes()]);
    refreshFeed();
}

function refreshUserfield(){
    if(currentUser != ""){
        document.getElementById("user-actions").innerHTML=
        "<div id=user>"+currentUser+"</div><button onClick=makePost()>Create post</button><button onClick=logOut()>Log out</button>";
    }
    else{
        document.getElementById("user-actions").innerHTML=
        "<div id=user style='display: none;'></div><button onClick=logIn()>Log in</button><button onClick=register()>Register</button>";
    }
    refreshFeed();
}

function refreshFeed(){ //refreshes the post feed + saves everything in the local storage
    document.getElementById("feed").innerHTML="";
    let hasButton = "";
    for(let i = posts.length-1; i >= 0; i--){
        if(posts[i][1] == currentUser || currentUser == "admin")
            hasButton="<button onClick=removePost("+i+")></button>";
        document.getElementById("feed").innerHTML+=
        "<div class=post><h2 class=post-title>"+posts[i][0]+"</h2>"+hasButton+ //fix formatting (<xmp>?)
        "<h5 class=meta>"+posts[i][3]+" by "+posts[i][1]+"</h5><div class=post-content>"+posts[i][2]+"</div></div>";
        hasButton = "";
    }
    saveData();
}

function saveData(){
    localStorage.postsStorage = JSON.stringify(posts);
    localStorage.usersStorage = JSON.stringify(users);
    localStorage.storedUser = currentUser;
}


window.addEventListener('load', function () { //creates default post + admin account on initial use / pulls data out of local storage then loads it
    if(localStorage.postsStorage == undefined)
        localStorage.postsStorage = JSON.stringify([["test", "test", "test", "test "]]);
    if(localStorage.usersStorage == undefined)
        localStorage.usersStorage = JSON.stringify([["admin", "admin"]]);
    if(localStorage.storedUser == undefined)
        localStorage.storedUser = ""; //code can probably be improved for these lol
    posts = JSON.parse(localStorage.postsStorage);
    users = JSON.parse(localStorage.usersStorage);
    currentUser = localStorage.storedUser;
    refreshUserfield();
    refreshFeed();
})