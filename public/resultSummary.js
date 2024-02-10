import { hideUserInput } from "./helpers/helperFunctions.js";
import { supportDataArray, measurementDatasArray, interestDataArray } from "./models/chatBotModels.js";
import { setIsOptionSelected, newChat } from "./script.js";

//TODO: megcsinálni megint 
const resultSummary = document.getElementById('resultContent');
const resultDiv = document.getElementById('results')
const doneButton = document.getElementById('sendButton')
const editButton = document.getElementById("editButton")

export function showSummary(DataObject, questionArray) {
    if (!resultSummary) {
        console.error('The "offer-summary" element was not found in the DOM. Make sure it exists.');
        return;
    } 

    //Locking userinput
    hideUserInput()

    chatbox.style.display = 'none';
    document.getElementById('help').style.display = 'none';

    let summaryText = '';
    Object.keys(DataObject).forEach((key, index) => {
        console.log(questionArray[index]);
        summaryText += `<div class="summary-container"> <p>${index + 1}. adat: ${questionArray[index]}:</p> <input type="text" value="${DataObject[key]}" readonly></input></div>`;
    });
    
    resultDiv.style.display = 'flex';
    document.getElementById("backdrop").style.display = 'flex';
    resultSummary.innerHTML = summaryText;

    const inputs = Array.from(document.querySelectorAll("#resultContent input"));
    
    let isEditable = false;
    var newInputValues = []
    editButton.addEventListener("click", () => {
        console.log(DataObject)
        isEditable ? (editButton.style.backgroundColor = 'transparent', editButton.style.color = 'black',inputs.forEach(input => newInputValues.push(input.value))) : (editButton.style.backgroundColor = 'black', editButton.style.color = 'white');

        inputs.forEach(input => input.classList.toggle("enabledInput"));
        inputs.forEach(input => input.readOnly = isEditable);
        isEditable = !isEditable
    })
    
    doneButton.addEventListener('click', () => {
        editButton.style.backgroundColor = 'transparent'
        editButton.style.color = 'black'

        inputs.forEach(input => input.classList.remove("enabledInput"));
        inputs.forEach(input => input.readOnly = true);
        isEditable = false

        chatbox.style.display = 'block';

        setIsOptionSelected(false);
        const URL = "http://localhost:8080/"

        const chatContent = document.getElementById('chat-content');
        if (chatContent.children[chatContent.children.length - 1].classList.contains("message")) {
            let buttonBack = document.createElement("button")
            buttonBack.className = "button wideBtn"
            buttonBack.innerText = "Összegző";
            buttonBack.onclick = () => {showSummary(DataObject, questionArray)}
            chatContent.appendChild(buttonBack)
            let button = document.createElement("button")
            button.className = "button wideBtn"
            button.innerText = "Új Chat Indítása"
            button.onclick = () => {newChat(DataObject)}
            chatContent.appendChild(button)
            
            // Scroll to the bottom
            chatContent.scrollTop = chatContent.scrollHeight;
        }

        switch(DataObject) {
            case measurementDatasArray: 
                sendJsonData(measurementDatasArray, URL, "setMeasurementData")
                break;
            case supportDataArray:
                sendJsonData(supportDataArray, URL, "setSupportData")
                break;
            case interestDataArray:
                sendJsonData(interestDataArray, URL, "setInterestData")
                break;
        }

        resultDiv.style.display = 'none'
        document.getElementById("backdrop").style.display = 'none';
    })

}


function sendJsonData(DataArray, URL, address) {
    fetch(URL + address, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(DataArray)
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
}