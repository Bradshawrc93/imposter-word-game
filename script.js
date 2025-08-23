// Game state
let gameState = {
    numPlayers: 4,
    numImposters: 1,
    currentPlayer: 1,
    word: '',
    imposters: [],
    players: []
};

// Word list for the game
const WORD_LIST = [
    'Pizza', 'Guitar', 'Ocean', 'Mountain', 'Coffee', 'Basketball', 'Library', 'Rainbow',
    'Butterfly', 'Castle', 'Telescope', 'Sandwich', 'Painting', 'Thunder', 'Keyboard',
    'Garden', 'Bicycle', 'Fireworks', 'Chocolate', 'Museum', 'Sunset', 'Elephant',
    'Dancing', 'Waterfall', 'Spaceship', 'Hamburger', 'Lighthouse', 'Volcano', 'Dinosaur',
    'Hospital', 'Airplane', 'Dragon', 'Carnival', 'Penguin', 'Tornado', 'Festival',
    'Treasure', 'Submarine', 'Blizzard', 'Circus', 'Jungle', 'Rocket', 'Cathedral',
    'Wizard', 'Laboratory', 'Hurricane', 'Palace', 'Glacier', 'Safari', 'Orchestra',
    'Pyramid', 'Dolphin', 'Galaxy', 'Mansion', 'Volcano', 'Aquarium', 'Stadium',
    'Meadow', 'Fortress', 'Desert', 'Carousel', 'Avalanche', 'Shipwreck', 'Cavern',
    'Tornado', 'Bakery', 'University', 'Waterpark', 'Vineyard', 'Observatory', 'Marketplace'
];

// DOM elements
const screens = {
    home: document.getElementById('home-screen'),
    setup: document.getElementById('setup-screen'),
    player: document.getElementById('player-screen'),
    play: document.getElementById('play-screen'),
    complete: document.getElementById('complete-screen')
};

const elements = {
    startGame: document.getElementById('start-game'),
    numPlayers: document.getElementById('num-players'),
    numImposters: document.getElementById('num-imposters'),
    beginGame: document.getElementById('begin-game'),
    backToHome: document.getElementById('back-to-home'),
    playerTitle: document.getElementById('player-title'),
    playerReady: document.getElementById('player-ready'),
    viewRole: document.getElementById('view-role'),
    roleReveal: document.getElementById('role-reveal'),
    roleDisplay: document.getElementById('role-display'),
    nextPlayer: document.getElementById('next-player'),
    gameWord: document.getElementById('game-word'),
    gamePlayers: document.getElementById('game-players'),
    gameImposters: document.getElementById('game-imposters'),
    startDiscussion: document.getElementById('start-discussion'),
    newGame: document.getElementById('new-game'),
    backToGame: document.getElementById('back-to-game')
};

// Utility functions
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function getRandomWord() {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

function selectImposters(numPlayers, numImposters) {
    const imposters = [];
    while (imposters.length < numImposters) {
        const randomPlayer = Math.floor(Math.random() * numPlayers) + 1;
        if (!imposters.includes(randomPlayer)) {
            imposters.push(randomPlayer);
        }
    }
    return imposters.sort((a, b) => a - b);
}

function initializeGame() {
    gameState.numPlayers = parseInt(elements.numPlayers.value);
    gameState.numImposters = parseInt(elements.numImposters.value);
    gameState.currentPlayer = 1;
    gameState.word = getRandomWord();
    gameState.imposters = selectImposters(gameState.numPlayers, gameState.numImposters);
    gameState.players = [];
    
    // Validate inputs
    if (gameState.numImposters >= gameState.numPlayers) {
        alert('Number of imposters must be less than number of players!');
        return false;
    }
    
    return true;
}

function showPlayerScreen() {
    elements.playerTitle.textContent = `Pass to Player ${gameState.currentPlayer}`;
    elements.playerReady.style.display = 'block';
    elements.roleReveal.classList.add('hidden');
    showScreen('player');
}

function showPlayerRole() {
    elements.playerReady.style.display = 'none';
    elements.roleReveal.classList.remove('hidden');
    
    const isImposter = gameState.imposters.includes(gameState.currentPlayer);
    
    if (isImposter) {
        elements.roleDisplay.textContent = 'IMPOSTER';
        elements.roleDisplay.className = 'imposter';
    } else {
        elements.roleDisplay.textContent = gameState.word;
        elements.roleDisplay.className = 'word';
    }
    
    // Update next player button text
    if (gameState.currentPlayer === gameState.numPlayers) {
        elements.nextPlayer.textContent = 'Show Results';
    } else {
        elements.nextPlayer.textContent = 'Next Player';
    }
}

function nextPlayer() {
    if (gameState.currentPlayer === gameState.numPlayers) {
        showPlayScreen();
    } else {
        gameState.currentPlayer++;
        showPlayerScreen();
    }
}

function showPlayScreen() {
    showScreen('play');
}

function showGameComplete() {
    elements.gameWord.textContent = gameState.word;
    elements.gamePlayers.textContent = gameState.numPlayers;
    elements.gameImposters.textContent = `${gameState.numImposters} (Players: ${gameState.imposters.join(', ')})`;
    showScreen('complete');
}

function resetGame() {
    gameState = {
        numPlayers: 4,
        numImposters: 1,
        currentPlayer: 1,
        word: '',
        imposters: [],
        players: []
    };
    elements.numPlayers.value = 4;
    elements.numImposters.value = 1;
    showScreen('home');
}

// Event listeners
elements.startGame.addEventListener('click', () => {
    showScreen('setup');
});

elements.beginGame.addEventListener('click', () => {
    if (initializeGame()) {
        showPlayerScreen();
    }
});

elements.backToHome.addEventListener('click', () => {
    showScreen('home');
});

elements.viewRole.addEventListener('click', () => {
    showPlayerRole();
});

elements.nextPlayer.addEventListener('click', () => {
    nextPlayer();
});

elements.startDiscussion.addEventListener('click', () => {
    showGameComplete();
});

elements.newGame.addEventListener('click', () => {
    resetGame();
});

elements.backToGame.addEventListener('click', () => {
    showScreen('home');
});

// Input validation
elements.numPlayers.addEventListener('input', () => {
    const players = parseInt(elements.numPlayers.value);
    const imposters = parseInt(elements.numImposters.value);
    
    if (imposters >= players) {
        elements.numImposters.value = Math.max(1, players - 1);
    }
});

elements.numImposters.addEventListener('input', () => {
    const players = parseInt(elements.numPlayers.value);
    const imposters = parseInt(elements.numImposters.value);
    
    if (imposters >= players) {
        elements.numImposters.value = Math.max(1, players - 1);
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    showScreen('home');
});
