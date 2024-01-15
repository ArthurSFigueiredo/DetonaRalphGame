const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        hp: 3,
    },

    actions: {
        timerId: setInterval(randomSquare, gameVelocity),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("GAME OVER! O seu resultado foi: " + state.values.result);
    }
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

function livesDown() {
    state.values.hp--
    state.view.lives.textContent = "x" + state.values.hp;

    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id !== state.values.hitPosition) {
                state.values.hitPosition = null
            }
            if (state.values.hp <= 0) {
                alert("GAME OVER! O seu resultado foi: " + state.values.result);
            }
        })
    })
}

function initialize() {
    addListenerHitBox()
}

initialize()
