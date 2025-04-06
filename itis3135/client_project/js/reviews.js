
async function loadAllReviews()
{
    return fetch('reviews.txt')
    .then( (response) => {
        return response.text().then( (value) => {
            return eval(value);
        })
        .catch( (reason) => {
            console.error(reason);
        })
    })
    .catch( (reason) =>
    {
        console.error(reason);
    });
    
}

function addReview(name, rating, review)
{
    //clone the template and get the sections needed
    let template = document.getElementById('review-template').content.cloneNode(true);
    let stars = template.querySelectorAll('img');
    let review_text = template.querySelector('p');
    let name_text = template.querySelector('h3');


    //all the stars are initially full
    //if the stars are in the array at 0, 1, 2, 3, 4,
    //  then starting at the rating ensures the correct amount of stars are full
    for(let i = Math.floor(rating); i < 5; i++)
    {
        stars[i].setAttribute('src', 'images/star-empty.png');
    }

    //finally, check for a half star
    let remainder = rating - Math.floor(rating);
    if(remainder >= .5)
    {
        stars[Math.floor(rating)].setAttribute('src', 'images/star-half.png');
    }
    
    //set the name and review text
    
    name_text.textContent = name;
    review_text.textContent = review;

    document.getElementById('reviews').appendChild(template);
}


document.addEventListener('DOMContentLoaded', () => {
    loadAllReviews().then( (reviews) => {
        for (let i = 0; i < reviews.length; i++)
        {
            addReview(reviews[i].name, reviews[i].stars, reviews[i].text);
        }
    })
    .catch( (reason) =>
    {
        console.error(reason);
    });

})

