document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feed .liked-by i.fa-heart').forEach(heartIcon => {
        heartIcon.addEventListener('click', () => {
            const likesSpan = heartIcon.parentElement.querySelector('#likes');
            let likes = parseInt(likesSpan.textContent);
            if (isNaN(likes)) likes = 0;

            if (heartIcon.style.color === 'red') {
                heartIcon.style.color = ''; // Reset color
                likes -= 1;
            } else {
                heartIcon.style.color = 'red'; // Set color to red
                likes += 1;
            }

            likesSpan.textContent = `${likes} others`;
        });
    });

    document.querySelector('#notifications h3').addEventListener('click', () => {
        window.location.href = 'requests.html';
    });

    document.querySelector('#messages-notifications h3').addEventListener('click', () => {
        window.location.href = 'msg.html';
    });

    document.querySelector('#profilee h3').addEventListener('click', () => {
        window.location.href = 'profile.html';
    });

    const createPostForm = document.querySelector('.create-post');
    const feedsContainer = document.querySelector('.feeds');
    
    const createNewPost = (postContent) => {
        const newPost = document.createElement('div');
        newPost.classList.add('feed');

        newPost.innerHTML = `
            <div class="head"></div>
            <div class="user">
                <div class="profile-pic">
                    <img src="img/profile.jpg" alt="" />
                </div>
                <div class="info">
                    <h3>Khushi</h3>
                    <small>Just now</small>
                </div>
                <span class="edit"><i class="uil uil-ellipsis-h"></i></span>
            </div>

            <div class="caption">
                <p>${postContent}</p>
            </div>

            <div class="action-button">
                <div class="interaction-button">
                    <span><i class="uil uil-thumbs-up"></i></span>
                    <span><i class="uil uil-comment"></i></span>
                    <span><i class="uil uil-share"></i></span>
                </div>
                <div class="bookmark">
                    <span><i class="uil uil-bookmark"></i></span>
                </div>
            </div>

            <div class="liked-by">
                <i class="fa-sharp fa-solid fa-heart"></i>
                <p>Liked by <p id="likes">0 others</p></p>
            </div>

            <div class="comments text-muted">No comments yet</div>
        `;

        // Add click event listener to the new post's heart icon
        const heartIcon = newPost.querySelector('.liked-by i.fa-heart');
        heartIcon.addEventListener('click', () => toggleLike(heartIcon));

        feedsContainer.insertBefore(newPost, feedsContainer.firstChild);
    };

    createPostForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const postContent = createPostForm.querySelector('input[type="text"]').value;

        if (postContent.trim() !== '') {
            createNewPost(postContent);
            // Clear the input field
            createPostForm.querySelector('input[type="text"]').value = '';
        }
    });

    // Handle search bar enter key to create a new post
    const searchBar = document.querySelector('.search-bar input[type="text"]');
    
    searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const postContent = searchBar.value;

            if (postContent.trim() !== '') {
                createNewPost(postContent);
                // Clear the search bar field
                searchBar.value = '';
            }
        }
    });
});