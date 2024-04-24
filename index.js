const signInModal = document.getElementById('signInModal')
const signInInput = document.getElementById('signInInput')
SignInModal.addEventListener('shown.bs.modal', () => {
  SignInInput.focus()
})

const LogInModal = document.getElementById('signInModal')
const LogInInput = document.getElementById('signInInput')
LogInModal.addEventListener('shown.bs.modal', () => {
  LogInInput.focus()
})
