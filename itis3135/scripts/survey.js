// Create a JavaScript file titled survey.js, make sure to add this in your Scripts folder
// Add a JavaScript function that prevents the form from submitting w/o the necessary information. 
// Add a JavaScript function that will reset the progress of the form
// Add a JavaScript function that will add new course text boxes
// Add a JavaScript function that will add a delete button beside each new course text box
// When the user clicks 'Submit', use JavaScript to gather the data from the form and add content in place of the form. 
// There should still be a reset link at the bottom of the screen to reset the progress so that your website visitor can do it again.


let courseIteration = 0;

let courses = [];

let form;



function reset()
{
    document.getElementById('form').reset();
    courses = [];
    courseIteration = 0;
    document.getElementById('page-wrapper').setAttribute('style', 'display: none;');
    document.getElementById('form-wrapper').removeAttribute('style');

}


function addNewCourse()
{

    let tr = document.createElement('tr');
    tr.setAttribute('id', courseIteration.toString());

    //create the tds as an array
    let tds = [document.createElement('td'), document.createElement('td'), document.createElement('td')];

    //create the inputs and set their attributes
    let inputs = [document.createElement('textarea'), document.createElement('textarea')];
    inputs[0].setAttribute('id', 'course-input-' + courseIteration.toString());
    inputs[1].setAttribute('id', 'course-input-' + (courseIteration + .5).toString());

    inputs[0].setAttribute('class', 'table-text-input');
    inputs[1].setAttribute('class', 'table-text-input');

    //create the delete button and set it's attributes
    let deleteButton = document.createElement('button');

    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('onclick', "deleteCourse(" + courseIteration.toString() + ")");

    //append tr to course-table
    document.getElementById('courses').appendChild(tr);
    
    //apend all of the tds to tr
    tr.appendChild(tds[0]);
    tr.appendChild(tds[1]);
    tr.appendChild(tds[2]);
    
    //append the two texts inputs to the first and second td
    tds[0].appendChild(inputs[0]);
    tds[1].appendChild(inputs[1]);

    //append to del button to the last td
    tds[2].appendChild(deleteButton);
    
    courses[courseIteration] = tr;
    courseIteration++;
}

function deleteCourse(trId)
{

    courses[trId] = null;

    console.log(trId, document.getElementById(trId));
    document.getElementById(trId).remove();

    
}

function getFormData()
{
    
    let formData = new FormData(form);
    console.log(formData.getAll());
}


function setAttributeValue(pageId, pageAttribute, formId)
{
    document.getElementById(pageId).setAttribute(pageAttribute, document.getElementById(formId).value);
}

function setTextValue(pageId, formId)
{
      
    document.getElementById(pageId).innerHTML =
    '<strong>'
    + document.getElementById(formId + '-label').innerText
    + '</strong>'
    + document.getElementById(formId).value;
}

function submit(event)
{
    event.preventDefault();



    let liNames =
   ['name', 'mascot', 'image', 'caption', 'personal-background',
    'professional-background', 'academic-background',
    'web-dev-background', 'primary-computer-platform', 'courses',
    'funny-thing', 'anything-else', 'checkbox'];

    for (let i = 0 ; i < liNames.length; i++)
    {
        let liName = liNames[i];
        let input = document.getElementById(liName);
        console.log(input);
        if (input.value === '')
        {
            alert('Please fill out the field for \'' + liName + '\'');
            return;
        }
        
    }

    if (!document.getElementById('checkbox').checked)
    {
        alert('Please agree to the consent at the bottom by clicking the checkbox');
        return;
    }
           

    document.getElementById('form-wrapper').setAttribute('style', 'display: none;');
    document.getElementById('page-wrapper').removeAttribute('style');


    
    document.getElementById('page-name').innerText = document.getElementById('name').value + ' | ' + document.getElementById('mascot').value;
    setTextValue('figcaption', 'caption');
    setTextValue('personal', 'personal-background');
    setTextValue('professional', 'professional-background');
    setTextValue('academic', 'academic-background');
    setTextValue('web-dev', 'web-dev-background');
    setTextValue('pcp', 'primary-computer-platform');
    setTextValue('funny', 'funny-thing');
    setTextValue('anything', 'anything-else');

    let consent = "I understand that what is on this page is not password protected and I will not put anything here that I don’t want publicly available - ";
    consent += document.getElementById('name').value;

    document.getElementById('page-consent').innerText = consent;

    let ul = document.createElement('ul');
    document.getElementById('page-courses').appendChild(ul);

    for (let i = 0; i < courses.length; i++)
    {
        if (courses[i] == null)
        {

            continue;
        }

        let li = document.createElement('li');

        let title = courses[i].childNodes[0].childNodes[0].value;
        let description = courses[i].childNodes[1].childNodes[0].value;

        li.innerHTML = '<strong>' + title + ': </strong>' + description;

        ul.appendChild(li);
    }

}


function onFileSelected(event)
{
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
    
        var imgtag = document.getElementById("page-img");
        imgtag.title = selectedFile.name;
    
        reader.onload = function(event) {
        imgtag.src = event.target.result;
        };
    
        reader.readAsDataURL(selectedFile);
    }


  
    document.addEventListener('DOMContentLoaded', () => {

        form = document.getElementById('form');
        form.addEventListener('submit', submit);
    });
