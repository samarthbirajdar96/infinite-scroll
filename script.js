const apiUrl = "https://api.unsplash.com/photos/random/?client_id=sKs-05lh9oxjKdSesSx-n7cNeTee-aAI33hrFUa_yeo&count=10";

let allPhotos = []; // array to collect the images
let ready = false;
let imagesLoad = 0;
let totalImages = 10;


const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json()
        allPhotos = data;
        display();

    } catch (err) {
        console.log(err);
    }

}

//check if images are loaded or not
const imagesLoaded = () => {
    imagesLoad++;
    if (imagesLoad === totalImages) {
        ready = true; // Good to go ==> upload 10 images one by one
        imagesLoad = 0; // to laod again ==> reset the value.
    }
    console.log(imagesLoaded);
}
//accessing the div for image container
const imgContainer = document.getElementById("image-container")

// display function:
const display = () => {
    allPhotos.forEach((photo) => {
        const img = document.createElement("img"); // dynamically created an element
        img.setAttribute("src", photo.urls.regular) // set the attribute of th element 
        img.addEventListener("load", imagesLoaded);
        imgContainer.appendChild(img);
    })
}

window.addEventListener("scroll", () => {
    if (window.scrollY > document.body.offsetHeight - 8500 && ready) {
        ready = false;
        getPhotos();
        console.log("again loaded images");
    }
})

 getPhotos();

