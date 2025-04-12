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

Step 7 - not done.