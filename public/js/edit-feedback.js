async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="feedback-title"]').value.trim();
    const category = document.querySelector('#category option:checked').value;
    const status = document.querySelector('#status option:checked').value;
    const description = document.querySelector('input[name="feedback-description"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blog_id: id,
            title,
            category,
            status,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/feedback/${id}`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-feedback-form').addEventListener('submit', editFormHandler);