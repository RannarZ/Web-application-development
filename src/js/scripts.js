document.getElementById('loginForm').addEventListener('submit', function(event) {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (!email || !password) {
        event.preventDefault();
        alert('Please fill in both email and password fields.');
    }
});