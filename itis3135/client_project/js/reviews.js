
const reviewFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSePflOd1TpkTHmNjzV2Qt4WJSr-ljUUUqO2mIbg_YOEVLUfgg/formResponse?";
const reviewFormNameKey = "entry.1044291087";
const reviewFormRatingKey = "entry.1766671734";
const reviewFormReviewKey = "entry.793391861";

//add listener to form submit
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        postReviewToGoogleForm();
    });

})

//load reviews from text file (pulled from various sources)
//reviews DO NOT pull from google forms, so that displayed reviews can be hand picked
async function loadAllReviews()
{
    //fetch all the reviews from file
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

let formVisible = false;

//simple button toggle for displaying the "send review" form
function togglePostReview() {

    let form = document.getElementById("form");
    let toggleBtn = document.getElementById("review-toggle")
    if(!formVisible)
    {
        formVisible = !formVisible;
        form.style.display = 'block';
        toggleBtn.style.boxShadow = '0 0 5px 0 rgb(255, 255, 255)'
        return;
    }
    
    formVisible = !formVisible;
    form.style.display = 'none';
    toggleBtn.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.574)';


}

//get review from input and send to google form (so no need to have a backend)
function postReviewToGoogleForm() {

    //get the form data
    let name = document.getElementById("form-name");
    let rating = document.getElementById("form-rating");
    let body = document.getElementById("form-body");

    //construct the request with the data
    let url = reviewFormUrl + reviewFormNameKey + "=" + name.value;
    url += "&" + reviewFormRatingKey + "=" + rating.value;
    url += "&" + reviewFormReviewKey + "=" + body.value;

    //make the request
    fetch(url, {
        "mode": "no-cors"
    })
    .then(() => {
        displayReviewSuccess();
    })
    .catch((err) => {
        console.error(err);
        displayReviewFailure();
    })
}

//display success text
function displayReviewSuccess()
{
    let sentText = document.getElementById("email-sent-text");
    sentText.style.display = 'block';
}

//display failure text
function displayReviewFailure()
{
    
    let sentText = document.getElementById("email-sent-text");
    sentText.style.display = 'block';
    sentText.innerHTML = '<em style="color: #ffdd50">Submitting review failed</em>'
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

//load all reviews on page load
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

