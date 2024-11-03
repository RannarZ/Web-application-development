/*/async function fetchPosts() {
    const url = "https://gist.githubusercontent.com/philip120/383f60d2331af5c78ecb8bce1d91acd3/raw/dc6bec734b72c6ef3c293852b624f93e6f7ee83d/.json";
    try {
        const response = await fetch(url);
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

/*/
async function loadPostsFromJson() {
    try {
        const response = await fetch('/posts.json');
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts from JSON file:', error);
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear any existing content

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Post Header with Profile Image and Date
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');

        const profileImg = document.createElement('img');
        profileImg.src = 'logo.jpg'; // Default profile picture
        profileImg.alt = 'User Profile';
        profileImg.classList.add('profile-image'); // Class for styling profile image

        // Format the date
        const date = new Date(post.createTime);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short', // e.g., "Oct"
            day: 'numeric', // e.g., "22"
            year: 'numeric' // e.g., "2022"
        });

        const postDate = document.createElement('span');
        postDate.textContent = formattedDate; // e.g., "Oct 22, 2022"

        postHeader.append(profileImg, postDate);
        postElement.appendChild(postHeader);

        // Display the uploaded post image if available
        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.alt = 'Uploaded Post Image';
            postImage.classList.add('post-image'); // Class for styling post image
            postElement.appendChild(postImage);
        }

        // Post Content Text
        const postContent = document.createElement('p');
        postContent.textContent = post.content;
        postContent.classList.add('post-text'); // Class for styling post text
        postElement.appendChild(postContent);

        // Post Footer with Like Button
        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');

        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.textContent = '👍 Like';

        postFooter.appendChild(likeButton);
        postElement.appendChild(postFooter);

        // Append the post to the main container
        postsContainer.appendChild(postElement);
    });
}

function saveEmailAndUsername(event) {
    //Username comes from the email because in our homework there is not specified where do we get the username.
    //We presume that email contains a "." between first name and second name.
    event.preventDefault();
    const email = document.getElementById("email").value;
    const usernameList = email.split("@")[0].split(".");

    //Capitalizing the names
    usernameList[0] = usernameList[0][0].toUpperCase() + usernameList[0].slice(1)
    usernameList[1] = usernameList[1][0].toUpperCase() + usernameList[1].slice(1)

    const username = usernameList[0] + " " + usernameList[1];


    sessionStorage.email = email;
    sessionStorage.username = username;
    window.location.href = "index.html";
}

function dropDownMenu() {
    const username = sessionStorage.username;
    const email = sessionStorage.email;
    const emailList = document.getElementById("listEmail");
    const nameList = document.getElementById("listName");
    emailList.innerText = email;
    nameList.innerText = username;

    const listNode = document.getElementById("dropDownList");
    listNode.style.display = "block";
}

window.addEventListener("click", function(event) {
    const dropdownList = document.getElementById("dropDownList");
    const dropdownButton = document.querySelector("#user-picture");

    if (event.target !== dropdownButton && !dropdownList.contains(event.target)) {
        dropdownList.style.display = "none";
    }
});


// Initialize function to load posts on DOM content loaded
document.addEventListener('DOMContentLoaded', loadPostsFromJson);
