
const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdPAoiXRbUn9-EoxZgpPvjLjRmLDWfuE_y5A4IBpnEm67LH8w/formResponse?";
const formSubjectKey = "entry.119154150";
const formContactKey = "entry.710523614";
const formBodyKey = "entry.42644356";

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("email-form").addEventListener("submit", (e) => {
        e.preventDefault();
        postToGoogleForm();
    });
});

//take the user input for the email form and send it to a google form (so no backend is necessary)
function postEmailToGoogleForm()
{
    //get the form information
    let subject = document.getElementById("email-subject");
    let contact = document.getElementById("email-contact");
    let body = document.getElementById("email-body");

    //construct the url for the POST request
    let url = formUrl + formSubjectKey + "=" + subject.value;
    url += "&" + formContactKey + "=" + contact.value;
    url += "&" + formBodyKey + "=" + body.value;

    //make the request
    fetch(url, {
        "mode": "no-cors"
    })
    .then(() => {
        displaySuccess();
    })
    .catch((err) => {
        console.error(err);
        displayFailure();
    })
}

function displaySuccess()
{
    //show the "Email sent" text
    let sentText = document.getElementById("email-sent-text");
    sentText.style.display = 'block';
}

function displayFailure()
{
    //show the error message
    let sentText = document.getElementById("email-sent-text");
    sentText.style.display = 'block';
    sentText.innerHTML = '<em style="color: #ffdd50">Sending email failed</em>'
}