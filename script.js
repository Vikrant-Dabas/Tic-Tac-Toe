let choiceX = '<i class="fa fa-times fa-5x" aria-hidden="true"></i>'
let choiceO = '<i class="fa fa-circle-o fa-5x" aria-hidden="true"></i>'
let items = document.querySelectorAll('.item');
let gameNo = 1;
let count = 0;
let gameMatrix = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
let winner = -1;
let result = document.querySelector('.result');
let canMove = true;

Array.from(items).forEach((item) => {
    item.addEventListener('click', (e) => {
        let id = Number(e.target.id[2]);
        let row = Math.floor(id / 3);
        let col = id % 3;
        if (gameMatrix[row][col] == -1) {
            if (canMove) {

                if (count % 2 == 0) {
                    e.target.innerHTML += choiceX;
                    gameMatrix[row][col] = 1;
                }
                else {
                    e.target.innerHTML += choiceO;
                    gameMatrix[row][col] = 0;
                }
                count++;
                checkResults();
            }
        }
        if (count == 9 || winner != -1){
            showResult();
            count = 0;
        }
    })
})

function checkResults() {
    if (gameMatrix[0][0] == gameMatrix[0][1] && gameMatrix[0][1] == gameMatrix[0][2]) winner = gameMatrix[0][0];
    else if (gameMatrix[1][0] == gameMatrix[1][1] && gameMatrix[1][1] == gameMatrix[1][2]) winner = gameMatrix[1][0];
    else if (gameMatrix[2][0] == gameMatrix[2][1] && gameMatrix[2][1] == gameMatrix[2][2]) winner = gameMatrix[2][0];
    else if (gameMatrix[0][0] == gameMatrix[1][0] && gameMatrix[1][0] == gameMatrix[2][0]) winner = gameMatrix[0][0];
    else if (gameMatrix[0][1] == gameMatrix[1][1] && gameMatrix[1][1] == gameMatrix[2][1]) winner = gameMatrix[0][1];
    else if (gameMatrix[0][2] == gameMatrix[1][2] && gameMatrix[1][2] == gameMatrix[2][2]) winner = gameMatrix[0][2];
    else if (gameMatrix[0][0] == gameMatrix[1][1] && gameMatrix[1][1] == gameMatrix[2][2]) winner = gameMatrix[0][0];
    else if (gameMatrix[0][2] == gameMatrix[1][1] && gameMatrix[1][1] == gameMatrix[0][2]) winner = gameMatrix[1][1];
    else winner = -1;
}
function showResult() {
    if (canMove) {
        result.classList.remove('hide');
        if (winner == -1) {
            result.textContent = 'DRAW';
        }
        else {
            let win;
            if (winner == 1) {
                if (gameNo % 2) win = 1;
                else win = 2;
            }
            else {
                if (gameNo % 2) win = 2;
                else win = 1;
            }
            result.textContent = `PLAYER ${win} WINS !!!`;
            let winnerPlayer = document.querySelector(`#p-${win}`);
            winnerPlayer.innerHTML = Number(winnerPlayer.innerHTML) + 1;
        }

    }
    canMove = false;
}

document.querySelector('button').addEventListener('click', () => {
    gameNo++;
    canMove = true;
    result.classList.add('hide');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            gameMatrix[i][j] = -1;
        }
    }
    Array.from(items).forEach((item)=>{
        item.innerHTML = "";
    })
})