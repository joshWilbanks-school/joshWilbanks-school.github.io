
const imageCount = 10;
function loadAllImages()
{
    let images = [];
    for (let i = 1; i <= imageCount; i++)
    {
        images[i] = 'images/gallery/ (' + i + ').jpeg';
    }
    return images;
}


function addImage(imgPath)
{
    let gallery = document.getElementById('gallery');
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.setAttribute('src', imgPath);
    li.appendChild(img);
    gallery.appendChild(li);
}

document.addEventListener('DOMContentLoaded', () => {
    let images = loadAllImages();
    images.forEach((image) => {
        addImage(image);
    })
})