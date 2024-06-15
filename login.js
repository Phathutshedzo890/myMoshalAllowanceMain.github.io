const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
    window.location.href = "/calc.html";
});

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});
