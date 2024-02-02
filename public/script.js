import { OfferHandler } from "./offerHandler.js";
import { showSummary } from "./resultSummary.js";
import { MeasurementHandler } from "./measurementHandler.js";
import { Support } from "./support.js";
import { Interest } from './interest.js';
import { menuQuestions, menuButtons, freeMeasurementQuestions, offerQuestions, saleQuestions, supportQuestions, interestQuestions } from "./chatbotDatas/datas.js";
import { interestDataArray, measurementDatasArray, supportDataArray } from "./models/chatBotModels.js";
import { hideUserInput, showUserInput } from "./helpers/helperFunctions.js";

export const chatContent = document.getElementById('chat-content');
export const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbox = document.querySelector('.chatbox');

export let currentQuestions;
export let currentQuestionIndex = 0;
export let isOptionSelected = false;
let watchMouseMove = true;
let isWriting = false;

export function setIsOptionSelected(value){
  isOptionSelected = value
}

//Start Animations on userInput
window.addEventListener("mousemove", function () {
  if (watchMouseMove) {
    watchMouseMove = false;
    document.getElementById('help').classList.add("popInDelay");
    chatbotIcon.classList.add("popIn");
    document.getElementById('help').style.display = 'flex';
  }
})

//Send button and send with enter key
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    handleUserInput();
  }
});


//Clickable chatbot icon
function showChat() {
  if (chatbox.style.display === 'block') {
    watchMouseMove = true;
    chatbox.style.display = 'none';
    document.getElementById('help').style.display = 'flex';
  } else {
    watchMouseMove = false;
    chatbox.style.display = 'block';
    document.getElementById('help').style.display = 'none';
    // You can initiate the chat sequence here if needed:
    // setTimeout(() => askNextQuestion(), 1000);
    askNextQuestion()
  }
}

chatbotIcon.addEventListener('click', showChat);
document.getElementById('help').addEventListener('click', showChat);

//Making the Chatbox Header SVG clickable.
document.getElementById("navButtons").children[0].addEventListener('click', showChat)

//Assign the menu questions at the start
currentQuestions = menuQuestions;
window.onload = function () {
  chatbox.style.display = 'none';
  userInput.disabled = true;
  sendBtn.disabled = true;
};


//Decides whether the question is bot response or user response and puts the output into the corresponting container
export function addMessage(message, isBot) {
  if (currentQuestions != menuQuestions && message.length == 0) {
    message = "Kérem töltse ki a mezőt!";
    isBot = true;
  }
  const chatContent = document.getElementById('chat-content');
  const messageDiv = document.createElement('div');

  messageDiv.classList.add('message');
  messageDiv.innerHTML = message;
  if (isBot && !isWriting) {
    messageDiv.classList.add('bot-message')

    //isWriting for spam protection + disabling the input field and btn
    isWriting = true
    hideUserInput()

    //adding the Type effect
    const typingIndicator = document.getElementsByClassName("typing-animation")[0]
    typingIndicator.style.display = "flex";
    chatContent.appendChild(typingIndicator)

    //Scroll to top
    chatContent.scrollTop = chatContent.scrollHeight;

    //Remove the type effect, the spam protection and adding the message
    setTimeout(() => {
      typingIndicator.style.display = "none";

      chatContent.appendChild(messageDiv);
      // Scroll to the bottom
      chatContent.scrollTop = chatContent.scrollHeight;
      isWriting = false
      //if its the first question don't reenable the input field & btn
      if (currentQuestions != menuButtons) {
        showUserInput()
        document.getElementsByClassName("user-input-parent")[0].children[0].focus()
      }
    }, 1000);
  }else if(!isWriting){
    messageDiv.classList.add('user-message')
    chatContent.appendChild(messageDiv);
    // Scroll to the bottom
    chatContent.scrollTop = chatContent.scrollHeight;
  }


  //Added for the first button selection
  if (message == menuQuestions) {
     currentQuestions = menuButtons;
     const btnDiv = document.createElement('div');
     setTimeout(() => {
      btnDiv.innerHTML = currentQuestions;
      btnDiv.classList.add('message')
      btnDiv.classList.add('btn-message')
      chatContent.appendChild(btnDiv)
      //addMessage(currentQuestions, false);

      const freeMesBtn = document.getElementById('freeMeasurementButton')
      const offerBtn = document.getElementById('offersButton');
      const interestBtn = document.getElementById('interestButton');
      const saleBtn = document.getElementById('saleButton');
      const supportBtn = document.getElementById('supportButton');

    freeMesBtn.addEventListener("click", () => {
      handleMainMenuSelection(0)
    })
    offerBtn.addEventListener("click", () => {
      handleMainMenuSelection(1)
    })
    interestBtn.addEventListener("click", () => {
      handleMainMenuSelection(2)
    })
    saleBtn.addEventListener("click", () => {
      handleMainMenuSelection(3)
    })
    supportBtn.addEventListener("click", () => {
      handleMainMenuSelection(4)
    })
     }, 1000);
  }

}

//Function that handles the user inputs, and displays the questions referring to the user input
export function handleUserInput() {
  let parent = document.getElementsByClassName("user-input-parent")[0];
  let element = parent.children[0]
  let userMessage;
  
  if (element.tagName === "INPUT") {
    userMessage = element.value;
  } else if (element.tagName === "SELECT") {
    let selectedOption = element.options[element.selectedIndex]
    userMessage = selectedOption.text
  }
  addMessage(userMessage, false);

  if (userMessage.length === 0) return;
  userInput.value = '';
  element.value = '';

  switch (currentQuestions) {
    case freeMeasurementQuestions:
      MeasurementHandler(userMessage)
      break;
    case offerQuestions:
      OfferHandler(userMessage)
      break;
    case interestQuestions:
      Interest(userMessage)
      break;
    case supportQuestions:
      Support(userMessage)
      break;
    case menuQuestions:
      handleMainMenuSelection();
      return;
  }
}

window.userInput = () => {
  userInput.value = inputField.value
  handleUserInput()
};

function handleMainMenuSelection(buttonId) {
  if (!isOptionSelected) {
    switch (buttonId) {
      case 0:
        isOptionSelected = true;
        currentQuestions = freeMeasurementQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 1:
        isOptionSelected = true;
        currentQuestions = offerQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 2:
        isOptionSelected = true;
        currentQuestions = interestQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 3:
        isOptionSelected = true;
        currentQuestions = saleQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 4:
        isOptionSelected = true;
        currentQuestions = supportQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
    }
  }
}

//function that goes to the next question
export function askNextQuestion() {
  
  if (currentQuestionIndex < currentQuestions.length) {
    addMessage(currentQuestions[currentQuestionIndex], true)
    currentQuestionIndex++;
    return;
  }


  switch (currentQuestions) {
    case freeMeasurementQuestions:
      showSummary(measurementDatasArray, freeMeasurementQuestions)
      break;
    case supportQuestions:
      showSummary(supportDataArray, supportQuestions)
      break;
    case interestQuestions:
      showSummary(interestDataArray, interestQuestions)
      break;
  }
}