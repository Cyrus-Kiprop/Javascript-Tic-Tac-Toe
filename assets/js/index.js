// using the object oriented way
​
const boardUtils = (function() {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
​
    ]
    return {
        WINNING_COMBINATIONS
    }
})()
​
const gameUtils = (function() {
    const container = document.getElementById('container')
    const winningMessage = (player) => {
        return winUI(player)
    }
    const drawMessage = () => {}
    const winUI = (player) => {
        container.innerHTML = "";
        const div = document.createElement('div');
        const h1 = document.createElement('h1')
        h1.innerHTML = `Congratulation ${player} is the winner`
        h1.setAttribute('class', 'winner')
        div.appendChild(h1)
        container.appendChild(div)
        container.setAttribute('class', 'bg-dark')
        return container
    }
​
    const drawUI = () => {}
​
    return {
        winningMessage,
        drawMessage
    }
})()
​
const game = new TicTacToe()
​
game.start()
​
function TicTacToe() {
    // body...
    const board = new Board()
    const firstPlayer = new Player('EXES', board, 'X')
    const secondPlayer = new Player('OOZ', board, 'O')
​
    let counter = 0
​
    this.start = function(argument) {
        const options = {
            childList: true
        }
        const observer = new MutationObserver(() => takeTurns())
        board.cells.forEach(element => observer.observe(element, options));
        takeTurns()
    }
​
    function gameReset() {
        board.reset()
        return counter = 0
    }
​
    function isWinOrDraw() {
        // check for a win / draw before next turn
        let decide = false;
​
        const player = counter % 2 === 0 ? firstPlayer : secondPlayer
        if (board.isWinner() || board.isDraw()) {
            // congratulations
            gameUtils.winningMessage(player.name);
​
            decide = true
        }
​
        if (board.isDraw()) {
            decide = true
        }
​
        return decide
​
​
    }
​
    function takeTurns() {
​
        if (isWinOrDraw()) {
            return gameUtils()
        }
​
        if (counter % 2 === 0) {
            firstPlayer.myTurn()
​
        } else {
            secondPlayer.myTurn()
        }
        counter += 1;
    }
}
​
function Player(name, board, signature) {
    this.name = name;
    this.signature = signature
    // attribute accessor
    this.getName = () => name
​
    this.myTurn = function() {
        board.cells.forEach(cell => {
            cell.addEventListener('click', makeMove)
        })
    }
    const makeMove = (event) => {
        const { target } = event;
        target.innerText = this.signature;
        board.cells.forEach(element => element.removeEventListener('click', makeMove))
    }
​
}
​
function Board() {
    this.cells = Array.from(document.querySelectorAll('div.block'));
​
​
    // check for a winner
    this.isWinner = function() {
        let winner = false
​
        const positions = this.cells;
​
        boardUtils.WINNING_COMBINATIONS.forEach((combination) => {
            // combinatins are made up of three cells
            const firstCell = positions[combination[0]].innerText;
            const secondCell = positions[combination[1]].innerText;
            const thirdCell = positions[combination[2]].innerText;
​
            const confirmWin = firstCell !== '' && secondCell === firstCell && thirdCell === secondCell
​
            if (confirmWin) {
                winner = true
            }
        })
​
        return winner;
    }
​
    this.isDraw = function() {
        return this.cells.every(cell => ['X', 'O'].includes(cell.innerText))
    }
​
    this.reset = function() {
        return this.cells.forEach(cell => cell.innerText = '')
        // body...
    }
​
​
}