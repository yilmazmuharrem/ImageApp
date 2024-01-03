const accessKey = "Cv55F-ndeM25cxHjPWzkcLw-i8gd5fmdwUf6ASHQJRs"


const form = document.querySelector("form")

const inputelement =document.getElementById("search-input")

const searchResults = document.querySelector(".search-results")

const showMore =document.getElementById("show-more-button")


let inputdata =""
let page=1;


 async function searchImages(){
    inputdata=inputelement.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();

    const results =data.results;

    if (page ===1){
        searchResults.innerHTML=""
    }
  
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
    
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
    
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.innerText = result.alt_description;
    
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
    
        searchResults.appendChild(imageWrapper); // Hatanın düzeltildiği yer
    });
    
    page++
    if (page>1){
        showMore.style.display="block"
    }
    
}


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1
    searchImages()
})


showMore.addEventListener("click",(event)=>{
    searchImages()
})