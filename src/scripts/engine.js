var state = {};

function initializeState() {
    state = {
        view: {
            squares: document.querySelectorAll(".square"),
            enemy: document.querySelector(".enemy"),
            timeLeft: document.querySelector("#time-left"),
            score: document.querySelector("#score"),
            lives: document.querySelector("#lives")
        },
        values: {
            hitPosition: 0,
            result: 0,
            currentTime: 60,
            hp: 3,
        },

        actions: {
            timerId: setInterval(randomSquare, 500),
            countDownTimerId: setInterval(countDown, 1000),
        }
    }
}
    
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();
    }
}

function livesDown() {
    console.log("livesdown");
    state.values.hp -=1
    state.view.lives.textContent = "x" + state.values.hp;
    if (state.values.hp <= 0) {
        gameOver();
    }
}


function gameOver() {
    alert("GAME OVER! O seu resultado foi: " + state.values.result + " pontos");
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    setTimeout(resetGame(), 1000);
}

function playSound() {
    let audio = new Audio("./src/sounds/hit.m4a")
    audio.play()
    audio.volume = 0.02;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null
                playSound();
            }
            else
                livesDown();
        })
    })
}

function resetGame() {

    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);

    initializeState();

    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = "x" + state.values.hp;

}

function initialize()
{
    initializeState();
    addListenerHitBox();
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id !== state.values.hitPosition) {
                state.values.hitPosition = null
            }

        })
    })
}

initialize()
