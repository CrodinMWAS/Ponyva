import { askNextQuestion, addMessage, currentQuestionIndex} from "./script.js";
import { validateEmail, validatePhoneNumber, validateDate, validateZipCode } from "./validators.js";
import { hungarianCounties, tarpTypes } from "./chatbotDatas/datas.js";
import { measurementDatasArray } from "./models/chatBotModels.js";
import { replaceInputWithSelect, replaceSelectWithInput, transformToDatepicker, transformToPhoneInput, displayButtons, hideUserInput } from "./helpers/helperFunctions.js";

export const MeasurementHandler = (userMessage) => {
    var inputField = document.getElementById("user-input");
    switch (currentQuestionIndex) {
        case 1:
            //Name
            userMessage.length == 0 ? addMessage("Kérem töltse ki a mezőt!", true) : (measurementDatasArray.name = userMessage, askNextQuestion(), replaceInputWithSelect(inputField, hungarianCounties))
            break;
        case 2:
            //County
            !hungarianCounties.includes(userMessage) ? addMessage("Kérem létező megyét adjon meg!", true) : (measurementDatasArray.county = userMessage, askNextQuestion(), replaceSelectWithInput(inputField))
            break;
        case 3:
            //Zip Code
            !validateZipCode(userMessage) ? addMessage("Kérem létező irányítószámot adjon meg!", true) : (measurementDatasArray.zipCode = userMessage, askNextQuestion())
            break;
        case 4:
            //Town Name
            userMessage.length == 0 ? addMessage("Kérem létező települést adjon meg!", true) : (measurementDatasArray.townName = userMessage, askNextQuestion())
            break;
        case 5:
            //Street Name
            userMessage.length == 0 ? addMessage("Kérem létező utcanevet adjon meg!", true) : (measurementDatasArray.streetName = userMessage, askNextQuestion())
            break;
        case 6:
            //House Number
            userMessage.length == 0 && isNaN(Number(userMessage)) ? addMessage("Kérem valós házszámot adjon meg!", true) : (measurementDatasArray.houseNumber = userMessage, askNextQuestion())
            break;
        case 7:
            //Email
            validateEmail(userMessage) ? (measurementDatasArray.email = userMessage, askNextQuestion(), transformToPhoneInput(inputField)) : addMessage("Kérem létező email címet adjon meg!", true)
            break;
        case 8:
            //Phone Number
            !validatePhoneNumber(userMessage) ? (measurementDatasArray.phoneNumber = userMessage, askNextQuestion(), transformToDatepicker(inputField)) : addMessage("Kérem valós telefonszámot adjon meg!", true)
            break;
        case 9:
            //Measurement Date
            validateDate(userMessage) ? (measurementDatasArray.measurementDate = userMessage, askNextQuestion(), replaceSelectWithInput(inputField), setTimeout(() => {displayButtons(tarpTypes,0)}, 1100)) : addMessage("Kérem valós dátumot adjon meg!", true)
            break;
            //Case 10 Logically Inaccesible, logically removed.
        // case 10:
        //     //TarpTypes
        //     userMessage.length > 0 ? (measurementDatasArray.tarpTypes = userMessage, askNextQuestion(), replaceSelectWithInput(inputField)) : addMessage("Tarp type error", true)
        //     break;
    }
}