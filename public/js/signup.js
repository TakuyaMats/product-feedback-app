const signupFormHandler = async (event) => {
    event.preventDefault();

    const form = document.querySelector('#signup-form');
    const name = form.querySelector('#name-signup').value.trim();
    const username = form.querySelector('#username-signup').value.trim();
    const email = form.querySelector('#email-signup').value.trim();
    const password = form.querySelector('#password-signup').value.trim();

    if (name && username && email && password) {
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