// Constant variables for HTML references
const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
const cardArea = document.querySelector('.card-area');
const infoArea = document.querySelector('.info-area');
const playButton = document.querySelector('#play-button');
const resetButton = document.querySelector('#reset-button');
const quitButton = document.querySelector('#quit-button');
const resultsScreen = document.querySelector('#results');
const blur = document.querySelector('.blur-area');
const timerText = document.querySelector('.timer-text');
const movesText = document.querySelector('.moves-text');
const totalMovesText = document.querySelector('.total-moves-text');

// Audios
const cardFlipAudio = new Audio('Sounds/cardflip.mp3');
const wrongAudio = new Audio('Sounds/wrongBuzzer.wav');
const rightAudio = new Audio('Sounds/rightBuzzer.wav');
const winnerAudio = new Audio('Sounds/winner.wav');

cardFlipAudio.volume = 0.3;
wrongAudio.volume = 0.05;
rightAudio.volume = 0.1;
winnerAudio.volume = 0.1;

// Logic variables
let firstPick = null;
let secondPick = null;
let numMoves = 0;
let matchedPairs = 0;
let timerInterval = null;
let seconds = 0;
let minutes = 0;

function loadState()
{
    const savedState = sessionStorage.getItem("savedGameState");

    if (savedState)
    {
        const gameState = JSON.parse(savedState);
        cards = gameState.cards;
        numMoves = gameState.numMoves;
        matchedPairs = gameState.matchedPairs;
        minutes = gameState.minutes;
        seconds = gameState.seconds;

        movesText.textContent = `Moves: ${numMoves}`;
        timerText.textContent = `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        cardArea.style.display = sessionStorage.getItem("cardAreaDisplay") || "none";
        infoArea.style.display = sessionStorage.getItem("infoAreaDisplay") || "block";
        playButton.style.display = sessionStorage.getItem("playButtonDisplay") || "block";
        quitButton.style.display = sessionStorage.getItem("quitButtonDisplay") || "none";
        createCards();
        startTimer();
    }
}

function saveState()
{
    const gameState = {
        cards,
        numMoves,
        matchedPairs,
        minutes,
        seconds
    };

    sessionStorage.setItem('cardAreaDisplay', cardArea.style.display);
    sessionStorage.setItem('infoAreaDisplay', infoArea.style.display);
    sessionStorage.setItem('playButtonDisplay', playButton.style.display);
    sessionStorage.setItem('quitButtonDisplay', quitButton.style.display);
    sessionStorage.setItem("savedGameState", JSON.stringify(gameState));
}

function loadTotalMoves()
{
    let totalMoves = localStorage.getItem("totalMoves") || 0;
    totalMovesText.textContent = `Total Moves (All Tabs): ${totalMoves}`;
}

function updateTotalMoves()
{
    let totalMoves = localStorage.getItem("totalMoves") || 0;
    totalMoves = parseInt(totalMoves) + 1;
    localStorage.setItem("totalMoves", totalMoves);
    totalMovesText.textContent = `Total Moves (All Tabs): ${totalMoves}`;
}

// Create cards by creating a new card element and adding a specific symbol to its data.
function createCards()
{
    cardArea.innerHTML = '';

    cards.forEach((symbol, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.symbol = symbol;
        cardElement.dataset.index = index;

        const storedCardState = sessionStorage.getItem(`card-${index}`);
        if (storedCardState === "matched")
        {
            cardElement.classList.add('matched');
            cardElement.innerHTML = `<h1>${symbol}</h1>`;
            cardElement.style.backgroundColor = 'green';
        }
        else
        {
            cardElement.innerHTML = '<h1></h1>';
        }

        cardArea.appendChild(cardElement);
        cardElement.addEventListener('click', handleCardClick);
    });
}

// Handle card clicking by checking the selection first then comparing to the next selection for a match.
function handleCardClick()
{
    const clickedCard = event.currentTarget;
    cardFlipAudio.play();

    if (clickedCard === firstPick || clickedCard.classList.contains('matched'))
    {
        return;
    }

    clickedCard.querySelector('h1').textContent = clickedCard.dataset.symbol;

    if (!firstPick)
    {
        firstPick = clickedCard;
    }
    else
    {
        if (secondPick)
        {
            setTimeout(() => {
                firstPick.querySelector('h1').textContent = '';
                secondPick.querySelector('h1').textContent = '';
                resetSelection();
            }, 1);
            clickedCard.querySelector('h1').textContent = '';
            return;
        }
        secondPick = clickedCard;
        numMoves++;
        movesText.textContent = `Moves: ${numMoves}`;
        saveState();
        updateTotalMoves();

        if (firstPick.dataset.symbol === secondPick.dataset.symbol)
        {
            rightAudio.play();
            firstPick.classList.add('matched');
            secondPick.classList.add('matched');
            matchedPairs++;

            firstPick.style.backgroundColor = 'green';
            secondPick.style.backgroundColor = 'green';

            sessionStorage.setItem(`card-${firstPick.dataset.index}`, "matched");
            sessionStorage.setItem(`card-${secondPick.dataset.index}`, "matched");

            saveState();

            if (matchedPairs === symbols.length)
            {
                winGame();
            }
            resetSelection();
        }
        else
        {
            setTimeout(() => {
                wrongAudio.play();
                firstPick.querySelector('h1').textContent = '';
                secondPick.querySelector('h1').textContent = '';
                resetSelection();
            }, 1000);
        }
    }
}

// Reset the user's selections
function resetSelection()
{
    firstPick = null;
    secondPick = null;
}

// Start the timer with a minute format and update minute value based on seconds.
function startTimer()
{
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        seconds++;
        if (seconds >= 60)
        {
            minutes++;
            seconds = 0;
        }
        if (Math.abs(seconds).toString().length >= 2)
        {
            timerText.textContent = `Time: ${minutes}:${seconds}`;
        }
        else
        {
            timerText.textContent = `Time: ${minutes}:0${seconds}`;
        }
        saveState();
        loadTotalMoves();
    }, 1000);
}

// Enable winner screen and pause constant changes.
function winGame()
{
    winnerAudio.play();
    clearInterval(timerInterval);
    resultsScreen.style.display = "block";
    blur.style.display = 'block';
    resultsScreen.querySelector('.time-result').textContent = `Time Taken: ${timerText.textContent}`;
    resultsScreen.querySelector('.move-result').textContent = `Moves Taken: ${numMoves}`;
}


// Set up game once user clicks play.
playButton.addEventListener('click', () => {
    numMoves = 0;
    matchedPairs = 0;
    minutes = 0;
    seconds = 0;
    movesText.textContent = 'Moves: 0';
    timerText.textContent = 'Time: 0:00';

    cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    sessionStorage.clear();
    createCards();
    startTimer();
    cardArea.style.display = "grid";
    infoArea.style.display = "none";
    playButton.style.display = "none";
    quitButton.style.display = "block";
    saveState();
})

resetButton.addEventListener('click', () => {
    cardArea.style.display = "none";
    infoArea.style.display = "block";
    playButton.style.display = "block";
    quitButton.style.display = "none";
    resultsScreen.style.display = "none";
    clearInterval(timerInterval);
    timerInterval = null;
    timerText.textContent = '';
    movesText.textContent = '';
    blur.style.display = 'none';
    sessionStorage.clear();
})

// Revert back to main menu once quit button is clicked.
quitButton.addEventListener('click', () => {
    cardArea.style.display = "none";
    infoArea.style.display = "block";
    playButton.style.display = "block";
    quitButton.style.display = "none";
    clearInterval(timerInterval);
    timerInterval = null;
    timerText.textContent = '';
    movesText.textContent = '';
    sessionStorage.clear();
})

window.addEventListener('load', loadState);
window.addEventListener("storage", (event) => {
    if (event.key === "totalMoves")
    {
        totalMovesText.textContent = `Total Moves (All Tabs): ${totalMoves}`;
    }
})