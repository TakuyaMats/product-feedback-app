// const commentInput = document.getElementById('comment');
// const charactersLeftText = document.querySelector('.characters-left');

// const MAX_COMMENT_LENGTH = 250;

// async function commentFormHandler(event) {
//     event.preventDefault();

//     const content = document.querySelector('input[name="comment-body"]').value.trim();

//     // Get the user ID associated with the comment
//     const userId = document.querySelector('#main-comment-reply').dataset.userId;

//     const feedback_id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];

//     if (content) {
//         const response = await fetch('/api/reply', {
//             method: 'POST',
//             body: JSON.stringify({
//                 feedback_id,
//                 content,
//                 user_id: userId // Add the user ID to the request body
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.ok) {
//             document.location.reload();

//         } else {
//             alert(response.statusText);
//             document.querySelector('#comment-form').style.display = "block";
//         }
//     }
// }

// document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

// commentInput.addEventListener('input', () => {
//     const commentLength = commentInput.value.length;
//     const charactersLeft = MAX_COMMENT_LENGTH - commentLength;
//     charactersLeftText.textContent = `${charactersLeft} Characters left`;
// });
