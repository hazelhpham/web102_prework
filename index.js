/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // Get the container element to append the game cards
  // Loop over each game object in the data
  for (const game of games) {
    // Create a new div element to represent the game card
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card"); // Add the class to style the card

    // Set the inner HTML using template literals to display game info
    gameCard.innerHTML = `
             <img src="${game.img}" alt="${game.name}" class="game-img">
             <h3 class="game-name">${game.name}</h3>
             <p class="game-description">${game.description}</p>
             <p class="game-pledged">Pledged: $${game.pledged}</p>
             <p class="game-goal">Goal: $${game.goal}</p>
             <p class="game-backers">Backers: ${game.backers}</p>
         `;

    // Append the game card to the games container
    gamesContainer.appendChild(gameCard);
  }
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(
  (total, game) => total + game.backers,
  0
);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");

const numberOfGames = GAMES_JSON.length;

gamesCard.innerHTML = numberOfGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // Parse the games data from the games.js content
  const gameData = JSON.parse(GAMES_DATA);
  // Use filter() to get a list of games that have not yet met their goal
  const unfundedGames = gameData.filter((game) => game.pledged < game.goal);

  // Use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);

  // Return the number of games in the array
  return unfundedGames.length;
}
// Call the function and log the result
const numUnfundedGames = filterUnfundedOnly();
console.log("Number of unfunded games:", numUnfundedGames); //7

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // Parse the games data from the games.js content
  const gameData = JSON.parse(GAMES_DATA);

  // Use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = gameData.filter((game) => game.pledged >= game.goal);

  // Use the function we previously created to add funded games to the DOM
  addGamesToPage(fundedGames);

  // Return the number of games in the array
  return fundedGames.length;
}

// Call the function and log the result
const numFundedGames = filterFundedOnly();
console.log("Number of funded games:", numFundedGames); //4

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // Parse the games data from the games.js content
  const gamesData = JSON.parse(GAMES_DATA);

  // Use the function we previously created to add all games to the DOM
  addGamesToPage(gamesData);

  // Return the number of games in the array
  return gamesData.length;
}

// Call the function and log the result
const numAllGames = showAllGames();
console.log("Number of all games:", numAllGames);

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

// Use filter or reduce to sum the number of unfunded games in GAMES_JSON.
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

// Get the count of unfunded games
const unfundedGamesCount = unfundedGames.length;

console.log("Number of unfunded games:", unfundedGamesCount);

// create a string that explains the number of unfunded games using the ternary operator
const totalRaised2 = GAMES_JSON.reduce(
  (total, game) => total + game.pledged,
  0
);
const fundedGamesCount = GAMES_JSON.length - unfundedGamesCount;

const message = `
  We've raised $${totalRaised2.toLocaleString()} across ${
  GAMES_JSON.length
} games.
  ${
    fundedGamesCount === 0
      ? "No games are"
      : `Only ${fundedGamesCount} game${
          fundedGamesCount === 1 ? " is" : "s are"
        }`
  } fully funded,
  and ${
    unfundedGamesCount === 0
      ? "all games are"
      : `${unfundedGamesCount} game${
          unfundedGamesCount === 1 ? " is" : "s are"
        }`
  } unfunded. We need your help to fund these amazing games!
`;

console.log(message);
// create a new DOM element containing the template string and append it to the description container
// Create a new DOM element
const messageElement = document.createElement("p");
messageElement.innerHTML = message;
descriptionContainer.appendChild(messageElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameNameElement = document.createElement("p");
topGameNameElement.textContent = `${topGame.name}`;
firstGameContainer.appendChild(topGameNameElement);

// create a new element to hold the name of the runner up game, then append it to the correct element
const runnerUpGameNameElement = document.createElement("p");
runnerUpGameNameElement.textContent = `${runnerUpGame.name}`;
secondGameContainer.appendChild(runnerUpGameNameElement);
