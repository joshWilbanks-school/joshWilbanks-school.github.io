//the point of this script is to update the WCAG's href value so that every page's WCAG validation button dynamically changes what page it is validating
//the other option is to statically include this button on every page and manually change the a tag's href value
//since we are taking a component based approach this method adds necessary complexity to update the WCAG href dynamically
const WCAG_URL = "https://wave.webaim.org/report#/";
let intervalId = setInterval(updateWCAGhref, 50); //run updateWCAGhref every 50ms until otherwise told not to
function updateWCAGhref() 
{
    let wcag = document.getElementById("wcag-a"); //will be null if footer is not finished loading
    if(!wcag) //check if wcag's A tag is loaded or not
        return;
    
    //update the wcag's A tag's href value to be the WCAG url + this specific page (location.href)
    wcag.setAttribute("href", WCAG_URL + location.href);

    //remove the interval so this method will not run every 50ms anymore
    clearInterval(intervalId);

}