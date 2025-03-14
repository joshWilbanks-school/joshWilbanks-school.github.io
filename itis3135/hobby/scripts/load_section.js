
const KEY = 'activeSectionId';
const IDS = ['who', 'what', 'where', 'when', 'why'];




//set the inline display value of an element
function setDisplay(id, displayValue) {
    //get the element
    let element = document.getElementById(id);

    //set display
    element.setAttribute('style', 'display: ' + displayValue + ';');
}

//once the page loads or refreshes, this runs
document.addEventListener("DOMContentLoaded", () => {
    let storedId = localStorage.getItem(KEY);
    if (storedId != null) {
        //set the stored one to style='display:flex'
        setDisplay(storedId, 'flex');
        return;
    }

    //else
    //set default to 'what'
    localStorage.setItem(KEY, 'what');
    setDisplay('what', 'flex');

    
});

// 1) get old section from storage, 2) set display none on old section
// 3) set display flex on new section, 4) update storage
function loadSection(sectionId) {

    
    //get the new section and make certain it exists
    let newSection = document.getElementById(sectionId);
    if (newSection == null) {
        console.error('Section id not found!');
        return;
    }

    //get old id
    let activeSectionId = localStorage.getItem(KEY);

    //set the old section to be invisible
    if (activeSectionId != null)
        setDisplay(activeSectionId, 'none');

    //set display block on new section
    newSection.setAttribute('style', 'display: flex');

    //update local storage
    localStorage.setItem(KEY, sectionId);
    
}
