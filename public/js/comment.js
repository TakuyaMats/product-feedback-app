const commentInput = document.getElementById('comment');
const charactersLeftText = document.querySelector('.characters-left');

const MAX_COMMENT_LENGTH = 250;

async function commentFormHandler(event) {
    event.preventDefault();

    const content = document.querySelector('input[name="comment-body"]').value.trim();

    const feedback_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                feedback_id,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

commentInput.addEventListener('input', () => {
    const commentLength = commentInput.value.length;
    const charactersLeft = MAX_COMMENT_LENGTH - commentLength;
    charactersLeftText.textContent = `${charactersLeft} Characters left`;
});