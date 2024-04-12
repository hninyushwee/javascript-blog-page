const contentBox = document.querySelector(".content-box");
const action = document.querySelector(".action");
const actionTwo = document.querySelector(".action-two");

// get id from url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// fetch data from json
const postDetails =  async () =>{
    
    let res = await fetch(`http://localhost:3000/posts/${id}`);
    const data = await res.json();
    
    // Show data in details page
    const date = moment(data.created_at).format("LL");

    // Show content
    let content = `<h3 class="title">${data.title}</h3>`;
    
    content += `<p class="createBy">Posted by 
                <span class="user-name">${data.created_by}</span>
                | <span>${date}</span></p>`;

    content += `<div class="img-box">
                <img src="${data.image_url}" alt="image">
                </div>`;

    content += `<p class="body">${data.content}</p>`;

    // show action
    actionTwo.innerHTML = `<p>
                            <button class="edit-btn" value="${data.id}">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>Edit &nbsp;|
                            <button class="delete-btn" value="${data.id}">
                                <i class="fa-solid fa-trash"></i>
                            </button>Delete
                            </p>`;
                            
    contentBox.innerHTML = content;
    contentBox.appendChild(action);

    //when edit btn click, go to edit page;
    const editBtn = contentBox.querySelector(".edit-btn");
    goToEdit(editBtn);

    // when delete btn click, do action
    const deleteBtn  = document.querySelector(".delete-btn");
    deletePost(deleteBtn);
}

//Go to Edit Page
function goToEdit(btn){

    btn.addEventListener("click", () => {
        const id = btn.value;
        window.location.href = `create.html?id=${id}`;
    })
}

const deleteAction = async (url) => {
    let res = await  fetch(url,{
        method : 'DELETE',
        headers : {
            'Content-type' : 'application/json'
        }
    });
    if(res.ok){
        alert("Delete successful");
        window.location = "index.html";
        
    }

}  
//Delete post action
function deletePost(btn){
    
    btn.addEventListener("click", () => {

        if(confirm("Are you sure to delete this post?")){

            const id = btn.value;
            const url = `http://localhost:3000/posts/${id}`;
            
            deleteAction(url);
        }
        
    });
}
window.onload = postDetails;