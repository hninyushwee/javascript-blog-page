const form = document.getElementById("create-form");
let title =  document.getElementById("title");
let description =  document.getElementById("description");
let image =  document.getElementById("image");

 // Get Id from url
 const urlParams = new URLSearchParams(window.location.search);
 const id = urlParams.get('id');

//fetch data from json for edit.
const putDataInput =  async () =>{
    let res = await fetch(`http://localhost:3000/posts/${id}`);
    const data = await res.json();
    
    title.value = data.title;
    description.value = data.content;
    image.value = data.image_url;
}

// Check user login
function checkLogin(){
    if(!localStorage.getItem("post_user_data")){
       return window.location.href = "index.html";
    }
    //if id has in url, put data to input box.
    if(id){
        putDataInput();
        document.querySelector(".welcome-text").innerHTML = "Now, You Can Edit Post";
        document.getElementById("post").value = "Edit Post";
    }
}

// create new post
async function addPost(inputData){
    
    //add data fetch post method,
    try {
        let res = await fetch("http://localhost:3000/posts",{
        method : 'POST',
        headers:  {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(inputData)
        });

        if (res.ok){
            alert("You have been create new post");
            title.value = "";
            description.value = "";
            image.value = "";
        }
        else{
            console.log("Error has found");
        }
        
    } catch (error) {
        console.log(error);
    } 
}

//update post 
async function editPost(data){

    try {
        let res = await fetch(`http://localhost:3000/posts/${id}`,{
        method : 'PUT',
        headers:  {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(data)
        });

        if (res.ok){
            alert("You have been update this post");
            window.location = "index.html";

        }
        else{
            console.log("Error has found");
        }
        
    } catch (error) {
        console.log(error);
    } 

}

// create and  update new post
async function addEditPost(e){

    e.preventDefault();

    const date = new Date().toISOString();
    let userName = "";

    //Get user name from local storage;
    if(!localStorage.getItem("post_user_data")){
       return alert("Please login first.");
    }
    else{
        userName = JSON.parse(localStorage.getItem("post_user_data")).name;
    }

    //get data from input
    const inputData = {
        title : title.value,
        image_url : image.value,
        content : description.value,
        created_at : date, 
        created_by : userName 
    } 
    //if it have id, do update.And if it not have, do create post.
    if(id){
        return editPost(inputData);
    }else{
        return addPost(inputData);
    }
}  
window.onload = checkLogin();
form.addEventListener("submit", addEditPost);

