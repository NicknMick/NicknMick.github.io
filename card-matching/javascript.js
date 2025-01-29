const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
const cardArea = document.querySelector('.card-area');
const infoArea = document.querySelector('.info-area');
const playButton = document.querySelector('#play-button');
const resetButton = document.querySelector('#reset-button');
const quitButton = document.querySelector('#quit-button');
const resultsScreen = document.querySelector('#results');
const blur = document.querySelector('.blur-area');
const timerText = document.querySelector('.timer-text');
const movesText = document.querySelector('.moves-text');

const cardFlipAudio = new Audio('Sounds/cardflip.mp3');
const wrongAudio = new Audio('Sounds/wrongBuzzer.wav');
const rightAudio = new Audio('Sounds/rightBuzzer.wav');
const winnerAudio = new Audio('Sounds/winner.wav');

cardFlipAudio.volume = 0.3;
wrongAudio.volume = 0.05;
rightAudio.volume = 0.1;
winnerAudio.volume = 0.1;

let firstPick = null;
let secondPick = null;
let numMoves = 0;
let matchedPairs = 0;
let timerInterval = null;

function createCards()
{
    cardArea.innerHTML = '';

    cards.forEach(symbol => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.symbol = symbol;
        cardElement.innerHTML = '<h1></h1>';
        cardArea.appendChild(cardElement);

        cardElement.addEventListener('click', handleCardClick);
    });
}

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

        if (firstPick.dataset.symbol === secondPick.dataset.symbol)
        {
            rightAudio.play();
            firstPick.classList.add('matched');
            secondPick.classList.add('matched');
            matchedPairs++;

            firstPick.style.backgroundColor = 'green';
            secondPick.style.backgroundColor = 'green';

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

function resetSelection()
{
    firstPick = null;
    secondPick = null;
}

function startTimer()
{
    let seconds = 0;
    let minutes = 0;

    timerText.textContent = 'Time: 0:00';
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
    }, 1000);
}

function winGame()
{
    winnerAudio.play();
    clearInterval(timerInterval);
    resultsScreen.style.display = "block";
    blur.style.display = 'block';
    resultsScreen.querySelector('.time-result').textContent = `Time Taken: ${timerText.textContent}`;
    resultsScreen.querySelector('.move-result').textContent = `Moves Taken: ${numMoves}`;
}

playButton.addEventListener('click', () => {
    numMoves = 0;
    matchedPairs = 0;
    createCards();
    clearInterval(timerInterval);
    startTimer();
    cardArea.style.display = "grid";
    infoArea.style.display = "none";
    playButton.style.display = "none";
    quitButton.style.display = "block";
})

resetButton.addEventListener('click', () => {
    cardArea.style.display = "none";
    infoArea.style.display = "block";
    playButton.style.display = "block";
    quitButton.style.display = "none";
    resultsScreen.style.display = "none";
    clearInterval(timerInterval);
    timerText.textContent = '';
    movesText.textContent = '';
    blur.style.display = 'none';
})

quitButton.addEventListener('click', () => {
    cardArea.style.display = "none";
    infoArea.style.display = "block";
    playButton.style.display = "block";
    quitButton.style.display = "none";
    clearInterval(timerInterval);
    timerText.textContent = '';
    movesText.textContent = '';
})