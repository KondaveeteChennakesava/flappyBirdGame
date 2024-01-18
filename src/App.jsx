import { useState, useEffect } from 'react'
import './App.css'

const bird_size = 20
const game_height = 640
const game_width = 360
const game_difficulty = 120
const obstacle_width = 50

function App() {
    const [startGame, setStartGame] = useState(false);
    const [birdPosition, setBirdPosition] = useState(game_height / 2 - bird_size / 2);
    const [score, setScore] = useState(0);
    const [obstacleHeight,setObstaclHeight] = useState(100);
    const [obstacleLeftPosition,setObstacleLeftPosition] = useState(game_width - obstacle_width);
    useEffect(() => {
        let interval = null
        if (startGame) {
            interval = setInterval(() => {
                if (obstacleLeftPosition > -obstacle_width) {
                    setObstacleLeftPosition(obstacleLeftPosition => obstacleLeftPosition - 4)
                }else{
                    setObstacleLeftPosition(game_width - obstacle_width);
                    setObstaclHeight(Math.floor(Math.random() * (game_height - game_difficulty)));
                    setScore(score => score + 1);
                }
            }, 24);
        }
        return () => clearInterval(interval);
    }, [startGame,obstacleLeftPosition])
    useEffect(() => {
        if(startGame){
            const collideUpperObstacle = birdPosition < obstacleHeight;
            const collideLowerObstale = birdPosition > obstacleHeight + game_difficulty;
            if(obstacleLeftPosition < bird_size && (collideLowerObstale || collideUpperObstacle)){
                setStartGame(false);
            }
        }
    },[startGame,obstacleLeftPosition,birdPosition,obstacleHeight])
    useEffect(() => {
        let interval = null
        if (startGame) {
            interval = setInterval(() => {
                if (birdPosition < game_height - bird_size) {
                    setBirdPosition(birdPosition => birdPosition + 4)
                }
            }, 24);
        }
        return () => clearInterval(interval);
    }, [startGame,birdPosition])
    const bottomObstacleHeight = game_height - (obstacleHeight + game_difficulty);
    return (
        <>
            <div 
            onClick={
                () => {
                    const newBirdPosition = birdPosition - 50;
                    if (newBirdPosition > 0){
                        setBirdPosition(birdPosition => newBirdPosition)
                    }else{
                        setBirdPosition(0)
                    }
                }
            }
            style={{
                overflow: 'hidden',
                position: "relative",
                "backgroundColor": "skyblue",
                height: `${game_height}px`,
                width: `${game_width}px`
            }}>
                <p style = {{
                    color: 'yellow',
                    fontSize : '30px'
                }}>{score}</p>
                <div style = {{
                    
                    position: 'absolute',
                    top : `${0}px`,
                    left : `${obstacleLeftPosition}px`,
                    width : `${obstacle_width}px`,
                    height: `${obstacleHeight}px`,
                    backgroundColor: 'green'
                }}/>
                <div style = {{
                    position: 'absolute',
                    top : `${obstacleHeight + game_difficulty}px`,
                    left : `${obstacleLeftPosition}px`,
                    width : `${obstacle_width}px`,
                    height: `${bottomObstacleHeight}px`,
                    backgroundColor: 'green'
                }}/>
                {/* Bird */}
                <div style={{
                    position: 'absolute',
                    "backgroundColor": "red",
                    width: `${bird_size}px`,
                    height: `${bird_size}px`,
                    borderRadius: "50%",
                    top: `${birdPosition}px`
                }} />
            </div>
            <button onClick={() => { setStartGame(true) }}>Start Game</button>
        </>
    )
}

export default App
