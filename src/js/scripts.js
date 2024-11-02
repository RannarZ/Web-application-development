async function fetchPosts() {
    try {
        // Attempt to fetch data from the specified JSON file URL
        const response = await fetch('YOUR_JSON_FILE_URL');
        
        // Parse the response as JSON to get the list of posts
        const posts = await response.json();
        
        // Call the displayPosts function to render the fetched posts on the page
        displayPosts(posts);
    } catch (error) {
        // If there's an error during fetching or parsing, log it to the console
        console.error('Error fetching posts:', error);
    }
}


// Local file fetching for development
async function fetchLocalPosts() {
    try {
        // Attempt to fetch data from the local JSON file named 'posts.json'
        const response = await fetch('posts.json');
        
        // Parse the response as JSON to get the list of posts
        const posts = await response.json();
        
        // Call the displayPosts function to render the fetched posts on the page
        displayPosts(posts);
    } catch (error) {
        // If there's an error during fetching or parsing, log it to the console
        console.error('Error fetching local posts:', error);
    }
}


function displayPosts(posts) {
    // Select the main container where posts will be displayed
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear existing posts

    // Loop through each post in the posts array
    posts.forEach(post => {
        // Create a new div element for each post and add the 'post' class for styling
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Post Header (User Profile and Date)
        // Create a header div for user profile and date
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        
        // Create an img element for the profile picture, with default 'logo.jpg'
        const profileImg = document.createElement('img');
        profileImg.src = 'logo.jpg'; // Default profile picture
        profileImg.alt = 'User Profile';
        profileImg.classList.add('profile-image'); // Add class for styling

        // Create a span element for the date of the post
        const postDate = document.createElement('span');
        postDate.textContent = post.createTime;

        // Append the profile image and date to the post header
        postHeader.append(profileImg, postDate);
        postElement.appendChild(postHeader);

        // Uploaded Post Image (if any)
        // Check if the post has an uploaded image
        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image; // Set the uploaded image's source
            postImage.alt = 'Uploaded Post Image';
            postImage.classList.add('uploaded-image'); // Add class for styling
            postElement.appendChild(postImage); // Append the image to the post element
        }

        // Post Content (Text)
        // Create a paragraph element for the main text content of the post
        const postContent = document.createElement('p');
        postContent.textContent = post.content;
        postElement.appendChild(postContent); // Append the content to the post

        // Post Footer (Optional: For likes or comments)
        // Create a footer div for additional actions like a "Like" button
        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        
        // Create a span element for a "Like" button
        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.textContent = '👍 Like';
        
        // Append the like button to the footer
        postFooter.appendChild(likeButton);
        postElement.appendChild(postFooter);

        // Append the entire post element to the main container
        postsContainer.appendChild(postElement);
    });
}

// Initializing Fetching Function
document.addEventListener('DOMContentLoaded', fetchPosts);

function toggleDropdown() {
    // Get the dropdown menu element by its ID
    const dropdownContent = document.getElementById('dropdown-content');
    
    // Toggle the 'show' class on the dropdown menu
    // If the 'show' class is already present, it removes it; otherwise, it adds it
    dropdownContent.classList.toggle('show');
}


function logout() {
    window.location.href = 'login.html';
}

window.onclick = function(event) {
    // Check if the click is outside the dropdown image
    if (!event.target.matches('.dropdown img')) {
        // Get all elements with the class 'dropdown-content'
        const dropdowns = document.getElementsByClassName('dropdown-content');
        
        // Loop through each dropdown content element
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            
            // If the dropdown is currently visible (has the 'show' class), remove the 'show' class
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function createPost(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get the content of the post from the text area input
    const postContent = document.getElementById('post-insertion').value;
    const fileInput = document.getElementById('choose-file');
    
    // Check if an image file was uploaded
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        // When the file has been read, execute this function
        reader.onloadend = function () {
            const imageUrl = reader.result; // Get the base64 URL of the uploaded image

            // Construct a new post object with the post content, creation date, and image URL
            const newPost = {
                createTime: new Date().toLocaleDateString(), // Get the current date
                authorName: "Anonymous", // Placeholder for author name, can be updated with actual user info
                content: postContent,
                image: imageUrl // Store the uploaded image as a base64 URL
            };

            // Retrieve the current posts from local storage, or initialize an empty array if no posts exist
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            
            // Add the new post to the array of posts
            posts.push(newPost);
            
            // Save the updated posts array back to local storage
            localStorage.setItem('posts', JSON.stringify(posts));

            // Redirect to the index.html page to display the new post
            window.location.href = 'index.html';
        };

        // Convert the image file to a base64 URL
        reader.readAsDataURL(file);
    } else {
        // If no image was selected, create a post without an image URL
        const newPost = {
            createTime: new Date().toLocaleDateString(), // Get the current date
            authorName: "Anonymous", // Placeholder for author name
            content: postContent,
            image: '' // Empty string for no image
        };

        // Retrieve current posts from local storage, or initialize an empty array if no posts exist
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        
        // Add the new post to the array of posts
        posts.push(newPost);
        
        // Save the updated posts array back to local storage
        localStorage.setItem('posts', JSON.stringify(posts));

        // Redirect to the index.html page to display the new post
        window.location.href = 'index.html';
    }
}


function loadPosts() {
    // Get the container where posts will be displayed
    const postsContainer = document.getElementById('posts-container');
    
    // Retrieve the posts array from local storage, or initialize an empty array if no posts exist
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Clear any existing content in the posts container
    postsContainer.innerHTML = '';
    
    // Loop through each post in the posts array
    posts.forEach(post => {
        // Create the main post container
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Create the post header with profile image and date
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        
        const profileImg = document.createElement('img');
        profileImg.src = 'logo.jpg'; // Set the default profile picture
        profileImg.alt = 'User Profile';
        profileImg.classList.add('profile-image'); // Add class for styling profile image
        
        const postDate = document.createElement('span');
        postDate.textContent = post.createTime; // Display the post's creation date

        // Append the profile image and date to the post header
        postHeader.append(profileImg, postDate);
        postElement.appendChild(postHeader);

        // Display the uploaded image (if available)
        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image; // Set the source to the uploaded image's URL or base64 string
            postImage.alt = 'Uploaded Post Image';
            postImage.classList.add('uploaded-image'); // Add class for styling uploaded image
            postElement.appendChild(postImage); // Append the uploaded image to the post element
        }

        // Add the main text content of the post
        const postContent = document.createElement('p');
        postContent.textContent = post.content; // Set the post content text
        postElement.appendChild(postContent);

        // Create the post footer (for features like a like button)
        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        
        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.textContent = '👍 Like'; // Like button placeholder text
        
        postFooter.appendChild(likeButton); // Append the like button to the footer
        postElement.appendChild(postFooter); // Append the footer to the post element

        // Finally, append the complete post element to the main posts container
        postsContainer.appendChild(postElement);
    });
}


// Initialize loadPosts on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadPosts);



