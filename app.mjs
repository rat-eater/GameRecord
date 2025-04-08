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