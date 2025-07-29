//----------------------------------------------------------------------
// Verify user authentication
// ---------------------------------------------------------------------

function checkAuthentication_review() {
    const token = getCookie('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}


//----------------------------------------------------------------------
// Get place ID from URL
// ---------------------------------------------------------------------

function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('placeId');
}

document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const token = checkAuthentication_review();
    const placeId = getPlaceIdFromURL();

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const reviewText = document.getElementById('review-text').value.trim();
            const rating = parseInt(document.getElementById('review-rating').value);

            if (!reviewText || !rating || rating < 1 || rating > 5) {
                alert("Please fill in all fields correctly.");
                return;
            }

            await submitReview(token, placeId, reviewText, rating);
        });
    }
});

async function submitReview(token, placeId, reviewText, rating) {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            text: reviewText,
            rating: rating,
            place_id: placeId
        })
    });

    handleResponse(response);
}

async function handleResponse(response) {
    if (response.ok) {
        alert('Review submitted successfully!');
        document.getElementById('review-form').reset();
        const token = getCookie('token');
        const placeId = getPlaceIdFromURL();
        fetchPlaceDetails(token, placeId);
    } else {
        const error = await response.json();
        console.error("Server error response:", error);
        alert('Failed to submit review: ' + (error.error || 'Unknown error'));
    }
}

