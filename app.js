{
  require("dotenv").config();
  let api_key = process.env.API_KEY;
  const video_http = "https://www.googleapis.com/youtube/v3/videos?";
  const channel_http = "https://www.googleapis.com/youtube/v3/channels?";
  const videoCardContainer = document.querySelector('.video-container');

  // Function to format the view count
  function formatViewCount(viewCount) {
    if (viewCount >= 1e6) {
      return (viewCount / 1e6).toFixed(1) + 'M';
    } else if (viewCount >= 1e3) {
      return (viewCount / 1e3).toFixed(1) + 'K'; 
    } else {
      return viewCount;
    }
  }

  // Function to fetch video data and create video cards
  function fetchVideoData() {
    fetch(video_http + new URLSearchParams({
      key: api_key,
      part: 'snippet,statistics', // Include 'statistics' to get view counts
      chart: 'mostPopular',
      maxResults: 48,
      regionCode: 'US'
    }))
      .then(res => res.json())
      .then(data => {
        data.items.forEach(item => {
          getChannelIcon(item);
        })
      })
      .catch(err => console.log(err));
  }

  // Function to fetch channel icon
  function getChannelIcon(video_data) {
    fetch(channel_http + new URLSearchParams({
      key: api_key,
      part: 'snippet',
      id: video_data.snippet.channelId
    }))
      .then(res => res.json())
      .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
      });
  }


  function makeVideoCard(data) {
    const formattedViewCount = formatViewCount(data.statistics.viewCount);

    const iframeId = 'iframe-' + data.id;

    const videoCard = document.createElement('div');
    videoCard.className = 'video';

    const videoLink = document.createElement('a');
    videoLink.href = `https://youtube.com/watch?v=${data.id}`;
    videoLink.target = '_blank'; // Open the link in a new tab

    videoLink.appendChild(videoCard);

    videoCard.onmouseenter = function () {
      playVideo(iframeId);
    };

    videoCard.onmouseleave = function () {
      stopVideo(iframeId);
    };

    videoCard.innerHTML += `
    <div  id="${iframeId}"></div>
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
      <img src="${data.channelThumbnail}" class="channel-icon" alt="">
      <div class="info">
        <h4 class="title">${data.snippet.title}</h4>
        <p class="channel-name">${data.snippet.channelTitle}</p>
        <p class="view-count">${formattedViewCount} views</p>
      </div>
    </div>
  `;

    videoCardContainer.appendChild(videoLink);

    createYouTubePlayer(iframeId, data.id);
  }


  let players = {}; // Store the YouTube players

  function createYouTubePlayer(iframeId, videoId) {
    players[iframeId] = new YT.Player(iframeId, {
      videoId: videoId,
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  }

  function playVideo(iframeId) {
    if (players[iframeId]) {
      players[iframeId].playVideo();
    }
  }

  function stopVideo(iframeId) {
    if (players[iframeId]) {
      players[iframeId].stopVideo();
    }
  }

  fetchVideoData();
}

// __________________________________________Night mode__________________________________________________________________
// Select the checkbox element
const myCheckbox = document.getElementById("night-mode");

// Add a change event listener to the checkbox
myCheckbox.addEventListener("change", function () {
  // Check the checkbox's current state
  if (myCheckbox.checked) {
    document.querySelector("#sectioon1").style.color = "black";
    document.querySelector("#sectioon2").style.color = "black";
    document.querySelector(".ham").style.color = "black";
    document.querySelector(".yt-button").style.color = "black";
    document.querySelector(".right-button").style.color = "black";
    document.querySelector(".night").style.color = "black";
    document.querySelector(".bi-camera-video").style.fill = "black";
    document.querySelector(".bi-bell").style.fill = "black";
    document.querySelector(".bi-mic-fill").style.fill = "black";
    document.querySelector(".bi-search").style.fill = "black";
    document.querySelector(".search-icon").style.backgroundColor = "rgba(232, 232, 232, 0.474)";
    document.querySelector(".mic").style.backgroundColor = "rgba(232, 232, 232, 0.474)";

    const copyright = document.querySelectorAll(".copyright h6");
    copyright.forEach(copyright => {
      copyright.style.fontWeight = "300";
    });
    const menuItems = document.querySelectorAll(".menu-items");
    menuItems.forEach(menuItems => {
      menuItems.classList.add("hovered");
    });
    document.querySelector(".copyright p").style.fontWeight = "300";

    document.querySelector("html").style.backgroundColor = "white"
    document.querySelector(".shorts-icon").src = "shorts-light.png"
    document.querySelector(".library-icon").src = "library-light.png"
    document.querySelector(".smaller-sidebar .shorts-icon").src = "shorts-light.png"
    document.querySelector(".smaller-sidebar .library-icon").src = "library-light.png"

    document.getElementById("day").style.display = "none";
    document.getElementById("night").style.display = "block";
    document.getElementById("searchInput").style.color = "black";



  }


  else {
    document.querySelector("#sectioon1").style.color = "white";
    document.querySelector("#sectioon2").style.color = "white";
    document.querySelector(".ham").style.color = "white";
    document.querySelector(".yt-button").style.color = "white";
    document.querySelector("html").style.backgroundColor = "rgba(0, 0, 0,0.95)";
    document.querySelector(".night").style.color = "white";
    document.getElementById("day").style.display = "block";
    document.getElementById("night").style.display = "none";
    document.querySelector(".bi-camera-video").style.fill = "white";
    document.querySelector(".bi-bell").style.fill = "white";
    document.querySelector(".bi-mic-fill").style.fill = "white";
    document.querySelector(".bi-search").style.fill = "white";
    document.querySelector(".search-icon").style.backgroundColor = "rgba(54, 54, 54, 0.516)";
    document.querySelector(".mic").style.backgroundColor = "rgba(54, 54, 54, 0.516)";
    document.querySelector(".shorts-icon").src = "shorts-dark.png"
    document.querySelector(".library-icon").src = "library.png"
    document.querySelector(".smaller-sidebar .shorts-icon").src = "shorts-dark.png"
    document.querySelector(".smaller-sidebar .library-icon").src = "library.png"
    const copyright = document.querySelectorAll(".copyright h6");
    copyright.forEach(copyright => {
      copyright.style.fontWeight = "100";
    });

    const menuItems = document.querySelectorAll(".menu-items");
    menuItems.forEach(menuItems => {
      menuItems.classList.remove("hovered");
    });

    document.querySelector(".copyright p").style.fontWeight = "100";
    document.getElementById("searchInput").style.color = "white";





  }
});


// Ham button



const hamCheck = document.getElementById("ham");

hamCheck.addEventListener("change", function () {
  if (hamCheck.checked) {
    document.getElementById("sectioon2").style.flexGrow = "20";
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".smaller-sidebar").style.display = "flex";
    document.querySelector(".video-container").style.gridTemplateColumns = "repeat(4, 23.5%)";

    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach(thumbnail => {
      thumbnail.style.height = "180px";
    });

    //iterate ovel iframes
    const players = document.querySelectorAll(".video iframe");
    players.forEach(players => {
      players.style.height = "180px";
      players.style.width = "22%";
    });
  }


  else {
    document.getElementById("sectioon2").style.flexGrow = "5.4";
    document.querySelector(".sidebar").style.display = "block";
    document.querySelector(".smaller-sidebar").style.display = "none";
    document.querySelector(".video-container").style.gridTemplateColumns = "repeat(3, 32%)";

    // Iterate over the NodeList and set the height for each element
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach(thumbnail => {
      thumbnail.style.height = "220px";
    });

    //iterate ovel iframes
    const players = document.querySelectorAll(".video iframe");
    players.forEach(players => {
      players.style.height = "220px";
      players.style.width = "27%";
    });
  }
});




// Search bar

var apiKey = "AIzaSyACJA8ddZ47ouH3zoRNZGdVJqorT6U6yXo";

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
})









