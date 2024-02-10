import { askNextQuestion, handleUserInput } from "../script.js";
import { measurementDatasArray } from "../models/chatBotModels.js";

function enforcePhoneNumberFormat(event) {
    let value = event.target.value;

    // Ensure the value starts with +36
    if (!value.startsWith('+36')) {
        value = '+36' + value.replace(/[^0-9]/g, '').slice(2);
    } else {
        value = '+36' + value.slice(3).replace(/[^0-9]/g, '');
    }

    event.target.value = value;
}
//Transforms input field to phone
export function transformToPhoneInput(inputField) {
    inputField.type = 'tel';
    inputField.maxLength = 12;
    inputField.value = '+36';
    inputField.className
    // Additional logic to ensure that +36 is always present
    inputField.addEventListener('input', enforcePhoneNumberFormat);
    inputField.focus();
}

//Transforms the input field into a datepicker
export function transformToDatepicker(inputField) {
    inputField.removeEventListener('input', enforcePhoneNumberFormat);
    inputField.type = 'date';

    let today = new Date();
    today.setDate(today.getDate() + 1); // Add one day to set the date to tomorrow

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    let tomorrow = yyyy + '-' + mm + '-' + dd; // Format date as YYYY-MM-DD

    inputField.min = tomorrow; // Set the min attribute to tomorrow's date
    inputField.focus();
}

//Replaces input field with a dropDown
export function replaceInputWithSelect(inputField, dataArray,) {
    // Create a new select element
    let select = document.createElement('select');
    select.id = inputField.id; // Carry over the original input's ID

    // Populate the select element with options
    dataArray.forEach(function (item) {
        let option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });

    select.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    // Replace the input field with the select element in the DOM
    inputField.parentNode.replaceChild(select, inputField);
    hideUserInput()
}

//Replaces the dropDown with an input filed
export function replaceSelectWithInput(selectElement) {
    // Create a new input element
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = "Írja válaszát ide";
    input.id = selectElement.id; // Carry over the original select's ID


    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    // Replace the select element with the input field in the DOM
    selectElement.parentNode.replaceChild(input, selectElement);
    hideUserInput()
}

export function resetToTextInput(inputField) {
    inputField.type = 'text'; // Reset the input type to text
    inputField.value = ''; // Clear any existing value
    inputField.placeholder = "Írja válaszát ide";
    inputField.removeAttribute('min'); // Remove min attribute if set
    inputField.removeAttribute('maxLength'); // Remove maxLength attribute if set
    hideUserInput()
    // Remove any other attributes or event listeners specific to other input types
}

//This function disables The input field and the send btn
export function hideUserInput() {
    document.getElementsByClassName("user-input-parent")[0].children[0].disabled = true;
    document.getElementsByClassName("user-input-parent")[0].children[1].disabled = true;
}

export function showUserInput() {
    document.getElementsByClassName("user-input-parent")[0].children[0].disabled = false;
    document.getElementsByClassName("user-input-parent")[0].children[1].disabled = false;
}

//This function is run when the user is asked about the type of tarp he/she wants
function setMeasurmentData(e){
    measurementDatasArray.tarpTypes = e.srcElement.innerHTML
    askNextQuestion();
}

//This function is run by the Yes & No btns
//This is where you can handle their value.
function setDoorData(e){
    console.log(e.srcElement.innerHTML)
    askNextQuestion();
}

//This function displays buttons for the first menu btn and the second menu btn
export function displayButtons(content,type){
    const btnDiv = document.createElement('div');
    const chatContent =  document.getElementById('chat-content');
    for (let i = 0; i != content.length; i++) {
        const newBtn = document.createElement("button");
        newBtn.classList.add("button")
        newBtn.innerText = content[i];
        if (type == 0) {
            newBtn.onclick = setMeasurmentData
        }else{
            newBtn.onclick = setDoorData
        }
        btnDiv.appendChild(newBtn);
    }
    btnDiv.classList.add('message')
    btnDiv.classList.add('btn-message')
    chatContent.appendChild(btnDiv)
    chatContent.scrollTop = chatContent.scrollHeight;
    hideUserInput();
}