import React from 'react';
import logo from './logo.svg';
import './App.css';
import DungeonCrawlerGame from './DungeonCrawler';
function App() {
  const [score, setScore] = React.useState(0)
  return (
    <div className="App">
      <br/>
      <DungeonCrawlerGame setScore={setScore}/>
      <div className='menu'>
        score: {score}
      </div>
    </div>
  );
}

export default App;
