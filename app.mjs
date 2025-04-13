import Game from "./models/game.mjs";

const get = (id) => document.getElementById(id).value.trim();
let games = [];

// Basic functions
function saveGame(game) {
  const key = `game_${game.title}`;
  localStorage.setItem(key, JSON.stringify(game));
}

function loadGames() {
  games = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("game_")) {
      try {
        const raw = JSON.parse(localStorage.getItem(key));
        if (raw && raw.title) {
          games.push(new Game(raw));
        }
      } catch (error) {
        console.error(`Error at key "${key}":`, error);
      }
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

  if (!Array.isArray(importedGames)) {
    console.warn("JSON file did not contain an array of games.");
    return;
  }

  importedGames.forEach(data => {
    const game = new Game(data);
    saveGame(game);
  });

  loadGames();       
  displayGames();   
}


// Practic functions (steps)
document.getElementById("importSource").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  console.log(`Loading file: "${file.name}"`);

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      importGamesFromJSON(e.target.result);
    } catch (err) {
      console.error("Invalid JSON.", err);
    }
  };

  reader.readAsText(file);
});

function displayGames() {
  const container = document.getElementById("gameList");
  container.innerHTML = "";

  let sortedGames = [...getAllGames()];
  const sortBy = document.getElementById("sortBy").value;

  if (sortBy === "playCount") {
    sortedGames.sort((a, b) => b.playCount - a.playCount);
  } else if (sortBy === "personalRating") {
    sortedGames.sort((a, b) => b.personalRating - a.personalRating);
  } else if (sortBy === "difficulty") {
    sortedGames.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
  } else if (sortBy === "players") {
    sortedGames.sort((a, b) => {
      const getMinPlayers = str => parseInt(str) || 0;
      return getMinPlayers(a.players) - getMinPlayers(b.players);
    });
  }

  sortedGames.forEach(game => {
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
  <button data-title="${game.title}" class="delete-button">Delete</button>
`;


    container.appendChild(gameDiv);
  });

  setupInteractivity(); 
}

//Interactivity (slider and button)

function setupInteractivity() {
  // Rating slider
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

  // Play Count button
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

  // Delete button
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const title = event.target.dataset.title;
      const key = `game_${title}`;
      localStorage.removeItem(key);
      loadGames(); 
      displayGames();       
    });
  });
}

document.getElementById("newGameForm").addEventListener("submit", (event) => {
  event.preventDefault();
  
  const game = new Game({
    title: get("title"),
    designer: get("designer"),
    artist: get("artist"),
    publisher: get("publisher"),
    year: parseInt(get("year")) || null,
    players: get("players"),
    time: get("time"),
    difficulty: get("difficulty"),
    url: get("url"),
    playCount: parseInt(get("playCount")),
    personalRating: parseInt(get("personalRating"))
  });

  saveGame(game);
  loadGames();
  displayGames();

  event.target.reset();
});

window.addEventListener("DOMContentLoaded", () => {
  loadGames();
  displayGames();
});

document.getElementById("sortBy").addEventListener("change", () => {
  displayGames();
});