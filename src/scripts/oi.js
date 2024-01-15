function gameOver() {
    alert("GAME OVER! O seu resultado foi: " + state.values.result);
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    resetGame();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 || state.values.hp <= 0) {
        gameOver();
    }
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
                gameOver();
            }
        })
    })
}

function resetGame() {
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.hp = 3;

    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = "x" + state.values.hp;

    addListenerHitBox();

    // Reinicia o sistema de aparição do "inimigo"
    state.actions.timerId = setInterval(randomSquare, 500);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}
