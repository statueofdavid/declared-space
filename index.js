function validateEmailFromSignUpInput() {
	var element = document.getElementById("signUpInputEmail");
	var email = element.value;

	var message = ""
	var messageElement = document.getElementById("email-error-message");
	
	if(!InputValidator.validateEmail(email)) {
		message = "Please Enter a Valid Email"
		messageElement.textContent = message;
		element.style.borderColor = "red";
		messageElement.style.visibility = "visible";
	} else {
		element.style.borderColor = "";
		messageElement.style.visibility = "hidden";
	}
}

function validatePasswordFromRepeatPasswordInput() {
	var passwordElement = document.getElementById("signUpInputPassword");
	var repeatElement = document.getElementById("signUpInputRepeatPassword");

	var password = passwordElement.value;
	var repeat = repeatElement.value;

	var message = "";
	var messageElement = document.getElementById("match-error-message");

	if(!InputValidator.wordMatch(password, repeat)) {
		message = "Please Make the Words Match"
		messageElement.textContent = message;		
		repeatElement.style.borderColor = "red";
		messageElement.style.visibility = "visible";
	} else {
		repeatElement.style.borderColor = "";
		messageElement.style.visibility = "hidden";
	}
}
