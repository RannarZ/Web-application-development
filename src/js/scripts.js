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

//function that fetches the posts information from json file
async function loadPostsFromJson() {
    try {
        const response = await fetch('data/posts.json');
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts from JSON file:', error);
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // clear any existing content

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // post Header with Profile Image, Date and author name
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');

        const profileImg = document.createElement('img');
        profileImg.src = 'logo.jpg'; 
        profileImg.alt = 'User Profile';
        profileImg.classList.add('profile-image'); // class for styling profile image

        const authorName = document.createElement('span');
        authorName.textContent = post.author; 
        authorName.classList.add('post-author');

        // format the date
        const date = new Date(post.createTime);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short', // e.g., "Oct"
            day: 'numeric', 
            year: 'numeric' 
        });

        const postDate = document.createElement('span');
        postDate.textContent = formattedDate; // display date as "Oct 22, 2022"

        postHeader.append(profileImg, authorName, postDate);
        postElement.appendChild(postHeader);

        // display the uploaded post image if available
        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.alt = 'Uploaded Post Image';
            postImage.classList.add('post-image'); // class for styling post image
            postElement.appendChild(postImage);
        }

        // post content Text
        const postContent = document.createElement('p');
        postContent.textContent = post.content;
        postContent.classList.add('post-text'); // class for styling post text
        postElement.appendChild(postContent);

        // post footer with like button
        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');

        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.textContent = '👍 Like';

        postFooter.appendChild(likeButton);
        postElement.appendChild(postFooter);

        // append the post to the main container
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
    //Fetching username and email and the List node from html
    //Not the best practice to create the div element in HTML but it is a lot easier. Less writing
    const username = sessionStorage.username;
    const email = sessionStorage.email;
    const listNode = document.getElementById("dropDownList");
    if (username == undefined) {
        //In case user is not logged in then only displaying login option
        const login = document.createElement('li');
        login.id = "logout";
        const link = document.createElement('a');
        link.href = "login.html";
        link.textContent = "Login";

        login.appendChild(link);
        listNode.appendChild(login);
    } else {
        //Creating the required nodes
        const nameText = document.createElement('li');
        const emailText = document.createElement('li');
        const logout = document.createElement('li');

        //Inserting text and links to nodes
        emailText.innerText = email;
        nameText.innerText = username;
        const link = document.createElement('a');
        link.href = "login.html";
        link.textContent = "Logout";

        //Appending all children to respective nodes
        logout.appendChild(link);
        listNode.appendChild(nameText);
        listNode.appendChild(emailText);
        listNode.appendChild(logout);

    }
    if (listNode.style.display == "block") {
        listNode.style.display = "none";
        //Removing all children
        while (listNode.firstChild) {
            listNode.removeChild(listNode.firstChild);
        }
    } else {
        listNode.style.display = "block";
    }
}


// Initialize function to load posts on DOM content loaded
document.addEventListener('DOMContentLoaded', loadPostsFromJson);
