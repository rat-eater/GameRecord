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
