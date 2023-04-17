const signupFormHandler = async (event) => {
    event.preventDefault();

    const form = document.querySelector('#signup-form');
    const name = form.querySelector('#name-signup').value.trim();
    const photo = form.querySelector('#photo-signup').files[0]; // Get the first file selected in the input
    const username = form.querySelector('#username-signup').value.trim();
    const email = form.querySelector('#email-signup').value.trim();
    const password = form.querySelector('#password-signup').value.trim();

    if (name && photo && username && email && password) {
        const formData = new FormData(); // Create a new FormData object
        formData.append('name', name);
        formData.append('photo', photo);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
        xhr.open('POST', '/api/users/signup'); // Specify the endpoint to handle the form data
        xhr.onload = function() {
            if (xhr.status === 200) {
                document.location.replace('/');
            } else {
                alert(xhr.statusText);
            }
        };
        xhr.send(formData); // Send the form data to the server
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
