async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="feedback-title"]').value;
    const category = document.querySelector('select[name="category"]').value;
    const description = document.querySelector('input[name="feedback-detail"]').value;

    const response = await fetch(`/api/feedbacks`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            category,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-feedback-form').addEventListener('submit', newFormHandler);