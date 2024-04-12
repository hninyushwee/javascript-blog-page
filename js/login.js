const form = document.getElementById("form");

 // get json data
  async function getUser(email, password){
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();

    //loop to show json data
    let correct = false;
    data.map(user => {
        if(email === user.email && password === user.password){
            const data = {
                id : user.id,
                name: user.name,
                email: email
            }
            localStorage.setItem("post_user_data", JSON.stringify(data));
            window.location.href = "index.html";                                                                                                                                                      
            correct = true;
        }
    });
    
    if(!correct){
        alert("Please Enter Correct Email and Password.");
    }
}

// if data have in localstorage, link will return index page.
window.onload = () =>{
    if(localStorage.getItem("post_user_data")){
        window.location.href = "index.html";
    }
}

// if form submit, store user data in localstorage
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    getUser(email, password); 
});
