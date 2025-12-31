// Quiz Data
const quizData = [
    {
        question: "¿Cuál es mi mapa favorito en BR?",
        answers: [
            { text: "Blackout", correct: true },
            { text: "Isolated", correct: false },
            { text: "Arena", correct: false },
            { text: "Alcatraz", correct: false }
        ]
    },
    {
        question: "¿Qué arma me recuerda a ti?",
        answers: [
            { text: "AK47", correct: false },
            { text: "MAC", correct: true },
            { text: "117", correct: false },
            { text: "STRIKER", correct: false }
        ]
    },
    {
        question: "¿Cuál fue mi penúltimo Nick de COD?",
        answers: [
            { text: "DeCynthiaঐ", correct: false },
            { text: "DeDiosaঐ", correct: true },
            { text: "DeLaMasPreciosaঐ", correct: false },
            { text: "DeValenciaঐ", correct: false }
        ]
    },
    {
        question: "¿Porque Juan Carlos gana mucho en Roblox jaja?",
        answers: [
            { text: "Porque es hacker", correct: true },
            { text: "Porque es muy listo", correct: false },
            { text: "Porque es guapo y listo", correct: false },
            { text: "Porque tiene un complot vs mí", correct: false }
        ]
    },
    {
        question: "¿Qué arma me tengo con tu nombre a ti?",
        answers: [
            { text: "AK47", correct: false },
            { text: "117", correct: false },
            { text: "MAC", correct: true },
            { text: "STRIKER", correct: false }
        ]
    }
];

// Game State
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;

// Screen Elements
const loadingScreen = document.getElementById('loadingScreen');
const introScreen = document.getElementById('introScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const rewardScreen = document.getElementById('rewardScreen');

// Button Elements
const startBtn = document.getElementById('startBtn');
const revealBtn = document.getElementById('revealBtn');
const restartBtn = document.getElementById('restartBtn');

// Quiz Elements
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answersContainer');
const questionNumber = document.getElementById('questionNumber');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progressBar');

// Results Elements
const rankBadge = document.getElementById('rankBadge');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const finalScore = document.getElementById('finalScore');
const correctAnswersElement = document.getElementById('correctAnswers');
const accuracy = document.getElementById('accuracy');

// Initialize Game
window.addEventListener('DOMContentLoaded', () => {
    // Show loading screen for 3.5 seconds
    setTimeout(() => {
        switchScreen(loadingScreen, introScreen);
    }, 3500);
});

// Event Listeners
startBtn.addEventListener('click', startQuiz);
revealBtn.addEventListener('click', showReward);
restartBtn.addEventListener('click', restartQuiz);

// Switch between screens
function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    setTimeout(() => {
        toScreen.classList.add('active');
    }, 500);
}

// Start Quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    switchScreen(introScreen, quizScreen);
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const current = quizData[currentQuestion];
    
    // Update HUD
    questionNumber.textContent = `${currentQuestion + 1}/${quizData.length}`;
    scoreElement.textContent = score;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Display question
    questionElement.textContent = current.question;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create answer buttons
    current.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer.text;
        button.addEventListener('click', () => selectAnswer(answer.correct, button));
        answersContainer.appendChild(button);
        
        // Stagger animation
        setTimeout(() => {
            button.style.animation = 'fadeIn 0.5s ease forwards';
        }, index * 100);
    });
}

// Select Answer
function selectAnswer(isCorrect, button) {
    // Disable all buttons
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => btn.disabled = true);
    
    // Add visual feedback
    if (isCorrect) {
        button.classList.add('correct');
        score += 100;
        correctAnswers++;
        scoreElement.textContent = score;
        
        // Play success sound effect (visual feedback)
        createParticles(button);
    } else {
        button.classList.add('incorrect');
        
        // Highlight correct answer
        allButtons.forEach(btn => {
            const answerText = btn.textContent;
            const correctAnswer = quizData[currentQuestion].answers.find(a => a.correct);
            if (answerText === correctAnswer.text) {
                setTimeout(() => {
                    btn.classList.add('correct');
                }, 500);
            }
        });
    }
    
    // Move to next question or show results
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// Create particle effect for correct answers
function createParticles(button) {
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.borderRadius = '50%';
        particle.style.background = '#4caf50';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 2 + Math.random() * 2;
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity - 0.5;
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
            
            if (parseFloat(particle.style.opacity) > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Show Results
function showResults() {
    switchScreen(quizScreen, resultsScreen);
    
    const percentage = (correctAnswers / quizData.length) * 100;
    
    // Update stats
    finalScore.textContent = score;
    correctAnswersElement.textContent = `${correctAnswers}/${quizData.length}`;
    accuracy.textContent = `${percentage.toFixed(0)}%`;
    
    // Determine rank and message
    let rank, title, message, badge;
    
    if (percentage >= 80) {
        rank = 'LEGENDARY';
        badge = '🏆';
        title = 'LEGENDARY RANK!';
        message = 'Excelente, no esperaba menos de la preciosa con la que me encanta jugar cod..';
        rankBadge.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
    } else if (percentage >= 50) {
        rank = 'ELITE';
        badge = '⭐';
        title = 'ELITE RANK';
        message = 'Bien.... esperaba un 100%.. pero bien';
        rankBadge.style.background = 'linear-gradient(135deg, #c0c0c0, #e8e8e8)';
    } else {
        rank = 'RECRUIT';
        badge = '📋';
        title = 'RECRUIT RANK';
        message = 'No No No, no puedo creerlo Cynthia..... vuelve a intentarlo. ¬¬';
        rankBadge.style.background = 'linear-gradient(135deg, #cd7f32, #b87333)';
    }
    
    rankBadge.textContent = badge;
    resultTitle.textContent = title;
    resultMessage.textContent = message;
}

// Show Reward
function showReward() {
    switchScreen(resultsScreen, rewardScreen);
}

// Restart Quiz
function restartQuiz() {
    switchScreen(rewardScreen, introScreen);
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (introScreen.classList.contains('active')) {
            startQuiz();
        } else if (resultsScreen.classList.contains('active')) {
            showReward();
        }
    }
});

// Add sound effects simulation with visual feedback
function playSound(type) {
    // This function can be expanded to include actual sound effects
    // For now, it provides visual feedback
    console.log(`Playing ${type} sound effect`);
}
