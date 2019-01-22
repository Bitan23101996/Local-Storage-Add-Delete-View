// Variables tweetList is globally declared
const tweetList = document.getElementById("tweet-list");

//call eventListeners function
eventListeners();

function eventListeners() {
  // Form Submission
  document.querySelector("#form").addEventListener("submit", newTweet);
  // Remove tweet from the list
  tweetList.addEventListener("click", removeTweet);
  // When  Document is loaded every time
  document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//main function
function newTweet(e) {
  //prevent the form to submit
  e.preventDefault();
  // Read the textarea value
  let tweet = document.getElementById("tweet").value;
  console.log(tweet);

  // Create the remove button
  const removeBtn = document.createElement("a"); // create anchor element
  removeBtn.classList = "remove-tweet"; // add class
  removeBtn.textContent = "X"; // add item

  // Create an <li> element
  const li = document.createElement("li");
  li.textContent = tweet;

  // Add the remove button to each tweet
  li.appendChild(removeBtn);
  // Add to the list
  tweetList.appendChild(li);
  // add to Local Storage
  addTweetLocalStorage(tweet);
  // Print the alert
  document.getElementById("msg-success").innerHTML = "Tweet Added Successfully";
    setTimeout(function() {
      document.getElementById("msg-success").innerHTML = " ";
    }, 2000);

  this.reset();
}


//Remove tweets function call
function removeTweet(e) {
  if (e.target.classList.contains("remove-tweet")) {
    e.target.parentElement.remove();
  }

  // Remove from Storage
  removeTweetLocalStorage(e.target.parentElement.textContent);
   // Print the alert
   document.getElementById("msg-delete").innerHTML = "Tweet Removed Successfully";
   setTimeout(function() {
     document.getElementById("msg-delete").innerHTML = " ";
   }, 2000);
}

// Add the tweets into the local storage
function addTweetLocalStorage(tweet) {
  let tweets = getTweetsFromStorage();

  // Add the tweet into the array
  tweets.push(tweet);

  // Convert tweet array into String
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//get tweets from local storage
function getTweetsFromStorage() {
  let tweets;
  const tweetsLS = localStorage.getItem("tweets");
  // Get the values, if null is returned then we create an empty array
  if (tweetsLS === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(tweetsLS);
  }
  return tweets;
}

// Prints Local Storage Tweets on Load
function localStorageOnLoad() {
  let tweets = getTweetsFromStorage();
  console.log(tweets)

  tweets.forEach(function (tweet) {
    // Create the remove button
    const removeBtn = document.createElement("a"); // create anchor element
    removeBtn.classList = "remove-tweet"; // add class
    removeBtn.textContent = "X"; // add item

    // Create an <li> element
    const li = document.createElement("li");
    li.textContent = tweet;

    // Add the remove button to each tweet
    li.appendChild(removeBtn);
    // Add to the list
    tweetList.appendChild(li);
  })
}




// Removes the tweet from local storage

function removeTweetLocalStorage(tweet) {
  // get tweets from storage
  let tweets = getTweetsFromStorage();

  // Remove the X from the tweet

  const tweetDelete = tweet.substring(0, tweet.length - 1);

  // Loop Throught  the tweets and remove the tweet that's equal
  tweets.forEach(function (tweetLS, index) {
    if (tweetDelete === tweetLS) {
      tweets.splice(index, 1);
    }
  });

  // Save the data 
  localStorage.setItem('tweets', JSON.stringify(tweets));
}