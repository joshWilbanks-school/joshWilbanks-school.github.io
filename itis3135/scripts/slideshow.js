
const slideshowImages = ["j.jpg", "o.jpg", "s.jpg", "h.jpg", "u.jpg", "a.jpg", "w.jpg", "i.jpg", "l.jpg", "b.jpg", "a2.jpg", "n.jpg", "k.jpg", "s2.jpg"];
const slideshowTexts = ["J - Jelly", "O - Orange Drink", "S - Stella", "H - Hair Dryer", "U - Umbrella", "A - Aluminum Foil",
    "W - Winky", "I - Ice", "L - Leg", "B - Butter", "A - Apple", "N - Napkin", "K - Kade", "S - Scrabble"
];

let slideshowIndex = 0;

function updateInfo()
{
    
    document.getElementById("slideshow-main-img").setAttribute('src', "images/slideshow/" + slideshowImages[slideshowIndex]);
    document.getElementById("slideshow-img-" + slideshowIndex).setAttribute("style", "opacity: 1");
    document.getElementById("slideshow-text").innerText = slideshowTexts[slideshowIndex];

}

function changeSlide(direction)
{
    document.getElementById("slideshow-img-" + slideshowIndex).setAttribute("style", "opacity: .6");

    slideshowIndex += direction;
    if (slideshowIndex < 0)
    {

        slideshowIndex = slideshowImages.length - 1;
    }

    else if (slideshowIndex === slideshowImages.length)
    {

        slideshowIndex = 0;
    }

    
    updateInfo();
    
}


function jumpToSlide(letter)
{
    for (let i = 0; i < slideshowImages.length; i++)
    {
        if (slideshowImages[i] === letter + ".jpg")
        {
            document.getElementById("slideshow-img-" + slideshowIndex).setAttribute("style", "opacity: .4");

            slideshowIndex = i;
            
            updateInfo();
            return;

        }
    }
}
