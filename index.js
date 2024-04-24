const signInModal = document.getElementById('signInModal')
const signInInput = document.getElementById('signInInput')

signInModal.addEventListener('shown.bs.modal', () => {
	signInInput.focus()
})

const logInModal = document.getElementById('logInModal')
const logInInput = document.getElementById('logInInput')

logInModal.addEventListener('shown.bs.modal', () => {
	logInInput.focus()
})
