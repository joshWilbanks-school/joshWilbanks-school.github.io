// Create a JavaScript file titled survey.js, make sure to add this in your Scripts folder
// Add a JavaScript function that prevents the form from submitting w/o the necessary information. 
// Add a JavaScript function that will reset the progress of the form
// Add a JavaScript function that will add new course text boxes
// Add a JavaScript function that will add a delete button beside each new course text box
// When the user clicks 'Submit', use JavaScript to gather the data from the form and add content in place of the form. 
// There should still be a reset link at the bottom of the screen to reset the progress so that your website visitor can do it again.


let courseIteration = 0;

function reset() {
    document.getElementById('form').reset();
}


function addNewCourse() {

    courseIteration++;
    let tr = document.createElement('tr');
    tr.setAttribute('id', courseIteration.toString());

    let td = document.createElement('td');
    let deleteButton = document.createElement('button');

    //append tr to course-table
    document.getElementById('course-table').appendChild(tr);
    
    //apend two clones of td as a child
    tr.appendChild(td.cloneNode());
    tr.appendChild(td.cloneNode());

    //append td as a child last to save it's reference for delete button
    tr.appendChild(td);

    //append to del button to td
    td.appendChild(deleteButton);

    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('onclick', "deleteCourse(" + courseIteration.toString() + ")");
    
}

function deleteCourse(trId) {

    console.log(trId, document.getElementById(trId));
    document.getElementById(trId).remove();

    
}