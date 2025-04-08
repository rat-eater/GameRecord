import Game from "./models/game.mjs";

  function saveGame(game) {
    const key = "game_" + game.title.replaceAll(" ", "");
    localStorage.setItem(key, JSON.stringify(game));
  }

  function getAllGames() {
    const games = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith("game_")) {
            const gameText = localStorage.getItem(key);
            const gameData = JSON.parse(gameText);
            const game = new Game(gameData);
            games.push(game);
        }
    }

    return games;
  }

  function exportGameAsJSON() {
    const games = getAllGames();
    return JSON.stringify(games, null, 2);
  }

  function importGamesFromJSON(jsonString) {
    const gameList =  JSON.parse(jsonString);

    gameList.forEach(data => {
        const game =  new Game(data);
        saveGame(game);
    });
  }

  // Test

const testGame = new Game({
    title: "Test Game",
    designer: "Tester",
    artist: "Art Tester",
    publisher: "Test Inc.",
    year: 2025,
    players: "2–4",
    time: "45 mins",
    difficulty: "Easy",
    url: "http://example.com/testgame",
    playCount: 1,
    personalRating: 5
  });
  
  saveGame(testGame); 
  console.log("Games in localStorage:", getAllGames()); 

  document.getElementById(`fileInput`).addEventListener(`change`, (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const games = JSON.parse(e.target.result);
            if (Array.isArray(games)) {
                games.forEach((game, index) => {
                    const key = `game_${index}`;
                    saveGame(key, game);
                });
                console.log('Games imported successfully!');
            } else {
                console.error('Invalid JSON format. Expected an array of games.');
            }
        } catch (err) {
            console.error('Error parsing JSON:', err);
        }
    };
    reader.readAsText(file);
  });

  