let contentBox = document.querySelector(".content-box");

const getData = async () =>{
    try {
        //  fetch data api
        let res = await fetch("http://localhost:3000/posts");
        let data = await res.json();

    //Get last twenty data with sort and slice method
        let lastTwentyData = data.sort((start,end) => {
            if(start.date > end.date){
                return 1;
            }
            else{
                return -1;
            }
        }).slice(0, 20);

    //Retrive data from object with map() method

        lastTwentyData.map(data => { 
            //show date using moment
            
            const date = moment(data.created_at).format("LL");

            // create card div
            let card = document.createElement("div");
            card.className = "card";
        
            // create article box
            let articleBox = document.createElement("div");
            articleBox.className = "article-box";

            //  show image
            let  img = `<div class="img-box">
                            <img src="${data.image_url }" alt="image">
                        <div>`;

            // show article
            let content = `<div class="article-title">
            <h4 class="title">${data.title}</h4>
            <p class="date">${date}</p>
            </div>`;

            content += `<p class="createBy">Posted By
            <span class="user-name">${data.created_by}</span></p>`

            content += `<p class="body">${data.content}</p>
            <button type="button" class="details btn" id="details-btn" value=${data.id}>More >></button>
            `;

            articleBox.innerHTML = content;
            card.innerHTML = img;
            card.appendChild(articleBox);
            contentBox.appendChild(card);
        })

        // When more btn click, go to details page
        const detailsbtn = contentBox.querySelectorAll("#details-btn");
        detailsPost(detailsbtn);
        
    } catch (error) {
        console.log(error);
    }
}
// Go to details page
function detailsPost(button){
    button.forEach(btn => {
        btn.addEventListener("click", ()=>{
            const id = btn.value;
            window.location.href = `details.html?id=${id}`;
        })
    })
}
window.onload = getData;
