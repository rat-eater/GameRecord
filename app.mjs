import Game from "./models/game.mjs";

let games = [];

function saveGame(game) {
  const key = `game_${game.title}`;
  localStorage.setItem(key, JSON.stringify(game));
}

function loadGames() {
  games = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("game_")) {
      const raw = JSON.parse(localStorage.getItem(key));
      games.push(new Game(raw));
    }
  }
}

function getAllGames() {
  return games;
}

function getGameByTitle(title) {
  return games.find(game => game.title === title);
}

function importGamesFromJSON(json) {
  const importedGames = JSON.parse(json);
  importedGames.forEach(data => {
    const game = new Game(data);
    saveGame(game);
  });

  loadGames();       
  displayGames();   
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

function displayGames() {
  const container = document.getElementById("gameList");
  container.innerHTML = "";

  getAllGames().forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.className = "game";

    gameDiv.innerHTML = `
      <h3>${game.title}</h3>
      <p><strong>Designer:</strong> ${game.designer}</p>
      <p><strong>Players:</strong> ${game.players}</p>
      <p><strong>Play Count:</strong> <span id="plays-${game.title}">${game.playCount}</span></p>
      <p><strong>Rating:</strong> <span id="rating-${game.title}">${game.personalRating}</span>/10</p>

      <input type="range" min="0" max="10" value="${game.personalRating}" 
        data-title="${game.title}" class="rating-slider" />

      <button data-title="${game.title}" class="play-button">+1 Play</button>
    `;

    container.appendChild(gameDiv);
  });

  setupInteractivity(); 
}

function setupInteractivity() {
  document.querySelectorAll('.rating-slider').forEach(slider => {
    slider.addEventListener('input', (event) => {
      const title = event.target.dataset.title;
      const value = parseInt(event.target.value);
      const game = getGameByTitle(title);
      if (game) {
        game.personalRating = value;
        saveGame(game);
        displayGames(); 
      }
    });
  });

  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const title = event.target.dataset.title;
      const game = getGameByTitle(title);
      if (game) {
        game.playCount += 1;
        saveGame(game);
        displayGames(); 
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadGames();      
  displayGames();   
});

  

  