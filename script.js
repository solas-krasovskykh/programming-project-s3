let currentUser = "";
let users = []; //structure: username, password
let posts = []; //structure: title, username, content, date, was edited

function showAuth(which){
    document.getElementById("auth-box-container").classList.add("active");
    document.getElementById(["login-form", "register-form"][which]).style.display = "flex";
    document.getElementById(["register-form", "login-form"][which]).style.display = "none";
    document.getElementById("login-error").innerText = document.getElementById("register-error").innerText = "";
}

function logIn(){
    let usern = document.getElementById("login-username").value;
    for(let i = 0; i < users.length; i++){
        if(users[i][0] == usern){
            let passwd = document.getElementById("login-password").value;
            if(users[i][1] == passwd){
                currentUser = usern;
                refreshUserfield();
                return;
            }
            else{
                document.getElementById("login-error").innerText = "Incorrect password!";
                return;
            }
        }
    }
    document.getElementById("login-error").innerText = "User does not exist!";
}

function register(){
    let usern = document.getElementById("register-username").value;
    if(usern.length >=1 && usern.length <= 20){
        for(let i = 0; i < users.length; i++){
            if(users[i][0] == usern){
                document.getElementById("register-error").innerText = "User already exists!";
                return;
            }
        }
    }
    else{
        document.getElementById("register-error").innerText = "Username has to be between 1-20 characters long!";
        return;
    }
    let passwd = document.getElementById("register-password").value;
    if(passwd.length >= 4 && passwd.length <= 30){ //add more requirements? - capital letter, number and such
        if(passwd != document.getElementById("confirm_password").value){
            document.getElementById("register-error").innerText = "The passwords must line up!";
            return;
        }
        users.push([usern, passwd]);
        currentUser = usern;
        refreshUserfield();
    }
    else document.getElementById("register-error").innerText = "Password has to be between 4-30 characters long!";
}

function logOut(){
    currentUser = "";
    refreshUserfield();
}

function removeUser(which){
    for(i = 0; i<posts.length; i++){
        if(posts[i][1] == users[which][0])
            posts[i][1] = "(removed)";
    }
    users.splice(which, 1)
    refreshUserfield();
}

function removePost(i){
    posts.splice(i, 1);
    refreshFeed();
}

function openCreatorPopup(which){
    let posthelper=["", "", "", ""];
    if(which != -1) //"which" = -1 means a new post
        posthelper = posts[which];
    document.getElementById("new-post-title").value = posthelper[0];
    document.getElementById("new-post-content").value = posthelper[2];
    document.getElementById("new-post-error").innerText = "";
    document.getElementById("submit-button").setAttribute( "onClick", `makePost(${which})` );
    document.getElementById("modal").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}
function closeCreatorPopup(){
    document.getElementById("modal").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function makePost(which){ //also edits existing posts
    let tit = document.getElementById("new-post-title").value;
    if(tit.length <=0 || tit.length >= 50){
        document.getElementById("new-post-error").innerText = "The title must be between 1-50 characters long!"//alert("The title must be between 1-50 characters long!");
        return;
    }
    let cont = document.getElementById("new-post-content").value;
    let d = new Date();
    let newPost = [tit, currentUser, cont, 
        `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()<10?"0":""}${d.getMinutes()}`, ""];
    if(which == -1)
        posts.push(newPost);
    else{
        posts[which] = newPost;
        posts[which][4] = "(edited)"
    }
    closeCreatorPopup();
    refreshFeed();
}


function refreshUserfield(){
    document.getElementById("auth-box-container").classList.remove("active");
    if(currentUser != ""){
        document.getElementById("user-actions").innerHTML=
        `<div id=user>${currentUser}</div><button onClick=openCreatorPopup(-1)>Create post</button><button onClick=logOut()>Log out</button>`;
        if(currentUser == "admin"){
            document.getElementById("panel").innerHTML = "";
            for(let i = 1; i<users.length; i++)
                document.getElementById("panel").innerHTML += `<li>${users[i][0]}<button id=delete-button onclick=removeUser(${i})></button</li>`;
        }
    }
    else{
        document.getElementById("user-actions").innerHTML=
        "<div id=user style='display: none;'></div><button onClick=showAuth(1)>Register</button><button onClick=showAuth(0)>Log in</button>";
        document.getElementById("panel").innerHTML = "";
    }
    refreshFeed();
}

function refreshFeed(isSearch){ //refreshes the post feed + saves everything in the local storage
    document.getElementById("feed").innerHTML="";
    let hasButton = "";
    for(let i = posts.length-1; i >= 0; i--){
        if(posts[i][1] == currentUser || currentUser == "admin"){
            hasButton = `<button id=delete-button onClick=removePost(${i})></button>`;
            if(posts[i][1] == currentUser)
                hasButton = `<button id=edit-button onClick=openCreatorPopup(${i})></button>` + hasButton;
        }
        document.getElementById("feed").innerHTML+=
        `<div class=post><h2 class=post-title>${posts[i][0]}</h2><div class=post-actions>${hasButton}</div><h5 class=meta>${posts[i][3]} by ${posts[i][1]} ${posts[i][4]}</h5><div class=post-content>${posts[i][2]}</div></div>`;
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
        localStorage.postsStorage = JSON.stringify([["First post", "admin", "This post shows up by default the first time the website is booted.", "1.1.1970, 0:00", ""]]);
    if(localStorage.usersStorage == undefined)
        localStorage.usersStorage = JSON.stringify([["admin", "admin"]]);
    if(localStorage.storedUser == undefined)
        localStorage.storedUser = ""; //code can probably be improved for these lol
    posts = JSON.parse(localStorage.postsStorage);
    users = JSON.parse(localStorage.usersStorage);
    currentUser = localStorage.storedUser;
    refreshUserfield();
    refreshFeed();
    document.getElementById("loading").classList.remove("active");
})