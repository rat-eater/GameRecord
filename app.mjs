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

  console.log("Games in localStorage:", loadGames());

  function displayGames() {
    const container = document.getElementById("gameList");
    container.innerHTML = "";

    const games = getAllGames();
    games.forEach(game => {
      const gameDiv = document.createElement("div");
      gameDiv.className = "game";

      gameDiv.innerHTML = `
        <h3>${game.title}</h3>
        <p><strong>Designer:</strong> ${game.designer}</p>
        <p><strong>Artist:</strong> ${game.artist}</p>
        <p><strong>Publisher:</strong> ${game.publisher}</p>
        <p><strong>Players:</strong> ${game.players}</p>
        <p><strong>Time:</strong> ${game.time}</p>
        <p><strong>Difficulty:</strong> ${game.difficulty}</p>
        <p><strong>Year:</strong> ${game.year}</p>
        <p><strong>Play Count:</strong> ${game.playCount}</p>
        <p><strong>Rating:</strong> ${game.personalRating}/10</p>
  
        <input type="range" min="0" max="10" value="${game.personalRating}" disabled />
        <button disabled>+1 Play</button>
      `;
  
      container.appendChild(gameDiv);
    });
  }

  

  