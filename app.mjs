import Game from "./models/game.mjs";

const games = [];

function saveGame(game) {
    const key = `game_${game.title}`;
    localStorage.setItem(key, JSON.stringify(game));
  }

  function loadGames() {
    const games = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("game_")) {
        const raw = JSON.parse(localStorage.getItem(key));
        games.push(new Game(raw));
      }
    }
    return games;
  }

  function importGamesFromJSON(json) {
    const importedGames = JSON.parse(json);
    importedGames.forEach(data => {
      const game = new Game(data);
      saveGame(game);
      games.push(game);
    });
    console.log("Games in localStorage:", games);
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

  document.getElementById("importSource").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        importGamesFromJSON(e.target.result);
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };
    reader.readAsText(file);
  });

  