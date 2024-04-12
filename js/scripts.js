const login = document.getElementById("login-btn");
const create = document.getElementById("create-btn");

// Check data have or haven't in localStorage 
function checkData(){
    if(localStorage.getItem("post_user_data")){
        return true;
    }
    else{
        return false;
    }
}
// Check user login or logout
function checkLogin(){
    if(checkData()){
        login.classList.add("logout");
        login.classList.remove("login");
        login.innerHTML = "Logout";
        
    }
}

// Do user login or logout
function loginOut(){
    if(login.classList.contains("login")){
        window.location.href = "login.html";
    }
    else{
        let text = "Are you sure want to logout?"
        if(confirm(text) == true){

            localStorage.removeItem("post_user_data");
            login.classList.add("login");
            login.classList.remove("logout");
            login.innerHTML = "Login";
        }
    }
}
// Check to create new post

function checkToCreate(){
    if(checkData()){
        window.location.href = "create.html";
    }
    else{
        const text = "If you want to create post, please login first.";
        if(confirm(text) == true){
            window.location.href = "login.html";
        }
    }
}

window.onload = checkLogin();
login.addEventListener("click", loginOut);
create.addEventListener("click", checkToCreate);


