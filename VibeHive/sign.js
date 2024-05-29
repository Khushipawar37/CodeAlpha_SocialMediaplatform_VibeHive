document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        submitForm();
    });
});

function submitForm() {
    const user = {
        name: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.text())
    .then(data => {
        window.location.href = 'main.html';
        alert("User Saved successfully");
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
