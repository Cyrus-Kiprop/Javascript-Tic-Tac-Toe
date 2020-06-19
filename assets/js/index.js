// using the object oriented way

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

    ]
    return {
        WINNING_COMBINATIONS
    }
})()

const gameUtils = (function() {
    const container = document.getElementById('container')
    const winningMessage = () => {}
    const drawMessage = () => {}
    const winUI = () => {}

    const drawUI = () => {}

    return {
        winningMessage,
        drawMessage
    }
})()

const game = new TicTacToe()

game.start()

function TicTacToe() {
    // body...
    const board = new Board()
    const firstPlayer = new Player('EXES', board, 'X')
    const secondPlayer = new Player('OOZ', board, 'O')

    let counter = 0

    this.start = function(argument) {
        const options = {
            childList: true
        }
        const observer = new MutationObserver(() => takeTurns())
        board.cells.forEach(element => observer.observe(element, options));
        takeTurns()
    }

    function gameReset() {
        board.reset()
        return counter = 0
    }

    function takeTurns() {
        // check for a win / draw before next turn
        if (board.isWinner() || board.isDraw()) {
            console.log('we have a draw')

            // congratulations


            // perform a reset
            return gameReset()
        }

        if (counter % 2 === 0) {
            firstPlayer.myTurn()

        } else {
            secondPlayer.myTurn()
        }
        counter += 1;
    }
}

function Player(name, board, signature) {
    this.name = name;
    this.signature = signature
    // attribute accessor
    this.getName = () => name

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

}

function Board() {
    this.cells = Array.from(document.querySelectorAll('div.block'));


    // check for a winner
    this.isWinner = function() {
        let winner = false

        const positions = this.cells;

        boardUtils.WINNING_COMBINATIONS.forEach((combination) => {
            // combinatins are made up of three cells
            const firstCell = positions[combination[0]].innerText;
            const secondCell = positions[combination[1]].innerText;
            const thirdCell = positions[combination[2]].innerText;

            const confirmWin = firstCell !== '' && secondCell === firstCell && thirdCell === secondCell

            if (confirmWin) {
                winner = true
            }
        })

        return winner;
    }

    this.isDraw = function() {
        return this.cells.every(cell => ['X', 'O'].includes(cell.innerText))
    }

    this.reset = function() {
        return this.cells.forEach(cell => cell.innerText = '')
        // body...
    }


}