import React from "react";

// Define the size of the map
const MAP_SIZE = 27;

// Define Unicode block element characters
const PLAYER_CHAR = "\u25C9"; // Player character
const WALL_CHAR = "\u2587"; // Wall character
const EMPTY_CHAR = "\u25FB"; // Empty cell character
const TEMPUSVOX = '\u2727';
// Create an empty map with all cells set to EMPTY_CHAR
const map = Array.from({ length: MAP_SIZE }, () => Array.from({ length: MAP_SIZE }, () => EMPTY_CHAR));

// Define the starting position of the player
let playerX = 0;
let playerY = 0;

// Set the starting cell to PLAYER_CHAR (this will be the player's starting position)
map[playerY][playerX] = PLAYER_CHAR;

// Define the number of walls you want to add to the map
const NUM_WALLS = 100;

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
for (let i = 0; i < Math.floor(NUM_WALLS*.2); i++) {
    let x = Math.floor(Math.random() * MAP_SIZE);
    let y = Math.floor(Math.random() * MAP_SIZE);
  
    // Make sure the cell is empty before adding a wall
    if (map[y][x] === EMPTY_CHAR) {
      map[y][x] = TEMPUSVOX;
    }
  }

function DungeonCrawlerGame(props: any) {
    const [playerPosition, setPlayerPosition] = React.useState({ x: playerX, y: playerY });
  
    React.useEffect(() => {
      function handleKeyDown(event: any) {
        console.log(event)
        switch (event.key) {
          case "ArrowUp":
            if (playerPosition.y > 0 && map[playerPosition.y - 1][playerPosition.x] !== WALL_CHAR && map[playerPosition.y - 1][playerPosition.x] !== PLAYER_CHAR) {
                if(map[playerPosition.y -1][playerPosition.x] == TEMPUSVOX) props.setScore((prev: number) => prev + 1)
                setPlayerPosition({ x: playerPosition.x, y: playerPosition.y - 1 });
            }
            break;
          case "ArrowDown":
            if (playerPosition.y < MAP_SIZE - 1 && map[playerPosition.y + 1][playerPosition.x] !== WALL_CHAR && map[playerPosition.y + 1][playerPosition.x] !== PLAYER_CHAR) {
                if(map[playerPosition.y +1][playerPosition.x] == TEMPUSVOX) props.setScore((prev: number) => prev + 1)
                setPlayerPosition({ x: playerPosition.x, y: playerPosition.y + 1 });
            }
            break;
          case "ArrowLeft":
            if (playerPosition.x > 0 && map[playerPosition.y][playerPosition.x - 1] !== WALL_CHAR && map[playerPosition.y][playerPosition.x - 1] !== PLAYER_CHAR) {
                if(map[playerPosition.y][playerPosition.x - 1] == TEMPUSVOX) props.setScore((prev: number) => prev + 1)
                setPlayerPosition({ x: playerPosition.x - 1, y: playerPosition.y });
            }
            break;
          case "ArrowRight":
            if (playerPosition.x < MAP_SIZE - 1 && map[playerPosition.y][playerPosition.x + 1] !== WALL_CHAR && map[playerPosition.y][playerPosition.x + 1] !== PLAYER_CHAR) {
                if(map[playerPosition.y][playerPosition.x + 1] == TEMPUSVOX) props.setScore((prev: number) => prev + 1)

                setPlayerPosition({ x: playerPosition.x + 1, y: playerPosition.y });
            }
            break;
          default:
            break;
        }
      }
  
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [playerPosition]);
  
    // Update the player's position on the map
    map[playerPosition.y][playerPosition.x] = PLAYER_CHAR;
  
    return (
      <div className="dungeon-crawler-game">
        <DungeonCrawlerMap map={map} />
      </div>
    );
  }

function DungeonCrawlerMap(props: any) {
  return (
    <div className="dungeon-crawler-map">
      {map.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <span key={cellIndex} className="cell">
              {cell + " "}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DungeonCrawlerGame;
