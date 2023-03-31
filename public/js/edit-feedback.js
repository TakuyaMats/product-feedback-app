async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="feedback-title"]').value.trim();
    const category = document.querySelector('select[name="category"]').value.toLowerCase();
    const status = document.querySelector('select[name="status"]').value.toLowerCase();
    const description = document.querySelector('input[name="feedback-detail"]').value.trim();


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/feedbacks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title,
            category,
            status,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(id, title, category, status, description);
    if (response.ok) {
        document.location.replace(`/feedback/${id}`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-feedback-form').addEventListener('submit', editFormHandler);