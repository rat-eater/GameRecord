const testGame = new Game({
    title: "Test Game",
    designer: "Tester",
    artist: "Art Tester",
    publisher: "Test Inc.",
    year: 2025,
    players: "2-4",
    time: "45 mins",
    difficulty: "Easy",
    url: "http://example.com/testgame",
    playCount: 1,
    personalRating: 5
  });
  
  console.log("Test game:", testGame);  

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