document.addEventListener('DOMContentLoaded', () => {

    // --- IMPORTANT: ADD ALL IMAGE FILENAMES HERE ---
    // This is a small sample. You must add all filenames for the game to work correctly.
    const imageNames = [
        'Abella Danger.jpg', 'Adriana Chechik.jpg', 'Aletta Ocean.jpg', 'Angela White.jpg', 
        'Anissa Kate.jpg', 'Asa Akira.jpg', 'Brandi Love.jpg', 'Brett Rossi.jpg', 'Casey Calvert.jpg', 
        'Chanel Preston.jpg', 'Charlotte Sartre.jpg', 'Chloe Cherry.jpg', 'Dani Daniels.jpg', 
        'Dillion Harper.jpg', 'Elsa Jean.jpg', 'Emily Willis.jpg', 'Eva Elfie.jpg', 'Eva Lovia.jpg', 
        'Evelyn Claire.jpg', 'Gina Valentina.jpg', 'Jessa Rhodes.jpg', 'Jill Kassidy.jpg', 
        'Jynx Maze.jpg', 'Kagney Linn Karter.jpg', 'Karlee Grey.jpg', 'Kendra Lust.jpg', 
        'Kenzie Reeves.jpg', 'Lana Rhoades.jpg', 'Lauren Phillips.jpg', 'Leah Gotti.jpg', 
        'Lena Paul.jpg', 'Lexi Belle.jpg', 'Lilly Ford.jpg', 'Lisa Ann.jpg', 'Maitland Ward.jpg', 
        'Mia Khalifa.jpg', 'Mia Malkova.jpg', 'Nicole Aniston.jpg', 'Penny Pax.jpg', 
        'Phoenix Marie.jpg', 'Piper Perri.jpg', 'Riley Reid.jpg', 'Sasha Grey.jpg', 
        'Savannah Bond.jpg', 'Sofi Ryan.jpg', 'Sophie Dee.jpg', 'Sybil.jpg', 'Tori Black.jpg', 
        'Valentina Nappi.jpg', 'Veronica Rodriguez.jpg', 'Violet Myers.jpg', 'Whitney Wright.jpg'
        // ... ADD THOUSANDS MORE HERE
    ];

    let availableImages = [];
    let players = [];
    let currentRound = 0;
    const totalRounds = 10;
    let roundAnswers = [];
    let roundGuessedCorrectly = [];
    let roundTimer;

    const screens = {
        lobby: document.getElementById('lobby-screen'),
        game: document.getElementById('game-screen'),
        end: document.getElementById('end-screen')
    };

    // --- Lobby Elements ---
    const playerNameInput = document.getElementById('player-name-input');
    const addPlayerButton = document.getElementById('add-player-button');
    const playerList = document.getElementById('player-list');
    const startGameButton = document.getElementById('start-game-button');

    // --- Game Elements ---
    const roundInfo = document.getElementById('round-info');
    const timerInfo = document.getElementById('timer-info');
    const imageElements = [
        document.getElementById('game-image-0'), document.getElementById('game-image-1'),
        document.getElementById('game-image-2'), document.getElementById('game-image-3')
    ];
    const inputElements = Array.from(document.querySelectorAll('.answer-input'));
    const playerScoreContainer = document.getElementById('player-scores');

    // --- End Screen Elements ---
    const finalScoreboard = document.getElementById('final-scoreboard');
    const restartButton = document.getElementById('restart-button');

    // --- LOBBY LOGIC ---
    addPlayerButton.addEventListener('click', addPlayer);
    playerNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addPlayer(); });
    startGameButton.addEventListener('click', startGame);
    
    function addPlayer() {
        const name = playerNameInput.value.trim();
        if (name && players.length < 4) {
            players.push({ name, score: 0 });
            playerNameInput.value = '';
            updatePlayerList();
        }
    }

    function updatePlayerList() {
        playerList.innerHTML = '';
        players.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p.name;
            playerList.appendChild(li);
        });

        if (players.length >= 2) {
            startGameButton.disabled = false;
            startGameButton.textContent = `Start Game (${players.length} players)`;
        } else {
            startGameButton.disabled = true;
            startGameButton.textContent = `Start Game (2 players needed)`;
        }
        if (players.length === 4) startGame();
    }

    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
    }

    // --- GAME LOGIC ---
    function startGame() {
        if (players.length < 2) return;
        currentRound = 0;
        availableImages = [...imageNames];
        players.forEach(p => p.score = 0);
        showScreen('game');
        nextRound();
    }

    function nextRound() {
        if (currentRound >= totalRounds) {
            endGame();
            return;
        }
        currentRound++;
        roundAnswers = [];
        roundGuessedCorrectly = [false, false, false, false];

        // Clear and enable inputs
        inputElements.forEach(input => {
            input.value = '';
            input.disabled = false;
            input.style.backgroundColor = 'white';
        });

        // Select 4 unique images
        for (let i = 0; i < 4; i++) {
            if (availableImages.length === 0) availableImages = [...imageNames];
            const randomIndex = Math.floor(Math.random() * availableImages.length);
            const imageName = availableImages.splice(randomIndex, 1)[0];
            imageElements[i].src = `images/${imageName}`;
            roundAnswers[i] = imageName.substring(0, imageName.lastIndexOf('.'));
        }
        
        updateDisplays();
        startRoundTimer();
    }
    
    function normalizeString(str) {
        // Lowercase, remove spaces and filler words
        return str.toLowerCase().replace(/\s+|the|and/g, '');
    }

    inputElements.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const imageIndex = parseInt(e.target.dataset.index);
                checkAnswer(e.target.value, imageIndex);
                e.target.value = ''; // Clear input after guessing
            }
        });
    });

    function checkAnswer(guess, index) {
        if (roundGuessedCorrectly[index]) return; // Already solved

        const normalizedGuess = normalizeString(guess);
        const normalizedAnswer = normalizeString(roundAnswers[index]);

        let playerFound = false;
        // Hot-seat: assumes the active player is making the guess.
        // We'll just apply points to everyone who gets it right in this model.
        // For a real turn-based game, you'd track currentPlayerIndex.
        
        if (normalizedGuess === normalizedAnswer) {
            // Give points to all players (simplest hot-seat model)
            // A more advanced model would track who is "active"
            players.forEach(p => p.score += 4);
            roundGuessedCorrectly[index] = true;
            inputElements[index].disabled = true;
            inputElements[index].style.backgroundColor = '#90ee90'; // Light green
        } else {
             players.forEach(p => p.score -= 1);
        }
        updateDisplays();
    }

    function startRoundTimer() {
        let timeLeft = 30;
        timerInfo.textContent = `Time: ${timeLeft}`;
        
        roundTimer = setInterval(() => {
            timeLeft--;
            timerInfo.textContent = `Time: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(roundTimer);
                setTimeout(nextRound, 2000); // Pause before next round
            }
        }, 1000);
    }
    
    function updateDisplays() {
        roundInfo.textContent = `Round: ${currentRound} / ${totalRounds}`;
        playerScoreContainer.innerHTML = '';
        players.forEach(p => {
            const scoreSpan = document.createElement('span');
            scoreSpan.textContent = `${p.name}: ${p.score}`;
            playerScoreContainer.appendChild(scoreSpan);
        });
    }

    function endGame() {
        showScreen('end');
        finalScoreboard.innerHTML = '';
        
        // Sort players by score
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        
        sortedPlayers.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.name} - ${p.score} points`;
            finalScoreboard.appendChild(li);
        });
    }

    restartButton.addEventListener('click', () => {
        players = [];
        updatePlayerList();
        showScreen('lobby');
    });

    showScreen('lobby'); // Start at the lobby
});