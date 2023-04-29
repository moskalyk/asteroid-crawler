import React from 'react';
import logo from './logo.svg';
import './App.css';
import DungeonCrawlerGame from './DungeonCrawler';
function App() {
  const [score, setScore] = React.useState(0)
  const [view, setView] = React.useState<number>(0)

  const rendering = (view: any) => {
    let renderer;
    switch(view){
      case 0:
        renderer = <>
                <DungeonCrawlerGame setView={setView} setScore={setScore}/>
                  <div className='menu'>
                    score: {score}
                  </div>
               </>
      break;
      case 1:
        renderer = <>battle</>
      break;
    }
    return renderer
  }
  return (
    <div className="App">
      <br/>
        {rendering(view)}
    </div>
  );
}

// 𓈝, 𓊝, 𓎁, 𓏀, 𓏎, 𓀚, 𓂠
export default App;
