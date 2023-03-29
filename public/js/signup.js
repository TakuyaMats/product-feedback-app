const signupFormHandler = async (event) => {
    event.preventDefault();

    const form = document.querySelector('#signup-form');
    const name = form.querySelector('#name-signup').value.trim();
    const photo = form.querySelector('#photo-signup');
    const username = form.querySelector('#username-signup').value.trim();
    const email = form.querySelector('#email-signup').value.trim();
    const password = form.querySelector('#password-signup').value.trim();

    if (name && photo && username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                name,
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    var formData = new FormData(this); // Create FormData object from form data
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload'); // URL to handle the file upload

    xhr.onload = function() {
        if (xhr.status === 200) {
        // Handle successful upload
        } else {
        // Handle upload error
        }
    };

    xhr.send(formData);
});