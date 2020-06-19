// using the object oriented way
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

    function takeTurns() {

        if (counter % 2 === 0) {
            console.log(counter)
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
        console.log(board)
        board.cells.forEach(cell => {
            console.log(cell)
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
}