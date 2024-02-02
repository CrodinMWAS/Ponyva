import { addMessage, askNextQuestion, currentQuestionIndex } from "./script.js";
import { validateEmail, validatePhoneNumber, validateZipCode } from "./validators.js";
import { hungarianCounties } from "./chatbotDatas/datas.js";
import { supportDataArray } from "./models/chatBotModels.js";
import { replaceInputWithSelect, replaceSelectWithInput, transformToPhoneInput } from "./helpers/helperFunctions.js";

export const Support = (userMessage) => {
    var inputField = document.getElementById("user-input");
    console.log(userMessage)
    console.log(currentQuestionIndex)
    switch (currentQuestionIndex) {
        case 1:
            //Name
            userMessage.length == 0 ? addMessage("Kérem töltse ki a mezőt!", true) : (supportDataArray.name = userMessage, askNextQuestion(), replaceInputWithSelect(inputField, hungarianCounties))
            break;
        case 2:
            //County
            !hungarianCounties.includes(userMessage) ? addMessage("Kérem létező megyét adjon meg!", true) : (supportDataArray.county = userMessage, askNextQuestion(), replaceSelectWithInput(inputField))
            break;
        case 3:
            //Zip Code
            !validateZipCode(userMessage) ? addMessage("Kérem létező irányítószámot adjon meg!", true) : (supportDataArray.zipCode = userMessage, askNextQuestion())
            break;
        case 4:
            //Town Name
            userMessage.length == 0 ? addMessage("Kérem létező települést adjon meg!", true) : (supportDataArray.townName = userMessage, askNextQuestion())
            break;
        case 5:
            //Street Name
            userMessage.length == 0 ? addMessage("Kérem létező utcanevet adjon meg!", true) : (supportDataArray.streetName = userMessage, askNextQuestion())
            break;
        case 6:
            //House Number
            userMessage.length == 0 && isNaN(Number(userMessage)) ? addMessage("Kérem valós házszámot adjon meg!", true) : (supportDataArray.houseNumber = userMessage, askNextQuestion())
            break;
        case 7:
            //Email
            validateEmail(userMessage) ? (supportDataArray.email = userMessage, askNextQuestion(), transformToPhoneInput(inputField)) : addMessage("Kérem létező email címet adjon meg!", true)
            break;
        case 8:
            //Phone Number
            !validatePhoneNumber(userMessage) ? (supportDataArray.phoneNumber = userMessage, askNextQuestion(), replaceSelectWithInput(inputField)) : addMessage("Kérem valós telefonszámot adjon meg!", true)
            break;
        case 9:
            //Custom data
            userMessage.length > 0 ? (supportDataArray.customData = userMessage, askNextQuestion()) : (addMessage("Kérem adjon meg valamit!", false))
            break;
    }
}