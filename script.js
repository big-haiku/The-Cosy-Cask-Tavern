// Youtube Player
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM content loaded");
  const videoPlayer = document.getElementById('videoPlayer');
  const songList = document.querySelector('.song-list');

  function loadRandomVideo() {
      console.log("Loading random video");
      const songRows = Array.from(songList.querySelectorAll('.song-row'));
      const randomIndex = Math.floor(Math.random() * songRows.length);
      const randomVideoSrc = songRows[randomIndex].getAttribute('data-src');
      console.log("Random video URL:", randomVideoSrc);
      videoPlayer.src = randomVideoSrc;
  }

  function changeVideo(e) {
      console.log("Clicked on song row");
      const target = e.target.closest('.song-row');
      if (target && target.dataset.src) {
          const videoSrc = target.dataset.src;
          console.log("Clicked video URL:", videoSrc);
          videoPlayer.src = videoSrc;
      }
  }

  loadRandomVideo();

  songList.addEventListener('click', changeVideo);
});


// Canvas
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.querySelector('.draw');
  const ctx = canvas.getContext('2d');
  const clearButton = document.querySelector('.clear');
  const radiusSlider = document.querySelector('.radius-slider');
  const colourButtons = document.querySelectorAll('.colour-button');

  // Initialize line width, line cap, line join, and stroke style
  ctx.lineWidth = radiusSlider.value;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'black';

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // Load the canvas image data from localStorage
  function loadCanvas() {
      const savedImage = localStorage.getItem('canvasImage');
      if (savedImage) {
          const img = new Image();
          img.onload = function() {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = savedImage;
      }
  }

  // Save the canvas image data to localStorage
  function saveCanvas() {
      const canvasData = canvas.toDataURL();
      localStorage.setItem('canvasImage', canvasData);
  }

  // Clear the canvas and save the cleared state
  function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveCanvas();
  }

  // Attach event listener to the clear button
  clearButton.addEventListener('click', clearCanvas);

  // Load the canvas on page load
  loadCanvas();

  // Save the canvas whenever drawing is done
  canvas.addEventListener('mouseup', saveCanvas);
  canvas.addEventListener('touchend', saveCanvas);

  // Function to calculate and update the canvas bounding box
  function updateRect() {
      return canvas.getBoundingClientRect();
  }

  // Drawing event listeners
  canvas.addEventListener('mousedown', function(e) {
      isDrawing = true;

      // Recalculate the rect to ensure it's up-to-date
      const rect = updateRect();

      // Calculate the starting point using offsetX and offsetY
      lastX = e.offsetX;
      lastY = e.offsetY;

      // Begin a new path and move to the starting point
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);

      // Draw a small stroke at the starting point
      draw(lastX, lastY, lastX, lastY);
  });

  canvas.addEventListener('mousemove', function(e) {
      if (!isDrawing) return;

      // Recalculate the rect to ensure it's up-to-date
      const rect = updateRect();

      // Calculate the current coordinates using offsetX and offsetY
      const x = e.offsetX;
      const y = e.offsetY;

      // Draw the line
      draw(lastX, lastY, x, y);

      // Update lastX and lastY to the current coordinates
      [lastX, lastY] = [x, y];
  });

  canvas.addEventListener('mouseup', function() {
      isDrawing = false;
  });

  // Update rect on window resize
  window.addEventListener('resize', updateRect);

  // Drawing function
  function draw(startX, startY, endX, endY) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
  }

  // Listen to changes on the slider and update the line width
  radiusSlider.addEventListener('input', function() {
      ctx.lineWidth = radiusSlider.value;
  });

  // Add event listeners to colour buttons to change line color
  colourButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Set the strokeStyle (line color) based on the button class
          ctx.strokeStyle = button.classList[1]; // The second class is the color name
      });
  });

  // Adjusting canvas context to viewport
  // Define a function to resize the canvas
  function resizeCanvas() {
      // Calculate the new dimensions based on the canvas's container size
      const newWidth = canvas.offsetWidth;
      const newHeight = canvas.offsetHeight;

      // Save the current context settings
      const currentLineWidth = ctx.lineWidth;
      const currentLineCap = ctx.lineCap;
      const currentLineJoin = ctx.lineJoin;
      const currentStrokeStyle = ctx.strokeStyle;

      // Save the current canvas content
      const savedImage = canvas.toDataURL();

      // Set the new width and height for the canvas
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Redraw the saved content onto the resized canvas
      const img = new Image();
      img.onload = function() {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
      };
      img.src = savedImage;

      // Restore the saved context settings
      ctx.lineWidth = currentLineWidth;
      ctx.lineCap = currentLineCap;
      ctx.lineJoin = currentLineJoin;
      ctx.strokeStyle = currentStrokeStyle;

      // Update the bounding client rect for drawing
      rect = updateRect();
  }

  // Add an event listener for the window resize event
  window.addEventListener('resize', resizeCanvas);

  // Initialize the canvas size on page load
  resizeCanvas();
});




// Background Mouse Effect vvv
const blob = document.getElementById("blob");

window.onpointermove = event => {
  const { clientX, clientY } = event;
  // originally used document.body but effect was too dependent on body height
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });  
}  


// Sidebar
// Get the sidebar button element
const sidebarBtn = document.querySelector('.sidebar-btn');
const sidebarContent = document.querySelector('.sidebar-container');

// Flag to track if the audio has been played
let audioPlayed = false;

// Get the audio element
const audioElement = document.getElementById('audioElement');

// Adjust the volume of the audio element (value between 0.0 and 1.0)
audioElement.volume = 0.3; // Set the volume to 50% (0.5)

// Function to handle the click event
function handleClick() {
  // Check if the audio has been played
  if (!audioPlayed) {
    // Play the audio
    audioElement.play();
    
    // Set the flag to true
    audioPlayed = true;
  }
}

sidebarBtn.addEventListener('click', function() {
  sidebarContent.classList.toggle('open');
  sidebarBtn.classList.toggle('rotate');

  handleClick();
});

// Quest Board
const inputBox = document.querySelector('.input-row input');
const listContainer = document.querySelector('.list-container')

function addQuest() {
  if (inputBox.value === '') {

  } else {
  const li = document.createElement('li');  
  const div = document.createElement('div');
  const p = document.createElement('p')
  const span = document.createElement('span');

  p.innerHTML = inputBox.value;

  li.className = 'sub-container dark-border';

  li.appendChild(div);
  li.appendChild(p);
  li.appendChild(span);

  listContainer.appendChild(li);
  }

  inputBox.value = '';
  saveData();
}  

listContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'DIV') {
    e.target.parentNode.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'P') {
    e.target.parentNode.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }  
});  

inputBox.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addQuest();
  }  
});  

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}  

function showQuest() {
  listContainer.innerHTML = localStorage.getItem('data');
}  

showQuest();


// Notes
const noteContentBox = document.querySelector('.note-content-box');
const noteBtn = document.querySelector('.note-button');
let notes = document.querySelectorAll('.note-input');

function showNotes(){
    noteContentBox.innerHTML = localStorage.getItem('savedNotes');
}
showNotes();
//Recalls  any notes saved to local storage and implements them into notesContainer

function updateStorage() {
    localStorage.setItem('savedNotes', noteContentBox.innerHTML);
}
// Whatever is written in the notes container is saved to local storage as 'savedNotes'

noteBtn.addEventListener('click', ()=>{
    let subNoteBox = document.createElement('div');
    let noteInput = document.createElement('p');
    let deleteIcon = document.createElement('span');
    subNoteBox.className = 'sub-note-box sub-container dark-border';
    noteInput.className = 'note-input';
    noteInput.setAttribute('contenteditable', 'true');
    noteContentBox.appendChild(subNoteBox).appendChild(noteInput);
    subNoteBox.appendChild(deleteIcon);
    // inputBox and img are both appended to subContainer to arrange them better in a flexbox
})

noteContentBox.addEventListener('click', function(e){
    if(e.target.tagName === 'SPAN'){
    //tagName always returns letters in UPPERCASE
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll('.note-input');
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
                //Any time we type anything in the tag it will update storage
            }
        })
    }
})

//Adventure
// Function to save the background choice to local storage
// Function to save the background choice to local storage
function saveBackgroundChoice(backgroundURL) {
  localStorage.setItem('backgroundURL', backgroundURL);
}

// Function to retrieve the background choice from local storage
function getBackgroundChoice() {
  return localStorage.getItem('backgroundURL');
}

// Load the background choice on page load
window.addEventListener('load', function () {
  const savedBackgroundURL = getBackgroundChoice();
  if (savedBackgroundURL) {
      document.querySelector('.background').style.backgroundImage = `url(${savedBackgroundURL})`;
  }
});

let isFunctionExecuting = false; // Flag to track execution status

document.querySelectorAll('.adventure-grid-item').forEach(item => {
  item.addEventListener('click', function (e) {
      if (!isFunctionExecuting && e.target.tagName === 'DIV') {
          isFunctionExecuting = true;

          const backgroundImageURL = window.getComputedStyle(e.target).getPropertyValue('background-image');
          const imageURL = backgroundImageURL.replace('url("', '').replace('")', '');
          const background = document.querySelector('.background');

          // Apply brightness filter based on the image URL
          if (imageURL.includes('Images/elvish_falls.gif')) {
              background.classList.add('brightness-filter');
          } else {
              background.classList.remove('brightness-filter');
          }

          // Fade out effect
          background.classList.add('fade-out');
          
          setTimeout(() => {
              // Change background image using the style attribute
              background.style.backgroundImage = `url(${imageURL})`;
              saveBackgroundChoice(imageURL);

              // Fade in effect
              background.classList.remove('fade-out');
              background.classList.add('fade-in');

              setTimeout(() => {
                  // Remove fade-in class after the effect completes
                  background.classList.remove('fade-in');
                  isFunctionExecuting = false;
              }, 500);
          }, 500);
      }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  const body = document.body;

  // Reset the scroll position to the top of the page on load
  window.scrollTo(0, 0);

  // Function to remove load class and fade out loading screen
  function hideLoadingScreen() {
      // Start fading out the loading screen
      loadingScreen.style.opacity = '0';
      // Remove the load class from the body

      
      // Add a transitionend event listener to the loading screen
      loadingScreen.addEventListener('transitionend', function() {
          // Set the z-index of the loading screen to -5
          loadingScreen.style.zIndex = '-5';
      });
  }

  // Set a timeout to hide the loading screen after 2 seconds
  setTimeout(hideLoadingScreen, 1000); // 2000 milliseconds = 2 seconds
});

// Fixing background zoom/orientation issues
function adjustBackgroundSize() {
    const background = document.querySelector('.background');
    // This ensures the background fills the entire viewport
    background.style.width = `${window.innerWidth}px`;
    background.style.height = `${window.innerHeight}px`;
}

// Add event listeners for window resize and orientation change
window.addEventListener('resize', adjustBackgroundSize);
window.addEventListener('orientationchange', adjustBackgroundSize);

// Call the function once at the beginning to ensure initial setup
adjustBackgroundSize();

let lastDevicePixelRatio = window.devicePixelRatio;

function checkZoomChange() {
    if (window.devicePixelRatio !== lastDevicePixelRatio) {
        lastDevicePixelRatio = window.devicePixelRatio;
        adjustBackgroundSize(); // Adjust background size to handle zoom change
    }
    requestAnimationFrame(checkZoomChange);
}

requestAnimationFrame(checkZoomChange);
