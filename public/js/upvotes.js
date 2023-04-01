function attachUpvotesListeners() {
    const upvotesButtons = document.querySelectorAll('.feedback-upvotes');

    upvotesButtons.forEach(function(upvotesButton) {
        const upvotesCount = upvotesButton.querySelector('.upvotes-count');
        let upvotes = parseInt(upvotesButton.getAttribute('data-upvotes'));

        upvotesButton.addEventListener('click', function() {
            // Check if the button has already been clicked
            if (upvotesButton.classList.contains('upvoted')) {
                return;
            }

            // Increment the upvotes count and update the UI
            upvotes++;
            upvotesCount.textContent = upvotes;

            // Disable the button and mark it as upvoted
            upvotesButton.disabled = true;
            upvotesButton.classList.add('upvoted');

            // Send a POST request to the server to update the upvotes count
            const feedbackTitle = upvotesButton.closest('.card-feedback').querySelector('.feedback-title');
            const feedbackId = feedbackTitle.href.split('/').pop();

            fetch(`/api/feedbacks/${feedbackId}/upvote`, { 
                method: 'PUT',
                body: JSON.stringify({
                    id: feedbackId,
                    upvotes
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(function(response) {
                    if (response.status !== 200) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(function(data) {
                    console.log('Upvote successful');
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    });
}

attachUpvotesListeners();