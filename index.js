// Define the size of the map
const MAP_SIZE = 25;

// Define Unicode block element characters
const PLAYER_CHAR = "\u25C9"; // Player character
const WALL_CHAR = "\u25A0"; // Wall character
const TEMPUSVOX = "\u269B"
const EMPTY_CHAR = "\u25FB"; // Empty cell character

// Create an empty map with all cells set to EMPTY_CHAR
const map = Array.from({ length: MAP_SIZE }, () => Array.from({ length: MAP_SIZE }, () => EMPTY_CHAR));

// Define the starting position of the player
let playerX = 0;
let playerY = 0;

// Set the starting cell to PLAYER_CHAR (this will be the player's starting position)
map[playerY][playerX] = PLAYER_CHAR;

// Define the number of walls you want to add to the map
const NUM_WALLS = 100;
const NUM_ELEMENTS = 4

// Add random walls to the map
for (let i = 0; i < NUM_WALLS; i++) {
  let x = Math.floor(Math.random() * MAP_SIZE);
  let y = Math.floor(Math.random() * MAP_SIZE);

  // Make sure the cell is empty before adding a wall
  if (map[y][x] === EMPTY_CHAR) {
    map[y][x] = WALL_CHAR;
  }
}

// Add random walls to the map
for (let i = 0; i < NUM_ELEMENTS; i++) {
  let x = Math.floor(Math.random() * MAP_SIZE);
  let y = Math.floor(Math.random() * MAP_SIZE);

  // Make sure the cell is empty before adding a wall
  if (map[y][x] === EMPTY_CHAR) {
    map[y][x] = TEMPUSVOX;
  }
}

// Define a function to print the map to the console
function printMap() {
  for (let y = 0; y < MAP_SIZE; y++) {
    let row = '';
    for (let x = 0; x < MAP_SIZE; x++) {
      row += `${map[y][x]} `;
    }
    console.log(row);
  }
}

// Print the initial map
printMap();