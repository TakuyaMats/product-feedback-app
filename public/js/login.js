const loginFormHandler = async (event) => {
    const form = document.querySelector('#login-form');

    const email = form.querySelector('#email-login').value.trim();
    const password = form.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
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

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);