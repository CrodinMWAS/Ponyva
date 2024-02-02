export const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}

export const validatePhoneNumber = (phoneNumber) => {
    var regex = /^\+36 \d{2} \d{3} \d{4}$/;

    if (!regex.test(phoneNumber)) {
        return false
    } else {
        return true
    }
}

export const validateDate = (inputDate) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!pattern.test(inputDate)) {
        return false;
    }

    const date = new Date(inputDate);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return date > today;
}

export function validateZipCode(zipCode) {
    var regex = /^\d{4}$/;
    var errorMessage = document.getElementById('errorMessage');
    
    if (regex.test(zipCode)) {
        return true
    } else {
        return false
    }
}