const emailElement = document.getElementById("signUpInputEmail");
const passwordElement = document.getElementById("signUpInputPassword");
const repeatElement = document.getElementById("signUpInputRepeatPassword");

const tosToggleElement = document.getElementById("invalidCheck");
const registerButtonElement = document.getElementById("registerButton");

function validateEmail() {
	var email = emailElement.value;

	var message = ""
	var messageElement = document.getElementById("email-error-message");
	
	if(!InputValidator.validateEmail(email)) {
		message = "Please Enter a Valid Email"
		messageElement.textContent = message;
		messageElement.style.visibility = "visible";

		emailElement.style.borderColor = "red";

		return false
	} else {
		emailElement.style.borderColor = "";
		messageElement.style.visibility = "hidden";

		return true
	}
}

function validatePasswordMatch() {
	var password = passwordElement.value;
	var repeat = repeatElement.value;

	var message = "";
	var messageElement = document.getElementById("match-error-message");

	if(!InputValidator.wordMatch(password, repeat)) {
		message = "Please Make the Words Match"
		messageElement.textContent = message;		
		repeatElement.style.borderColor = "red";
		messageElement.style.visibility = "visible";

		return false;
	} else {
		repeatElement.style.borderColor = "";
		messageElement.style.visibility = "hidden";

		return true;
	}
}

function isToggled() {
	return tosToggleElement.checked;
}

function validateFormDataBeforePersistence() {
	if(validateEmail() && validatePasswordMatch() && isToggled()) {
		registerButton.disabled = false;
	}
}
