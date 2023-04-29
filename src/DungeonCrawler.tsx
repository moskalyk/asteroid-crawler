import React from "react";

// Define the size of the map
const MAP_SIZE = 27;

// Define Unicode block element characters
const PLAYER_CHAR = "\u25C9"; // Player character
const WALL_CHAR = "\u2587"; // Wall character
const EMPTY_CHAR = "\u25FB"; // Empty cell character
const TEMPUSVOX = '\u2727';
const ENEMY = '☣'
const TRACKS = '◼'

// Create an empty map with all cells set to EMPTY_CHAR
const map: any = Array.from({ length: MAP_SIZE }, () => Array.from({ length: MAP_SIZE }, () => EMPTY_CHAR));

// Define the starting position of the player
let playerX = 0;
let playerY = 0;

// Set the starting cell to PLAYER_CHAR (this will be the player's starting position)
map[playerY][playerX] = PLAYER_CHAR;

// Define the number of walls you want to add to the map
const NUM_WALLS = 100;

const wait = async (ms: number) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

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

  async function isWallNearby(playerX: any, playerY: any, map: any, grow: any) {
    for (let y = playerY - 2; y <= playerY + 2; y++) {
      for (let x = playerX - 2; x <= playerX + 2; x++) {
        if (y >= 0 && y < MAP_SIZE && x >= 0 && x < MAP_SIZE) {
          if (map[y][x] === PLAYER_CHAR) {
            // return true;
            // setEnd(true)
            grow()
            await slime()
          }
        }
      }
    }
  }

function coverTracks(map: any){
  for (let i = 0; i < map[0].length; i++) {
    for (let j = 0; j < map.length; j++) {
      if(map[j][i] == PLAYER_CHAR) map[j][i] = TRACKS
      
    }
  }
}

async function slime() {
  const width = MAP_SIZE;
  const height = MAP_SIZE;
  const center = [width/2, height/2];
  const list = [];
  // const grid = [];

  // // initialize the grid with 0s
  // for (let i = 0; i < height; i++) {
  //     grid.push(new Array(width).fill(0));
  // }

  // loop through each point in the grid
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // calculate the distance from the center of the grid
      const distance = Math.sqrt((center[0]-j)**2 + (center[1]-i)**2);
      
      // set the value of the point based on the distance from the center
      if (distance < 500) {
        // convert the value to a number with 5 decimal places
        const value = Number((1 - distance/500).toFixed(5));
        list.push({x: i, y: j, value: value});
        // grid[i][j] = m;
      }
    }
  }

  // const static = list

  // sort the list in descending order based on the value of each point
  list.sort((a, b) => b.value - a.value);

  for (let i = 0; i < height * width; i++) {
          // console.log(grid[j].join(" "));
      map[list[i].x][list[i].y] = 0
      await wait(5)
      console.log('testing')
  }
}

let stepCount = 0
function DungeonCrawlerGame(props: any) {
    const [playerPosition, setPlayerPosition] = React.useState({ x: playerX, y: playerY });
    const [end, setEnd] = React.useState(false);
    const [counter, setCounter] = React.useState(0)
    const [step, setStep] = React.useState(0)
    const [init,setInit] = React.useState(false)

    const checkComplete = () => {
      let check = true
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          if(map[i][j] == TEMPUSVOX && step == 0) check = false
        }
      }
      console.log(check)
      return check
    }
    const grow = () => {
      setInterval(() => {
        console.log(step)
        stepCount++
        setStep(step => step + 1)
      }, 5)
    } 

    React.useEffect(() => {
      async function handleKeyDown(event: any) {
        console.log(event)
        if(step == 0){
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


        let x = Math.floor(Math.random() * MAP_SIZE);
        let y = Math.floor(Math.random() * MAP_SIZE);
        
        setCounter(counter => counter + 1)
        // Make sure the cell is empty before adding a wall
        if (map[y][x] === EMPTY_CHAR && counter % 10 == 0) {
          map[y][x] = ENEMY;
        }
      
        await isWallNearby(x, y, map, grow)

      }
      if(!init){
        setInit(true)

        let interval = setInterval(() => {
          if(checkComplete()){
            if(stepCount == 0) {
              console.log(step)
              setEnd(true)
            }else {
              props.setView(1)
            }
          }
        }, 100)
      }
    }

      window.addEventListener("keydown", handleKeyDown);
      return () =>
        window.removeEventListener("keydown", handleKeyDown)
      
    }, [playerPosition, end, step]);
  
    // Update the player's position on the map
    coverTracks(map)

    map[playerPosition.y][playerPosition.x] = PLAYER_CHAR;
  
    return (
      <div className="dungeon-crawler-game">
        {
          !end ? step > 0 ? <><p>get ready to battle</p><DungeonCrawlerMap map={map} /> </>: <DungeonCrawlerMap map={map} />: <p>you won</p>
        }
      </div>
    );
  }

  //create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value: any) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

function DungeonCrawlerMap(props: any) {
  React.useEffect(()=> {
  }, [map])
  return (
    <div className="dungeon-crawler-map">
      {map.map((row: any, rowIndex: any) => (
        <div key={rowIndex} className="row">
          {row.map((cell: any, cellIndex: any) => (
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
