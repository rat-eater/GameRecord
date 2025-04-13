Step 1 - done. Created the necessary files and data.

Step 2 - done. Created a models folder, in which i added game.mjs with a structure that reflects the one provided in example.json. I exported the class as default, then imported and used the same class in app.mjs.

The example.json structure was like this:
title
designer
artist
publisher
year
players
time
difficulty
url
playCount
personalRating

Step 3 - done. In this step I dealt with localStorage and JSON data management. I implemented 4 functions in app.mjs. I made a condition that each game must be saved as an individua; key instead of as an array in localStorage. I saved a game as its own localStorage entry. After that, I made it return an array of all saved games, then exported all games as a JSON string. I tested out those functions before proceeding with importing JSON and saving each game.

Step 4 - done. For this tep i used FileReader to import the example file. I updated my index.html file accordingly to choose the example file from my computer. I will update app.mjs to use the FileReader, load the file when its selected and import the data into localStorage.

Step 5 - done. I created  <div> in the index file to hold game info. In app.mjs, i created a function that can load all saved games and loop through them. What's more it creates a block of HTML for each one and then adds it to the page. It displays the data successfully when using inspect and then going to console. 

Step 6 - done. The goal of this step is to make the slider change the game's personal rating and make a button that can increase the play count. I plan on giving each slider and button an attribute to help track which game its for. For that to work I also need to add event listeners to each. When the sliders and buttons are interacted with, my code needs to update the correct game in localStorage. I had to rewrite my code since games were not showing up, but the sliders and button were. 

Step 7 and 8 - done. The goal of these steps is to add an HTML form for users to add new games directly to the list without having to upload a file. I will be adding the form inside my index.html file, break it down in app.mjs and clean it afterwards. Following the initial structure of the example file provided in the assignment, I created a form that instantly displays the data needed as soon as its typed in. It also works with the slider and button that I added previously.

Step 9 - done. In this step I will add a delete button for each game. When pressed, it will delete the game from localStorage and update the game array. The only problem I stumbled upon in this step was refreshing the UI from step 7 and 8, since it wasn't updating accordingly. I also ran into a problem with a game that would not delete or change when using the buttons. I had to remove it manually from the localStorage since it was a previous code from testing.

Step 10 - done. The goal of this step was to organize the game collection by play count, personal rating, difficulty and/or amount of players. I created a dropdown selection and then sorted them inside the displayGames function. 

For this assignment overall I used basic JavaScript functions to maintain clarity and simple reusability. From previous classes, I learnt how to implement HTML elements like document.getElementById to grab elements and .addEventListener to handle interactions. I used external sources to familiarize myself better with personalizing the overall webpage and constructing the game cards. 
The assingment asked for FileReader and localStorage and I used both accordingly to save, load and read the content of the games provided. I added window.addEventListener every now and then to ensure that my code runs only after the page fully loaded. I used normal array methods to display the games logically and sort them easier for convience.

Resources:
DOM information - https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
Event Listener - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
HTML Storage - https://www.w3schools.com/HTML/html5_webstorage.asp ; https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
FileReader - https://developer.mozilla.org/en-US/docs/Web/API/FileReader
Styling - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model ; https://developer.mozilla.org/en-US/docs/Web/CSS/Reference