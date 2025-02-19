import React, {useState, useEffect} from 'react';
import './style.css';

const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
// Audios
const cardFlipAudio = new Audio('Sounds/cardflip.mp3');
const wrongAudio = new Audio('Sounds/wrongBuzzer.wav');
const rightAudio = new Audio('Sounds/rightBuzzer.wav');
const winnerAudio = new Audio('Sounds/winner.wav');

cardFlipAudio.volume = 0.3;
wrongAudio.volume = 0.05;
rightAudio.volume = 0.1;
winnerAudio.volume = 0.1;

const shuffleCards = () => [...symbols, ...symbols].sort(() => Math.random() - 0.5);

const Card = ({ symbol, isFlipped, onClick, isMatched }) => (
    <div className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`} onClick={onClick}>
        <h1>{isFlipped ? symbol : ''}</h1>
    </div>
);

function App() {
    const [cards, setCards] = useState(shuffleCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning)
        {
            interval = setInterval(() => setTimer((t) => t + 1),  1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (matchedCards.length === symbols.length * 2)
        {
            setIsRunning(false);
            setShowResults(true);
            winnerAudio.play();
        }}, [matchedCards]);


    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);
        setIsRunning(true);

        cardFlipAudio.play();

        if (newFlipped.length === 2)
        {
            setMoves(moves + 1);
            const [firstIndex, secondIndex] = newFlipped;
            if (cards[firstIndex] === cards[secondIndex])
            {
                setMatchedCards([...matchedCards, firstIndex, secondIndex]);
                rightAudio.play();
            }
            else
            {
                setTimeout(() => wrongAudio.play(), 1000);
            }
            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    const resetGame = () => {
        setCards(shuffleCards());
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(0);
        setIsRunning(true);
        setGameActive(true);
        setShowResults(false);
    }

    const handlePlay = () => {
        setCards(shuffleCards());
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(0);
        setIsRunning(true);
        setGameActive(true);
        setShowResults(false);
    }

    const handleQuit = () => {
        setGameActive(false);
        setIsRunning(false);
        setShowResults(false);
    }


    const Results = ({ timer, moves, resetGame }) => (
        <>
            <div className="blur-area"></div>
            <div id="results">
                <h1>You Win</h1>
                <p className="time-result">Time
                    Taken: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
                <p className="move-result">Moves Taken: {moves}</p>
                <button id="reset-button" onClick={resetGame}>Reset Game</button>
            </div>
        </>
    );

    const InfoArea = () => (
        <div className="info-area">
            <h1>Instructions</h1>
            <p>Click on each card to match their letter to a corresponding card in the pile. If the two
                selected cards
                are different, they will be hidden again. If you match the cards, they will remain
                visible. </p>
        </div>
    );

    const MenuSectionInactive = ({ onPlay }) => (
        <div className="menu-section">
            <h1>Card Matching Game</h1>
            <button id="play-button" onClick={onPlay}>Play Game</button>
        </div>
    );

    const MenuSectionActive = ({ onQuit, moves, timer }) => (
        <div className="menu-section">
            <p className="timer-text">Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</p>
            <p className="moves-text">Moves: {moves}</p>
            <button id="quit-button" onClick={onQuit}>Quit Game</button>
        </div>
    );

    const CardArea = ({ cards, flippedCards, matchedCards, onCardClick }) => (
        <div className="card-area">
            {cards.map((symbol, index) => (
                <Card
                    key={index}
                    symbol={symbol}
                    isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                    isMatched={matchedCards.includes(index)}
                    onClick={() => onCardClick(index)}
                />
            ))}
        </div>
    );

    return (
        <div className="back-area">
            {showResults && <Results timer={timer} moves={moves} resetGame={resetGame}/>}

            {!gameActive && <><InfoArea/><MenuSectionInactive onPlay={handlePlay}/></>}

            {gameActive && <><CardArea cards={cards} flippedCards={flippedCards} matchedCards={matchedCards} onCardClick={handleCardClick}/><MenuSectionActive onQuit={handleQuit} moves={moves} timer={timer}/></>}
        </div>
    )
}

export default App
